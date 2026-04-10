import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductImageSlider = ({ images }: { images: string[] }) => {
	const [current, setCurrent] = useState(0);

	if (!images || images.length === 0) {
		return (
			<div className="w-full h-64 bg-gray-100 flex items-center justify-center">
				No images available
			</div>
		);
	}

	const nextSlide = () => {
		setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	return (
		<div className="w-full">
			<div className="relative h-96">
				<img
					src={images[current]}
					alt={`Slide ${current}`}
					className="w-full h-full rounded transition-all duration-300"
				/>

				<button
					onClick={prevSlide}
					className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded-l cursor-pointer"
				>
					<IoIosArrowBack />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded-r cursor-pointer"
				>
					<IoIosArrowForward />
				</button>
			</div>

			<div className="mt-2 flex justify-center gap-2">
				{images.map((_, index) => (
					<div
						key={index}
						className={`w-2 h-2 rounded-full ${index === current ? "bg-[var(--color-green-primary)]" : "bg-gray-300"
							}`}
					></div>
				))}
			</div>
		</div>
	);
};

export default ProductImageSlider;
