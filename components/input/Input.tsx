import { useEffect, useState } from "react";

interface InputProps<T = string> {
  id?: string;
  value: any;
  onFocus?: (value: any) => void;
  onChange?: (value: any) => void;
  type?: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  fields?: any[];
  error?: string
}

const Input = <T extends string | number>({
  id,
  value,
  onFocus,
  onChange,
  type = 'text',
  placeholder,
  label,
  disabled = false,
  required = false,
  fields,
  error
}: InputProps<T>) => {
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    setLocalError(error || '');
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (onChange !== undefined) {
      const sanitizedValue = type === 'email' || type === 'password' ? e.target.value.replace(/\s+/g, '') : e.target.value; // Eliminar espacios solo si es tipo email
      onChange({ ...e, target: { ...e.target, value: sanitizedValue } });
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      {type === "select" ? 
        <select
          id={id}
          value={value}
          onChange={handleChange}
          required
          disabled={disabled}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${
            localError ? 'border-red-500' : ''
          }`}>          
          <option value="" disabled>
            {placeholder}
          </option>
          {fields?.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      :
      <input
        type={type}
        id={id}
        value={value}
        onFocus={onFocus}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          localError ? 'border-red-500' : ''
        } ${disabled && 'opacity-50'}`}
      />
  }
      {localError && (
        <p className="text-red-500 text-xs italic mt-2">{localError}</p>
      )}
    </div>
  );
};

export default Input;