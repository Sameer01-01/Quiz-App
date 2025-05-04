import React from "react";

interface RadioGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({ children, className = "" }: RadioGroupProps) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function RadioGroupItem({ 
  value, 
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
        value={value}
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