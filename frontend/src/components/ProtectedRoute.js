import { Redirect } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn }) {
  return (
    loggedIn ? children : <Redirect to="/sign-in" />
  );
}

export default ProtectedRoute;