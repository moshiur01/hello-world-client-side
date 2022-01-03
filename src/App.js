import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import AuthProvider from "./Components/ContextApi/AuthProvider/AuthProvider";
import PrivateRoute from "./Pages/Login/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/admin" element={<Dashboard></Dashboard>}></Route>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home></Home>
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
