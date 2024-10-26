import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import useAuthStore from "./store/auth.store";
import { useEffect } from "react";
import Home from "./pages/home";
import { path } from "./utils/paths";

function App() {
  const { user, uploaded, checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (!uploaded) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path={path.home}
        element={user ? <Home /> : <Navigate to={path.login} replace />}
      />
      <Route
        path={path.login}
        element={user ? <Navigate to={path.home} replace /> : <Login />}
      ></Route>
      <Route
        path="*"
        element={<Navigate to={user ? path.home : path.login} replace />}
      />
    </Routes>
  );
}

export default App;
