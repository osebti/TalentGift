import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  icon?: JSX.Element | null;
  id: string;
  href?: string | "";
  onClick?: () => void;
  navigate?: boolean;
  style?: string;
  capitalize?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    label = "",
    icon = null,
    id = "",
    href = "",
    onClick = () => {},
    navigate = false,
    style = "",
    capitalize = true,
  } = props;

  const capitalizeLabel = capitalize ? 'capitalize' : 'normal-case';
  return (
    <>
      {navigate ? (
        <Link
          to={href}
          id={`${id}-button`}
          data-testid={`${id}-button`}
          onClick={onClick}
          className={twMerge(
            `btn btn-md rounded-full ${capitalizeLabel} font-normal text-white text-sm md:text-base`,
            style
          )}
        >
          {icon != null 
            ? icon 
            : label}
        </Link>
      ) : (
        <button
          onClick={onClick}
          id={`${id}-button`}
          data-testid={`${id}-button`}
          className={twMerge(
            `btn btn-md rounded-full ${capitalizeLabel} font-normal text-white text-sm md:text-base`,
            style
          )}
        >
          {icon != null 
            ? icon 
            : label}
        </button>
      )}
    </>
  );
};

export default Button;
