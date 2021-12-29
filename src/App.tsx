import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./components/public/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  );
}
export default App;
