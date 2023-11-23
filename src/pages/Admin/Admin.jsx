import React from "react";
import Header from "../../components/Header/Header";
import AdminUserImage from "../../components/Admin/AdminUserImage/AdminUserImage";
import AdminAddUser from "../../components/Admin/AdminAddUser/AdminAddUser";
import UsersList from "../../components/Admin/UsersList/UsersList";
import AdminUserInfo from "../../components/Admin/AdminUserInfo/AdminUserInfo";
import AdminSitesCheckButton from "../../components/Admin/AdminSitesCheckButton/AdminSitesCheckButton"
import SiteSettings from "../../components/Admin/SiteSettings/SiteSettings";
import './Admin.css'
import { useState } from "react";
import sitesList from "../../components/Admin/mock/sites.json"
import usersList from "../../components/Admin/mock/users.json"



export default function Admin() {
  const [selectedSites, setSelectedSites] = useState(sitesList.sites.filter(s => s.active));
  const [selectedUser, setSelectedUser] = useState(usersList.users[0])

  function selectUser(user) {
    setSelectedUser(user)
  }

  function handleSiteToggle(site) {
    if (selectedSites.includes(site)) {
      setSelectedSites(selectedSites.filter(s => s !== site));
    } else {
      setSelectedSites([...selectedSites, site]);
    }
  };

  return (
    <>
      <Header />
      <main className="admin">
        <div className="container">
          <div className="admin__block">
            <AdminAddUser />
            <UsersList usersList={usersList.users} selectUser={selectUser} selectedUser={selectedUser}/>
            <AdminUserInfo user={selectedUser}/>
            <AdminUserImage />
          </div>
        </div>
        <div className="container">
          <AdminSitesCheckButton handleSiteToggle={handleSiteToggle} siteList={sitesList.sites}/>
          <div className="admin__bottom__block">
            {selectedSites.map((site, index) => (
                 site.active && <SiteSettings site={site} key={index} handleSiteToggle={handleSiteToggle}/>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
