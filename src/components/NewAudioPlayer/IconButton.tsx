import React from "react";
import cn from "classnames";

type Intent = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  intent?: Intent; // can add more
  size?: Size;
}

const colorMap: Record<Intent, string> = {
  // primary: 'bg-amber-600 text-white',
  // secondary: 'bg-slate-800 text-slate-400',
  primary: "bg-red-600 text-white",
  secondary: "bg-slate-800 text-slate-400",
};

const sizeMap: Record<Size, string> = {
  // sm: 'h-8 w-8',
  // md: 'h-10 w-10',
  // lg: 'h-12 w-12',
  sm: "h-6 w-6",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

export default function IconButton({
  intent = "primary",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  const colorClass = colorMap[intent];
  const sizeClass = sizeMap[size];
  const classes = cn(
    "rounded-full flex items-center justify-center ring-offset-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-60",
    // 'rounded-full flex items-center justify-center ring-offset-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 disabled:opacity-60',
    colorClass,
    sizeClass,
    className
  );
  return <button className={classes} {...props} />;
}
