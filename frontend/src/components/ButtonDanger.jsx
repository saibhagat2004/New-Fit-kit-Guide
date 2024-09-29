import PropTypes from "prop-types";

const ButtonDanger = ({
  className = "",
  hasIconEnd = false,
  hasIconStart = false,
  label = "Continue Exercise",
}) => {
  return (
    <div
      className={`rounded-radius-200 bg-primary border-border-danger-secondary border-[1px] border-solid overflow-hidden flex flex-row items-start justify-start py-[17px] px-7 gap-space-200 z-[1] text-left text-base text-text-danger-on-danger font-single-line-body-base ${className}`}
    >
      {hasIconStart && (
        <img
          className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
          alt=""
          src="/star.svg"
        />
      )}
      <b className="relative leading-[100%]">{label}</b>
      {hasIconEnd && (
        <img
          className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
          alt=""
          src="/x.svg"
        />
      )}
    </div>
  );
};

ButtonDanger.propTypes = {
  className: PropTypes.string,
  hasIconEnd: PropTypes.bool,
  hasIconStart: PropTypes.bool,
  label: PropTypes.string,
};

export default ButtonDanger;
