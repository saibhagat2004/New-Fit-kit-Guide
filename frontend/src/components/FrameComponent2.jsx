import PropTypes from "prop-types";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <div
      className={`w-[1175px] flex flex-row items-start justify-start py-0 px-[42px] box-border max-w-full lg:pl-[21px] lg:pr-[21px] lg:box-border ${className}`}
    >
      <header className="flex-1 flex flex-row items-start justify-between gap-5 max-w-full text-center text-6xl text-white font-single-line-body-base">
        <div className="w-[150px] flex flex-col items-start justify-start pt-[26px] px-0 pb-0 box-border">
          <a className="[text-decoration:none] self-stretch relative font-bold text-[inherit] whitespace-nowrap">
            Fit Kit Guide
          </a>
        </div>
        <div className="w-[534px] flex flex-col items-start justify-start pt-[18.2px] pb-0 pl-0 pr-[37px] box-border max-w-full mq750:w-[37px]">
          <nav className="m-0 self-stretch flex flex-row items-start justify-start gap-[46px] text-center text-5xl text-primary font-single-line-body-base mq750:hidden mq750:gap-[23px]">
            <a className="[text-decoration:none] h-[45px] flex-1 relative text-[inherit] whitespace-nowrap inline-block">
              {" "}
              Traning
            </a>
            <a className="[text-decoration:none] h-[45px] flex-1 relative text-[inherit] inline-block">
              <p className="m-0">Discover</p>
            </a>
            <a className="[text-decoration:none] h-[45px] flex-1 relative text-[inherit] inline-block">
              <p className="m-0">Report</p>
            </a>
          </nav>
        </div>
        <div className="h-[64.1px] w-[70px] relative">
          <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-primary w-full h-full z-[1]" />
          <img
            className="absolute top-[16.1px] left-[11px] w-[59px] h-12 overflow-hidden z-[2]"
            loading="lazy"
            alt=""
            src="/user.svg"
          />
        </div>
      </header>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
