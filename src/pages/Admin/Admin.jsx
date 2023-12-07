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
// import sitesList from "../../components/Admin/mock/sites.json"
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getRequest from '../../functions/getRequest';
import loaderGif from "../../assets/images/loader.gif";
// import useGetSiteSettingsList from "../../functions/getSitesAndTags"
// import { fetchSitesAndNews } from '../../store/slices/sitesAndNewsSlice';
import { setSites } from '../../store/slices/sitesSettingsMock';
import { loadState, saveState } from '../../functions/localStorage'



function CheckCurrentUserAccessPermissions(currentUser) {
  const navigate = useNavigate();
  console.log("currentUser", currentUser)
  
  if (!currentUser?.email) {navigate('/access-denied');}
  
  const { isLoading, data, sendRequest } = getRequest()

  useEffect(() => {
    sendRequest(`https://parsing-app.onrender.com/user/email/${currentUser.email}`)
  }, [currentUser.email])

  useEffect(() => {
    if (data.hasOwnProperty('is_superuser') && !data.is_superuser) {
      navigate('/access-denied');
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


export default function Admin() {  // --------------------------------------------------------------- //
  useDocumentTitle("Admin");

  const currentUser = useSelector((state) => state.currentUser);
  const { currentUserCheckLoading } = CheckCurrentUserAccessPermissions(currentUser);
  const { usersList, usersListLoading } = GetUsersList();
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    setSelectedUser(usersList.map((u)=>{if (u.email === currentUser.email){return u}})[0])
  }, [usersList]);

  const dispatch = useDispatch();
  const sitesList = useSelector((state) => state.sites.sites);
  const [selectedSites, setSelectedSites] = useState(sitesList.filter(s => s.active));

  function handleSiteToggle(site) {
    setSelectedSites(prevSites => {
      if (prevSites.some(s => s.name == site.name)) {
        return prevSites.filter(s => s.name != site.name);
      } else {return [...prevSites, site];}
    });

    let updatedSitesList = sitesList.map((s) => {
      if (s.name === site.name) {return {...s, active: !s.active}}
      else {return s}
    })
  
    saveState({ ...loadState(), sites: updatedSitesList });
    dispatch(setSites(updatedSitesList));
  }

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
                <UsersList usersList={usersList} selectUser={(user) => setSelectedUser(user)} selectedUser={selectedUser}/>
              }
              
              {selectedUser ? <AdminUserInfo initialUser={selectedUser} /> : <div>Loading...</div>}

              <AdminUserImage />
            </div>
          </div>
          <div className="container">
            <AdminSitesCheckButton handleSiteToggle={handleSiteToggle} siteList={sitesList}/>
            <div className="admin__bottom__block">
              {selectedSites.map((site, index) => (
                  <SiteSettings site={site} key={index} handleSiteToggle={handleSiteToggle} siteList={sitesList}/>
              ))}
            </div>
          </div>
        </main>
      </>
      }

    </>
  );
}
