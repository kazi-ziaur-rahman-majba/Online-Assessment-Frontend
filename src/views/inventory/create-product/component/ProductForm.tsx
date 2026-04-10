import React, { ChangeEvent, useState } from 'react'
import Button from '@/components/button/Button'
import SelectInput from '@/components/form/SelectField'
import TextEditor from '@/components/form/TextEditor'
import InputField from '@/components/form/TextInput'
import ProductMultipleImage from '@/components/image-multiple/ProductMultipleImage'
import ImageUpload from '@/components/image/ImageUpload'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation';

const initialFieldValues = {
    name: "",
    price: "",
    discountType: "" as string,
    discountAmount: "",
    sku: "",
    videoUrl: "",
    cost: "",
    summary: "",
    description: "",
    mainCategoryId: "",
    firstCategoryId: "",
    secondCategoryId: "",
    thirdCategoryId: "",
    mainCategoryName: "",
    firstCategoryName: "",
    secondCategoryName: "",
    thirdCategoryName: "",
    productImages: [],
    featuredImage: null as string | null,
    fileUrl: "",
}

const discountTypeOptions = [
    { label: "Percentage", value: "percentage" },
    { label: "Flat", value: "flat" },
    { label: "None", value: "none" },
]

const formattedMainCategories = (mainCategories: any) => {
    return mainCategories.map((item: any) => ({
        label: item.name,
        value: item.id
    }));
}

const formattedFirstCategories = (firstCategories: any) => {
    return firstCategories.map((item: any) => ({
        label: item.name,
        value: item.id
    }));
}

const formattedSecondCategories = (secondCategories: any) => {
    return secondCategories.map((item: any) => ({
        label: item.name,
        value: item.id
    }));
}

const formattedThirdCategories = (thirdCategories: any) => {
    return thirdCategories.map((item: any) => ({
        label: item.name,
        value: item.id
    }));
}

