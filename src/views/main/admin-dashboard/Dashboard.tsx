"use client";
import { FaStore, FaUserFriends } from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import { FiGrid, FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import DashboardOverView from "@/components/cards/Dashboard-Overview";
import { MotionDiv } from "@/utils/framer.motion";
import SalesPurchaseChart from "@/components/chart/BarChart";
import DoughnutChart from "@/components/chart/DoughnutChart";
import MonthlyReportsLine from "@/components/chart/LineChart";
import NewAgentsBar from "@/components/chart/HorizontalChart";
import Footer from "@/components/admin/Footer";

interface DashboardData {
  totalProducts: number;
  totalOrders: number;
  totalVendors: number;
  totalCustomers: number;
  recentProducts: any;
  recentOrders: any;
}

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const staticDashboardData = {
    totalProducts: 1250,
    totalOrders: 3420,
    totalVendors: 45,
    totalCustomers: 2890,
    totalCategories: 12,
    topCategories: [
      { category: "Electronics", sales: 1250 },
      { category: "Clothing", sales: 980 },
      { category: "Home & Garden", sales: 750 },
    ],
    monthlySalesCommissionData: [
      { month: "2025-01", totalSales: "130.00", totalCommission: "100.00" },
      { month: "2025-02", totalSales: "70.00", totalCommission: "40.00" },
      { month: "2025-03", totalSales: "100.00", totalCommission: "90.00" },
      { month: "2025-04", totalSales: "430.00", totalCommission: "100.00" },
      { month: "2025-05", totalSales: "70.00", totalCommission: "40.00" },
      { month: "2025-06", totalSales: "100.00", totalCommission: "90.00" },
    ],
    recentProducts: [],
    recentOrders: [],
  };

  return (
    <>
      <div className="flex flex-col gap-8 min-h-screen p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full transition-all ease-in duration-300 cursor-pointer">
          <MotionDiv>
            <DashboardOverView
              bgColor="bg-[var(--color-primary)]"
              title={dashboardData?.totalProducts?.toString() || "0"}
              subTitle="Total Products"
            >
              <IoCubeOutline />
            </DashboardOverView>
          </MotionDiv>
          <MotionDiv>
            <DashboardOverView
              bgColor="bg-[#00cfe8]"
              title={dashboardData?.totalOrders?.toString() || "0"}
              subTitle="Total Orders"
            >
              <FiShoppingCart />
            </DashboardOverView>
          </MotionDiv>

          <MotionDiv>
            <DashboardOverView
              bgColor="bg-[#1b2850]"
              title={dashboardData?.totalVendors?.toString() || "0"}
              subTitle="Total Vendor"
            >
              <FaStore />
            </DashboardOverView>
          </MotionDiv>

          <MotionDiv>
            <DashboardOverView
              bgColor="bg-[#28c76f]"
              title={dashboardData?.totalCustomers?.toString() || "0"}
              subTitle="Total Customer"
            >
              <FaUserFriends />
            </DashboardOverView>
          </MotionDiv>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-8">
            <SalesPurchaseChart
              monthlySalesCommissionData={
                staticDashboardData?.monthlySalesCommissionData
              }
            />
          </div>

          <div className="bg-white px-8 py-6 rounded-xl shadow-sm col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] p-2 rounded-full">
                <FiGrid size={20} />
              </span>
              <p className="text-2xl font-bold">Top Categories</p>
            </div>

            <div className="border-b border-gray-300 mb-8"></div>

            <DoughnutChart
              totalProducts={staticDashboardData?.totalProducts}
              totalCategories={staticDashboardData?.totalCategories}
              topCategories={staticDashboardData?.topCategories}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-8">
            <MonthlyReportsLine />
          </div>
          <div className="col-span-4">
            <NewAgentsBar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
