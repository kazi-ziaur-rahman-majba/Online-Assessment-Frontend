import { useState, useEffect, ChangeEvent } from "react";
import Button from "@/components/button/Button";
import InputField from "@/components/form/TextInput";
import ToggleInput from "@/components/form/ToggleInput";
import ImageUpload from "@/components/image/ImageUpload";
import Modal from "@/components/modal/Modal";

const initialFieldValues = {
    name: "",
    image: "" as string | File,
    bannerImage: "" as string | File,
    status: true
};

const requiredFields: any = [
    { key: "image", value: "image", label: "image" },
    { key: "bannerImage", value: "banner image", label: "image" },
    { key: "name", value: "name", label: "name" }
];

const CategoryForm = ({ isOpen, onClose, editData }: any) => {
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [isLoading, setIsLoading] = useState(false);
    // const { postFormMutation, patchFormMutation, handleApiMutation } = useAPI();
    // const apiUrl = apiConfig.inventory.mainCategoryUrl;

    useEffect(() => {
        if (editData) {
            setFieldValues(editData);
        } else {
            setFieldValues(initialFieldValues);
        }
    }, [editData]);

    const resetForm = () => {
        setFieldValues(initialFieldValues);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFieldValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handleImageUpload = (file: File) => {
    //     // @ts-ignore
    //     setFieldValues((prevState) => ({ ...prevState, image: file }));
    // };

    // const handleBannerImageUpload = (file: File) => {
    //     // @ts-ignore
    //     setFieldValues((prevState) => ({ ...prevState, bannerImage: file }));
    // };

    const handleImageUpload = (file: File | null) => {
        if (file) {
            setFieldValues((prevState) => ({ ...prevState, image: file }));
        }
    };

    const handleBannerImageUpload = (file: File | null) => {
        if (file) {
            setFieldValues((prevState) => ({ ...prevState, bannerImage: file }));
        }
    };

    const handleSwitchChange = (checked: boolean) => {
        setFieldValues((prevState) => ({
            ...prevState,
            status: checked,
        }));
    };

    const handleSubmitForm = async () => {
        setIsLoading(true);
        // const mutation = editData ? patchFormMutation : postFormMutation;
        // const url = editData ? `${apiUrl}/${editData.id}` : apiUrl;

        // const result = await handleApiMutation({
        //     mutation,
        //     url,
        //     body: fieldValues,
        //     invalidateQueryKey: [mainCategoryQueryKey],
        //     showSuccessMessage: true,
        //     showErrorMessage: true,
        //     requiredFields
        // });

        // if (result?.success) {
        //     onClose();
        //     resetForm();
        // }
        setIsLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editData ? "Edit Category" : "Create Category"}
            footerButtons={
                <>
                    <Button label="Cancel" onClick={onClose} color="var(--color-secondary)" hoverColor="var(--color-secondary-hover)"/>
                    <Button 
                        label="Save" 
                        onClick={handleSubmitForm}
                        color="var(--color-primary)"
                        hoverColor="var(--color-primary-hover)"
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <h3 className="block text-sm font-medium text-gray-700">Image:
                    <span className="text-xs text-gray-500 ml-1">(Width: 80px)</span>
                    </h3>
                    <ImageUpload
                        value={
                            typeof fieldValues.image === "string"
                                ? fieldValues.image
                                : URL.createObjectURL(fieldValues.image)
                        }
                        onChange={handleImageUpload}
                    />
                </div>
                <div>
                    <h3 className="block text-sm font-medium text-gray-700">Banner Image:
                    <span className="text-xs text-gray-500 ml-1">(Recommended Size: 1920x192 PX)</span>
                    </h3>
                    <ImageUpload
                        value={
                            typeof fieldValues.bannerImage === "string"
                                ? fieldValues.bannerImage
                                : URL.createObjectURL(fieldValues.bannerImage)
                        }
                        onChange={handleBannerImageUpload}
                    />
                </div>

                <div>
                    <InputField label="Name" type="text" name="name" value={fieldValues.name} required onChange={handleChange} />
                </div>

                <ToggleInput
                    label="Status"
                    name="status"
                    checked={fieldValues.status}
                    onChange={handleSwitchChange}
                />
            </div>
        </Modal>
    );
};

export default CategoryForm;
