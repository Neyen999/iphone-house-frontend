interface InputProps<T = string> {
  id: string;
  value: any;
  onFocus: (value: any) => void;
  onChange: (value: any) => void;
  type?: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox';
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  fields?: any[]
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
  fields
}: InputProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e);
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
          id="category"
          value={value}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="" disabled>Seleccionar Categoria</option>
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      }
    </div>
  );
};

export default Input;