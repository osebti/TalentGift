interface AlertProps {
  message: string;
  icon: string;
  status: string; // success, warning, or error
}

const Alert = (props: AlertProps) => {
  const { message, icon, status } = props;
  const alertVariants: { [key: string]: string } = {
    success: "alert alert-success w-3/4",
    warning: "alert alert-warning w-3/4",
    error: "alert alert-error w-3/4",
  };

  const alertVariant = alertVariants[status];

  // Referenced: https://daisyui.com/components/alert/
  // License: MIT License
  return (
    <div className={alertVariant}>
      <img src={icon} alt="Status Icon" className="w-5"></img>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
