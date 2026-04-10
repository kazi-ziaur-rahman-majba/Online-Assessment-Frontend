"use client"
import Button from "@/components/button/Button";
import InputField from "@/components/form/TextInput";
import { ChangeEvent, useEffect, useState } from "react";

const initialFieldValues = {
    pageTitle: "",
    pageSubTitle: "",
    phone: "",
    email: "",
    address: "",
    formSectionTitleOne: "",
    formSectionTitleTwo: "",
    formSectionTitleThree: "",
    buttonText: ""
};

const requiredFields = [
    { key: "pageTitle", value: "page title", label: "text" },
    { key: "pageSubTitle", value: "page sub title", label: "text" },
    { key: "phone", value: "phone", label: "text" },
    { key: "email", value: "email", label: "text" },
    { key: "address", value: "address", label: "text" },
    { key: "phone", value: "phone", label: "text" },
    { key: "formSectionTitleOne", value: "form section title one", label: "text" },
    { key: "formSectionTitleTwo", value: "form section title two", label: "text" },
    { key: "formSectionTitleThree", value: "form section title three", label: "text" },
    { key: "buttonText", value: "button text", label: "text" }
];

const PageCms = () => {
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
    // const fetchContactPageCmsData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const result = await fetchData({ apiUrl });
    //         setFieldValues(result[0]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchContactPageCmsData();
    // }, []);

    // if (isLoading) return <CmsSkeleton />;

    return (
        <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputField label="Page Title" name="pageTitle" value={fieldValues.pageTitle} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Page Sub Title" name="pageSubTitle" value={fieldValues.pageSubTitle} onChange={handleChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputField label="Phone" name="phone" value={fieldValues.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Email" name="email" value={fieldValues.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Address" name="address" value={fieldValues.address} onChange={handleChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputField label="Form Section Title One" name="formSectionTitleOne" value={fieldValues.formSectionTitleOne} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Form Section Title Two" name="formSectionTitleTwo" value={fieldValues.formSectionTitleTwo} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Form Section Title Three" name="formSectionTitleThree" value={fieldValues.formSectionTitleThree} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium text-[#212b36] mb-1">
                            Button Text<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="buttonText"
                            value={fieldValues.buttonText}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FE9F43] focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                        Cancel
                    </button>
                    <button onClick={handleSubmitForm} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-light-primary)] cursor-pointer">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageCms;
