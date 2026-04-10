"use client";

import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";
import Pagination from "@/components/pagination";
import DropdownFilter from "@/components/table-components/DropdownFilter";
import Search from "@/components/table-components/Search";
import { useEffect, useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface AdminDataProps {
    id: string;
    name: string;
    featuredImage: string;
    email: string;
    phone: string;
}

type OptionT = { label: string; value: string };
type FilterKey = 'mainCategoryId' | 'vendorId' | 'isApprove';
type SelectedFilters = Record<FilterKey, OptionT | null>;

interface AdminTableProps {
    dataList?: AdminDataProps[]; // made optional
    fetchData?: () => void;
    isLoading?: boolean;
    isFetching?: boolean;
    pageCount?: number;
    currentPageNumber?: number;
    handlePagination?: (paginationData: { selected: number }) => void;
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedFilters: SelectedFilters;
    setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
    refreshKey?: number;
}

const DUMMY_ADMINS: AdminDataProps[] = [
    { id: "1", name: "Ariana Khan", featuredImage: "/avatar.png", email: "ariana.khan@example.com", phone: "+880 1711-000001" },
    { id: "2", name: "Mahfuz Rahman", featuredImage: "/avatar.png", email: "mahfuz.rahman@example.com", phone: "+880 1711-000002" },
    { id: "3", name: "Nadia Sultana", featuredImage: "/avatar.png", email: "nadia.sultana@example.com", phone: "+880 1711-000003" },
    { id: "4", name: "Imran Hossain", featuredImage: "/avatar.png", email: "imran.hossain@example.com", phone: "+880 1711-000004" },
    { id: "5", name: "Sadia Ahmed", featuredImage: "/avatar.png", email: "sadia.ahmed@example.com", phone: "+880 1711-000005" },
    { id: "6", name: "Zubayer Farazi", featuredImage: "/avatar.png", email: "zubayer.farazi@example.com", phone: "+880 1711-000006" },
];

const AdminTable = ({
    dataList, // optional
    fetchData,
    pageCount,
    currentPageNumber,
    handlePagination,
    isLoading,
    isFetching,
    setCurrentPageNumber,
    searchQuery, setSearchQuery, selectedFilters, setSelectedFilters, refreshKey
}: AdminTableProps) => {
    const [user, setUser] = useState<{ id?: string }>({});
    useEffect(() => {
        try {
            const u = JSON.parse(sessionStorage.getItem("user") || "{}");
            setUser(u || {});
        } catch { }
    }, []);

    const tableHeaders = [
        { key: "sl", label: "Sl" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "action", label: "Action" },
    ];

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdminList, setSelectedAdminList] = useState<AdminDataProps | null>(null);

    const openDeleteModal = (data: AdminDataProps) => {
        setSelectedAdminList(data);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedAdminList(null);
    };

    const handleDelete = async () => {
        if (!selectedAdminList) return;
        alert(`Deleted: ${selectedAdminList.name}`);
        closeDeleteModal();
    };

    const rows = (dataList && dataList.length ? dataList : DUMMY_ADMINS) as AdminDataProps[];

    const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

    useEffect(() => {
        setOpenDropdown(null);
      }, [refreshKey]);

    const dropdownOptions = useMemo<Record<FilterKey, OptionT[]>>(
        () => ({
            mainCategoryId: [
                { label: "All Categories", value: "" },
                { label: "Coffee & Beverages", value: "cat_001" },
                { label: "Bakery & Snacks", value: "cat_002" },
                { label: "Merchandise", value: "cat_003" },
                { label: "Equipment", value: "cat_004" },
                { label: "Gifts & Bundles", value: "cat_005" },
            ],
            vendorId: [
                { label: "All Vendors", value: "" },
                { label: "North End Roastery", value: "ven_001" },
                { label: "Gulshan Cafe", value: "ven_002" },
                { label: "Banani Cafe", value: "ven_003" },
                { label: "Shahjadpur Cafe", value: "ven_004" },
                { label: "Online Storefront", value: "ven_005" },
            ],
            isApprove: [
                { label: "All", value: "" },
                { label: "Approved", value: "approved" },
                { label: "Pending", value: "pending" },
                { label: "Rejected", value: "rejected" },
            ],
        }),
        []
    );

    return (
        <div className="bg-white rounded-lg border border-gray-200 px-4">
            <div className="space-y-4 border-b border-gray-200">
                <div className="pt-4 pb-4 flex sm:flex-row flex-col gap-4 justify-between flex-wrap">
                    <Search
                        searchQuery={searchQuery}
                        onSearchChange={(value) => {
                            setSearchQuery(value);
                            setCurrentPageNumber(1);
                        }}
                    />
                    <div className="flex sm:flex-row flex-col gap-2">
                        {(Object.entries(dropdownOptions) as [FilterKey, OptionT[]][])
                            .map(([key, options]) => (
                                <DropdownFilter
                                    key={key}
                                    title={
                                        key === "mainCategoryId" ? "Category"
                                            : key === "vendorId" ? "Vendor"
                                                : "Approval"
                                    }
                                    options={options}
                                    // selectedOption={selectedFilters[key]}          // ✅ typed
                                    isOpen={openDropdown === key}
                                    onToggle={() => setOpenDropdown(openDropdown === key ? null : key)}
                                    onSelect={(selected) => {
                                        setSelectedFilters(prev => ({ ...prev, [key]: selected })); // ✅ typed
                                        setCurrentPageNumber(1);
                                        setOpenDropdown(null);
                                    }}
                                />
                            ))}
                        {/* <RefreshButton onClick={handleRefreshButton} /> */}
                    </div>
                </div>
            </div>
            
            <div className="pt-2 pb-4 mt-4 w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px] border border-gray-200">
                    <thead className="bg-[var(--primary-color-light)]">
                        <tr className="text-sm border-b border-gray-200">
                            {tableHeaders.map(({ key, label }, i) => (
                                <th
                                    key={key}
                                    className={[
                                        "px-6 py-3 border-r border-gray-200 text-center text-[#000000e0]",
                                        "last:border-r-0",
                                        i === 0 ? "w-14 px-3 text-center" : "",
                                    ].join(" ")}
                                >
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white text-[14px]">
                        {rows.length > 0 ? (
                            rows.map((data, rowIndex) => (
                                <tr
                                    key={data.id}
                                    className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition duration-300"
                                >
                                    {/* SL */}
                                    <td className="w-14 px-3 py-3 text-center font-medium text-gray-800 border-r border-gray-200">
                                        {rowIndex + 1}
                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
                                        {data.name}
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
                                        {data.email}
                                    </td>

                                    {/* Phone */}
                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
                                        {data.phone}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => openDeleteModal(data)}
                                                className={`border border-gray-300 text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-200 p-2 rounded-md transition duration-300 cursor-pointer ${user.id === data.id ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                                disabled={user.id === data.id}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHeaders.length} className="px-6 py-4 text-center italic">
                                    <EmptyState
                                        title="No admin available"
                                        description="Can't find any admin? Invest more to the developers!"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedAdminList && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    title="Delete?"
                    message={`Are you sure you want to delete ${selectedAdminList.name}?`}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                />
            )}

            {/* Keep pagination commented until you wire it */}
            {/* {pageCount && pageCount > 1 && (
        <div className="flex justify-center">
          <Pagination
            pageCount={pageCount}
            currentPageNumber={currentPageNumber!}
            handlePagination={handlePagination!}
          />
        </div>
      )} */}

            <div className="flex justify-center">
                <Pagination
                    pageCount={10}
                    currentPageNumber={currentPageNumber!}
                    handlePagination={handlePagination!}
                />
            </div>
        </div>
    );
};

export default AdminTable;
