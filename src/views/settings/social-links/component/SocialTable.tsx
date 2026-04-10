import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

interface SocialLinksDataProps {
	id: string;
	icon: string;
	link: string;
}

interface SocialLinksTableProps {
	dataList: SocialLinksDataProps[];
	fetchData: () => void;
	isLoading?: boolean;
	isFetching?: boolean;
	pageCount: number;
	currentPageNumber: number;
	handlePagination: (paginationData: { selected: number }) => void;
	onEdit: (data?: SocialLinksDataProps) => void;
}

const SocialTable = ({
	dataList,
	fetchData,
	isLoading,
	isFetching,
	pageCount, currentPageNumber, handlePagination,
	onEdit
}: SocialLinksTableProps) => {

	const tableHeaders = [
		{ key: "sl", label: "Sl" },
		{ key: "icon", label: "Icon" },
		{ key: "link", label: "Link" },
		{ key: "action", label: "Action" }
	];

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedSocialLinks, setSelectedSocialLinks] = useState<SocialLinksDataProps | null>(null);

	const openDeleteModal = (data: SocialLinksDataProps) => {
		setSelectedSocialLinks(data);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setSelectedSocialLinks(null);
	};

	const handleDelete = async () => {
		alert('successful')
	};


	return (
		<div className="p-6 bg-white rounded-lg border border-gray-200">
			<div className="mt-4 w-full overflow-x-auto">
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
									<td className="px-6 py-4">
										<img
											src={data.icon}
											alt={data.link}
											height={70}
											width={70}
											className="rounded-md shadow-sm border border-gray-200"
										/>
									</td>
									<td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer p-4">
										{data.link}
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												onClick={() => onEdit(data)}
												className="border border-gray-300 text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300"
											>
												<FaEdit />
											</button>

											<button
												onClick={() => openDeleteModal(data)}
												className="border border-gray-300 text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300"
											>
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
									<EmptyState title="No social links available" description="Click below to add your first social links!" buttonText="+ Add New Social Links" onButtonClick={() => onEdit()} />
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{selectedSocialLinks && (
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
		</div>
	);
};

export default SocialTable;
