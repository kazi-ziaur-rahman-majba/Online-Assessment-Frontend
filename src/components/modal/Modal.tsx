import { TiDelete } from "react-icons/ti";

interface ModalProps {
	isOpen: boolean;
	title: string;
	onClose: () => void;
	children: React.ReactNode;
	footerButtons?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children, footerButtons }) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#000000b6] z-52 top-0 right-0 left-0 bottom-0 p-2">
			<div className="bg-white rounded-lg shadow-lg w-[400px] p-6 flex flex-col">
				<div className="flex justify-between items-center pb-3">
					<h2 className="text-lg font-semibold">{title}</h2>
					<TiDelete className="text-3xl cursor-pointer text-red-500 hover:text-red-600" onClick={onClose} />
				</div>
				<div className="mt-4">{children}</div>
				{footerButtons && <div className="flex justify-end gap-3 mt-auto pt-4">{footerButtons}</div>}
			</div>
		</div>
	);
};

export default Modal;
