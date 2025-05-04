import { ReactNode } from 'react';

interface RadioGroupProps {
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ children, className = "" }: RadioGroupProps) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

interface RadioGroupItemProps {
  id: string;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
  children?: ReactNode;
}

export function RadioGroupItem({ 
  id, 
  checked, 
  onChange, 
  className = "",
  children 
}: RadioGroupItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary ${className}`}
      />
      {children && (
        <label 
          htmlFor={id} 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          onClick={onChange}
        >
          {children}
        </label>
      )}
    </div>
  );
} 