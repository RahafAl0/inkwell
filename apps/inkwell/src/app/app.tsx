// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import MyProfile from '../components/MyProfile';
import CreateArticle from '../components/CreateArticle';

export function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/article/new" element={<CreateArticle />} />
    </Routes>
  </Router>
      
   
  );
}

export default App;
