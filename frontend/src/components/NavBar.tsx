import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

// components
import Button from "./Button";

interface NavBarProps {
  className?: string;
  hideButton: boolean;
}

const NavBar = (props: NavBarProps) => {
  const { className = "", hideButton = false } = props;
  return (
    <div className={twMerge(className, "flex justify-between items-center")}>
      <Link
        to="/"
        className="font-[1000] text-darkPurple text-3xl bg-transparent border-0"
      >
        TG
      </Link>
      <div className={twMerge("flex gap-x-4", hideButton ? "hidden" : "")}>
        <Button
          id="Sign In"
          label="Sign In"
          href="/sign-in"
          navigate
          style="btn-accent btn-sm md:btn-md px-4 md:px-8"
        />

        <Button
          id="Sign Up"
          label="Sign Up"
          href="/sign-up"
          navigate
          style="btn-primary btn-sm md:btn-md px-4 md:px-8"
        />
      </div>
    </div>
  );
};

export default NavBar;
