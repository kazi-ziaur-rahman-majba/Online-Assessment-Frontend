import { FaSync } from "react-icons/fa";

interface RefreshButtonProps {
	onClick: () => void | Promise<void>;
	disabled?: boolean;
}

const RefreshButton = ({ onClick, disabled = false }: RefreshButtonProps) => {
	return (
		<button
			type="button" 
			onClick={onClick}
			disabled={disabled}
			className="bg-[var(--brand-primary-dark)] text-white text-sm cursor-pointer w-full sm:w-fit flex justify-center items-center gap-2 py-1.5 px-3 rounded-md transition-all ease-in duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
		>
			<FaSync size={12}/>
			<span>Refresh</span>
		</button>
	);
};

export default RefreshButton;
