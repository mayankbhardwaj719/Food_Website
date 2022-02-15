import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
// import BuyerList from "./components/users/BuyerList";
import VendorList from "./components/users/VendorList";
import BuyerList from "./components/users/BuyerList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Buyer_Navbar from "./components/templates/Buyer_Navbar";
import Vendor_Navbar from "./components/templates/Vendor_Navbar";
import Profile from "./components/users/Profile";
import Wallet from "./components/users/Wallet";
import Login from "./components/common/Login";
import Food_Item_Add from "./components/users/Food_Item_Add";
import Statistic from "./components/users/Statistic";
import OrderList from "./components/users/OrderList";
import Order_BuyerList from "./components/users/Order_BuyerList";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const Layout2 = () => {
  return (
    <div>
      <Buyer_Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const Layout3 = () => {
  return (
    <div>
      <Vendor_Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const flag = localStorage.getItem('flag');
function App() {
  if(flag==='0')
  {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout2 />}>
          <Route path="/" element={<Home />} />
          <Route path="buyer_Food_Menu" element={<BuyerList />} />
          <Route path="buyer_orders" element={<Order_BuyerList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  }
  else if(flag==='1')
  {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout3 />}>
            <Route path="/" element={<Home />} />
            <Route path="Food_Menu" element={<VendorList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="statistic_page" element={<Statistic />} />
            <Route path="food_item_add" element={<Food_Item_Add />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else
  {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
