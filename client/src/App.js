// External libraries
import { Route, Routes } from 'react-router-dom';

// Internal components
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import Profile from './pages/Profile';

// Styles
import './App.css';

function App() {
  return (
    <div className="App bg-[#E6E7EC] min-h-screen items-center flex">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<TaskList />} />
        <Route path="/profile"  element={<Profile />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
