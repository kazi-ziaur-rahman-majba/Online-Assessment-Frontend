"use client";

import Button from "@/components/button/Button";
import PageHeader from "@/components/page-header/PageHeader";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import CreateProductForm from "./component/ProductForm";
import { useRouter } from "next/navigation";
import Footer from "@/components/admin/Footer";

const createProduct = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-6 min-h-screen p-6">
        <div className="flex items-center gap-4 justify-between flex-wrap">
          <PageHeader
            headerTitle="Create Product"
            headerDescription="Create a new product"
          />
          <Button
            label="Back to Product"
            onClick={() => {router.push("/products")}}
            color="var(--primary-color-dark)"
            hoverColor="var(--color-primary-hover)"
            icon={<FaArrowLeft />}
            // buttonClass="w-full sm:w-auto"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-8">
            <CreateProductForm />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default createProduct;
