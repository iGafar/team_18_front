import React from "react";
import Header from "../../components/Header/Header";
import UsersList from "../../components/UsersList/UsersList";

export default function admin() {
  return (
    <>
      <Header />
      <main className="admin">
				<div className="container">
					<h2>Пользователи</h2>
					<UsersList />
				</div>
			</main>
    </>
  );
}
