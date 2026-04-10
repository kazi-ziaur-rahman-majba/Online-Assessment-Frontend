import Button from "@/components/button/Button";
import InputField from "@/components/form/TextInput";
import ImageUpload from "@/components/image/ImageUpload";
import Modal from "@/components/modal/Modal";
import { useState, ChangeEvent, useEffect } from "react";

const initialFieldValues = {
    link: "",
    icon: "" as string | File,
};

const requiredFields: any = [
    { key: "icon", value: "icon" },
    { key: "link", value: "link" }
];

const SocialForm = ({ isOpen, onClose, editData }: any) => {
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
            console.log("file: ", file)
            setFieldValues((prevState) => ({ ...prevState, icon: file }));
        }
    };

    const handleSubmitForm = async () => {
        setIsLoading(true);
        alert("successful")
        setIsLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editData ? "Edit Social Links" : "Create Social Links"}
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
                    <p className="block text-sm font-medium text-gray-700">Image (Recommended Size: 512*512 PX)</p>
                    <ImageUpload
                        value={
                            typeof fieldValues.icon === "string"
                                ? fieldValues.icon
                                : URL.createObjectURL(fieldValues.icon)
                        }
                        onChange={handleImageUpload}
                    />
                </div>
                <div>
                    <InputField label="Link" type="text" name="link" value={fieldValues.link} required onChange={handleChange} />
                </div>
            </div>
        </Modal>
    );
};

export default SocialForm;
