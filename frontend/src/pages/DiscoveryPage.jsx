import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent1 from "../components/FrameComponent1";
import ButtonDanger from "../components/ButtonDanger";
import ExploreWorkouts from "../components/ExploreWorkouts";

const DiscoverPage = () => {
  return (
    <div className="w-full relative [background:linear-gradient(180deg,_#000,_#202020)] overflow-hidden flex flex-col items-start justify-start pt-[26.9px] px-[57px] pb-[45.1px] box-border gap-[146.9px] leading-[normal] tracking-[normal] mq750:gap-[73px] mq750:pl-7 mq750:pr-7 mq750:box-border mq450:gap-[37px]">
      <img
        className="w-[1270.6px] relative rounded-[41px] max-h-full object-contain hidden max-w-full z-[0]"
        alt=""
        src="/navbar.svg"
      />
      <img
        className="w-[1462.5px] h-[528.7px] absolute !m-[0] top-[90.1px] left-[-65.3px] object-contain"
        alt=""
        src="/image@2x.png"
      />
      <FrameComponent2 />
      <main className="self-stretch flex flex-col items-start justify-start gap-10 max-w-full text-left text-21xl text-white font-single-line-body-base mq750:gap-5">
        <div className="w-[631px] flex flex-row items-start justify-start pt-0 px-7 pb-4 box-border max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start max-w-full">
            <FrameComponent1 />
            <ButtonDanger
              hasIconEnd={false}
              hasIconStart={false}
              label="Continue Exercise"
            />
          </div>
        </div>
        <ExploreWorkouts />
        <h2 className="m-0 w-[1199px] h-[62px] relative text-inherit font-bold font-[inherit] inline-block shrink-0 max-w-full mq1050:text-13xl mq450:text-5xl">
          Fast workout
        </h2>
        <section className="self-stretch flex flex-row items-center justify-center flex-wrap content-center py-0 px-[51px] box-border gap-x-[46px] gap-y-4 min-h-[414px] max-w-full lg:pl-[25px] lg:pr-[25px] lg:box-border">
          <div className="h-[184px] w-[360px] relative rounded-10xl bg-gainsboro max-w-full" />
          <div className="h-[184px] w-[360px] relative rounded-10xl bg-gainsboro max-w-full" />
          <div className="h-[184px] w-[360px] relative rounded-10xl bg-gainsboro max-w-full" />
          <div className="h-[184px] w-[360px] relative rounded-10xl bg-gainsboro max-w-full" />
          <div className="h-[184px] w-[360px] relative rounded-10xl bg-gainsboro max-w-full" />
          <div className="h-[184px] w-[360px] relative rounded-10xl bg-gainsboro max-w-full" />
        </section>
        <h2 className="m-0 self-stretch relative text-inherit font-bold font-[inherit] mq1050:text-13xl mq450:text-5xl">
          Pain Relief Workouts
        </h2>
        <section className="w-[1199px] flex flex-row items-center justify-center flex-wrap content-center py-0 px-[39px] box-border gap-x-[30px] gap-y-[18px] min-h-[362px] max-w-full">
          <div className="h-[166px] w-[360px] relative bg-gainsboro max-w-full" />
          <div className="h-[166px] w-[360px] relative bg-gainsboro max-w-full" />
          <div className="h-[166px] w-[353px] relative bg-gainsboro max-w-full" />
          <div className="h-[166px] w-[360px] relative bg-gainsboro max-w-full" />
          <div className="h-[166px] w-[360px] relative bg-gainsboro max-w-full" />
          <div className="h-[166px] w-[360px] relative bg-gainsboro max-w-full" />
        </section>
      </main>
    </div>
  );
};

export default DiscoverPage;
