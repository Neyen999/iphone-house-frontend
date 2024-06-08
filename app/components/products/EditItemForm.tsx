"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Input from "../input/Input";

interface EditItemFormProps {
  item: any;
  fields: { id: string; label: string; type: string; options?: any[] }[];
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const EditItemForm = ({ item, fields, onClose, onSubmit }: EditItemFormProps) => {
  const [formData, setFormData] = useState({ ...item });
  const [hasChangedAField, setHasChangeAField] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let newValue: any = value;
    
    // Check the field type and convert value if necessary
    const field = fields.find(f => f.id === id);
    if (field?.type === 'number') {
      newValue = parseFloat(value);
    }


    if (!hasChangedAField) {
      setHasChangeAField(true);
    }
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [id]: resolveValue(id, newValue) || newValue ,
    }));
  };

  const resolveValue = (id: string, incomingValue: any) => {
    const fieldWithOptions = fields.filter((field) => field.options != null)[0];
    if (id === 'category') {
      console.log("Here")
      const category = fieldWithOptions.options?.filter((prop) => prop.name === incomingValue)[0];
      // console.log(category)
      return category;
    }
    // console.log(typeof incomingValue)
    return incomingValue;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Editar Elemento</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="mb-4">
              <Input
                id={field.id}
                // value={formData[field.id]?.name || ""}
                // value={formData[field.id] || ""}
                value={field.id === 'category' ? formData[field.id]?.name : formData[field.id]}
                onChange={handleChange}
                placeholder={`Ingrese un ${field.label}`}
                type={field.type}
                label={field.label}
                required
                fields={field.options?.map(opt => opt.name)}
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!hasChangedAField}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemForm;
