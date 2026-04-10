import { useState, ChangeEvent, useEffect } from "react";
import Button from "@/components/button/Button";
import TextEditor from "@/components/form/TextEditor";
import InputField from "@/components/form/TextInput";
import ToggleInput from "@/components/form/ToggleInput";
import ImageUpload from "@/components/image/ImageUpload";
import Modal from "@/components/modal/Modal";

const initialFieldValues = {
    title: "",
    description: "",
    author: "",
    image: "" as string | File,
    imageAltText: "",
    status: false
};

const requiredFields: any = [
    { key: "image", value: "image" },
    { key: "imageAltText", value: "imageAltText" },
    { key: "title", value: "title" },
    { key: "description", value: "description" },
    { key: "author", value: "author" },
];

const BlogForm = ({ isOpen, onClose, editData }: any) => {
    // const { postFormMutation, patchFormMutation, handleApiMutation } = useAPI();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    // const apiUrl = apiConfig.setting.heroSliderUrl;

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
        // const mutation = editData ? patchFormMutation : postFormMutation;
        // const url = editData ? `${apiUrl}/${editData.id}` : apiUrl;

        // const result = await handleApiMutation({
        //     mutation,
        //     url,
        //     body: fieldValues,
        //     invalidateQueryKey: [blogQueryKey],
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
            title={editData ? "Edit Blog" : "Create Blog"}
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
                    <p className="block text-sm font-medium text-gray-700">Image:
                        <span className="text-xs text-gray-500 ml-1">(Recommended Size: 1920x400 PX)</span>
                    </p>
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
                    <InputField label="Image Alt Text" type="text" name="imageAltText" value={fieldValues.imageAltText} required onChange={handleChange} />
                </div>
                <div>
                    <InputField label="Title" type="text" name="title" value={fieldValues.title} required onChange={handleChange} />
                </div>

                <div className="px-6 pb-6">
                    <TextEditor value={description} onChange={setDescription} />
                </div>

                <div>
                    <InputField label="Author" type="text" name="author" value={fieldValues.author} required onChange={handleChange} />
                </div>

                <ToggleInput label="Status" name="status" checked={fieldValues.status} onChange={handleSwitchChange} />
            </div>
        </Modal>
    );
};

export default BlogForm;
