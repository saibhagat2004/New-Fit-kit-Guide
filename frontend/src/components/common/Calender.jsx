// import  { useState, useEffect } from "react";
// import { format, getDaysInMonth, isToday, parse, isSameDay } from "date-fns";
// import classNames from "classnames";

// const Calendar = ({ exerciseDates }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [daysInMonth, setDaysInMonth] = useState([]);

//   useEffect(() => {
//     const days = getDaysInMonth(currentDate);
//     const dates = Array.from({ length: days }, (_, i) =>
//       parse(`${i + 1}`, "d", currentDate)
//     );
//     setDaysInMonth(dates);
//   }, [currentDate]);

//   const handlePreviousMonth = () => {
//     setCurrentDate((prevDate) =>
//       parse(format(prevDate, "yyyy-MM-01"), "yyyy-MM-dd", prevDate).setMonth(
//         prevDate.getMonth() - 1
//       )
//     );
//   };

//   const handleNextMonth = () => {
//     setCurrentDate((prevDate) =>
//       parse(format(prevDate, "yyyy-MM-01"), "yyyy-MM-dd", prevDate).setMonth(
//         prevDate.getMonth() + 1
//       )
//     );
//   };

//   const isExerciseDone = (day) =>
//     exerciseDates.some((exerciseDate) =>
//       isSameDay(parse(exerciseDate, "yyyy-MM-dd", new Date()), day)
//     );

//   return (
//     <div className="p-4 w-80 mx-auto bg-gray-800 text-white rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <button
//           className="text-gray-400 hover:text-white"
//         //   onClick={handlePreviousMonth}
//         >
//           &lt;
//         </button>
//         <h2 className="text-lg">
//           {format(currentDate, "MMMM yyyy")}
//         </h2>
//         <button
//           className="text-gray-400 hover:text-white"
//         //   onClick={handleNextMonth}
//         >
//           &gt;
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-2">
//         {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, idx) => (
//           <div key={idx} className="text-center font-bold">
//             {day}
//           </div>
//         ))}

//         {daysInMonth.map((day, idx) => (
//           <div key={idx} className="text-center">
//             <button
//               className={classNames(
//                 "w-10 h-10 rounded-full",
//                 {
//                   "bg-blue-500 text-white": isToday(day),
//                   "bg-orange-500 text-white": isExerciseDone(day),
//                   "hover:bg-gray-700": !isToday(day) && !isExerciseDone(day),
//                 },
//                 "flex items-center justify-center"
//               )}
//             >
//               {format(day, "d")}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;


import { useState, useEffect } from "react";
import { format, getDaysInMonth, isToday, parse, isSameDay, startOfDay } from "date-fns";
import classNames from "classnames";

const Calendar = ({ exerciseDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const days = getDaysInMonth(currentDate);
    const dates = Array.from({ length: days }, (_, i) =>
      startOfDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1))
    );
    setDaysInMonth(dates);
  }, [currentDate]);

  const isExerciseDone = (day) =>
    exerciseDates.some((exerciseDate) =>
      isSameDay(parse(exerciseDate, "yyyy-MM-dd", new Date()), day)
    );

  return (
    <div className="p-4 w-80 mx-auto bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)))}
        >
          &lt;
        </button>
        <h2 className="text-lg">{format(currentDate, "MMMM yyyy")}</h2>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)))}
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, idx) => (
          <div key={idx} className="text-center font-bold">{day}</div>
        ))}

        {daysInMonth.map((day, idx) => (
          <div key={idx} className="text-center">
            <button
              className={classNames(
                "w-10 h-10 rounded-full",
                {
                  "bg-blue-500 text-white": isToday(day),
                  "bg-orange-500 text-white": isExerciseDone(day),
                  "hover:bg-gray-700": !isToday(day) && !isExerciseDone(day),
                },
                "flex items-center justify-center"
              )}
            >
              {format(day, "d")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
