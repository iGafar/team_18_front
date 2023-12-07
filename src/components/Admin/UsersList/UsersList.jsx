import React from "react";
import './UsersList.css'

export default function UsersList({usersList, selectUser, selectedUser}) {
	return (
			<div className="users-container">
					<h3 className="users-title">Список пользователей:</h3>
					{usersList.map((user, index) => 
						<div className={user === selectedUser ? "users-main" : "users-username"}
							key={index} 
							onClick={() => {selectUser(user)}}
						>
							<p>
								{user.email}&ensp;
								{user.is_superuser ? "🔥" : ""}
							</p>
						</div>
					)}
					
			</div>
	)
}
