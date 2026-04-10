import React from 'react';

interface ToggleInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  disabled?: boolean;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
}) => {
  const handleSwitchChange = () => {
    onChange(!checked);
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleSwitchChange}
          className="sr-only peer"
          disabled={disabled}
        />
        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--color-primary)]">
          <div
            className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-all ${
              checked ? 'translate-x-5' : ''
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default ToggleInput;
