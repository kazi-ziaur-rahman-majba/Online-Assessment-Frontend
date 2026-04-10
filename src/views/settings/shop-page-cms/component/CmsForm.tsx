"use client"
import ImageUpload from "@/components/image/ImageUpload";
import { useEffect, useState } from "react";

const initialFieldValues = {
    bannerImage: "" as string | File,
};

const requiredFields = [
    { key: "bannerImage", value: "banner image", label: "banner image" },
];

const CmsForm = () => {
    const [fieldValues, setFieldValues] = useState(initialFieldValues);

    const handleImageUpload = (file: File | null) => {
        if (file) {
            setFieldValues((prevState) => ({ ...prevState, bannerImage: file }));
        }
    };

    const handleSubmitForm = async () => {
        alert("successful")
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const fetchHeaderFooterCmsData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const result = await fetchData({ apiUrl });
    //         if (result && result.length > 0) {
    //             setFieldValues(result[0]);
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchHeaderFooterCmsData();
    // }, []);

    // if (isLoading) return <CmsSkeleton />;

    return (
        <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                    <p className="block text-sm font-medium text-gray-700">Banner Image: <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-1">(Recommended Size: 1920x192 PX)</span>
                    </p>
                    <ImageUpload
                        value={
                            typeof fieldValues.bannerImage === "string"
                                ? fieldValues.bannerImage
                                : URL.createObjectURL(fieldValues.bannerImage)
                        }
                        onChange={handleImageUpload}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={handleSubmitForm} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] cursor-pointer">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CmsForm;
