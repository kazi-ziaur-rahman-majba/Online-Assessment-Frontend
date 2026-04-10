import { ChangeEvent, useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { useMemo } from "react";
import Search from "@/components/table-components/Search";
import DropdownFilter from "@/components/table-components/DropdownFilter";
import RefreshButton from "@/components/table-components/RefreshButton";
import Link from "next/link";
import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";

interface ProductDataProps {
    id: string;
    name: string;
    featuredImage: string;
    sku: string;
    slug: string;
    description: string;
    summary: string;
    videoUrl: string;
    mainCategoryName: string;
    firstCategoryName: string;
    secondCategoryName: string;
    thirdCategoryName: string;
    price: number;
    cost: number;
    discount: number;
    discountType: string;
    vendorName: string;
    isProductSectionOne: string;
    isProductSectionTwo: string;
    isProductSectionThree: string;
    isProductSectionFour: string;
    isProductSectionFive: string;
    isProductSectionSix: string;
    isApprove: string;
    status: string;
}

interface ProductTableProps {
    dataList: {
        data: ProductDataProps[];
        total: number;
        page: number;
        limit: number;
    };
    fetchProductList: () => void;
    isLoading?: boolean;
    pageCount: number;
    currentPageNumber: number;
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
    handlePagination: (paginationData: { selected: number }) => void;
    isFetching?: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedFilters: {
        mainCategoryId: { label: string; value: string } | null;
        vendorId: { label: string; value: string } | null;
        isApprove: { label: string; value: string } | null;
    };
    setSelectedFilters: React.Dispatch<React.SetStateAction<{
        mainCategoryId: { label: string; value: string } | null;
        vendorId: { label: string; value: string } | null;
        isApprove: { label: string; value: string } | null;
    }>>;
}

const initialFieldValues = {
    isProductSectionOne: false,
    isProductSectionTwo: false,
    isProductSectionThree: false,
    isProductSectionFour: false,
    isProductSectionFive: false,
    isProductSectionSix: false,
    isApprove: false,
    status: false
};

const ProductsTable = ({ dataList, fetchProductList, pageCount, currentPageNumber, setCurrentPageNumber, handlePagination, isLoading, isFetching, searchQuery, setSearchQuery, selectedFilters, setSelectedFilters }: ProductTableProps) => {
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    // const { handleDeleteAPI, handleApiMutation, patchMutation, fetchData } = useAPI();
    // const apiUrl = apiConfig.inventory.productUrl;
    // const statusApiUrl = apiConfig.inventory.productStatusUrl;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDataProps | null>(null);
    const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
    const [isProductSectionOne, setIsProductSectionOne] = useState(selectedProduct?.isProductSectionOne);
    const [isProductSectionTwo, setIsProductSectionTwo] = useState(selectedProduct?.isProductSectionTwo);
    const [isProductSectionThree, setIsProductSectionThree] = useState(selectedProduct?.isProductSectionThree);
    const [isProductSectionFour, setIsProductSectionFour] = useState(selectedProduct?.isProductSectionFour);
    const [isProductSectionFive, setIsProductSectionFive] = useState(selectedProduct?.isProductSectionFive);
    const [isProductSectionSix, setIsProductSectionSix] = useState(selectedProduct?.isProductSectionSix);

    // Search and Filter by Category, Vendor
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const [mainCategories, setMainCategories] = useState<{ label: string, value: string }[]>([]);
    // const mainCategoryApiUrl = apiConfig.site.mainCategoryUrl;
    const fetchMainCategoryData = async () => {
        try {
            // const result = await fetchData({ apiUrl: mainCategoryApiUrl });
            // setMainCategories(result.mainCategory.map((cat: any) => ({ label: cat.name, value: cat.id })));
        } catch (error) {
            console.error("Failed to fetch main categories:", error);
        }
    };

    const [vendorList, setVendorList] = useState<{ label: string, value: string }[]>([]);
    // const vendorListUrl = apiConfig.site.vendorListUrl;
    const fetchVendorData = async () => {
        try {
            // const result = await fetchData({ apiUrl: vendorListUrl });
            // setVendorList(result.vendorList.map((vendor: any) => ({ label: vendor.name, value: vendor.id })));
        } catch (error) {
            console.error("Failed to fetch vendor data:", error);
        }
    };

    useEffect(() => {
        fetchMainCategoryData();
        fetchVendorData();
    }, []);

    const dropdownOptions = useMemo(() => {
        return {
            mainCategoryId: mainCategories,
            vendorId: vendorList,
            isApprove: [
                { label: "Approved", value: "true" },
                { label: "Pending", value: "false" }
            ]
        };
    }, [mainCategories, vendorList]);

    const handleRefreshButton = () => {
        setSelectedFilters({
            mainCategoryId: null,
            vendorId: null,
            isApprove: null,
        });
        setSearchQuery("");
        setCurrentPageNumber(1);
        setOpenDropdown(null);
    };
    // Search and Filter by Category, Vendor

    const tableHeaders = [
        { key: "sl", label: "Sl" },
        { key: "name", label: "Product Name" },
        { key: "sku", label: "SKU" },
        { key: "price", label: "Price" },
        { key: "vendor", label: "Vendor" },
        { key: "isApprove", label: "Approval" },
        { key: "status", label: "Status" },
        { key: "action", label: "Action" },
    ];

    const openDeleteModal = (data: ProductDataProps) => {
        setSelectedProduct(data);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    const openSelectionModal = (product: ProductDataProps) => {
        setSelectedProduct(product);
        setFieldValues({
            isProductSectionOne: String(product.isProductSectionOne) == "true",
            isProductSectionTwo: String(product.isProductSectionTwo) == "true",
            isProductSectionThree: String(product.isProductSectionThree) == "true",
            isProductSectionFour: String(product.isProductSectionFour) == "true",
            isProductSectionFive: String(product.isProductSectionFive) == "true",
            isProductSectionSix: String(product.isProductSectionSix) == "true",
            isApprove: String(product.isApprove) === "true",
            status: String(product.status) === "true"
        });
        setIsSelectionModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedProduct) return;

        // const apiResponse = await handleDeleteAPI({
        // 	url: `${apiUrl}/${selectedProduct.id}`,
        // 	showSuccessMessage: true
        // });

        // if (apiResponse) {
        // 	fetchProductList();
        // 	closeDeleteModal();
        // }
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        // setIsProductSectionOne(false);
        // setIsProductSectionTwo(false);
        // setIsProductSectionThree(false);
        // setIsProductSectionFour(false);
        // setIsProductSectionFive(false);
        // setIsProductSectionSix(false);
        // setStatus(false);
        setIsSelectionModalOpen(false);
    };

    const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFieldValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSave = async () => {
        try {
            if (!selectedProduct) return;

            // const result = await handleApiMutation({
            // 	// @ts-ignore
            // 	mutation: patchMutation,
            // 	url: `${statusApiUrl}/${selectedProduct.id}`,
            // 	body: fieldValues,
            // 	invalidateQueryKey: [productQueryKey],
            // 	showSuccessMessage: true,
            // 	showErrorMessage: true
            // });

            // if (result?.success) {
            // 	fetchProductList();
            // 	handleCloseModal();
            // }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // if (isFetching || isLoading) return <TableSkeleton />;

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
                        {(Object.entries(dropdownOptions) as [keyof typeof selectedFilters, any][]).map(([key, options]) => (
                            <DropdownFilter
                                key={key}
                                title={
                                    key === "mainCategoryId"
                                        ? "Category"
                                        : key === "vendorId"
                                            ? "Vendor"
                                            : key === "isApprove"
                                                ? "Approval"
                                                : key
                                }
                                options={options}
                                selectedOption={selectedFilters[key]}
                                isOpen={openDropdown === key}
                                onToggle={() => setOpenDropdown(openDropdown === key ? null : key)}
                                onSelect={(selected) => {
                                    setSelectedFilters(prev => ({ ...prev, [key]: selected }));
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
                <table className="w-full text-left border-collapse min-w-[1300px]">
                    <thead className="bg-[var(--primary-color-light)]">
                        <tr className="text-sm border-b border-gray-200">
                            {tableHeaders.map(({ key, label }, i) => (
                                <th key={key} className={[
                                    "px-6 py-3 border-r border-gray-200 text-center text-[#000000e0]",
                                    "last:border-r-0",
                                    i === 0 ? "w-14 px-3 text-center" : "",
                                ].join(" ")}>
                                    <span>{label}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {dataList?.data?.length > 0 ? (
                            dataList.map((data, index) => (
                                <tr
                                    key={data.id}
                                    className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition duration-300"
                                >
                                    <td className="w-14 px-3 py-3 text-center font-medium text-gray-800 border-r border-gray-200">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
                                        <img
                                            src={data.featuredImage}
                                            alt={data.name}
                                            className="w-10 h-10 rounded-md shadow-sm border border-gray-200"
                                        />
                                        <span>
                                            {data.name}
                                        </span>
                                    </td>

                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">{data.sku}</td>
                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">{`$${data.price}`}</td>
                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">{data.vendorName}</td>
                                    <td className="px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center w-fit transition-all ${data.isApprove
                                                ? "bg-[var(--color-active-green)] text-green-800"
                                                : "bg-[var(--color-inactive-red)] text-red-800"
                                                }`}
                                        >
                                            {data.isApprove ? "Approved" : "Pending"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center w-fit transition-all ${data.status
                                                ? "bg-[var(--color-active-green)] text-green-800"
                                                : "bg-[var(--color-inactive-red)] text-red-800"
                                                }`}
                                        >
                                            {data.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link href={`/product-details/${data.id}`}
                                                className="inline-flex items-center justify-center hover:bg-gray-200 border border-[#e6eaed] hover:text-[var(--color-primary)] p-2 rounded-md cursor-pointer">
                                                <FiEye />
                                            </Link>
                                            {/* <Link
												href="/edit-product"
												state={{ editData: data }}
												className="inline-flex items-center justify-center hover:bg-gray-200 border border-[#e6eaed] hover:text-[var(--color-primary)] p-2 rounded-md cursor-pointer"
											>
												<FaEdit />
											</Link> */}
                                            <button
                                                onClick={() => openDeleteModal(data)}
                                                className="inline-flex items-center justify-center hover:bg-gray-200 border border-[#e6eaed] hover:text-[var(--color-primary)] p-2 rounded-md cursor-pointer"
                                            >
                                                <FiTrash2 />
                                            </button>
                                            <button onClick={() => openSelectionModal(data)} className="inline-flex items-center justify-center hover:bg-gray-200 border border-[#e6eaed] hover:text-[var(--color-primary)] p-2 rounded-md cursor-pointer">
                                                <FaEllipsisVertical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHeaders.length} className="px-6 py-4 text-center italic">
                                    <EmptyState title="No matching products. Try adjusting your filters." />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {
                selectedProduct && isSelectionModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#000000b6] z-[60] top-0 right-0 left-0 bottom-0 p-2">
                        <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
                            <div className="flex justify-between items-center pb-6">
                                <p className="text-lg font-semibold">Product Status Settings</p>
                                <TiDelete
                                    className="text-3xl cursor-pointer text-red-500 hover:text-red-600"
                                    onClick={handleCloseModal}
                                />
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">Is Product Section One</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isProductSectionOne"
                                        type="checkbox"
                                        checked={fieldValues.isProductSectionOne}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)]">
                                        <div className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-all ${fieldValues.isProductSectionOne ? "translate-x-5" : ""}`} />
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">Is Product Section Two</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isProductSectionTwo"
                                        type="checkbox"
                                        checked={fieldValues.isProductSectionTwo}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)] relative">
                                        <div
                                            className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${fieldValues.isProductSectionTwo ? "translate-x-5" : "translate-x-0"
                                                }`}
                                        />
                                    </div>
                                </label>
                            </div>


                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">Is Product Section Three</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isProductSectionThree"
                                        type="checkbox"
                                        checked={fieldValues.isProductSectionThree}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)] relative">
                                        <div className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${fieldValues.isProductSectionThree ? "translate-x-5" : "translate-x-0"
                                            }`} />
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">Is Product Section Four</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isProductSectionFour"
                                        type="checkbox"
                                        checked={fieldValues.isProductSectionFour}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)] relative">
                                        <div className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${fieldValues.isProductSectionFour ? "translate-x-5" : "translate-x-0"
                                            }`} />
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">Is Product Section Five</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isProductSectionFive"
                                        type="checkbox"
                                        checked={fieldValues.isProductSectionFive}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)] relative">
                                        <div className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${fieldValues.isProductSectionFive ? "translate-x-5" : "translate-x-0"
                                            }`} />
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">Is Product Section Six</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isProductSectionSix"
                                        type="checkbox"
                                        checked={fieldValues.isProductSectionSix}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)] relative">
                                        <div className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${fieldValues.isProductSectionSix ? "translate-x-5" : "translate-x-0"
                                            }`} />
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">is Approved</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isApprove"
                                        type="checkbox"
                                        checked={fieldValues.isApprove}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)] relative">
                                        <div className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${fieldValues.isApprove ? "translate-x-5" : "translate-x-0"
                                            }`} />
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-[#fff2e6] p-3 rounded-md">
                                <span className="text-sm font-medium text-gray-700">Status</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="status"
                                        type="checkbox"
                                        checked={fieldValues.status}
                                        onChange={handleSwitchChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)] relative">
                                        <div className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${fieldValues.status ? "translate-x-5" : "translate-x-0"
                                            }`} />
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 h-8 bg-gray-500 text-white text-[14px] cursor-pointer border border-gray-300 rounded-md hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 h-8 bg-[var(--color-primary)] text-white cursor-pointer rounded-md hover:bg-[var(--color-primary-hover)]"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {selectedProduct && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    title="Confirm Delete"
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
        </div>
    );
};

export default ProductsTable;
