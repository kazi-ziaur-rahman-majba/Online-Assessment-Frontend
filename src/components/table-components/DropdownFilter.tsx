import React, { useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface OptionType { label: string; value: string; }

interface DropdownFilterProps {
	title: string;
	options: OptionType[];
	selectedOption: OptionType | null;
	onSelect: (option: OptionType) => void;
	isOpen: boolean;
	onToggle: () => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
	title,
	options,
	selectedOption,
	onSelect,
	isOpen,
	onToggle,
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				if (isOpen) onToggle();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, onToggle]);

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			{/* Trigger */}
			<div
				className={`border border-gray-200 px-3 rounded-md cursor-pointer inline-flex justify-between items-center gap-1 h-[38px] text-[13px] w-full sm:w-fit
          ${isOpen ? "bg-[var(--color-primary)] text-white" : "hover:bg-[var(--color-primary)] hover:text-white transition-all ease-in duration-300"}`}
				onClick={onToggle}
				role="button"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className="truncate max-w-[16ch]">
					{selectedOption ? selectedOption.label : title}
				</span>
				<RiArrowDropDownLine size={20} />
			</div>

			{isOpen && (
				<div
					className="absolute top-full right-0 mt-1 min-w-full w-max whitespace-nowrap
						   bg-white border border-gray-200 rounded-md shadow-lg z-50
						   max-h-60 overflow-auto dropdownScrollbar p-2"
					role="listbox"
				>
					<ul className="space-y-1">
						{options.map((option) => {
							const selected = selectedOption?.value === option.value;
							return (
								<li key={option.value}>
									<button
										type="button"
										onClick={() => onSelect(option)}
										role="option"
										aria-selected={selected}
										className={`w-full text-left text-sm px-2 py-2 rounded-md cursor-pointer
									  ${selected
												? "text-[var(--color-primary)] font-semibold bg-[var(--color-primary-light)]"
												: "hover:bg-[var(--color-primary-light)]"}`}
									>
										{option.label}
									</button>
								</li>
							);
						})}
					</ul>
				</div>

			)}
		</div>
	);
};

export default DropdownFilter;
