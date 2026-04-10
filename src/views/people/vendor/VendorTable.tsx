"use client"
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaFacebookMessenger } from "react-icons/fa";
import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";

const initialFieldValues = {
    content: "",
};

const requiredFields: any = [
    { key: "content", value: "message", label: "text" },
    { key: "senderId", value: "senderId" },
    { key: "senderRole", value: "senderRole" },
    { key: "receiverId", value: "receiverId" },
    { key: "receiverRole", value: "receiverRole" },
];

interface VendorDataProps {
    id: string;
    name: string;
    featuredImage: string;
    email: string;
    phone: string;
    role: string;
}

interface VendorTableProps {
    dataList: VendorDataProps[];
    fetchData: () => void;
    isLoading?: boolean;
    isFetching?: boolean;
    pageCount: number;
    currentPageNumber: number;
    handlePagination: (paginationData: { selected: number }) => void;
}

const VendorTable = ({
    dataList,
    fetchData,
    pageCount,
    currentPageNumber,
    handlePagination,
    isLoading,
    isFetching
}: VendorTableProps) => {
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [selectedVendorForMessage, setSelectedVendorForMessage] = useState<VendorDataProps | null>(null);

    const tableHeaders = [
        { key: "sl", label: "Sl" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "action", label: "Action" }
    ];

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedVendorList, setSelectedVendorList] = useState<VendorDataProps | null>(null);

    const openDeleteModal = (data: VendorDataProps) => {
        setSelectedVendorList(data);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedVendorList(null);
    };

    const handleDelete = async () => {
        alert("successful")
    };

    const closeMessageModal = () => {
        setIsMessageModalOpen(false);
        setFieldValues(initialFieldValues);
        setSelectedVendorForMessage(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFieldValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitMessage = async () => {
        setIsMessageLoading(true);
        alert("successuful")
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
                                                onClick={() => {
                                                    setSelectedVendorForMessage(data);
                                                    setIsMessageModalOpen(true);
                                                }}
                                                className="border border-gray-300 text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-200 cursor-pointer p-2 rounded-md transition duration-300">
                                                <FaFacebookMessenger />
                                            </button>
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
            </div>
            {selectedVendorList && (
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

            {
                isMessageModalOpen && (
                    <Modal
                        isOpen={isMessageModalOpen}
                        onClose={closeMessageModal}
                        title={"Message to the vendor"}
                        footerButtons={
                            <>
                                <Button label="Cancel" onClick={closeMessageModal} color="var(--color-secondary)" hoverColor="var(--color-secondary-hover)" />
                                <Button
                                    label="Send"
                                    onClick={handleSubmitMessage}
                                    color="var(--color-primary)"
                                    hoverColor="var(--color-primary-hover)"
                                    isLoading={isMessageLoading}
                                    disabled={isMessageLoading}
                                />
                            </>
                        }
                    >
                        <div>
                            <div>
                                {/* <InputField label="Message" type="text"
                                    name="message"
                                    value={fieldValues.message}
                                    required
                                    onChange={handleChange} /> */}
                                <p>Message <span className="text-red-500 font-bold">*</span></p>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    name="content"
                                    value={fieldValues.content}
                                    required
                                    rows={4}
                                    placeholder="Type your message..."
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </Modal>
                )
            }
        </div>
    );
};

export default VendorTable;
