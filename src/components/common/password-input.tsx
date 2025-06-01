import { EyeClosed, EyeIcon } from 'lucide-react';
import FormInput from './form-input';
import { useState } from 'react';

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  isAsterisk?: boolean;
}

export const PasswordField = ({ name, label, placeholder, isAsterisk }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <FormInput
        name={name}
        label={label}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        isAsterisk={isAsterisk}
      />
      {showPassword ? (
        <EyeIcon
          className="absolute top-9 right-4 size-5 cursor-pointer text-neutral-500"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <EyeClosed
          className="absolute top-9 right-4 size-5 cursor-pointer text-neutral-500"
          onClick={() => setShowPassword(true)}
        />
      )}
    </div>
  );
};
