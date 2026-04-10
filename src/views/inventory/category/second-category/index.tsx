"use client"
import Button from "@/components/button/Button";
import PageHeader from "@/components/page-header/PageHeader";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import CategoryTable from "./components/CategoryTable";
import CategoryForm from "./components/CategoryForm";

interface SecondCategoryDataProps {
	id: string;
	name: string;
	bannerImage: string;
	mainCategoryId: string;
	mainCategoryName: string;
	firstCategoryId: string;
	firstCategoryName: string;
	status: boolean;
}

const SecondCategory = () => {
	const dataLimit = 10;
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	// const { usePaginatedQuery } = useAPI();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editData, setEditData] = useState<SecondCategoryDataProps | null>(null);

	// const getSecondCategoryApiUrl = () => {
	// 	const apiUrl = `${apiConfig.inventory.secondCategoryUrl}?page=${currentPageNumber}&limit=${dataLimit}`;
	// 	return apiUrl;
	// }

	const handlePagination = (paginationData: { selected: number }) => {
		const selectedPage = paginationData.selected + 1;
		setCurrentPageNumber(selectedPage);
	};

	// const {
	// 	data: dataList,
	// 	refetch: fetchData,
	// 	isFetching,
	// 	pageCount,
	// 	isLoading
	// } = usePaginatedQuery({
	// 	queryKey: [secondCategoryQueryKey],
	// 	url: getSecondCategoryApiUrl()
	// });

	// useEffect(() => {
	// 	fetchData();
	// }, [currentPageNumber]);

	const openModal = (data?: SecondCategoryDataProps) => {
		setEditData(data || null);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditData(null);
	};

	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex flex-wrap items-center justify-between">
					<PageHeader
						headerTitle="Second Category"
						headerDescription="Manage your second categories"
					/>
					<Button label="Add New Second Category" onClick={() => openModal()} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" icon={<IoMdAddCircleOutline size={18} />} />
				</div>
				<div className="grid grid-cols-12 gap-12">
					<div className="col-span-12 xl:col-span-12">
						<CategoryTable
							currentPageNumber={currentPageNumber}
							handlePagination={handlePagination}
							onEdit={openModal}
						/>
					</div>
				</div>
			</div>

			<CategoryForm
				isOpen={isModalOpen}
				onClose={closeModal}
				editData={editData}
			/>
		</>
	);
};

export default SecondCategory;
