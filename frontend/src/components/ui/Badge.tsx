import React from "react";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-900 text-slate-50",
  secondary: "bg-slate-100 text-slate-900",
  destructive: "bg-red-500 text-slate-50",
  outline: "border border-slate-200 text-slate-900 bg-transparent",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <div className={styles} {...props}>
      {children}
    </div>
  );
};
