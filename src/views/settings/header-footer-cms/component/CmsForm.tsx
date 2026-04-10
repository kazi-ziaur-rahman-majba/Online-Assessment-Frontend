"use client"
import Button from "@/components/button/Button";
import InputField from "@/components/form/TextInput";
import ImageUpload from "@/components/image/ImageUpload";
import { ChangeEvent, useEffect, useState } from "react";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

const initialFieldValues = {
    bannerText: "",
    helpline: "",
    footerDescription: "",
    copyrightText: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    headerLogo: "" as string | File,
    footerLogo: "" as string | File,
    footerSectionTwoTitle: "",
    footerSectionThreeTitle: ""
};

const requiredFields = [
    { key: "headerLogo", value: "header logo", label: "image" },
    { key: "bannerText", value: "banner text", label: "text" },
    { key: "helpline", value: "helpline", label: "text" },
    { key: "footerLogo", value: "footer logo", label: "image" },
    { key: "footerDescription", value: "footer description", label: "text" },
    { key: "copyrightText", value: "copyright text", label: "text" },
    { key: "contactEmail", value: "contact email", label: "text" },
    { key: "contactPhone", value: "contact phone", label: "text" },
    { key: "contactAddress", value: "contact address", label: "text" },
    { key: "footerSectionTwoTitle", value: "footer section two title", label: "text" },
    { key: "footerSectionThreeTitle", value: "footer section three title", label: "text" }
];

const CmsForm = () => {
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [footerSectionTwo, setFooterSectionTwo] = useState([{ value: '', link: '' }]);
    const [footerSectionThree, setFooterSectionThree] = useState([{ value: '', link: '' }]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFieldValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogoUpload = (name: 'headerLogo' | 'footerLogo', file: File | null) => {
        if (file) {
            setFieldValues((prevState) => ({ ...prevState, [name]: file }));
        }
    };

    const handleDynamicChange = (
        index: number,
        field: 'value' | 'link',
        value: string,
        sectionSetter: React.Dispatch<React.SetStateAction<{ value: string; link: string }[]>>
    ) => {
        const updated = [...(sectionSetter === setFooterSectionTwo ? footerSectionTwo : footerSectionThree)];
        updated[index][field] = value;
        sectionSetter(updated);
    };

    const addMoreField = (sectionSetter: React.Dispatch<React.SetStateAction<{ value: string; link: string }[]>>) => {
        sectionSetter(prevState => [...prevState, { value: '', link: '' }]);
    };

    const removeField = (index: number, sectionSetter: React.Dispatch<React.SetStateAction<{ value: string; link: string }[]>>) => {
        sectionSetter(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleSubmitForm = async () => {
        alert("successfull")
    };

    // const fetchHeaderFooterCmsData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const result = await fetchData({ apiUrl });
    //         if (result && result.length > 0) {
    //             setFieldValues(result[0]);
    //             // setFooterSectionTwo(result[0].footerSectionTwo || [{ value: '', link: '' }]);
    //             // setFooterSectionThree(result[0].footerSectionThree || [{ value: '', link: '' }]);
    //             setFooterSectionTwo(() => {
    //                 const data = result[0].footerSectionTwo;
    //                 return typeof data === 'string' ? JSON.parse(data) : data || [];
    //             });

    //             setFooterSectionThree(() => {
    //                 const data = result[0].footerSectionThree;
    //                 return typeof data === 'string' ? JSON.parse(data) : data || [];
    //             });
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
                    <p className="block text-sm font-medium text-gray-700">Header Logo: <span className="text-red-500">*</span> (Recommended Size: 200*40 PX)</p>
                    <ImageUpload
                        onChange={(file) => handleLogoUpload('headerLogo', file)}
                        value={typeof fieldValues.headerLogo === 'string' ? fieldValues.headerLogo : URL.createObjectURL(fieldValues.headerLogo)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputField label="Banner Text" name="bannerText" value={fieldValues.bannerText} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Helpline" name="helpline" value={fieldValues.helpline} onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-4">
                    <p className="block text-sm font-medium text-gray-700">Footer Logo: <span className="text-red-500">*</span>(Recommended Size: 200*40 PX)</p>
                    <ImageUpload
                        onChange={(file) => handleLogoUpload('footerLogo', file)}
                        value={typeof fieldValues.footerLogo === 'string' ? fieldValues.footerLogo : URL.createObjectURL(fieldValues.footerLogo)}
                    />
                </div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                    <div>
                        <InputField label="Footer Description" name="footerDescription" value={fieldValues.footerDescription} onChange={handleChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputField label="Copyright Text" name="copyrightText" value={fieldValues.copyrightText} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Contact Email" name="contactEmail" value={fieldValues.contactEmail} onChange={handleChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputField label="Contact Phone" name="contactPhone" value={fieldValues.contactPhone} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Contact Address" name="contactAddress" value={fieldValues.contactAddress} onChange={handleChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <InputField label="Footer Section Two Title" name="footerSectionTwoTitle" value={fieldValues.footerSectionTwoTitle} onChange={handleChange} required />
                    </div>
                    <div>
                        <InputField label="Footer Section Three Title" name="footerSectionThreeTitle" value={fieldValues.footerSectionThreeTitle} onChange={handleChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[{
                        title: "Footer Section Two",
                        section: footerSectionTwo,
                        setSection: setFooterSectionTwo
                    }, {
                        title: "Footer Section Three",
                        section: footerSectionThree,
                        setSection: setFooterSectionThree
                    }].map(({ title, section, setSection }, idx) => (
                        <div key={idx}>
                            <label className="block text-sm font-medium text-gray-700">{title}:</label>
                            {section.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center mb-2">
                                    <input
                                        type="text"
                                        value={item.value}
                                        onChange={(e) => handleDynamicChange(index, 'value', e.target.value, setSection)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md"
                                        placeholder="Value"
                                    />
                                    <input
                                        type="text"
                                        value={item.link}
                                        onChange={(e) => handleDynamicChange(index, 'link', e.target.value, setSection)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md"
                                        placeholder="Link"
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeField(index, setSection)}
                                            className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                                        ><IoMdRemoveCircleOutline className="text-xl" /></button>
                                    )}
                                </div>
                            ))}
                            <Button
                                label="Add More"
                                onClick={() => addMoreField(setSection)}
                                color="var(--color-primary)" hoverColor="var(--color-primary-hover)" icon={<IoMdAddCircleOutline size={18} />}
                            ></Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-3">
                    <Button onClick={handleSubmitForm} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" isLoading={isLoading} disabled={isLoading}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CmsForm;
