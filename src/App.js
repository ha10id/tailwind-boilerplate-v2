import jwtDecode from "jwt-decode";
import React, { useState } from "react";

import { HashRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { Loading } from "./components/Loading";
import { Navbar } from './components/navbar/Navbar';
import { AuthContext } from "./context/auth";
import { Home } from "./views/Home";
import { NotFound } from "./views/NotFound";
import { SignIn } from "./views/SignIn";
import { SignUp } from "./views/SignUp";

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

localStorage.theme = 'light'

function App() {
    let token = window.localStorage.token;
    let user;
    if (token) {
        const decoded = jwtDecode(token);
        user = decoded["user"];
        console.log(user);
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
        <AuthContext.Provider value={{ authToken, authUser, setAuthToken: setToken }}>
            <HashRouter>
                <React.Suspense fallback={Loading}>
                    <div className="App">
                        <header>
                            <Navbar/>
                        </header>
                        <div className="main">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/signin" component={SignIn}/>
                                <Route exact path="/signup" component={SignUp}/>
                                <Route render={NotFound}/>
                            </Switch>
                        </div>
                        <footer>2021@Mars Weapons Inc.</footer>
                    </div>
                </React.Suspense>
            </HashRouter>
        </AuthContext.Provider>
    );
}

export default App;
