import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Spinner from "../public/spinner.svg";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Store = lazy(() => import("./pages/Store/Store.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail/ProductDetail.jsx"));
const Basket = lazy(() => import("./pages/Basket/Basket.jsx"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp.jsx"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout.jsx"));

function App() {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasketItems(storedBasket);
  }, []);

  return (
    <div>
      <NavBar basketCount={basketItems.length} />

      <Suspense
        fallback={
          <div className="spinnerWrapper">
            <img src={Spinner} alt="Spinner" title="Spinner" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store setBasketItems={setBasketItems} />} />
          <Route path="/product/:id" element={<ProductDetail setBasketItems={setBasketItems} />} />
          <Route path="/basket" element={<Basket setBasketItems={setBasketItems} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
