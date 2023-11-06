// /* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/component/navbar";

import Sidebar from "@/component/sidebar";

function Layout({ children }) {
  return (
    <div>
      <div className=" flex justify-between">
        <Sidebar />
        <div className=" w-[100vw] ">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
