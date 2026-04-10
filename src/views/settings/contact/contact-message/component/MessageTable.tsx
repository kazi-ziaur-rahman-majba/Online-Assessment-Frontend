"use client"
import EmptyState from "@/components/empty-state/EmptyState";
import DeleteModal from "@/components/modal/DeleteModal";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface ContactMessageDataProps {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface ContactMessageTableProps {
    dataList: ContactMessageDataProps[];
    fetchData: () => void;
    isLoading?: boolean;
    isFetching?: boolean;
}

const MessageTable = ({ dataList, fetchData, isLoading, isFetching }: ContactMessageTableProps) => {

    const tableHeaders = [
        { key: "sl", label: "Sl" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "message", label: "Message" },
        { key: "action", label: "Action" }
    ];

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedContactMessage, setSelectedContactMessage] = useState<ContactMessageDataProps | null>(null);

    const openDeleteModal = (data: ContactMessageDataProps) => {
        setSelectedContactMessage(data);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedContactMessage(null);
    };

    const handleDelete = async () => {
        if (!selectedContactMessage) return;
        alert("successful")
    };


    return (
        <div className="p-6 bg-white rounded-lg border border-gray-200">
            <div className="mt-4 w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            {tableHeaders.map(({ key, label }) => (
                                <th key={key} className="px-6 py-4 text-left text-[#000000e0]">{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 rounded-lg">
                        {dataList?.length > 0 ? (
                            dataList?.map((data, index) => (
                                <tr key={data.id} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition duration-300">
                                    <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        {data.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.message}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
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
                                    <EmptyState title="No slider available" description="Click below to add your first slider!" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedContactMessage && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    title="Delete Contact Message"
                    message={`Are you sure you want to delete contact message?`}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default MessageTable;
