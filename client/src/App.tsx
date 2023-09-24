import "./App.css";
import React, { useState } from "react";
import Notification from "./component/notification";
import OrderList from "./component/orders";
import ShipmentStatus from "./component/shipment";

function App() {
  // Define a state for notifications
  const [notification, setNotification] = useState("");

  return (
    <div className="App">
      <h1>E-commerce Order Management</h1>
      {/* <Notification message={notification} /> */}
      <div className="container">
        <OrderList />
        {/* <ShipmentStatus setNotification={setNotification} /> */}
      </div>
    </div>
  );
}

export default App;
