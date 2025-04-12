import logo from './logo.svg';
import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/HomePage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShopPage from "./Components/Shop/ShopPage";
import ProductDetail from "./Components/Shop/ProductDetail";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<HomePage/>}></Route>
              <Route path={"/home"} element={<HomePage/>}></Route>
              <Route path={"/shop"} element={<ShopPage/>}></Route>
              <Route path={"/productDetail"} element={<ProductDetail/>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
