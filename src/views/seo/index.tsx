"use client"
import Button from "@/components/button/Button";
import PageHeader from "@/components/page-header/PageHeader";
import { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import SeoTable from "./components/SeoTable";
import SeoForm from "./components/SeoForm";

const PageMeta = () => {
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
                        headerTitle="PageMeta Information"
                        headerDescription="Manage your PageMeta information"
                    />
                    <Button label="Add New PageMeta" onClick={() => openModal()} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" icon={<IoMdAddCircleOutline size={18} />} />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                        <SeoTable
                            currentPageNumber={currentPageNumber}
                            handlePagination={handlePagination}
                            onEdit={openModal}
                        />
                    </div>
                </div>
            </div>

            <SeoForm isOpen={isModalOpen} onClose={closeModal} editData={editData} />
        </>
    );
};

export default PageMeta;
