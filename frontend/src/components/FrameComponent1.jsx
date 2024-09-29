import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-0 pl-[3px] pr-0 box-border max-w-full text-left text-41xl text-white font-single-line-body-base ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[3px] max-w-full">
        <h1 className="m-0 self-stretch h-[163px] relative text-inherit font-normal font-[inherit] inline-block shrink-0 z-[1] mq1050:text-29xl mq450:text-17xl">
          <p className="m-0">{`Help For Your `}</p>
          <p className="m-0">ideal body Fitness</p>
        </h1>
        <div className="w-[521px] h-[106px] relative text-6xl inline-block shrink-0 max-w-full z-[1] mq450:text-xl">
          Track your progress and stay motivated every step of the way.
        </div>
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
