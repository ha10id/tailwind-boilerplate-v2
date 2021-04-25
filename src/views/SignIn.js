import React, {useState} from "react";
import {API} from "../helpers/api";
import {useAuth} from "../context/auth";
import {Social} from "../components/Social";

export const SignIn = (props) => {
  const [user, setUser] = useState({
    email: "achiduzu@gmail.com",
    password: "gjikbdctyf[eq"
  });

  // const [alert, setAlert] = useState({show: false, nessage: ""});
  const {setAuthToken} = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const referer = props.location.state.referer || "/";

  const signIn = async () => {
    await API.post("signin", user)
             .then((response) => {
               if (response.status === 200) {
                 setAuthToken(response.data);
                 setLoggedIn(true);
               }
             })
             .catch((error) => {
               console.log(error);
             });
  };

  if (isLoggedIn) {
    window.location.href = "/";
  }

  return (
    <div className="panel">
      <h2 className="page-header pb-3">
        Вход в учётную запись
      </h2>
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Электронная почта</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required
                 className="input-login-email"
                 placeholder="Электронная почта"
                 value={user.email}
                 onChange={(e) =>
                   setUser({...user, email: e.target.value})
                 }/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Пароль</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required
                 className="input-login-passwd"
                 placeholder="Пароль"
                 value={user.password}
                 onChange={(e) =>
                   setUser({...user, password: e.target.value})
                 }/>
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        <input id="remember_me" name="remember_me" type="checkbox"
               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
          запомнить меня
        </label>
      </div>

      <div className="flex-row mt-3 py-2">
        <button type="submit"
                className="btn-icon btn-primary"
                onClick={signIn}
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
          Войти
        </button>
      </div>
      <Social/>
      <p>Нет учётной записи?&nbsp;
        <a href="#/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Зарегистрируйтесь</a>
      </p>
    </div>
  );
};