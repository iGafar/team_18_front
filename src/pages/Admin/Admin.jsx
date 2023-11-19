import React from "react";
import Header from "../../components/Header/Header";
import AdminAddUser from "../../components/AdminAddUser/AdminAddUser";
import UsersList from "../../components/UsersList/UsersList";
import AdminUserInfo from "../../components/AdminUserInfo/AdminUserInfo";
import './Admin.css'

export default function admin() {
  return (
    <>
      <Header />
      <main className="admin">
        <div className="container">
          <h2>Пользователи</h2>
          <div className="admin__block">
            <AdminUserInfo />
            <UsersList />
            <AdminAddUser />
          </div>
        </div>
      </main>
    </>
  );
}
