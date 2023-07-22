import React from "react";

interface FormFieldProps {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
}

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: FormFieldProps) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;