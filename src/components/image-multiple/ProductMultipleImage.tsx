import React, { useId } from "react";
import { IoCloseSharp, IoCloudUploadOutline } from "react-icons/io5";

interface ProductImageProps {
	value: (File | string)[];
	onChange: (files: (File | string)[]) => void;
}

const ProductMultipleImage: React.FC<ProductImageProps> = ({ value, onChange }) => {
	const id = useId();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);

			const existingNames = value.map((img) =>
				img instanceof File ? img.name : img.split("/").pop()
			);

			const filteredFiles = newFiles.filter(
				(file) => !existingNames.includes(file.name)
			);

			if (value.length + filteredFiles.length > 5) {
				alert("You can upload up to 5 images only!");
				return;
			}

			onChange([...value, ...filteredFiles]);
		}
	};

	const removeImage = (index: number) => {
		const updated = [...value];
		updated.splice(index, 1);
		onChange(updated);
	};

	return (
		<>
			<div className="px-4 sm:px-4 md:py-3 border-b border-gray-200">
				<div className="flex items-center gap-2 mb-2">
					<p className="text-base font-bold text-[#212b36]">
						Product Images
					</p>
					<div>
						<span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[var(--primary-color-light)] text-black border border-[var(--primary-color)]">
							Recommended Size: 626×621 PX
						</span>
					</div>
				</div>
				<p className="text-sm text-gray-600 leading-relaxed">You can upload up to 5 additional images to showcase your product from different angles or perspectives.</p>
			</div>
			<div className="flex flex-wrap gap-4 px-8 pb-2 pt-4">
				<label
					htmlFor={`${id}-multi-upload`}
					className="w-[120px] h-[120px] flex items-center justify-center flex-col gap-2 border border-dashed border-[#e6eaed] text-sm rounded-md cursor-pointer hover:border-[var(--primary-color)] transition-all ease-in-out duration-300"
				>
					<IoCloudUploadOutline size={20} />
					<p className="font-semibold text-center">Upload Images</p>
				</label>
				<input
					id={`${id}-multi-upload`}
					type="file"
					className="hidden"
					multiple
					accept="image/png, image/jpeg, image/jpg"
					onChange={handleImageChange}
				/>

				{value.map((img, index) => {
					const src = img instanceof File ? URL.createObjectURL(img) : img;
					return (
						<div key={index} className="relative w-[120px] h-[120px]">
							<img
								src={src}
								alt={`Product image ${index + 1}`}
								aria-label={`Product image preview ${index + 1}`}
								className="w-full h-full object-cover rounded-lg border border-gray-300"
								onError={(e) => {
									e.currentTarget.src = "/images/fallback.png";
								}}
							/>
							<button
								onClick={() => removeImage(index)}
								className="absolute top-1 right-1 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
								aria-label={`Remove image ${index + 1}`}
							>
								<IoCloseSharp size={14} />
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default ProductMultipleImage;
