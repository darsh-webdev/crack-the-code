import { useState, useRef, useEffect } from "react";
import "./App.css";

const notifications = [
  {
    id: 1,
    title: "New Message",
    message: "You have a new message from John",
    timestamp: "2 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    title: "Order Update",
    message: "Your order #12345 has been shipped",
    timestamp: "1 hour ago",
    isRead: false,
  },
  {
    id: 3,
    title: "Reminder",
    message: "Don't forget about your meeting at 3 PM",
    timestamp: "3 hours ago",
    isRead: true,
  },
  {
    id: 4,
    title: "System Alert",
    message: "Scheduled maintenance tonight at 2 AM",
    timestamp: "5 hours ago",
    isRead: false,
  },
  {
    id: 5,
    title: "Welcome",
    message: "Welcome to our platform! Get started with these tips",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: 6,
    title: "Payment Received",
    message: "Payment of $99.99 has been received",
    timestamp: "2 days ago",
    isRead: true,
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notificationList.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleBellClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNotificationClick = (notificationId: number) => {
    // - Find notification by ID
    // - Update isRead property to true
    // - Update notificationList state
    setNotificationList((prevList) =>
      prevList.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    // - Update all notifications to have isRead: true
    // - Update notificationList state
    setNotificationList((prevList) =>
      prevList.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const formatTimestamp = (timestamp: string) => {
    // - Return the timestamp as is for now
    // - Could add more formatting logic later
    return timestamp;
  };

  useEffect(() => {
    // - Close dropdown when clicking outside
    // - Use dropdownRef to check if click is outside
    // - Clean up event listener on unmount
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <div className="notification-container" role="main">
        <h1>Notification Bell</h1>
        <p className="subtitle">Click the bell to see your notifications</p>

        <div className="bell-wrapper" ref={dropdownRef}>
          <button
            className="bell-button"
            onClick={handleBellClick}
            data-testid="notification-bell"
            aria-label="Toggle notifications"
          >
            🔔
          </button>

          {unreadCount > 0 && (
            <span
              className="notification-badge"
              data-testid="notification-badge"
            >
              {unreadCount}
            </span>
          )}

          {isOpen && (
            <div
              className="notification-dropdown"
              data-testid="notification-dropdown"
            >
              <div className="dropdown-header">
                <h3>Notifications</h3>

                {unreadCount > 0 && (
                  <button
                    className="mark-all-button"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="notification-list">
                {notificationList.length === 0 ? (
                  <div className="empty-state">
                    <p>No notifications</p>
                  </div>
                ) : (
                  notificationList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${
                        notification.isRead ? "read" : "unread"
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                      data-testid="notification-item"
                    >
                      <div className="notification-content">
                        <h4 className="notification-title">
                          {notification.title}
                        </h4>
                        <p className="notification-message">
                          {notification.message}
                        </p>
                        <span className="notification-timestamp">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      {!notification.isRead && (
                        <div className="unread-indicator"></div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="stats">
          <p>Total notifications: {notificationList.length}</p>
          <p>Unread notifications: {unreadCount}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