const CreateProductForm = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [uniqueCode, setUniqueCode] = useState("");
    const [isDiscountNone, setIsDiscountNone] = useState(true);
    const [isDiscountPct, setIsDiscountPct] = useState(false);
    const [isDiscountFlat, setIsDiscountFlat] = useState(false);
    const [selectedDiscountType, setSelectedDiscountType] = useState<Option | null>(null);
    const [selectedMainCategory, setSelectedMainCategory] = useState<Option | null>(null);
    const [selectedFirstCategory, setSelectedFirstCategory] = useState<Option | null>(null);
    const [selectedSecondCategory, setSelectedSecondCategory] = useState<Option | null>(null);
    const [selectedThirdCategory, setSelectedThirdCategory] = useState<Option | null>(null);
    const [selectedFourthCategory, setSelectedFourthCategory] = useState<Option | null>(null);
    const [productImages, setProductImages] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleGenerateSku = () => {
        setUniqueCode(Math.random().toString(36).substring(2, 15));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFieldValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDiscountTypeOptionChange = (option: Option) => {
        setSelectedDiscountType(option);
    };

    const handleMainCategoryChange = (option: Option) => {
        setSelectedMainCategory(option);
    };

    const handleFirstCategoryChange = (option: Option) => {
        setSelectedFirstCategory(option);
    };

    const handleSecondCategoryChange = (option: Option) => {
        setSelectedSecondCategory(option);
    };

    const handleThirdCategoryChange = (option: Option) => {
        setSelectedThirdCategory(option);
    };

    const handleFourthCategoryChange = (option: Option) => {
        setSelectedFourthCategory(option);
    };

    const handleSummaryChange = (index: number, value: string) => {
        const updatedSummary = [...fieldValues.summary];
        updatedSummary[index] = value;
        setFieldValues((prev) => ({
            ...prev,
            summary: updatedSummary
        }));
    };

    const handleAdd = () => {
        if (fieldValues.summary.length < 6) {
            setFieldValues((prev) => ({
                ...prev,
                summary: [...prev.summary, ""]
            }));
        }
    };

    const handleRemove = (index: number) => {
        const updatedSummary = [...fieldValues.summary];
        updatedSummary.splice(index, 1);
        setFieldValues((prev) => ({
            ...prev,
            summary: updatedSummary
        }));
    };

    const handleFeaturedImageUpload = (file: File | null) => {
        if (file) {
            setFieldValues((prev) => ({ ...prev, featuredImage: file }));
        }
    };

    const handleProductImagesUpload = (files: (File | string)[]) => {
        setProductImages(files);
    };

    const handleSubmitForm = async () => {
        alert("successfully")
    };

    return (
        <div>
            {/* <div className="flex items-center justify-between flex-wrap mb-6">
                <PageHeader
                    headerTitle={editData ? "Edit Product" : "Create Product"}
                    headerDescription={editData ? "Edit an existing product" : "Create a new product"}
                />
                <Button label="Back to Product" onClick={() => navigate("/products")} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" />
            </div> */}

            <div className="mx-auto bg-white shadow rounded-lg">
                <div
                    className="flex justify-between items-center px-4 sm:px-6 py-2 md:py-3 cursor-pointer select-none transition-all duration-300 ease-in-out"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="text-base font-bold text-[#212b36]">
                        Product Information
                    </div>
                    <RiArrowDropDownLine
                        className={`text-2xl sm:text-3xl  transition-all duration-300 ease-in-out ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </div>

                <hr className="border-gray-200 mb-4" />

                {isOpen && (
                    <>
                        <div className="px-6 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputField label="Product Name" type="text" name="name" required value={fieldValues.name} onChange={handleChange} />
                                </div>

                                <div className="relative">
                                    <InputField label="SKU" type="text" name="sku" required value={uniqueCode} readOnly={true} onChange={handleChange} />
                                    <button
                                        onClick={handleGenerateSku}
                                        className="absolute right-2 top-7.5 bg-[var(--color-primary)] text-white py-1 px-2 rounded-md text-[12px] cursor-pointer"
                                    >
                                        Generate
                                    </button>
                                </div>

                                <div>
                                    <InputField label="Price" type="number" name="price" required value={fieldValues.price} onChange={handleChange} />
                                </div>

                                <div>
                                    <InputField label="Cost" type="number" name="cost" required value={fieldValues.cost} onChange={handleChange} />
                                </div>

                                <SelectInput
                                    label="Discount Type"
                                    value={selectedDiscountType}
                                    options={discountTypeOptions}
                                    onChange={handleDiscountTypeOptionChange}
                                    placeholder="Select Discount Type"
                                />

                                <div>
                                    <InputField
                                        label={`Discount Amount${isDiscountPct ? " (%)" : isDiscountFlat ? " (amount)" : ""}`}
                                        type="number"
                                        name="discountAmount"
                                        value={fieldValues.discountAmount}
                                        onChange={handleChange}
                                        disabled={isDiscountNone}
                                        min={isDiscountPct ? 1 : 0}
                                        max={isDiscountPct ? 99 : undefined}
                                        placeholder={
                                            isDiscountNone
                                                ? "Select a discount type first"
                                                : isDiscountPct
                                                    ? "e.g., 10 for 10%"
                                                    : "e.g., 100 for flat"
                                        }
                                    />
                                    {isDiscountNone && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Choose “Percentage” or “Flat” to enter an amount.
                                        </p>
                                    )}
                                </div>

                                {/* <SelectInput
                                    label="Main Category"
                                    value={selectedMainCategory}
                                    options={formattedMainCategories}
                                    onChange={handleMainCategoryChange}
                                    placeholder="Select Main Category"
                                    required
                                /> */}

                                {/* <SelectInput
                                    label="First Category"
                                    value={selectedFirstCategory}
                                    options={formattedFirstCategories}
                                    onChange={handleFirstCategoryChange}
                                    placeholder="Select First Category"
                                    disabled={isFirstCategoryDisabled || !fieldValues.firstCategoryId}
                                    required
                                />

                                <SelectInput
                                    label="Second Category"
                                    value={selectedSecondCategory}
                                    options={formattedSecondCategories}
                                    onChange={handleSecondCategoryChange}
                                    placeholder="Select Second Category"
                                    disabled={isSecondCategoryDisabled || !fieldValues.secondCategoryId}
                                />

                                <SelectInput
                                    label="Third Category"
                                    value={selectedThirdCategory}
                                    options={formattedThirdCategories}
                                    onChange={handleThirdCategoryChange}
                                    placeholder="Select Third Category"
                                    disabled={isThirdCategoryDisabled || !fieldValues.thirdCategoryId}
                                /> */}

                                <div>
                                    <p className="text-sm font-medium text-gray-700 w-full mb-1">Product Summary</p>
                                    <div className="space-y-2">
                                        {/* {fieldValues.summary.map((field, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={field}
                                                    onChange={(e) => handleSummaryChange(index, e.target.value)}
                                                    className="w-full h-10 focus:outline-none px-3 text-base border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                    required
                                                />
                                                {index !== 0 && (
                                                    <button
                                                        onClick={() => handleRemove(index)}
                                                        className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                                                    >
                                                        <IoMdRemoveCircleOutline className="text-xl" />
                                                    </button>
                                                )}
                                            </div>
                                        ))} */}

                                        <div className="flex justify-start mt-2">
                                            <Button
                                                label="Add More"
                                                onClick={handleAdd}
                                                color="var(--color-primary)"
                                                hoverColor="var(--color-primary-hover)"
                                                icon={<IoMdAddCircleOutline size={18} />}
                                                disabled={fieldValues.summary.length >= 6}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <TextEditor value={description} onChange={setDescription} />
                        </div>
                    </>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="col-span-1 lg:col-span-4 bg-white pb-4 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-bold text-[#212b36]">
                                Featured Image
                            </h3>

                            <div>
                                <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[var(--primary-color-light)] text-black border border-[var(--primary-color)]">
                                    Recommended Size: 626×621 PX
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Add one featured image to show as the main thumbnail for your product. This image will be displayed prominently in product listings and detail pages.
                        </p>
                    </div>
                    <div className="px-8 py-2">
                        <ImageUpload value={fieldValues.featuredImage} onChange={handleFeaturedImageUpload} />
                    </div>
                </div>

                {/* <div className="col-span-1 lg:col-span-3 bg-white pb-4">
                    <div className="px-4 sm:px-4 py-3 border-b border-gray-200">
                        <h3 className="text-base font-bold text-[#212b36]">
                            Product File
                        </h3>
                        <p className="">Upload a single PDF file that contains product details or specifications.</p>
                    </div>
                    <div className="px-8 py-2">
                        <FileUpload value={fieldValues.fileUrl} onChange={handleFileUpload} />
                    </div>
                </div> */}

                <div className="col-span-1 lg:col-span-8 bg-white rounded-lg">
                    <ProductMultipleImage value={productImages} onChange={handleProductImagesUpload} />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
                <Button label="Cancel" onClick={() => { router.push("/products") }} color="var(--color-black)" hoverColor="var(--color-black)" />
                <Button label="Save" onClick={handleSubmitForm} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" isLoading={isLoading} disabled={isLoading} />
            </div>
        </div>
    )
}

export default CreateProductForm