import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
//for context import

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import "./App.css";

import Cities from "./components/Cities";
import City from "./components/City";
import Countries from "./components/Countries";
import Form from "./components/Form";
import React from "react";
import ProtectedRoute from "./Pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

//dynamic import
const Homepage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const PageNotFount = lazy(() => import("./Pages/PageNotFount"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<Cities />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<Countries />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="*" element={<PageNotFount />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
