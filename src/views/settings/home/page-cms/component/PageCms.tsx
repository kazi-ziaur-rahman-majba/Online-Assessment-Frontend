"use client"
import InputField from "@/components/form/TextInput";
import ToggleInput from "@/components/form/ToggleInput";
import ImageUpload from "@/components/image/ImageUpload";
import { ChangeEvent, useEffect, useState } from "react";

const initialFieldValues = {
    categorySectionTitle: "",
    isCategorySectionVisible: true,
    productSectionOneTitle: "",
    isProductSectionOneVisible: true,
    productSectionOneFontColor: "",
    productSectionOneBackgroundColor: "",
    productSectionTwoTitle: "",
    isProductSectionTwoVisible: true,
    productSectionTwoFontColor: "",
    productSectionTwoBackgroundColor: "",
    productSectionThreeTitle: "",
    isProductSectionThreeVisible: true,
    productSectionThreeFontColor: "",
    productSectionThreeBackgroundColor: "",
    productSectionFourTitle: "",
    isProductSectionFourVisible: true,
    productSectionFourFontColor: "",
    productSectionFourBackgroundColor: "",
    productSectionFiveTitle: "",
    isProductSectionFiveVisible: true,
    productSectionFiveFontColor: "",
    productSectionFiveBackgroundColor: "",
    productSectionSixTitle: "",
    isProductSectionSixVisible: true,
    productSectionSixFontColor: "",
    productSectionSixBackgroundColor: "",
    bannerImage: "" as string | File
};

const requiredFields = [
    { key: "categorySectionTitle", value: "category section title", label: "text" },
    { key: "productSectionOneTitle", value: "product section one title", label: "text" },
    { key: "productSectionOneFontColor", value: "product section one font color", label: "text" },
    { key: "productSectionOneBackgroundColor", value: "product section one background color", label: "text" },
    { key: "productSectionTwoTitle", value: "product section two title", label: "text" },
    { key: "productSectionTwoFontColor", value: "product section one font color", label: "text" },
    { key: "productSectionTwoBackgroundColor", value: "product section one background color", label: "text" },
    { key: "productSectionThreeTitle", value: "product section three title", label: "text" },
    { key: "productSectionThreeFontColor", value: "product section one font color", label: "text" },
    { key: "productSectionThreeBackgroundColor", value: "product section one background color", label: "text" },
    { key: "productSectionFourTitle", value: "product section four title", label: "text" },
    { key: "productSectionFourFontColor", value: "product section one font color", label: "text" },
    { key: "productSectionFourBackgroundColor", value: "product section one background color", label: "text" },
    { key: "productSectionFiveTitle", value: "product section five title", label: "text" },
    { key: "productSectionFiveFontColor", value: "product section one font color", label: "text" },
    { key: "productSectionFiveBackgroundColor", value: "product section one background color", label: "text" },
    { key: "productSectionSixTitle", value: "product section six title", label: "text" },
    { key: "productSectionSixFontColor", value: "product section one font color", label: "text" },
    { key: "productSectionSixBackgroundColor", value: "product section one background color", label: "text" },
    { key: "bannerImage", value: "banner image", label: "image" }
];

const PageCmsForm = () => {
    const [fieldValues, setFieldValues] = useState(initialFieldValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFieldValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = (file: File | null) => {
        if (file) {
            setFieldValues((prevState) => ({ ...prevState, bannerImage: file }));
        }
    };

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFieldValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSubmitForm = async () => {
        alert("successful")
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);


    return (
        <div className="bg-white max-w-7xl rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs text-gray-500">Dashboard • Overview</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#212B36] mt-1">
                        Welcome back 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        A quick snapshot of your product performance, categories, and team activity.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50">
                        Export
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm hover:opacity-90">
                        Add Product
                    </button>
                </div>
            </div>


            {/* Feature cards */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {[
                        {
                            title: "Smart Recommendations",
                            desc: "AI-suggested bundles and related items for higher AOV.",
                        },
                        {
                            title: "Inventory Health",
                            desc: "Low-stock alerts and reorder cues to avoid stockouts.",
                        },
                        {
                            title: "Customer Insights",
                            desc: "Cohorts, LTV, and churn risk to guide retention.",
                        },
                    ].map((f) => (
                        <div key={f.title} className="rounded-xl border border-gray-200 p-5">
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                                ⭐
                            </div>
                            <p className="mt-3 font-semibold">{f.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
                            <button className="mt-4 text-sm text-[var(--color-primary)] hover:underline">
                                Learn more
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PageCmsForm;
