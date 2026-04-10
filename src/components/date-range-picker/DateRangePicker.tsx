import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";

interface DateRangePickerProps {
	onDateChange: (startDate: Date, endDate: Date) => void;
	initialStartDate?: Date;
	initialEndDate?: Date;
}

const DateRangePicker = ({ onDateChange, initialStartDate, initialEndDate }: DateRangePickerProps) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedRange, setSelectedRange] = useState({
		startDate: subDays(new Date(), 6),
		endDate: new Date(),
		label: "Last 7 Days",
	});

	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (initialStartDate && initialEndDate) {
			setSelectedRange({
				startDate: initialStartDate,
				endDate: initialEndDate,
				label: "Custom Range"
			});
		}
	}, [initialStartDate, initialEndDate]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const formatDate = (date: Date) => format(date, "MM/dd/yyyy");

	const dateRanges = [
		{ label: "Today", startDate: new Date(), endDate: new Date() },
		{ label: "Yesterday", startDate: subDays(new Date(), 1), endDate: subDays(new Date(), 1) },
		{ label: "Last 7 Days", startDate: subDays(new Date(), 6), endDate: new Date() },
		{ label: "Last 30 Days", startDate: subDays(new Date(), 29), endDate: new Date() },
		{ label: "This Month", startDate: startOfMonth(new Date()), endDate: new Date() },
		{ label: "Last Month", startDate: startOfMonth(subDays(new Date(), 30)), endDate: endOfMonth(subDays(new Date(), 30)) },
		// { label: "Custom Range", startDate: null, endDate: null },
	];

	const handleDateSelection = (range: { label: string; startDate: Date | null; endDate: Date | null }) => {
		if (range.startDate && range.endDate) {
			setSelectedRange({
				startDate: range.startDate,
				endDate: range.endDate,
				label: range.label,
			});

			onDateChange(range.startDate, range.endDate);
		} else {
			alert("Custom Range selection is not implemented yet.");
		}
		setShowDropdown(false);
	};

	return (
		<div className="relative w-fit" ref={dropdownRef}>
			<div
				className="flex items-center border border-gray-300 bg-white text-black rounded-md px-3 py-1.5 cursor-pointer"
				onClick={() => setShowDropdown(!showDropdown)}
				role="button"
				tabIndex={0}
				aria-expanded={showDropdown}
				aria-haspopup="true"
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setShowDropdown(!showDropdown);
					}
				}}
			>
				<FaCalendarAlt className="text-gray-500" />
				<span className="ml-2 text-gray-700 text-sm">
					{`${formatDate(selectedRange.startDate)} - ${formatDate(selectedRange.endDate)}`}
				</span>
			</div>

			{showDropdown && (
				<div
					className="absolute top-10 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-md z-50"
					role="listbox"
				>
					{dateRanges.map((range) => (
						<div
							key={range.label}
							className={`px-4 py-2 text-sm cursor-pointer ${range.startDate.toDateString() === selectedRange.startDate.toDateString() &&
									range.endDate.toDateString() === selectedRange.endDate.toDateString()
									? "bg-[#FE9F43] text-white font-semibold"
									: "text-gray-700 hover:bg-gray-100"
								}`}
							onClick={() => handleDateSelection(range)}
							role="option"
							aria-selected={range.label === selectedRange.label}
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleDateSelection(range);
								}
							}}
						>
							{range.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DateRangePicker;
