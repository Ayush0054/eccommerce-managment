// Notification.js
import React, { useState, useEffect } from "react";

function Notification({ message }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000); // Hide after 3 seconds
    }
  }, [message]);

  return isVisible ? <div className="notification">{message}</div> : null;
}

export default Notification;
