import { twMerge } from "tailwind-merge";

interface PageTitleProps {
  id: string;
  title: string;
  style?: string;
}

const Title = (props: PageTitleProps) => {
    const { id, title, style } = props;
    return (
      <div
        id={`${id}-page-title`}
        data-testid={`${id}-page-title`}
        className={twMerge(
          "w-full font-semibold text-2xl md:text-3xl lg:text-4xl text-black",
          style
        )}
        >
        {title}
      </div>
      );
};

export default Title;