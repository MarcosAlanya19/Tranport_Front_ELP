import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { Label, HelperText } from 'flowbite-react';

export interface IOption {
  value: string;
  label: string;
}

interface IProps {
  name: string;
  placeholder: string;
  options: IOption[];
  rules?: object;
  defaultValue?: IOption[];
  showError?: boolean;
  onChange?: (value: IOption) => void;
  disabled?: boolean;
  helperText?: string;
  label?: string;
}

export const SelectUseForm: React.FC<IProps> = ({
  name,
  label,
  placeholder,
  options,
  rules = {},
  defaultValue = null,
  showError = true,
  onChange,
  disabled = false,
  helperText = '',
}) => {
  const { control, trigger } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => {
          const { error } = fieldState;

          return (
            <div>
              {label && (
                <div className='mb-2'>
                  <Label htmlFor={name} value={label} />
                </div>
              )}
              <Select
                {...field}
                id={name}
                options={options}
                value={options.find((option) => option.value === field.value)}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  trigger(name);

                  if (onChange && selectedOption) {
                    onChange(selectedOption);
                  }
                }}
                defaultValue={defaultValue}
                placeholder={placeholder}
                isDisabled={disabled}
                isClearable
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: '0.5rem',
                    borderColor: state.isFocused
                      ? 'rgb(59 130 246)'
                      : error
                      ? 'rgb(248 113 113)'
                      : 'rgb(209 213 219)',
                  }),
                  menu: (base) => ({
                    ...base,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? 'rgb(59 130 246)'
                      : state.isFocused
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'transparent',
                    color: state.isSelected ? 'white' : 'black',
                    borderRadius: '0.5rem',
                  }),
                }}
              />
              {helperText && !error && <HelperText>{helperText}</HelperText>}
              {showError && error && (
                <HelperText color='failure' className='text-red-500'>
                  {error.message}
                </HelperText>
              )}
            </div>
          );
        }}
      />
    </>
  );
};
