import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

interface ThirdCategoryDataProps {
	id: string;
	name: string;
	bannerImage: string;
	mainCategoryId: string;
	mainCategoryName: string;
	firstCategoryId: string;
	firstCategoryName: string;
	secondCategoryId: string;
	secondCategoryName: string;
	status: boolean;
}

interface ThirdCategoryTableProps {
	dataList: ThirdCategoryDataProps[];
	fetchData: () => void;
	isLoading?: boolean;
	isFetching?: boolean;
	pageCount: number;
	currentPageNumber: number;
	handlePagination: (paginationData: { selected: number }) => void;
	onEdit: (data?: ThirdCategoryDataProps) => void;
}

const CategoryTable = ({ dataList, fetchData, isLoading, pageCount, currentPageNumber, handlePagination, isFetching, onEdit }: ThirdCategoryTableProps) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedThirdCategory, setSelectedThirdCategory] = useState<ThirdCategoryDataProps | null>(null);

	// const { handleDeleteAPI } = useAPI();
	// const apiUrl = apiConfig.inventory.thirdCategoryUrl;

	const tableHeaders = [
		{ key: "sl", label: "Sl" },
		{ key: "bannerImage", label: "Banner Image" },
		{ key: "name", label: "Name" },
		{ key: "mainCategoryName", label: "Main Category" },
		{ key: "firstCategoryName", label: "First Category" },
		{ key: "secondCategoryName", label: "Second Category" },
		{ key: "status", label: "Status" },
		{ key: "action", label: "Action" }
	];

	const openDeleteModal = (data: ThirdCategoryDataProps) => {
		setSelectedThirdCategory(data);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setSelectedThirdCategory(null);
	};

	const handleDelete = async () => {
		if (!selectedThirdCategory) return;

		// const apiResponse = await handleDeleteAPI({
		// 	url: `${apiUrl}/${selectedThirdCategory.id}`,
		// 	showSuccessMessage: true
		// });

		// if (apiResponse) {
		// 	fetchData();
		// 	closeDeleteModal();
		// }
	};

	// if (isFetching || isLoading) return <TableSkeleton />;

	return (
		<div className="p-6 bg-white rounded-lg border border-gray-200">
			<div className="mt-4 w-full overflow-x-auto">
				<table className="w-full text-left border-collapse min-w-[800px] cursor-pointer">
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
								<tr key={data.id} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition duration-300">
									<td className="px-6 py-4 font-medium text-gray-800">
										{index + 1}
									</td>
									<td className="px-6 py-4">
										<img
											src={data.bannerImage}
											alt="image"
											height={70}
											width={70}
											className="rounded-md shadow-sm border border-gray-200 hover:scale-105 transition-all ease-in-out duration-300"
										/>
									</td>
									<td className="px-6 py-4">{data.name}</td>
									<td className="px-6 py-4">{data.mainCategoryName}</td>
									<td className="px-6 py-4">{data.firstCategoryName}</td>
									<td className="px-6 py-4">{data.secondCategoryName}</td>
									<td className="px-6 py-4">
										<span className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center w-fit transition-all ${data.status ? "bg-[var(--color-active-green)] text-green-800" : "bg-[var(--color-inactive-red)] text-red-800"}`}>
											{data.status ? "Active" : "Inactive"}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button onClick={() => onEdit(data)} className="border border-gray-300 text-gray-700 hover:text-[#fe9f43] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300">
												<FaEdit />
											</button>
											<button onClick={() => openDeleteModal(data)} className="border border-gray-300 text-gray-700 hover:text-[#fe9f43] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300">
												<FiTrash2 />
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={tableHeaders.length} className="px-6 py-4 text-center italic">
									<EmptyState title="No category available" description="Click below to add your first category!" buttonText="+ Add New Category" onButtonClick={() => onEdit()} />
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{selectedThirdCategory && (
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

export default CategoryTable;
