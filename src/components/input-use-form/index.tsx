import React from 'react';
import { FloatingLabel } from 'flowbite-react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  rules?: object;
  defaultValue?: string | number;
  showError?: boolean;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  helperText?: string;
}

export const InputUseForm: React.FC<IProps> = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  rules = {},
  defaultValue,
  showError = true,
  onChange,
  disabled = false,
  helperText = '',
}) => {
  const { control, trigger } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => {
          const { error } = fieldState;
          return (
            <div>
              <FloatingLabel
                label={label}
                variant="outlined"
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                color={error ? 'error' : 'default'}
                disabled={disabled}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  trigger(name);
                  if (onChange) {
                    onChange(value);
                  }
                }}
                helperText={helperText && !error ? helperText : showError && error ? error.message : undefined}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
