import Button from "@/components/button/Button";
import SelectInput from "@/components/form/SelectField";
import InputField from "@/components/form/TextInput";
import ToggleInput from "@/components/form/ToggleInput";
import ImageUpload from "@/components/image/ImageUpload";
import Modal from "@/components/modal/Modal";
import { ChangeEvent, useEffect, useState } from "react";

interface Option {
	label: string;
	value: string;
}

const initialFieldValues = {
	name: "",
	bannerImage: "" as string | File,
	mainCategoryId: "",
	mainCategoryName: "",
	firstCategoryId: "",
	firstCategoryName: "",
	secondCategoryId: "",
	secondCategoryName: "",
	status: true
};

const requiredFields = [
	{ key: "bannerImage", value: "image", label: "image" },
	{ key: "name", value: "name", label: "name" },
	{ key: "mainCategoryId", value: "main category", label: "dropdown" },
	{ key: "firstCategoryId", value: "first category", label: "dropdown" },
	{ key: "secondCategoryId", value: "second category", label: "dropdown" }
];

const CategoryForm = ({ isOpen, onClose, editData }: any) => {
	// const { postFormMutation, patchFormMutation, handleApiMutation, fetchData } = useAPI();
	const [isLoading, setIsLoading] = useState(false);
	const [fieldValues, setFieldValues] = useState(initialFieldValues);
	const [selectedMainCategory, setSelectedMainCategory] = useState<Option | null>(null);
	const [selectedFirstCategory, setSelectedFirstCategory] = useState<Option | null>(null);
	const [selectedSecondCategory, setSelectedSecondCategory] = useState<Option | null>(null);
	// const apiUrl = apiConfig.inventory.thirdCategoryUrl;
	// const mainCategoryUrl = apiConfig.site.mainCategoryUrl;
	// const firstCategoryUrl = apiConfig.site.firstCategoryUrl;
	// const secondCategoryUrl = apiConfig.site.secondCategoryUrl;
	const [mainCategories, setMainCategories] = useState<any>([]);
    const [firstCategories, setFirstCategories] = useState<any[]>([]);
    const [secondCategories, setSecondCategories] = useState<any[]>([]);

	const fetchMainCategoryData = async () => {
        try {
            // const mainCategories = await fetchData({ apiUrl: mainCategoryUrl });
            setMainCategories(mainCategories.mainCategory);
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    };

    useEffect(() => {
        fetchMainCategoryData();
    }, []);

    const formattedMainCategories = (mainCategories || []).map((item: any) => ({
        label: item.name,
        value: item.id
    }));

    // const fetchFirstCategoryData = async (mainCategoryId: string) => {
    //     try {
    //         const response = await fetchData({
    //             apiUrl: `${firstCategoryUrl}?mainCategoryId=${mainCategoryId}`
    //         });
    //         setFirstCategories(response.firstCategories || []);
    //     } catch (err) {
    //         console.error("Failed to fetch first categories", err);
    //     }
    // };
	const formattedFirstCategories = firstCategories.map((item: any) => ({
        label: item.name,
        value: item.id
    }));

    const fetchSecondCategoryData = async (firstCategoryId: string) => {
        // try {
        //     const response = await fetchData({
        //         apiUrl: `${secondCategoryUrl}?firstCategoryId=${firstCategoryId}`
        //     });
        //     setSecondCategories(response.secondCategories || []);
        // } catch (err) {
        //     console.error("Failed to fetch second categories", err);
        // }
    };

	const formattedSecondCategories = secondCategories.map((item: any) => ({
        label: item.name,
        value: item.id
    }));
	
	const handleSelectedMainCategory = (category: Option) => {
		setSelectedMainCategory(category);
		setSelectedFirstCategory(null);
		setSelectedSecondCategory(null);
		setFieldValues((prevState) => ({
			...prevState,
			mainCategoryId: category.value,
			mainCategoryName: category.label,
			firstCategoryId: "",
			firstCategoryName: "",
			secondCategoryId: "",
			secondCategoryName: ""
		}));

		setTimeout(() => {
			// fetchFirstCategoryData(category.value);
		}, 0);
	};

	const handleSelectedFirstCategory = (category: Option) => {
		setSelectedFirstCategory(category);
		setSelectedSecondCategory(null);
		setFieldValues((prevState) => ({
			...prevState,
			firstCategoryId: category.value,
			firstCategoryName: category.label,
			secondCategoryId: "",
			secondCategoryName: ""
		}));

		setTimeout(() => {
			fetchSecondCategoryData(category.value);
		}, 0);
	};

	const handleSelectedSecondCategory = (category: Option) => {
		setSelectedSecondCategory(category);
		setFieldValues((prevState) => ({
			...prevState,
			secondCategoryId: category.value,
			secondCategoryName: category.label
		}));
	};

	useEffect(() => {
		if (editData) {
			setFieldValues(editData);
			if (editData.mainCategoryId && editData.mainCategoryName) {
				setSelectedMainCategory({
					label: editData.mainCategoryName,
					value: editData.mainCategoryId
				});
			}
			if (editData.firstCategoryId && editData.firstCategoryName) {
				setSelectedFirstCategory({
					label: editData.firstCategoryName,
					value: editData.firstCategoryId
				});
			}
			if (editData.secondCategoryId && editData.secondCategoryName) {
				setSelectedSecondCategory({
					label: editData.secondCategoryName,
					value: editData.secondCategoryId
				});
			}
		} else {
			setFieldValues(initialFieldValues);
			setSelectedMainCategory(null);
			setSelectedFirstCategory(null);
			setSelectedSecondCategory(null);
		}
	}, [editData]);

	const resetForm = () => {
		setFieldValues(initialFieldValues);
		setSelectedMainCategory(null);
		setSelectedFirstCategory(null);
		setSelectedSecondCategory(null);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFieldValues((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	// const handleImageUpload = (file: File) => {
	// 	// @ts-ignore
	// 	setFieldValues((prevState) => ({ ...prevState, bannerImage: file }));
	// };

	const handleImageUpload = (file: File | null) => {
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
		// 	// @ts-ignore
		// 	mutation,
		// 	url,
		// 	body: fieldValues,
		// 	invalidateQueryKey: [thirdCategoryQueryKey],
		// 	showSuccessMessage: true,
		// 	showErrorMessage: true,
		// 	requiredFields
		// });
		// if (result?.success) {
		// 	onClose();
		// 	resetForm();
		// }
		setIsLoading(false);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={editData ? "Edit Third Category" : "Create Third Category"}
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
					<p className="block text-sm font-medium text-gray-700">
						Banner Image:
						<span className="text-xs text-gray-500 ml-1">(Recommended Size: 1920x192 PX)</span>
					</p>
					{/* <ImageUpload value={fieldValues.bannerImage} onChange={handleImageUpload} /> */}
					<ImageUpload
                        value={
                            typeof fieldValues.bannerImage === "string"
                                ? fieldValues.bannerImage
                                : URL.createObjectURL(fieldValues.bannerImage)
                        }
                        onChange={handleImageUpload}
                    />
				</div>

				<div>
					<InputField label="Name" type="text"
						name="name"
						value={fieldValues.name}
						required
						onChange={handleChange} />
				</div>

					<SelectInput
						label="Main Category"
						value={selectedMainCategory}
						options={formattedMainCategories}
						onChange={handleSelectedMainCategory}
						placeholder="Select Main Category"
						showTop={true}
						required
					/>

					{
						selectedMainCategory && (
							<SelectInput
								label="First Category"
								value={selectedFirstCategory}
								options={formattedFirstCategories}
								onChange={handleSelectedFirstCategory}
								placeholder="Select First Category"
								showTop={true}
								required
							/>
						)
					}

					{
						selectedFirstCategory && (
							<SelectInput
								label="Second Category"
								value={selectedSecondCategory}
								options={formattedSecondCategories}
								onChange={handleSelectedSecondCategory}
								placeholder="Select Second Category"
								showTop={true}
								required
							/>
						)
					}

				<ToggleInput
					label="Status"
					name="status"
					checked={fieldValues.status}
					onChange={handleSwitchChange}
				/>
			</div>
		</Modal>
	)
}

export default CategoryForm;