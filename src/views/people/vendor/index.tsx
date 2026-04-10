"use client"
import PageHeader from "@/components/page-header/PageHeader";
import { useEffect, useState } from "react";
import VendorTable from "./VendorTable";

interface VendorDataProps {
    id: string;
    name: string;
    featuredImage: string;
    email: string;
    phone: string;
}

const Vendors = () => {
    const dataLimit = 10;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const handlePagination = (paginationData: { selected: number }) => {
        const selectedPage = paginationData.selected + 1;
        setCurrentPageNumber(selectedPage);
    };


    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Vendor List"
                        headerDescription="Manage your vendors"
                    />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                        <VendorTable
                            currentPageNumber={currentPageNumber}
                            handlePagination={handlePagination}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vendors;
