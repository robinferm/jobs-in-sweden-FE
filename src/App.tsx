import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/public/Home";
import Logger from "./components/public/Logger"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/log" element={<Logger/>} />
    </Routes>
  );
}
export default App;
