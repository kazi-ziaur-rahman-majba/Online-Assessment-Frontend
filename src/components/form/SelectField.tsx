import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    label: string;
    value: Option | null;
    options: Option[];
    onChange: (selected: Option) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    showTop?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, value, options, onChange, placeholder = "Choose", required, disabled = false, showTop = false }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(value);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setSelectedOption(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        onChange(option);
        setOpenDropdown(false);
        setSearchTerm("");
    };

    const filteredOptions = options.filter((option) => option.label && option.label.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

    return (
        <div className="flex flex-col items-center w-full">
            <div ref={dropdownRef} className="relative w-full">
                <label className="text-sm font-medium text-[#212b36] block mb-1">
                    {label}
                    {required && <span className="text-red-600 ml-1">*</span>}
                </label>

                <div
                    className={`border p-2 sm:p-3 h-[38px] rounded-lg cursor-pointer bg-white flex justify-between items-center w-full text-black transition-all duration-300 text-sm px-2 py-2 active:bg-gray-50 touch-manipulation ${openDropdown ? "border-[var(--primary-color)] ring-[var(--primary-color)]" : "border-gray-200"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => !disabled && setOpenDropdown(!openDropdown)}
                >
                    <span className={`truncate ${selectedOption ? 'text-black' : 'text-gray-400 text-sm'}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <RiArrowDropDownLine className={`text-gray-500 text-lg flex-shrink-0 transition-transform duration-200 ${openDropdown ? 'rotate-180' : ''}`} />
                </div>

                {openDropdown && (
                    <div className={`absolute w-full ${showTop ? 'bottom-[60%] mt-0' : 'mt-1'} bg-white border border-gray-300 rounded-t-lg z-10 max-w-full`}>
                        <div className="p-1 sm:p-2 border-b border-gray-300">
                            <input
                                type="text"
                                placeholder=""
                                className="w-full h-8 sm:h-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] px-2 py-1 text-sm appearance-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="text-gray-600 p-1 sm:p-2 font-semibold text-xs sm:text-sm">Select</div>

                        <ul className="max-h-36 sm:max-h-48 overflow-y-auto w-full">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className={`p-1 sm:p-2 hover:bg-[var(--primary-color)] hover:text-white active:bg-[var(--primary-color-light)] active:text-white focus:bg-[var(--primary-color)] focus:text-white cursor-pointer w-full text-sm truncate transition-colors duration-150 touch-manipulation ${selectedOption && selectedOption.value === option.value
                                            ? "bg-[var(--primary-color-light)] text-[var(--primary-color)] font-medium"
                                            : "text-black"
                                            }`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {option.label}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 sm:p-3 text-gray-500 w-full text-sm">No results found</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInput;
