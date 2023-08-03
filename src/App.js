import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { UserContext } from "./UserContext";
import CreatePost from "./pages/createPost/CreatePost";

function App() {
  return (
    <div className="App">
      <UserContext.Provider value>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
