// src/hooks/use-api.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { showToast } from "@/utils/toast-utils";

interface BaseOptions {
  url: string;
  queryKey: unknown[];
  enabled?: boolean;
}

/* ---------------------------------- */
/* Utility: Convert Object to FormData */
/* ---------------------------------- */

function objectToFormData<T extends Record<string, unknown>>(
  obj: T,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form ?? new FormData();

  for (const property in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, property)) continue;

    const value = obj[property];
    if (value == null) continue;

    const formKey = namespace ? `${namespace}[${property}]` : property;

    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((el, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (typeof el === "object" && !(el instanceof File)) {
          objectToFormData(el as Record<string, unknown>, formData, arrayKey);
        } else {
          formData.append(arrayKey, String(el));
        }
      });
    } else if (typeof value === "object") {
      objectToFormData(value as Record<string, unknown>, formData, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  }

  return formData;
}

/* ---------------------------------- */
/* Main Hook Factory */
/* ---------------------------------- */

export function useAPI<TEntity, TCreate = Partial<TEntity>, TUpdate = Partial<TEntity>>() {
  const queryClient = useQueryClient();

  /* ---------- GET ALL ---------- */
  const useGet = (options: BaseOptions) =>
    useQuery({
      queryKey: options.queryKey,
      queryFn: async () => {
        const res = await apiClient<TEntity[]>({
          url: options.url,
        });
        return res.data;
      },
      enabled: options.enabled ?? true,
    });

  /* ---------- GET ONE ---------- */
  const useGetById = (options: BaseOptions & { id: string | number }) =>
    useQuery({
      queryKey: [...options.queryKey, options.id],
      queryFn: async () => {
        const res = await apiClient<TEntity>({
          url: `${options.url}/${options.id}`,
        });
        return res.data;
      },
      enabled: options.enabled ?? true,
    });

  /* ---------- CREATE ---------- */
  const useCreate = (options: BaseOptions) =>
    useMutation({
      mutationFn: async (payload: TCreate) => {
        const isFilePayload =
          payload instanceof FormData ||
          Object.values(payload as object).some(
            (v) => v instanceof File || v instanceof Blob
          );

        const body = payload instanceof FormData
          ? payload
          : isFilePayload
          ? objectToFormData(payload as Record<string, unknown>)
          : payload;

        return apiClient<TEntity>({
          url: options.url,
          method: "POST",
          body,
        });
      },
      onSuccess: (res) => {
        showToast("success", res.message);
        queryClient.invalidateQueries({ queryKey: options.queryKey });
      },
    });

  /* ---------- UPDATE ---------- */
  const useUpdate = (options: BaseOptions) =>
    useMutation({
      mutationFn: async ({
        id,
        payload,
      }: {
        id: string | number;
        payload: TUpdate;
      }) => {
        const body =
          payload instanceof FormData
            ? payload
            : objectToFormData(payload as Record<string, unknown>);

        return apiClient<TEntity>({
          url: `${options.url}/${id}`,
          method: "PATCH",
          body,
        });
      },
      onSuccess: (res) => {
        showToast("success", res.message);
        queryClient.invalidateQueries({ queryKey: options.queryKey });
      },
    });

  /* ---------- DELETE ---------- */
  const useDelete = (options: BaseOptions) =>
    useMutation({
      mutationFn: (id: string | number) =>
        apiClient<null>({
          url: `${options.url}/${id}`,
          method: "DELETE",
        }),
      onSuccess: (res) => {
        showToast("success", res.message);
        queryClient.invalidateQueries({ queryKey: options.queryKey });
      },
    });

  return {
    useGet,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
  };
}