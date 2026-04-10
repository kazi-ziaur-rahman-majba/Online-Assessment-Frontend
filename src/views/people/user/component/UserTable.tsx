"use client";
import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";
import Modal from "@/components/modal/Modal";
import Pagination from "@/components/pagination";
import DropdownFilter from "@/components/table-components/DropdownFilter";
import Search from "@/components/table-components/Search";
import { useMemo, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

interface UserDataProps {
  id: string;
  name: string;
  featuredImage: string;
  email: string;
  phone: string;
}

type OptionT = { label: string; value: string };
type FilterKey = "mainCategoryId" | "vendorId" | "isApprove";
type SelectedFilters = Record<FilterKey, OptionT | null>;

interface UserTableProps {
  dataList: UserDataProps[];
  fetchData: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
  pageCount: number;
  currentPageNumber: number;
  handlePagination: (paginationData: { selected: number }) => void;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

const UserTable = ({
  dataList,
  fetchData,
  handlePagination,
  isLoading,
  isFetching,
  pageCount,
  currentPageNumber,
  setCurrentPageNumber,
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
}: UserTableProps) => {
  const tableHeaders = [
    { key: "sl", label: "Sl" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "action", label: "Action" },
  ];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserList, setSelectedUserList] =
    useState<UserDataProps | null>(null);

  const openModal = () => {
    // setSelectedUserList(data);
    setIsModalOpen(true);
  };

  const openDeleteModal = (data: UserDataProps) => {
    setSelectedUserList(data);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserList(null);
  };

  const handleDelete = async () => {
    if (!selectedUserList) return;
    alert("successful");
  };

  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

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
    <div className="bg-white rounded-lg border border-gray-200">
      {/* <div className="mt-4 w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            {tableHeaders.map(({ key, label }) => (
                                <th key={key} className="px-6 py-4 text-left text-[#000000e0]">
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 rounded-lg">
                        {dataList?.length > 0 ? (
                            dataList?.map((data, index) => (
                                <tr
                                    key={data.id}
                                    className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition duration-300"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {data.name}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {data.email}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {data.phone}
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openDeleteModal(data)}
                                                className="border border-gray-300 text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300">
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={tableHeaders.length}
                                    className="px-6 py-4 text-center italic"
                                >
                                    <EmptyState title="No admin available" description="Can't find any admin? Invest more to the developers!" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div> */}

      <div className="space-y-4 border-b border-gray-200 px-4">
        <div className="pt-4 pb-4 flex sm:flex-row flex-col gap-4 justify-between flex-wrap">
          <Search
            searchQuery={searchQuery}
            onSearchChange={(value) => {
              setSearchQuery(value);
              setCurrentPageNumber(1);
            }}
          />
          <div className="flex sm:flex-row flex-col gap-2">
            {(Object.entries(dropdownOptions) as [FilterKey, OptionT[]][]).map(
              ([key, options]) => (
                <DropdownFilter
                  key={key}
                  title={
                    key === "mainCategoryId"
                      ? "Category"
                      : key === "vendorId"
                        ? "Vendor"
                        : "Approval"
                  }
                  options={options}
                  // selectedOption={selectedFilters[key]}          // ✅ typed
                  isOpen={openDropdown === key}
                  onToggle={() =>
                    setOpenDropdown(openDropdown === key ? null : key)
                  }
                  onSelect={(selected) => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      [key]: selected,
                    })); // ✅ typed
                    setCurrentPageNumber(1);
                    setOpenDropdown(null);
                  }}
                />
              )
            )}
            {/* <RefreshButton onClick={handleRefreshButton} /> */}
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        <div className="p-6 bg rounded-xl shadow-lg border border-[var(--color-primary-light)] relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <img
                src="/avatar.png"
                alt="User Avatar"
                className="w-12 h-12 rounded-full border border-[var(--color-primary)] shadow"
              />

              <div className="relative sm:hidden">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] transition-colors duration-200 cursor-pointer"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>

                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <FaPen size={10} />
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <FaTrash size={10} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>


            <div className="mt-2 sm:mt-0 sm:flex sm:items-center sm:gap-2 sm:flex-1">
              <div>
                <p className="font-semibold">Zubayer Islam Farazi</p>
                <p className="text-sm text-gray-500">Junior Developer</p>
              </div>


              <div className="relative hidden sm:block ml-auto">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] transition-colors duration-200 cursor-pointer"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>

                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <FaPen size={10} />
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <FaTrash size={10} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-1 border-[var(--color-primary)] shadow"
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold leading-tight">
                  Zubayer Islam Farazi
                </p>
                <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs rounded-full px-3 py-1 mt-1 shadow-sm">
                  Junior Developer
                </span>
              </div>

              <div className="">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] border transition-colors duration-200 cursor-pointer self-start"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>
                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <span>
                        <FaPen size={10} />
                      </span>
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <span>
                        <FaTrash size={10} />
                      </span>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          <div className="flex flex-row flex-wrap items-center justify-between gap-2 mt-4 mb-2">
            <div className="text-sm font-medium tracking-wide">
              +880 1646745401
            </div>
            <div className="text-sm font-medium tracking-wide">
              forazizubayer@gmail.com
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm font-medium tracking-wide">
              <span>09-09-2025</span>
            </div>
            <div className="bg-white border border-[var(--color-primary)] text-[var(--color-primary)] text-xs px-3 py-1 rounded-full shadow-sm font-medium cursor-pointer">
              See Details
            </div>
          </div>
        </div>

        <div className="p-6 bg rounded-xl shadow-lg border border-[var(--color-primary-light)] relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <img
                src="/avatar.png"
                alt="User Avatar"
                className="w-12 h-12 rounded-full border border-[var(--color-primary)] shadow"
              />

              <div className="relative sm:hidden">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] transition-colors duration-200 cursor-pointer"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>

                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <FaPen size={10} />
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <FaTrash size={10} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>


            <div className="mt-2 sm:mt-0 sm:flex sm:items-center sm:gap-2 sm:flex-1">
              <div>
                <p className="font-semibold">Zubayer Islam Farazi</p>
                <p className="text-sm text-gray-500">Junior Developer</p>
              </div>


              <div className="relative hidden sm:block ml-auto">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] transition-colors duration-200 cursor-pointer"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>

                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <FaPen size={10} />
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <FaTrash size={10} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-1 border-[var(--color-primary)] shadow"
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold leading-tight">
                  Zubayer Islam Farazi
                </p>
                <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs rounded-full px-3 py-1 mt-1 shadow-sm">
                  Junior Developer
                </span>
              </div>

              <div className="">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] border transition-colors duration-200 cursor-pointer self-start"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>
                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <span>
                        <FaPen size={10} />
                      </span>
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <span>
                        <FaTrash size={10} />
                      </span>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          <div className="flex flex-row flex-wrap items-center justify-between gap-2 mt-4 mb-2">
            <div className="text-sm font-medium tracking-wide">
              +880 1646745401
            </div>
            <div className="text-sm font-medium tracking-wide">
              forazizubayer@gmail.com
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm font-medium tracking-wide">
              <span>09-09-2025</span>
            </div>
            <div className="bg-white border border-[var(--color-primary)] text-[var(--color-primary)] text-xs px-3 py-1 rounded-full shadow-sm font-medium cursor-pointer">
              See Details
            </div>
          </div>
        </div>

        <div className="p-6 bg rounded-xl shadow-lg border border-[var(--color-primary-light)] relative">
          <div className="flex items-center mb-2">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-1 border-[var(--color-primary)] shadow"
            />
            <div className="flex items-center justify-between gap-2 ml-3 flex-1">
              <div>
                <p className="text-xl font-bold leading-tight">
                  Zubayer Farazi
                </p>
                <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs rounded-full px-3 py-1 mt-1 shadow-sm">
                  Junior Developer
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] border transition-colors duration-200 cursor-pointer self-start"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>
                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <span>
                        <FaPen size={10} />
                      </span>
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <span>
                        <FaTrash size={10} />
                      </span>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-between gap-6 mt-6 mb-2">
            <div className="text-sm font-medium tracking-wide">
              +880 1646745401
            </div>
            <div className="text-sm font-medium tracking-wide">
              forazizubayer@gmail.com
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm font-medium tracking-wide">
              <span>09-09-2025</span>
            </div>
            <div className="bg-white border border-[var(--color-primary)] text-[var(--color-primary)] text-xs px-3 py-1 rounded-full shadow-sm font-medium cursor-pointer">
              See Details
            </div>
          </div>
        </div>

        <div className="p-6 bg rounded-xl shadow-lg border border-[var(--color-primary-light)] relative">
          <div className="flex items-center mb-2">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-1 border-[var(--color-primary)] shadow"
            />
            <div className="flex items-center justify-between gap-2 ml-3 flex-1">
              <div>
                <p className="text-xl font-bold leading-tight">
                  Zubayer Farazi
                </p>
                <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs rounded-full px-3 py-1 mt-1 shadow-sm">
                  Junior Developer
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 rounded-full text-[var(--color-primary)] border transition-colors duration-200 cursor-pointer self-start"
                  title="More actions"
                >
                  <HiDotsHorizontal size={20} />
                </button>
                {isModalOpen && (
                  <div className="absolute right-0 top-8 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 p-2 space-y-2">
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Edit clicked");
                      }}
                    >
                      <span>
                        <FaPen size={10} />
                      </span>
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 bg-[var(--color-primary-light)] rounded-full cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        alert("Delete clicked");
                      }}
                    >
                      <span>
                        <FaTrash size={10} />
                      </span>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-between gap-6 mt-6 mb-2">
            <div className="text-sm font-medium tracking-wide">
              +880 1646745401
            </div>
            <div className="text-sm font-medium tracking-wide">
              forazizubayer@gmail.com
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm font-medium tracking-wide">
              <span>09-09-2025</span>
            </div>
            <div className="bg-white border border-[var(--color-primary)] text-[var(--color-primary)] text-xs px-3 py-1 rounded-full shadow-sm font-medium cursor-pointer">
              See Details
            </div>
          </div>
        </div>
      </div>

      {selectedUserList && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          title="Delete?"
          message={`Are you sure you want to delete?`}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
      {/* {pageCount > 1 && (
				<div className="flex justify-center">
					<Pagination
						pageCount={pageCount}
						currentPageNumber={currentPageNumber}
						handlePagination={handlePagination}
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

export default UserTable;
