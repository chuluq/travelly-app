import { cn } from "@/lib/utils";

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export const PageTitle = ({ title, className, ...props }: PageTitleProps) => {
  return (
    <h1
      className={cn(
        "font-semibold text-xl lg:text-2xl xl:text-[28px]",
        className
      )}
      {...props}
    >
      {title}
    </h1>
  );
};
