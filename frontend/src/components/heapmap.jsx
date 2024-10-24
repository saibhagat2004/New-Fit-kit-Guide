import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../../src/Heatmap.css'; // Optional for additional custom styles

const Heatmap = () => {
  // Example data, you can customize it according to your needs
  const today = new Date();
  const values = [
    { date: '2024-07-27', count: 1 },
    { date: '2024-07-28', count: 4 },
    { date: '2024-09-29', count: 2 },
    { date: '2024-09-30', count: 5 },
    { date: '2024-10-01', count: 3 },
    { date: '2024-5-04', count: 3 },
    { date: '2024-6-03', count: 3 },
    { date: '2024-5-028', count: 3 },
    { date: '2024-5-029', count: 3 },
    { date: '2024-8-03', count: 3 },
    { date: '2024-8-05', count: 3 },
    { date: '2024-8-06', count: 5 },
    // Add more data as needed
  ];

  return (
    <div className="heatmap-container mb-6">
      <h2 className="text-xl font-bold mb-4">Activity Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date(today.getFullYear(), today.getMonth() - 11, 1)}
        endDate={today}
        values={values}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': value.date
              ? `${value.date} has count: ${value.count}`
              : 'No contributions',
          };
        }}
        showWeekdayLabels={true}
      />
      {/* You can use 'react-tooltip' for better tooltips if needed */}
    </div>
  );
};

export default Heatmap;


