interface DayTimeSlotsProps {
  slotHeight: number;
}

const DayTimeSlots: React.FC<DayTimeSlotsProps> = ({ slotHeight }) => {
  const slots = Array.from({ length: 24 }, (_, index) => index);
  return (
    <>
      {slots.map((slot) => {
        const label = `${String(slot).padStart(2, "0")}:00`;
        return (
          <div
            key={slot}
            className="slot"
            style={{ height: `${slotHeight}rem` }}
          >
            <span className="time-label">{label}</span>
          </div>
        );
      })}
    </>
  );
};

export default DayTimeSlots;
