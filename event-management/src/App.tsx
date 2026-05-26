import { useState } from "react";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [validationError, setValidationError] = useState("");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  // Calculate daysInMonth & firstDayOfMonth
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const openAddEventModal = () => {
    // TODO
  };

  const closeModal = () => {
    // TODO
  };

  const saveEvent = () => {
    // TODO
  };

  const deleteEvent = (eventId, date) => {
    // TODO
  };

  // Check if a given day is today
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const targetDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events[targetDate] || [];
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const todaysClass = isToday(day) ? "today" : "";

      days.push(
        <div className={`calendar-day ${todaysClass}`} key={day}>
          <span className="day-number">{day}</span>
          <div className="events-container">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="event-item"
                data-testid="event-item"
              >
                <span>{event.title}</span>
                <button
                  className="delete-btn"
                  data-testid="delete-event-btn"
                  onClick={() => deleteEvent(event.id, event.date)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <>
      <h1>Event Management</h1>
      <div className="calendar-app" data-testid="calendar-container">
        <div className="calendar-header">
          <button
            data-testid="prev-month-btn"
            className="nav-btn"
            onClick={goToPreviousMonth}
          >
            &#8249;
          </button>
          <span data-testid="month-year-display" className="month-year-text">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button
            data-testid="next-month-btn"
            className="nav-btn"
            onClick={goToNextMonth}
          >
            &#8250;
          </button>
        </div>

        <button
          data-testid="add-event-btn"
          className="add-event-btn"
          onClick={openAddEventModal}
        >
          + Add Event
        </button>

        <div className="calendar-grid">
          <div className="weekdays">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="weekday">
                {d}
              </div>
            ))}
          </div>

          <div className="days-grid">{renderCalendarDays()}</div>
        </div>

        {showModal && (
          <div data-testid="event-modal">
            {validationError && (
              <div data-testid="validation-error">{validationError}</div>
            )}
            <input
              data-testid="event-title-input"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Event title"
            />
            <input
              type="date"
              data-testid="event-date-input"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <button data-testid="save-event-btn" onClick={saveEvent}>
              Save Event
            </button>
            <button data-testid="close-modal-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
