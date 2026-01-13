import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireVenueManager?: boolean;
}

export function ProtectedRoute({ children, requireVenueManager = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireVenueManager && !user?.venueManager) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
