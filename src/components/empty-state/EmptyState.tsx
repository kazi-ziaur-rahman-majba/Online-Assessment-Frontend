import React from 'react';
import Button from '../button/Button';
import { MdHourglassEmpty } from 'react-icons/md';
import { FaBoxOpen } from 'react-icons/fa';

interface EmptyStateProps {
    title: string;
    description?: string;
    image?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    image = "/empty-box.svg",
    buttonText,
    onButtonClick
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            {/* <img src={image} alt="No Data" className="w-40 h-40" /> */}
            <FaBoxOpen className='border border-[var(--primary-color)] rounded-full bg-[var(--primary-color-light)] w-20 h-20 p-4 text-[var(--primary-color)] mb-4' />
            {title && (
                <p className="font-semibold text-lg">{title}</p>
            )}
            {description && (
                <p className="text-gray-600 text-sm">{description}</p>
            )}
            {buttonText && onButtonClick && (
                <div className='mt-2'>
                    <Button
                        label={buttonText}
                        onClick={onButtonClick}
                        color="var(--color-primary)"
                        hoverColor="var(--color-primary-hover)"
                    />
                </div>
            )}
        </div>
    );
};

export default EmptyState;
