import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./components/public/home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" caseSensitive={false} element={<Home/>}/>
        <Route exact path="*" caseSensitive={false} element={<Home/>}/>
      </Routes>
    </Router>
  );
}
export default App;
