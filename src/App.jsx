import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import CreateBlog from "./components/Create/CreateBlog/CreateBlog";
import BlogPage from "./components/Create/BlogPage/BlogPage";
import UpdateBlog from "./components/Create/UpdateBlog/UpdateBlog";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import SignIn from "./components/SignIn/SignIn";
import BlogCategory from "./components/Create/BlogCategory/BlogCategory";
import Dashboard from "./Admin/Dashboard";
import Home1 from "./Admin/Home1";
import About1 from "./Admin/About1";
import Setting from "./Admin/Setting";
import Analytics from "./Admin/Analytics";

import { ThemeProvider } from "./components/Context/theme";

function MainContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      
      {location.pathname !== "/Signup" && location.pathname !== "/" && (
        <Navbar isLoggedIn={isLoggedIn} />
      )}

      <Routes>
        <Route path="/" element={<SignIn onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/CreateBlog" element={<CreateBlog />} />
        <Route path="/categories/:id" element={<BlogPage />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/:category" element={<BlogCategory />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {isAdmin === "true" && (
          <>
            <Route path="/admin/home" element={<Home1 />} />
            <Route path="/admin/about" element={<About1 />} />
            <Route path="/admin/setting" element={<Setting />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </>
        )}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
