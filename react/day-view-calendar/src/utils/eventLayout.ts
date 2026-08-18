export interface CalendarEvent {
  id: number;
  title: string;
  start: string; // Format: "HH:mm:ss"
  end: string; // Format: "HH:mm:ss"
}

export interface LayoutEvent extends CalendarEvent {
  column: number;
  totalColumn: number;
}

// Sort on the basis of start time, if same, end time basis

export const timeIntoMinutes = (time: string): number => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

const isOverlap = (event1: LayoutEvent, event2: CalendarEvent): boolean => {
  return timeIntoMinutes(event2.start) < timeIntoMinutes(event1.end);
};

export const calculateEventLayout = (
  events: CalendarEvent[],
): LayoutEvent[] => {
  const sortedEvents = [...events].sort((a, b) => {
    const start1 = timeIntoMinutes(a.start);
    const start2 = timeIntoMinutes(b.start);
    const diff = start1 - start2;
    if (diff !== 0) return diff;
    const end1 = timeIntoMinutes(a.end);
    const end2 = timeIntoMinutes(b.end);
    return end2 - end1;
  });

  const layout: LayoutEvent[] = [];

  for (const event of sortedEvents) {
    const overlaps = layout.filter((layoutEvent) =>
      isOverlap(layoutEvent, event),
    );
    const current: LayoutEvent = {
      ...event,
      column: overlaps.length,
      totalColumn: overlaps.length + 1,
    };
    overlaps.forEach(
      (layoutEvent) => (layoutEvent.totalColumn = current.totalColumn),
    );
    layout.push(current);
  }

  return layout;
};
