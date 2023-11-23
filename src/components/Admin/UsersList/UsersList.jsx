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
							&#128073;&ensp;&ensp;{user.user_name}&ensp;&ensp;
							{user.isMain ? "🔥" : ""}
						</p>
					</div>
				)}
				
		</div>
  )
}
