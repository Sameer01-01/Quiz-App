import React, { HTMLAttributes } from "react";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>;
};

interface FormFieldProps {
  name: string;
  render: () => React.ReactNode;
}

export const FormField = ({ render }: FormFieldProps) => {
  return <>{render()}</>;
};

interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormItem = ({ children, className = "", ...props }: FormItemProps) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormControl = ({ children, className = "", ...props }: FormControlProps) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}; 