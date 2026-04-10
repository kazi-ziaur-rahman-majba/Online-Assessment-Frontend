import { useEffect, useState } from "react";
import ProductImageSlider from "./ProductImageSlider";
import { useParams } from "next/navigation";
import PageHeader from "@/components/page-header/PageHeader";
import Link from "next/link";

interface Product {
    name: string;
    sku: string;
    mainCategoryName: string;
    firstCategoryName: string;
    secondCategoryName: string;
    thirdCategoryName: string;
    price: number;
    cost: number;
    discountAmount: number;
    discountType: string;
    vendorName: string;
    isBestSeller: boolean;
    isRecommended: boolean;
    isNew: boolean;
    videoUrl: string;
    summary: string;
    description: string;
    featuredImage: string;
    productImages: Array<{
        id: string;
        imageUrl: string;
        createdAt: string;
        updatedAt: string;
        isDeleted: boolean;
        productId: string;
    }>;
}

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    // const apiUrl = `${apiConfig.inventory.productUrl}/${id}`;
    // const { fetchData } = useAPI();

    // const fetchProductData = async () => {
    //     const result = await fetchData({ apiUrl: apiUrl });
    //     setProduct(result);
    // };

    // useEffect(() => {
    //     fetchProductData();
    // }, []);

    return (
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <PageHeader
                        headerTitle="Product Details"
                        headerDescription="Full details of a product"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 p-6 bg-white rounded-lg border border-gray-200">
                        <ul>
                            <li className="flex border border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Product Name</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.name}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Product SKU</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.sku}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Main Category</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.mainCategoryName}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">First Category</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.firstCategoryName}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Second Category</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.secondCategoryName}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Third Category</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.thirdCategoryName}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Price</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.price}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Cost</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.cost}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Discount</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.discountAmount}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Discount Type</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.discountType || "None"}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Vendor Name</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.vendorName}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Is Best Seller</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.isBestSeller ? "True" : "False"}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Is Recommended</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.isRecommended ? "True" : "False"}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Is New</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.isNew ? "True" : "False"}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Video URL</p>
                                <Link href={product?.videoUrl || ''} className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]" target="_blank">{product?.videoUrl}</Link>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Summary</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{product?.summary}</p>
                            </li>

                            <li className="flex border-x border-b border-[#90959B]">
                                <p className="w-1/4 border-r border-[#90959B] text-[#092C4C] text-[14px] font-medium p-2">Description</p>
                                <p className="w-3/4 text-black text-[14px] font-medium p-2 border-[#90959B]">{new DOMParser().parseFromString(product?.description || "", "text/html").body.innerText}</p>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden h-1/3">
                                <img
                                    src={product?.featuredImage}
                                    alt={product?.name}
                                    className="w-full h-full rounded-md hover:scale-110 transition duration-300"
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <ProductImageSlider images={product?.productImages?.map(img => img.imageUrl) || []} />
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails