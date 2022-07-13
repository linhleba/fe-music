import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import Login from './../Login/Login';
import { useTranslation } from 'react-i18next';
import { logout } from './../../redux/ducks/authenticate';
import { hasLoadedNamespace } from './../../../node_modules/react-i18next/src/utils';
import { te } from 'date-fns/locale';

const Layout = () => {
  const { t, i18n, ready } = useTranslation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [token, setToken] = useState(user?.token);
  let decoded;
  if (token) {
    decoded = jwt_decode(token);
    console.log(decoded);
  }
  if (!token) {
    console.log('here');
    // console.log('vao lai nay');

    return <Login setToken={setToken} />;
  }

  const handleChangeLanguage = (e) => {
    const { value } = e.target;
    i18n.changeLanguage(value);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-sky-900 shadow-lg p-4 flex justify-between items-center">
        <h1 className="font-bold text-white">
          {t('greeting.text')}, {decoded?.sub}
        </h1>
        <div className="flex justify-center items-center ">
          {/* <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Select an option
          </label> */}
          <select
            id="countries"
            className="mr-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onClick={(e) => handleChangeLanguage(e)}
          >
            <option selected value="en">
              English
            </option>
            <option value="vi">Tiếng Việt</option>
          </select>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                dispatch(logout());
                window.location.reload();
              }}
            >
              {t('logout.btn')}
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
