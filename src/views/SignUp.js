import React, {useState} from "react";
import {API} from "../helpers/api";
import {Social} from "../components/Social";
import {useAuth} from "../context/auth";

export const SignUp = (props) => {
  const [user, setUser] = useState({
    email: "real@email.com",
    password: "123456"
  });

  // const [alert, setAlert] = useState({show: false, nessage: ""});
  const {setAuthToken} = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const referer = props.location.state.referer || "/";

 const signUp = async () => {
    console.log(user);
    await API.post("/auth/login", user)
             .then((response) => {
               if (response.status === 200) {
                 console.log(response);
                 setAuthToken(response.data);
                 setLoggedIn(true);
               }
             })
             .catch((error) => {
               console.log(error);
               // setIsError(true);
               // setAlert({ ...alert, show: true, message: error + "\n" + user.email + "\n" + user.password });
               // return false;
             });
  };

  if (isLoggedIn) {
    window.location.href = "/";
  }

  return (
    <div className="panel">
      <h2 className="page-header pb-3">
        Регистрация учётной записи
      </h2>
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Электронная почта</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required
                 className="input-login-email"
                 placeholder="Электронная почта"
                 onChange={(e) =>
                   setUser({...user, email: e.target.value})
                 }/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Пароль</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required
                 className="input-login-passwd"
                 placeholder="Пароль"
                 onChange={(e) =>
                   setUser({...user, password: e.target.value})
                 }/>
        </div>
      </div>

      <div className="flex-row mt-10 py-2">
        <button type="submit"
                className="btn-icon btn-primary"
                onClick={signUp}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"/>
            </svg>
          </span>
          Регистрация
        </button>
      </div>
      <Social/>
      <p>Уже зарегистрированы?&nbsp;
        <a href="#/signin" className="font-medium text-indigo-600 hover:text-indigo-500">Войдите в учётную запись</a>
      </p>
    </div>
  );
};
