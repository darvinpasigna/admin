import { Route, Routes } from 'react-router-dom';
import AdminDash from './pages/AdminDash';
import AddProd from './pages/AddProd';
import PhonePage from './pages/PhonePage';
import PC from './pages/PC';
import ConsGamePage from './pages/ConsGamePage';
import ProtectedPages from './components/ProtectedPages';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/PPGadminsite" element={<Login />} />
      <Route path="/dash" element={<ProtectedPages element={AdminDash} />} />
      <Route path="/addproduct" element={<ProtectedPages element={AddProd} />} />
      <Route path="/PC" element={<ProtectedPages element={PC} />} />
      <Route path="/phone" element={<ProtectedPages element={PhonePage} />} />
      <Route path="/consgame" element={<ProtectedPages element={ConsGamePage} />} />
    </Routes>
  );
}

export default App;
