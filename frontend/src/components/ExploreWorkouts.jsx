import PropTypes from "prop-types";

const ExploreWorkouts = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-col items-start justify-start py-0 px-[49px] box-border gap-4 max-w-full text-left text-26xl text-white font-single-line-body-base lg:pl-6 lg:pr-6 lg:box-border ${className}`}
    >
      <div className="w-[1024px] flex flex-row items-start justify-end max-w-full">
        <h2 className="m-0 h-[68px] w-[928px] relative text-inherit font-bold font-[inherit] inline-block shrink-0 max-w-full mq1050:text-17xl mq450:text-8xl">
          Explore our handpicked workout Plans.
        </h2>
      </div>
      <div className="self-stretch grid flex-row items-start justify-start gap-5 max-w-full grid-cols-[repeat(3,_minmax(270px,_1fr))] text-6xl mq750:grid-cols-[minmax(270px,_1fr)] mq1050:justify-center mq1050:grid-cols-[repeat(2,_minmax(270px,_468px))]">
        <div className="flex flex-col items-start justify-end pt-[165.6px] px-[13px] pb-[20.4px] box-border relative gap-3 max-w-full">
          <img
            className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-3xl max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/image-1@2x.png"
          />
          <b className="w-[295px] h-9 relative inline-block shrink-0 max-w-[89%] z-[1] mq450:text-xl">
            Lose fat (No Jumping!)
          </b>
          <b className="w-[235px] h-[31px] relative text-mini inline-block shrink-0 max-w-[71%] z-[1]">
            15 min. Intermediate
          </b>
        </div>
        <img
          className="relative rounded-3xl max-w-full overflow-hidden max-h-full object-cover min-h-[265px] mq750:w-full"
          alt=""
          src="/image-2@2x.png"
        />
        <img
          className="relative rounded-3xl max-w-full overflow-hidden max-h-full object-cover min-h-[265px] mq750:w-full"
          alt=""
          src="/image-1@2x.png"
        />
      </div>
    </section>
  );
};

ExploreWorkouts.propTypes = {
  className: PropTypes.string,
};

export default ExploreWorkouts;
