"use client"
import TextEditor from "@/components/form/TextEditor";
import { ChangeEvent, useEffect, useState } from "react";

const initialFieldValues = {
    title: "",
    description: "",
};

const requiredFields = [
    { key: "title", value: "title", label: "text" },
    { key: "description", value: "description", label: "text" },
];

const ExchangeReturnForm = () => {
    const [fieldValues, setFieldValues] = useState(initialFieldValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFieldValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitForm = async () => {
       alert("successful")
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const fetchExchangeReturnCmsData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const result = await fetchData({ apiUrl });
    //         setFieldValues(result[0]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchExchangeReturnCmsData();
    // }, []);

    // if (isLoading) return <CmsSkeleton />;

    return (
        <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-[14px] font-medium text-[#212b36] mb-1">
                            Page Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={fieldValues?.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                    <TextEditor
                        value={fieldValues?.description}
                        onChange={(value) =>
                            setFieldValues((prev) => ({ ...prev, description: value }))
                        }
                    />
                </div>


                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                        Cancel
                    </button>
                    <button onClick={handleSubmitForm} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] cursor-pointer">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExchangeReturnForm;
