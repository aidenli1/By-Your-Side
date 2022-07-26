import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import StartPage from "./components/views/StartPage/StartPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";

import Auth from './hoc/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* <Route exact path="/" element={Auth(StartPage, null)} /> */}
        {/* <Route exact path="/login" element={Auth(LoginPage, false)} /> */}

        
        <Route exact path="/" element={Auth(LoginPage, false)} />
        <Route exact path="/register" element={Auth(RegisterPage, false)} />
        <Route exact path="/start" element={Auth(StartPage, null)} />
        <Route exact path="/video/upload" element={Auth(VideoUploadPage, true)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
