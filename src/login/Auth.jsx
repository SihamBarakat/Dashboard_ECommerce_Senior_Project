// src/login/auth.js
import { AuthProvider } from 'react-auth-kit';

export const Auth = ({ children }) => (
  <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}
  >
    {children}
  </AuthProvider>
);
