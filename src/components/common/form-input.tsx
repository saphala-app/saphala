/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Copy, AlertCircle } from 'lucide-react';
import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import InfoTooltip from './info-tooltip';

interface FormInputProps {
  name: string;
  type?: string;
  label?: string;
  itemLabel?: string;
  placeholder?: string;
  info?: string;
  onInputChange?: (...event: any) => void;
  description?: React.ReactNode | string;
  isAsterisk?: boolean;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  showError?: boolean;
  enableCopyText?: boolean;
  [key: string]: any;
}

const FormInput: React.FC<FormInputProps> = memo(
  ({
    name,
    type = 'text',
    label = '',
    placeholder = '',
    info = '',
    onInputChange = () => {},
    description,
    isAsterisk = false,
    className = '',
    containerClassName = '',
    disabled = false,
    showError = true,
    enableCopyText = false,
    ...rest
  }) => {
    const { control } = useFormContext();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          const { value, onChange } = field;

          return (
            <FormItem aria-disabled={disabled} className={`w-full ${containerClassName}`}>
              {label && (
                <FormLabel htmlFor={name}>
                  <div className="flex flex-row items-center">
                    <p className="text-small mr-[4px] font-medium">
                      {label} {isAsterisk && <span className="text-red-500">*</span>}
                    </p>
                    {info && (
                      <div className="flex rounded-full bg-neutral-700 p-0 text-white">
                        <InfoTooltip info={info} />
                      </div>
                    )}
                  </div>
                </FormLabel>
              )}
              <FormControl>
                <div className="relative">
                  <Input
                    type={type}
                    placeholder={placeholder}
                    id={name}
                    {...field}
                    {...rest}
                    value={value}
                    onChange={e => {
                      onChange(e);
                      onInputChange(e.target.value);
                    }}
                    disabled={disabled}
                    className={`${className} placeholder:text-gray-light h-12 tracking-wider`}
                  />

                  {enableCopyText && (
                    <button
                      className="absolute inset-y-0 right-5 flex cursor-pointer items-center space-x-1"
                      onClick={e => {
                        e.preventDefault();
                        navigator.clipboard.writeText(value);
                      }}
                    >
                      <Copy size={16} className="text-muted-foreground" />
                    </button>
                  )}
                </div>
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              {showError && (
                <>
                  {error && (
                    <div className="flex items-center gap-x-1">
                      <AlertCircle className="text-destructive h-4 w-4" />
                      <FormMessage />
                    </div>
                  )}
                </>
              )}
            </FormItem>
          );
        }}
      />
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
