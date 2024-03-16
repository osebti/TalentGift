import { twMerge } from "tailwind-merge";

interface ChartTitleProps {
  id: string;
  title: string;
  style?: string;
}

const Title = (props: ChartTitleProps) => {
    const { id, title, style } = props;
    return (
      <div
        id={`${id}-chart-title`}
        data-testid={`${id}-chart-title`}
        className={twMerge(
          "w-full font-semibold text-lg md:text-xl lg:text-2xl text-darkPurple",
          style
        )}
        >
        {title}
      </div>
    );
};

export default Title;