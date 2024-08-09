import { ComponentProps } from "react";
import { cn } from "../utils/cn";

interface Props extends ComponentProps<"span"> {}

export default function CardProgressContainer({ className, ...rest }: Props) {
  return (
    <span
      className={cn(
        "relative w-14 h-1.5 bg-slate-500 rounded-md cursor-pointer duration-300 hover:h-2.5",
        className
      )}
      {...rest}
    />
  );
}
