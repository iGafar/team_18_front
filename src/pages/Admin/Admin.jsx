import React from "react";
import Header from "../../components/Header/Header";
import AdminUserImage from "../../components/Admin/AdminUserImage/AdminUserImage";
import AdminAddUser from "../../components/Admin/AdminAddUser/AdminAddUser";
import UsersList from "../../components/Admin/UsersList/UsersList";
import AdminUserInfo from "../../components/Admin/AdminUserInfo/AdminUserInfo";
import AdminSitesCheckButton from "../../components/Admin/AdminSitesCheckButton/AdminSitesCheckButton"
import SiteSettings from "../../components/Admin/SiteSettings/SiteSettings";
import './Admin.css'
import { useState, useEffect } from "react";
import sitesList from "../../components/Admin/mock/sites.json"
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getRequest from '../../functions/getRequest';
import postRequest from '../../functions/postRequest';
import loaderGif from "../../assets/images/loader.gif";
import getSiteSettingsList from "../../functions/getSitesAndTags"


function CheckCurrentUserAccessPermissions(currentUser) {
  const navigate = useNavigate();
  const { isLoading, data, sendRequest } = getRequest()

  useEffect(() => {
    sendRequest(`https://parsing-app.onrender.com/user/email/${currentUser.email}`)
  }, [currentUser.email])

  useEffect(() => {
    if (data.hasOwnProperty('is_admin') && !data.is_admin) {
      navigate('/access-denied');
      return;
    }
  }, [data]);
  
  return {currentUserCheckLoading: isLoading}
}

function GetUsersList() {
  const { isLoading, data, sendRequest } = getRequest()
  const [usersList, setUsersList] = useState([])
  
  useEffect(() => {sendRequest(`https://parsing-app.onrender.com/user`)}, [])

  useEffect(() => {setUsersList(Array.from(data))}, [data])
  
  return {usersList, usersListLoading: isLoading}
}


export default function Admin() {
  const currentUser = useSelector((state) => state.currentUser);
  const { currentUserCheckLoading } = CheckCurrentUserAccessPermissions(currentUser);
  const { usersList, usersListLoading } = GetUsersList();

  getSiteSettingsList()

  useDocumentTitle("Admin");

  const [selectedSites, setSelectedSites] = useState(sitesList.sites.filter(s => s.active));
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    setSelectedUser(usersList.map((u)=>{if (u.email === currentUser.email){return u}})[0])
  }, [usersList]);

  function selectUser(user) {
    setSelectedUser(user);
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
      {currentUserCheckLoading ? <img src={loaderGif} alt=""/> :
      <>
        <Header />
        <main className="admin">
          <div className="container">
            <div className="admin__block">
              <AdminAddUser />
              {/* <UsersList usersList={usersList.users} selectUser={selectUser} selectedUser={selectedUser}/> */}
              {usersListLoading || !usersList.length  ? <img src={loaderGif} alt=""/> :
                <UsersList usersList={usersList} selectUser={selectUser} selectedUser={selectedUser}/>
              }
              
              {selectedUser ? <AdminUserInfo initialUser={selectedUser} /> : <div>Loading...</div>}

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
      }

    </>
  );
}
