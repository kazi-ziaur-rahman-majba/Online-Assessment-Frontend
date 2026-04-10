"use client"
import PageHeader from "@/components/page-header/PageHeader";
import { useEffect, useState } from "react";
import OrderTable from "./components/OrderTable";

const Orders = () => {
    const dataLimit = 10;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const [selectedFilters, setSelectedFilters] = useState<{
        userId: { label: string; value: string } | null;
        status: { label: string; value: string } | null;
        paymentStatus: { label: string; value: string } | null;
        startDate: { label: Date; value: Date } | null;
        endDate: { label: Date; value: Date } | null;
    }>({
        userId: null,
        status: null,
        paymentStatus: null,
        startDate: null,
        endDate: null,
    });


    const getOrderListApiUrl = () => {
        const params = new URLSearchParams({
            page: currentPageNumber.toString(),
            limit: dataLimit.toString(),
        });

        if (selectedFilters.userId?.value) {
            params.append("userId", selectedFilters.userId.value);
        }
        if (selectedFilters.status?.value) {
            params.append("status", selectedFilters.status.value);
        }
        if (selectedFilters.paymentStatus?.value) {
            params.append("paymentStatus", selectedFilters.paymentStatus.value);
        }
        if (selectedFilters.startDate?.value) {
            const startISO = new Date(selectedFilters.startDate.value.setHours(0, 0, 0, 0)).toISOString();
            params.append("startDate", startISO);
        }
    
        if (selectedFilters.endDate?.value) {
            const endISO = new Date(selectedFilters.endDate.value.setHours(23, 59, 59, 999)).toISOString();
            params.append("endDate", endISO);
        }

        // return `${apiConfig.order.orderListUrl}?${params.toString()}`;
    };


    const handlePagination = (paginationData: { selected: number }) => {
        const selectedPage = paginationData.selected + 1;
        setCurrentPageNumber(selectedPage);
    };

    // const {
    //     data: dataList,
    //     refetch: fetchOrderList,
    //     pageCount,
    //     isFetching,
    //     isLoading
    // } = usePaginatedQuery({
    //     // @ts-ignore
    //     queryKey: [orderQueryKey, selectedFilters, currentPageNumber.toString()],
    //     url: getOrderListApiUrl()
    // });

    // useEffect(() => {
    //     fetchOrderList();
    // }, [currentPageNumber]);


    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Order List"
                        headerDescription="Manage your orders"
                    />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                        <OrderTable
                            currentPageNumber={currentPageNumber}
                            setCurrentPageNumber={setCurrentPageNumber}
                            handlePagination={handlePagination}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
