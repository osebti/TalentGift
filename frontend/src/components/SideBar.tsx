//#region import
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// icons
import { BiLogOut } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
//#endregion

//#region types and interfaces
export interface Tab {
  icon: React.ReactElement;
  label: string;
  to: string;
}

interface SideBarProps {
  className?: string;
  id: string; // user id
  tabs: Tab[];
  path: string;
  logoutLabel: string;
}

interface TopSectionProps {
  isToggled: boolean;
  setIsToggled: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

interface LogOutProps {
  path: string;
  logoutLabel: string;
}
interface MenuItemProps {
  isToggled: boolean;
  id: string; // user id
  tabs: Tab[];
  path: string;
  logoutLabel: string;
}

//#endregion

//#region fragment components
/**
 * This renders a mobile sidebar
 * @param props Top Section Props
 * @returns a top section for mobile sidebar
 */
function TopSection(props: TopSectionProps) {
  const { isToggled, setIsToggled } = props;
  return (
    <div className="flex flex-row items-center mx-4 md:mx-8">
      <button
        className="text-2xl lg:hidden"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        <AiOutlineMenu />
      </button>

      <div className="flex w-full justify-center lg:justify-start">
        <Link
          to="/"
          className="font-[1000] text-darkPurple text-3xl bg-transparent border-0 "
        >
          TG
        </Link>
      </div>
    </div>
  );
}

/**
 * This renders a mobile logout button
 * @param props Logout Button Props
 * @returns a mobile logout button
 */
function LogoutButton(props: LogOutProps) {
  const { path, logoutLabel } = props;
  return (
    <Link className="mx-4 md:mx-8 lg:mx-0" to={path}>
      <div className="lg:hidden flex flex-row items-center text-lg gap-x-2 py-3 text-black hover:text-darkPurple transition ease-in-out">
        <span className="text-2xl">
          <BiLogOut />
        </span>
        <span>{logoutLabel}</span>
      </div>
    </Link>
  );
}

/**
 * This renders a desktop logout button
 * @param props Logout Button Props
 * @returns a desktop logout button
 */
function DesktopLogoutButton(props: LogOutProps) {
  const { path, logoutLabel } = props;
  return (
    <Link
      className="hidden lg:absolute lg:flex bottom-2 left-[1rem] md:left-[2rem] mx-4 md:mx-8 lg:mx-0"
      to={path}
    >
      <div className="flex flex-row items-center text-lg gap-x-2 py-3 text-black hover:text-darkPurple transition ease-in-out">
        <span className="text-2xl">
          <BiLogOut />
        </span>
        <span>{logoutLabel}</span>
      </div>
    </Link>
  );
}

/**
 * This renders a list of menu items
 * @param props Menu Items Props
 * @returns a list of menu items
 */
function MenuItems(props: MenuItemProps) {
  //#region props & animation variants
  const { isToggled, tabs, id, path, logoutLabel } = props;
  const navContainer = {
    visible: {
      opacity: 1,
      transition: {
        y: { velocity: 100 },
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        y: { velocity: 100 },
        duration: 0.3,
      },
    },
  };
  //#endregion

  return (
    <AnimatePresence>
      {/* Menu Items*/}
      {isToggled && (
        <motion.div
          className="flex flex-col gap-y-4"
          initial="hidden"
          animate={isToggled ? "visible" : "hidden"}
          transition={{ type: "spring" }}
          exit="hidden"
          variants={navContainer}
        >
          {tabs.map((elem: Tab, key: number) => {
            return (
              <NavLink
                tabIndex={key}
                to={elem.to}
                state={{ id: id }}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-darkPurple border-solid border-darkPurple border-l-4 border-r-4 lg:border-r-0 bg-secondaryTransparent"
                    : "opacity-70 hover:text-darkPurple transition ease-in-out"
                }
              >
                <div className="flex flex-row items-center text-lg gap-x-2 py-3 relative">
                  <span className="text-2xl ml-4 md:ml-8">{elem.icon}</span>
                  <span>{elem.label}</span>
                </div>
              </NavLink>
            );
          })}
          {/* Mobile Logout Button */}
          <LogoutButton path={path} logoutLabel={logoutLabel} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
//#endregion

/**
 * This renders a side bar
 * @param props Side Bar Props
 * @returns a sidebar
 */
export default function SideBar(props: SideBarProps) {
  //#region props & states
  const { className = "", logoutLabel, tabs, id, path } = props;
  const [isToggled, setIsToggled] = useState<boolean>(true);
  //#endregion

  //#region effects
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsToggled(true);
    });
  }, []);
  //#endregion

  return (
    <div
      className={twMerge(
        "flex flex-col gap-y-4 lg:gap-y-12 pt-4 relative border-r-2 lg:h-full",
        className
      )}
    >
      {/* Mobile Top Section */}
      <TopSection isToggled={isToggled} setIsToggled={setIsToggled} />
      <MenuItems
        isToggled={isToggled}
        tabs={tabs}
        path={path}
        id={id}
        logoutLabel={logoutLabel}
      />
      {/* Desktop Logout Button */}
      <DesktopLogoutButton path={path} logoutLabel={logoutLabel} />
    </div>
  );
}
