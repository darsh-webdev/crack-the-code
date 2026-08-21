import DayTimeSlots from "./DayTimeSlots";
import Events from "./Events";
import events from "../data/events.json"

const SLOT_HEIGHT_REM = 5;

const DayView: React.FC = () => {
  return (
    <div className="calendar">
      <div className="line"></div>
      <DayTimeSlots slotHeight={SLOT_HEIGHT_REM} />
      <Events events={events} slotHeight={SLOT_HEIGHT_REM} />
    </div>
  );
};

export default DayView;
