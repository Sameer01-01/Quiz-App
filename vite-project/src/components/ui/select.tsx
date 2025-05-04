import React, { useRef, useEffect } from "react";

interface SelectProps {
  children: React.ReactNode;
  className?: string;
}

export const Select = ({ children, className = "" }: SelectProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Close dropdown if needed
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
    </div>
  );
};

interface SelectTriggerProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const SelectTrigger = ({ children, className = "", onClick }: SelectTriggerProps) => {
  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
    >
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
};

interface SelectContentProps {
  children?: React.ReactNode;
  className?: string;
}

export const SelectContent = ({ children, className = "" }: SelectContentProps) => {
  return (
    <div className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 mt-1 w-full ${className}`}>
      <div className="p-1">
        {children}
      </div>
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SelectItem = ({ value, children, className = "", onClick }: SelectItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      </span>
      <span>{children}</span>
    </div>
  );
};

interface SelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
}

export const SelectValue = ({ placeholder, children }: SelectValueProps) => {
  return <span>{children || placeholder}</span>;
}; 