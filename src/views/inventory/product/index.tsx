"use client"
import PageHeader from "@/components/page-header/PageHeader";
import { useEffect, useState } from "react";
import ProductsTable from "./component/ProductTable";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import RefreshButton from "@/components/table-components/RefreshButton";
import Footer from "@/components/admin/Footer";

const Products = () => {
	const dataLimit = 10;
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [tempSearch, setTempSearch] = useState("");
	const router = useRouter();
	useEffect(() => {
		const handler = setTimeout(() => {
			setSearchQuery(tempSearch);
			setCurrentPageNumber(1);
		}, 500);

		return () => clearTimeout(handler);
	}, [tempSearch]);
	const [selectedFilters, setSelectedFilters] = useState<{
		mainCategoryId: { label: string; value: string } | null;
		vendorId: { label: string; value: string } | null;
		isApprove: { label: string; value: string } | null;
	}>({
		mainCategoryId: null,
		vendorId: null,
		isApprove: null
	});
	// const { usePaginatedQuery } = useAPI();
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setSearchQuery("");
		setSelectedFilters({
			mainCategoryId: null,
			vendorId: null,
			isApprove: null,
		});
		setCurrentPageNumber(1);
		setRefreshKey((k) => k + 1); // tell children to reset internals (e.g., close dropdown)
		// optionally re-fetch data here if wired:
		// fetchData?.();
	};

	const getProductListApiUrl = () => {
		const queryParams = new URLSearchParams({
			page: currentPageNumber.toString(),
			limit: dataLimit.toString(),
			...(searchQuery && { searchKeyword: searchQuery }),
			...(selectedFilters.mainCategoryId?.value && { mainCategoryId: selectedFilters.mainCategoryId.value }),
			...(selectedFilters.vendorId?.value && { vendorId: selectedFilters.vendorId.value }),
			...(selectedFilters.isApprove?.value && { isApprove: selectedFilters.isApprove.value })
		});

		// return `${apiConfig.inventory.productListUrl}?${queryParams.toString()}`;
	};


	const handlePagination = (paginationData: { selected: number }) => {
		const selectedPage = paginationData.selected + 1;
		setCurrentPageNumber(selectedPage);
	};

	// const { data: dataList, isLoading, pageCount, isFetching, refetch: fetchProductList } = usePaginatedQuery({
	// 	queryKey: [
	// 		productQueryKey,
	// 		searchQuery,
	// 		selectedFilters.mainCategoryId?.value || "",
	// 		selectedFilters.vendorId?.value || "",
	// 		selectedFilters.isApprove?.value || "",
	// 		currentPageNumber.toString()
	// 	],
	// 	url: getProductListApiUrl()
	// });

	// useEffect(() => {
	// 	fetchProductList();
	// }, [currentPageNumber, searchQuery, selectedFilters]);

	return (
		<>
			<div className="flex flex-col gap-6 min-h-screen p-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<PageHeader
						headerTitle="Product List"
						headerDescription="Manage your products"
					/>
					<div className="flex items-center gap-2">
						<RefreshButton onClick={handleRefresh} />
						<Button
							label="Add Product"
							onClick={() => router.push("/create-product")}
							color="var(--color-primary)"
							hoverColor="var(--color-primary-hover)"
							// buttonClass="w-full sm:w-auto"
							icon={
								<FaPlus
									className="text-[var(--color-primary-light)]"
								/>
							}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:gap-8">
					<ProductsTable
						currentPageNumber={currentPageNumber}
						setCurrentPageNumber={setCurrentPageNumber}
						handlePagination={handlePagination}
						searchQuery={tempSearch}
						setSearchQuery={setTempSearch}
						selectedFilters={selectedFilters}
						setSelectedFilters={setSelectedFilters}
						refreshKey={refreshKey}
					/>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Products;
