import DateRangePicker from "@/components/date-range-picker/DateRangePicker";
import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";
import DropdownFilter from "@/components/table-componentss/DropdownFilter";
import RefreshButton from "@/components/table-componentss/RefreshButton";
import { formatDate } from "@/utils/date-utils";
import { useEffect, useMemo, useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";

interface OrdersDataProps {
	id: string;
	orderId: string;
	totalAmount: string;
	status: string;
	paymentStatus: string;
	createdAt?: string;
}

interface OrderTableProps {
	dataList: OrdersDataProps[];
	fetchOrderList: () => void;
	pageCount: number;
	currentPageNumber: number;
	setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
	handlePagination: (paginationData: { selected: number }) => void;
	isLoading: boolean;
	isFetching?: boolean;
	selectedFilters: {
		userId: { label: string; value: string } | null;
		status: { label: string; value: string } | null;
		paymentStatus: { label: string; value: string } | null;
		startDate: { label: Date; value: Date } | null;
		endDate: { label: Date; value: Date } | null;
	};
	setSelectedFilters: React.Dispatch<React.SetStateAction<{
		userId: { label: string; value: string } | null;
		status: { label: string; value: string } | null;
		paymentStatus: { label: string; value: string } | null;
		startDate: { label: Date; value: Date } | null;
		endDate: { label: Date; value: Date } | null;
	}>>;
}

const OrderTable = ({
	dataList,
	pageCount,
	currentPageNumber,
	fetchOrderList,
	setCurrentPageNumber,
	handlePagination,
	isLoading,
	isFetching,
	selectedFilters, setSelectedFilters
}: OrderTableProps) => {
	const [selectedDates, setSelectedDates] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const tableHeaders = [
		{ key: "sl", label: "Sl" },
		{ key: "orderId", label: "Order ID" },
		{ key: "totalAmount", label: "Amount" },
		{ key: "paymentStatus", label: "Payment Status" },
		{ key: "createdAt", label: "Created At" },
		{ key: "status", label: "Status" },
		{ key: "action", label: "Action" }
	];

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedOrderData, setSelectedOrderData] = useState<OrdersDataProps | null>(null);

	const openDeleteModal = (data: OrdersDataProps) => {
		setSelectedOrderData(data);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setSelectedOrderData(null);
	};

	const handleInvoice = (data: OrdersDataProps) => {
		// navigate(`/invoice/${data.id}`, { state: { orderData: data } });
	};

	const handleDelete = async () => {
		alert("successful")
	};

	// Search and Filter by Category, Vendor
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const [customers, setCustomers] = useState<{ label: string, value: string }[]>([]);
	// const customersApiUrl = apiConfig.site.customerListUrl;
	// const fetchCustomersData = async () => {
	// 	try {
	// 		const result = await fetchData({ apiUrl: `${customersApiUrl}?role=customer` });
	// 		setCustomers(result.customerList.map((cat: any) => ({ label: cat.name, value: cat.id })));
	// 	} catch (error) {
	// 		console.error("Failed to fetch main categories:", error);
	// 	}
	// };


	// useEffect(() => {
	// 	fetchCustomersData();
	// }, []);

	const dropdownOptions = useMemo(() => {
		return {
			userId: customers,
			status: [
				{ label: "Completed", value: "Completed" },
				{ label: "Failed", value: "Failed" },
			],
			paymentStatus: [
				{ label: "Paid", value: "Paid" },
				{ label: "Unpaid", value: "Unpaid" },
			],
		};
	}, [customers]);

	const handleRefreshButton = () => {
		setSelectedFilters({
			userId: null,
			status: null,
			paymentStatus: null,
			startDate: null,
			endDate: null
		});
		setCurrentPageNumber(1);
		setOpenDropdown(null);
	};
	// Search and Filter by Category, Vendor

	// if (isFetching || isLoading) return <TableSkeleton />;

	return (
		<div className="p-6 bg-white rounded-lg border border-gray-200">
			<div className="flex justify-end flex-wrap space-y-4">
				<div className="flex flex-wrap gap-2">
					{(Object.entries(dropdownOptions) as [keyof typeof selectedFilters, any][]).map(([key, options]) => (
						<DropdownFilter
							key={key}
							title={
								key === "userId"
									? "Customer"
									: key === "status"
										? "Status"
										: key === "paymentStatus"
											? "Payment Status"
											: key
							}
							options={options}
							selectedOption={selectedFilters[key]}
							isOpen={openDropdown === key}
							onToggle={() => setOpenDropdown(openDropdown === key ? null : key)}
							onSelect={(selected) => {
								setSelectedFilters((prev) => ({ ...prev, [key]: selected }));
								setCurrentPageNumber(1);
								setOpenDropdown(null);
							}}
						/>
					))}
					<DateRangePicker
						onDateChange={(start, end) => {
							setSelectedFilters((prev) => ({
								...prev,
								startDate: { label: start, value: start },
								endDate: { label: end, value: end },
							}));
							setCurrentPageNumber(1);
						}}
						initialStartDate={selectedFilters.startDate?.value}
						initialEndDate={selectedFilters.endDate?.value}
					/>
					<RefreshButton onClick={handleRefreshButton} />
				</div>
			</div>


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
								<tr key={data.id} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition duration-300">
									<td className="px-6 py-4 font-medium text-gray-800">
										{index + 1}
									</td>
									<td className="px-6 py-4 font-medium text-gray-800">
										{data.orderId}
									</td>
									<td className="px-6 py-4 font-medium text-gray-800">
										{data.totalAmount}
									</td>
									<td className="px-6 py-4">
										<span className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center w-fit transition-all ${data.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
											{data.paymentStatus}
										</span>
									</td>
									<td className="px-6 py-4 font-medium text-gray-800">
										{formatDate(data?.createdAt)}
									</td>
									<td className="px-6 py-4">
										<span className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center w-fit transition-all ${data.status === "Completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
											{data.status}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button onClick={() => handleInvoice(data)} className="border border-gray-300 text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300">
												<FiEye />
											</button>
											<button onClick={() => openDeleteModal(data)} className="border border-gray-300 text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300">
												<FiTrash2 />
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={tableHeaders.length} className="px-6 py-4 text-center italic">
									<EmptyState title="Looks like no order data available." description="Promote your products more to attract your first order!" />
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{selectedOrderData && (
				<DeleteModal
					isOpen={isDeleteModalOpen}
					title="Delete Order"
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

export default OrderTable;
