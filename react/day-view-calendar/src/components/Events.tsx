import type { CalendarEvent, LayoutEvent } from "../utils/eventLayout";
import { calculateEventLayout } from "../utils/eventLayout";

interface EventsProps {
  events: CalendarEvent[];
  slotHeight: number;
}

const Events: React.FC<EventsProps> = ({ events, slotHeight }) => {
  const layout: LayoutEvent[] = calculateEventLayout(events);

  return (
    <>
      {layout.map((event) => {
        const [startHourStr, startMinuteStr] = event.start.split(":");
        const [endHourStr, endMinuteStr] = event.end.split(":");
        const startHour = Number(startHourStr);
        const startMinute = Number(startMinuteStr);
        const endHour = Number(endHourStr);
        const endMinute = Number(endMinuteStr);

        const top =
          startHour * slotHeight + (startMinute / 60) * slotHeight;
        const height =
          (endHour - startHour) * slotHeight +
          ((endMinute - startMinute) / 60) * slotHeight;

        return (
          <div
            key={event.id}
            className="event"
            style={{
              top: `${top}rem`,
              height: `${height}rem`,
              width: `calc((100% - 6rem) / ${event.totalColumn})`,
              left: `calc(5rem + (100% - 6rem) / ${event.totalColumn} * ${event.column})`,
            }}
          >
            <div className="event-title">{event.title}</div>
            <div className="event-time">
              {event.start.slice(0, 5)} - {event.end.slice(0, 5)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Events;