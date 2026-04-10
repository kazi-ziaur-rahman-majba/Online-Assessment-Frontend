import React, { ChangeEvent } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  inputClass?: string;
  required?: boolean;
  readOnly?: boolean;
  message?: string;
  wrapperClass?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onChange?: ((value: string) => void) | ((event: ChangeEvent<HTMLInputElement>) => void);
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value = "",
  name,
  type = "text",
  inputClass = "",
  required = false,
  readOnly = false,
  message,
  wrapperClass = "",
  icon,
  disabled = false,
  placeholder = "",
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {

      if (onChange.length === 1 && typeof (onChange as any).toString() === 'function') {
        (onChange as (value: string) => void)(e.target.value);
      } else {
        (onChange as (event: ChangeEvent<HTMLInputElement>) => void)(e);
      }
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-[#212b36] block mb-1">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}

      <div
        className={`flex items-center w-full transition-all duration-300 border rounded-lg px-2 h-[38px]
          ${message ? "border-red-500" : "border-gray-200"}
          bg-white text-black text-sm focus-within:ring-1 focus-within:ring-[var(--primary-color)]
          ${wrapperClass}`}
      >
        {icon && <div className="pr-2">{icon}</div>}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          onChange={handleChange}
          className={`w-full focus:outline-none placeholder:text-sm px-1.5 text-sm
            ${inputClass}
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-text"}
          `}
        />
      </div>

      {message && <p className="text-xs text-red-500 mt-1">{message}</p>}
    </div>
  );
};

export default InputField;
