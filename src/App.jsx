import React from "react";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// React-Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import HomePage from "./routes/HomePage";
import Questions from "./routes/Questions";
import MyQuestions from "./routes/MyQuestions";
import MyProfile from "./routes/MyProfile";
import Navigation from "./components/Navigation";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";

const App = () => {
  return (
    <Container fluid>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/my-questions" element={<MyQuestions />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login /> } />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
