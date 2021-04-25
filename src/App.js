import React, { useState } from "react";
import './App.css';

import { HashRouter, Switch, Route } from "react-router-dom";
import { Loading } from "./components/Loading";
import { Navbar } from './components/navbar/Navbar';
import { Home } from "./views/Home";
import { SignUp } from "./views/SignUp";
import { SignIn } from "./views/SignIn";
import { AuthContext } from "./context/auth";
import { NotFound } from "./views/NotFound";
import jwtDecode from "jwt-decode";

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

localStorage.theme = 'light'

// // check for TOKEN
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   setAuthToken(localStorage.jwtToken);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(localStorage.jwtToken);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));

//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());

//     // Redirect to login
//     window.location.href = '/login';
//   }
// }

function App() {
  let token = window.localStorage.token;
  let user;
  if (token) {
    const decoded = jwtDecode(token);
    user = decoded["user"];
    // console.log(user);
  }
  const [authToken, setAuthToken] = useState(token);
  const [authUser, setAuthUser] = useState(user);

  const setToken = (data) => {
    if (data) {
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      setAuthToken(data.jwt_token);
      const decoded = jwtDecode(data.accessToken);
      setAuthUser(decoded["user"]);
      console.log(decoded.exp);
    } else {
      localStorage.clear();
      setAuthToken(undefined);
    }
  };

  // const Logout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  // }

  return (
    <AuthContext.Provider value={{ authToken, authUser, setAuthToken: setToken}}>
      <HashRouter>
        <React.Suspense fallback={Loading}>
          <div className="App">
            <header>
              <Navbar />
            </header>
            <div className="main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route render={NotFound} />
              </Switch>
            </div>
            <footer>2021@Mars Weapons Inc.</footer>
          </div>
        </React.Suspense>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
