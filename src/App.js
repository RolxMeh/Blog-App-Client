import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthContext } from "./store/AuthContext";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    Axios.get("https://blog-server-d5d2.onrender.com/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.err) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data._id,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };
  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="bg-egg pl-2 w-full h-10 flex items-center">
            <Link to="/" className="mr-3">
              Home
            </Link>
            {authState.status && (
              <Link to="/createpost" className="mr-3">
                Create post
              </Link>
            )}

            {!authState.status ? (
              <>
                <Link to="/login" className="mr-3">
                  Login
                </Link>
                <Link to="/registration">Register</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
            <h2 className="ml-auto mr-16">{authState.username}</h2>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
