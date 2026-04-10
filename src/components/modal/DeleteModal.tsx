import { FiTrash2 } from "react-icons/fi";

interface DeleteModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	onClose: () => void;
	onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
	isOpen,
	title,
	message,
	onClose,
	onDelete
}) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-[#000000b6] bg-opacity-50 z-[9999] p-2">
			<div className="bg-white rounded-lg shadow-lg w-[400px] p-10 relative" role="dialog" aria-labelledby="delete-modal-title">
				<div className="flex flex-col items-center text-center">
					<div className="bg-[#ffe5e5] p-3 rounded-full">
						<FiTrash2 className="text-2xl text-red-600" />
					</div>
					<h2 id="delete-modal-title" className="text-lg font-semibold mt-3">{title}</h2>
					<p className="text-sm text-gray-600 mt-1">{message}</p>
				</div>
				<div className="flex justify-center gap-4 mt-6">
					<button onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition">
						Cancel
					</button>
					<button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
