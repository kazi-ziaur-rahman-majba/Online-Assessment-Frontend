"use client"
import Button from "@/components/button/Button";
import PageHeader from "@/components/page-header/PageHeader";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import PromotionsTable from "./components/PromotionTable";
import PromotionsForm from "./components/PromotionForm";

const Promotions = () => {
    const dataLimit = 10;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any | null>(null);

    const handlePagination = (paginationData: { selected: number }) => {
        const selectedPage = paginationData.selected + 1;
        setCurrentPageNumber(selectedPage);
    };

    const openModal = (data?: any) => {
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
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Promotions"
                        headerDescription="Manage your promotions"
                    />
                    <Button label="Add New Promotion" onClick={() => openModal()} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" icon={<IoMdAddCircleOutline size={18} />} />
                </div>
                <PromotionsTable
                    currentPageNumber={currentPageNumber}
                    handlePagination={handlePagination}
                    onEdit={openModal}
                />
            </div>
            <PromotionsForm isOpen={isModalOpen} onClose={closeModal} editData={editData} />
        </>
    );
};

export default Promotions;
