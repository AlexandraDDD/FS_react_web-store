import React, { useContext } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Context } from '..';

const AuthGuard = ({ children }) => {
  const {user} = useContext(Context)
 
  const isAuth = user.isAuth;
  // замените на вашу логику проверки авторизации

  if (!isAuth) {
    // перенаправление на страницу входа или отображение сообщения "Нет доступа"
    return (
      <div>
        <h1>Нет доступа</h1>
        <p>Вы не авторизованы для просмотра этой страницы.</p>
        <p>Войдите в свой аккаунт или зарегистрируйтесь.</p>
        <Link to="/login">Войти</Link>
        <Link to="/register">Зарегистрироваться</Link>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
