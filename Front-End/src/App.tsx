import { Routes, Route } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import QuestionBankPage from "../components/QuestionBank";
import CreateQuestionForm from "../components/CreateQuestion";
import EditQuestionForm from "../components/EditQuestions";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={SignInForm} />
        <Route path="/signup" Component={SignUpForm} />
        <Route path="/questions" Component={QuestionBankPage} />
        <Route path="/createquestion" Component={CreateQuestionForm} />
        <Route path="/profile" Component={UserProfile} />
      </Routes>
    </div>
  );
}

export default App;
