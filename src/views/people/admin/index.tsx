"use client";

import Button from "@/components/button/Button";
import PageHeader from "@/components/page-header/PageHeader";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import AdminTable from "./component/AdminTable";
import AdminForm from "./component/AdminForm";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import RefreshButton from "@/components/table-components/RefreshButton";
import Footer from "@/components/admin/Footer";

interface AdminDataProps {
    id: string;
    name: string;
    featuredImage: string;
    email: string;
    phone: string;
}

type OptionT = { label: string; value: string };
type FilterKey = "mainCategoryId" | "vendorId" | "isApprove";
type SelectedFilters = Record<FilterKey, OptionT | null>;

const Admin = () => {
    const dataLimit = 10;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<AdminDataProps | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        mainCategoryId: null,
        vendorId: null,
        isApprove: null,
    });

    // ✅ refresh signal for children
    const [refreshKey, setRefreshKey] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handlePagination = (paginationData: { selected: number }) => {
        const selectedPage = paginationData.selected + 1;
        setCurrentPageNumber(selectedPage);
    };

    const openModal = (data?: AdminDataProps) => {
        setEditData(data || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditData(null);
    };

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            setSearchQuery("");
            setSelectedFilters({
                mainCategoryId: null,
                vendorId: null,
                isApprove: null,
            });
            setCurrentPageNumber(1);
            setRefreshKey((k) => k + 1); 
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-6 min-h-screen p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <PageHeader
                        headerTitle="Admin List"
                        headerDescription="View and manage admin accounts"
                    />
                    <div className="flex items-center gap-3">
                        <RefreshButton onClick={handleRefresh} disabled={isRefreshing} />
                        <Button
                            label="Add Product"
                            onClick={() => openModal()}
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
                    <div>
                        <AdminTable
                            currentPageNumber={currentPageNumber}
                            handlePagination={handlePagination}
                        />
                    </div>
                </div>
            </div>

            <Footer />
            <AdminForm isOpen={isModalOpen} onClose={closeModal} editData={editData} />
        </>
    );
};

export default Admin;
