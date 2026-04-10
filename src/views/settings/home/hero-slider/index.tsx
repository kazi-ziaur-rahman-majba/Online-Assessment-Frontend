"use client"
import Button from "@/components/button/Button";
import PageHeader from "@/components/page-header/PageHeader";
import { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import SliderTable from "./components/SliderTable";
import SliderForm from "./components/SliderForm";

const HeroSlider = () => {
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
                        headerTitle="Hero Slider"
                        headerDescription="Manage your hero slider"
                    />
                    <Button label="Add New Slider" onClick={() => openModal()} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" icon={<IoMdAddCircleOutline size={18} />} />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                        <SliderTable
                            currentPageNumber={currentPageNumber}
                            handlePagination={handlePagination}
                            onEdit={openModal}
                        />
                    </div>
                </div>
            </div>
            <SliderForm isOpen={isModalOpen} onClose={closeModal} editData={editData} />
        </>
    );
};

export default HeroSlider;
