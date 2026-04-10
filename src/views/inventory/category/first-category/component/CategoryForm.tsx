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
	status: true
};

const requiredFields = [
	{ key: "bannerImage", value: "image", label: "image" },
	{ key: "name", value: "name", label: "name" },
	{ key: "mainCategoryId", value: "main category", label: "dropdown" }
];

const CategoryForm = ({ isOpen, onClose, editData }: any) => {
	// const { postFormMutation, patchFormMutation, handleApiMutation, fetchData } = useAPI();
	const [fieldValues, setFieldValues] = useState(initialFieldValues);
	const [isLoading, setIsLoading] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [mainCategories, setMainCategories] = useState<any>([]);
	const [selectedMainCategory, setSelectedMainCategory] = useState<Option | null>(null);
	// const apiUrl = apiConfig.inventory.firstCategoryUrl;
	// const mainCategoryUrl = apiConfig.site.mainCategoryUrl;

	// const fetchMainCategoryData = async () => {
	// 	try {
	// 		const mainCategories = await fetchData({ apiUrl: mainCategoryUrl });
	// 		setMainCategories(mainCategories.mainCategory);
	// 	} catch (err) {
	// 		console.error("Fetch failed:", err);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchMainCategoryData();
	// }, []);

	const formattedMainCategories = (mainCategories || []).map((item: any) => ({
		label: item.name,
		value: item.id
	}));


	const handleSelectedMainCategory = (category: Option) => {
		setSelectedMainCategory(category);
		setIsDropdownOpen(false);
		setFieldValues((prevState) => ({
			...prevState,
			mainCategoryId: category.value,
			mainCategoryName: category.label
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
		} else {
			setFieldValues(initialFieldValues);
			setSelectedMainCategory(null);
		}
	}, [editData]);

	const resetForm = () => {
		setFieldValues(initialFieldValues);
		setSelectedMainCategory(null);
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
		// 	mutation,
		// 	url,
		// 	body: fieldValues,
		// 	invalidateQueryKey: [firstCategoryQueryKey],
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
			title={editData ? "Edit First Category" : "Create First Category"}
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
					<h3 className="block text-sm font-medium text-gray-700">Banner Image:
						<span className="text-xs text-gray-500 ml-1">(Recommended Size: 1920x192 PX)</span>
					</h3>
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