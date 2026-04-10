import Button from "@/components/button/Button";
import TextEditor from "@/components/form/TextEditor";
import InputField from "@/components/form/TextInput";
import ToggleInput from "@/components/form/ToggleInput";
import ImageUpload from "@/components/image/ImageUpload";
import PageHeader from "@/components/page-header/PageHeader";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

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
    { key: "imageAltText", value: "image text" },
    { key: "title", value: "title" },
    { key: "author", value: "author" },
];

const BlogCreation = () => {
    const router = useRouter();
    const location = useLocation();
    const editData = location.state?.editData;
    // const { postFormMutation, patchFormMutation, handleApiMutation } = useAPI();
    const [description, setDescription] = useState("");
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    // const apiUrl = apiConfig.blog.blogUrl;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setFieldValues(editData);
            setDescription(editData.description);
        } else {
            setFieldValues(initialFieldValues);
        }
    }, [editData]);

    const resetForm = () => {
        setFieldValues(initialFieldValues);
        setDescription("");
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
    
        // const body = { ...fieldValues, description };
    
        // try {
        //     const result = await handleApiMutation({
        //         mutation,
        //         url,
        //         body,
        //         invalidateQueryKey: [blogQueryKey],
        //         showSuccessMessage: true,
        //         showErrorMessage: true,
        //         requiredFields
        //     });
    
        //     if (result?.success) {
        //         resetForm();
        //         navigate("/blogs");
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    };


    return (
        <div>
            <div className="flex items-center justify-between flex-wrap mb-6">
                <PageHeader
                    headerTitle={editData ? "Edit Blog" : "Create New Blog"}
                    headerDescription={editData ? "Edit an existing blog" : "Create a new blog"}
                />
                <Button label="Back to List" onClick={() => router.push("/blogs")} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" />
            </div>

            <div className="space-y-4 bg-white shadow rounded-lg mx-auto p-4">
                <div>
                    <p className="block text-sm font-medium text-gray-700">Image:
                        <span className="text-xs text-gray-500 ml-1">(Recommended Size: 1920x400 PX)</span>
                    </p>

                    <ImageUpload
                        value={
                            typeof fieldValues.image === "string"
                                ? fieldValues.image
                                : URL.createObjectURL(fieldValues.image)
                        }
                        onChange={handleImageUpload}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Image Alt Text" type="text" name="imageAltText" value={fieldValues.imageAltText} required onChange={handleChange} />
                    <InputField label="Author Name" type="text" name="author" value={fieldValues.author} required onChange={handleChange} />
                </div>
                <InputField label="Title" type="text" name="title" value={fieldValues.title} required onChange={handleChange} />

                <div>
                    <TextEditor value={description} onChange={setDescription} />
                </div>

                <ToggleInput label="Status" name="status" checked={fieldValues.status} onChange={handleSwitchChange} />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
                <Button label="Cancel" onClick={() => router.push("/blogs")} color="var(--color-black)" hoverColor="var(--color-black)" />
                <Button label="Save" onClick={handleSubmitForm} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" isLoading={isLoading} disabled={isLoading} />
            </div>

        </div>
    )
}

export default BlogCreation