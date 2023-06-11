import { UserProvider } from "./contexts/UserContext";
import Register from "./components/accounts/Register";
import Profile from "./components/accounts/Profile";
import Login from "./components/accounts/Login";
import PrivateRoute from "./utils/PrivateRoute";
import ChatLayout from "./components/layouts/ChatLayout";
// import Header from "./components/layouts/Header";
import ErrorMessage from "./components/layouts/ErrorMessage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        {/* <Header /> */}
        <ErrorMessage />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<ChatLayout />} />
            <Route exact path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
