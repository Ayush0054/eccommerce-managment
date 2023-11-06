import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

import Orders from "./pages/orders";
import Profile from "./pages/profile";
import Products from "./pages/products";
import Inventory from "./pages/inventory";
import Customer from "./pages/customer";

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
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div className="container">
        {/* <ShipmentStatus setNotification={setNotification} /> */}
      </div>
    </div>
  );
}

export default App;
