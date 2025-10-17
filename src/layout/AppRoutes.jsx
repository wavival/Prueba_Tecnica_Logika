import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Create from '@/pages/Create';
import PrivateRoute from '@/layout/PrivateRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {}
      <Route path="/login" element={<Login />} />

      {}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        }
      />

      {}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
