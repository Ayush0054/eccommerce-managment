// // ShipmentStatus.js
// import React, { useState } from "react";

// function ShipmentStatus({ orderId }) {
//   const [newStatus, setNewStatus] = useState("");

//   const handleStatusChange = () => {
//     // Send a PUT request to update the shipment status in the backend
//     // Use the orderId and newStatus state to make the request
//     // Handle success and error cases
//     // Display a notification based on the response
//   };

//   return (
//     <div>
//       <h3>Change Shipment Status</h3>
//       <select onChange={(e) => setNewStatus(e.target.value)}>
//         <option value="">Select Status</option>
//         <option value="In Transit">In Transit</option>
//         <option value="Out for Delivery">Out for Delivery</option>
//         {/* Add more status options */}
//       </select>
//       <button onClick={handleStatusChange}>Update Status</button>
//     </div>
//   );
// }

// export default ShipmentStatus;
