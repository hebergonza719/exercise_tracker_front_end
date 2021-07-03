import React from "react";
import LogForm from "./components/LogForm";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LastLog from "./components/LastLog";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./fonts.css";
import "./App.css";

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            path="/register"
            render={routeProps => {
              return <Register {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/"
            render={routeProps => {
              return <Login {...routeProps}/>;
            }}
          />
          <PrivateRoute path="/lastlog" component={LastLog}/>
          <PrivateRoute path="/new-log" component={LogForm}/>

        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;