import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Applicants from "./pages/Applicants";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">{user ? <AdminHome /> : <Login />}</Route>
        <Route path="/applicants/:jobId">
          {user ? <Applicants /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
