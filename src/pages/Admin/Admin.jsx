import React from "react";
import Header from "../../components/Header/Header";
import Users3 from "../../components/AdminUsers3/AdminUsers3"
import UsersList from "../../components/UsersList/UsersList";

export default function admin() {
  return (
    <>
      <Header />
      <main className="admin">
				<div className="container">
					<h2>Пользователи</h2>
					<UsersList />
          <Users3/>
				</div>
			</main>
    </>
  );
}
