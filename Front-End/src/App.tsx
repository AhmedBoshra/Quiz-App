import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../Contexts/AuthContext";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import QuestionBankPage from "../components/QuestionBank";
import CreateQuestionForm from "../components/CreateQuestion";
import EditQuestionForm from "../components/EditQuestions";
import Navbar from "../components/Navbar";
import { useState } from "react";
import CreateAdmin from "../components/CreateAdmin";
import QuestionById from "../components/QuestionById";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={<SignInForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signin"
          element={<SignInForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/questions/:id" element={<QuestionById />} />
        <Route path="/questions" element={<QuestionBankPage />} />
        <Route
          path="/createquestion"
          element={
            <AuthProvider>
              <CreateQuestionForm />
            </AuthProvider>
          }
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/createadmin" element={<CreateAdmin />} />{" "}
        {/* Add CreateAdmin route */}
      </Routes>
    </div>
  );
}

export default App;
