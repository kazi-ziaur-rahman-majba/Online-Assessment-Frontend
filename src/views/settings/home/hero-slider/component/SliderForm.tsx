import Button from "@/components/button/Button";
import InputField from "@/components/form/TextInput";
import ToggleInput from "@/components/form/ToggleInput";
import ImageUpload from "@/components/image/ImageUpload";
import Modal from "@/components/modal/Modal";
import { useState, ChangeEvent, useEffect } from "react";

const initialFieldValues = {
    link: "",
    image: "" as string | File,
    status: false
};

const requiredFields: any = [
    { key: "image", value: "image" },
    { key: "link", value: "link" }
];

const SliderForm = ({ isOpen, onClose, editData }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fieldValues, setFieldValues] = useState(initialFieldValues);

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

    const handleImageUpload = (file: File | null) => {
        if (file) {
            setFieldValues((prevState) => ({ ...prevState, image: file }));
        }
    };

    const handleSwitchChange = (checked: boolean) => {
        setFieldValues((prevState) => ({
            ...prevState,
            status: checked
        }));
    };

    const handleSubmitForm = async () => {
        setIsLoading(true);

        alert("successfull")
        setIsLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editData ? "Edit Hero Slider" : "Create Hero Slider"}
            footerButtons={
                <>
                    <Button label="Cancel" onClick={onClose} color="var(--color-secondary)" hoverColor="var(--color-secondary-hover)" />
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
                        <span className="text-xs text-gray-500 ml-1">(Recommended Size: 1920x400 PX)</span>
                    </h3>
                    {/* <ImageUpload value={fieldValues.image} onChange={handleImageUpload} /> */}
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
                    <InputField label="Link" type="text" name="link" value={fieldValues.link} required onChange={handleChange} />
                </div>

                <ToggleInput label="Status" name="status" checked={fieldValues.status} onChange={handleSwitchChange} />
            </div>
        </Modal>
    );
};

export default SliderForm;
