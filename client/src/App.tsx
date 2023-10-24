import "./App.css";
// import React, { useState } from "react";
// import Notification from "./component/notification";
// import OrderList from "./component/orders";
// import ShipmentStatus from "./component/shipment";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import OrderList from "./component/orders";

function App() {
  // Define a state for notifications
  // const [notification, setNotification] = useState("");

  return (
    <div>
      {/* <h1>E-commerce Order Management</h1> */}
      {/* <Notification message={notification} /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/" element={<Home />} />
      </Routes>
      <div className="container">
        {/* <ShipmentStatus setNotification={setNotification} /> */}
      </div>
    </div>
  );
}

export default App;
