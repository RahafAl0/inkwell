// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Login from '../components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../components/Register';


export function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
      
   
  );
}

export default App;
