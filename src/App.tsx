import { Outlet } from "react-router-dom";
// import SideBar from "./components/SideBar/SideBar";

function App() {
  // const location = useLocation();
  // const isLoginPage = location.pathname === "/";

  return (
    <>
      <div className="flex w-full" dir="rtl">
        {/* {!isLoginPage ? <SideBar /> : null} */}
        <div className="w-full " style={{ backgroundColor: "#f7f2e7" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
