import React from "react";
import Header from "../../components/Header/Header";
import AdminUserImage from "../../components/Admin/AdminUserImage/AdminUserImage";
import AdminAddUser from "../../components/Admin/AdminAddUser/AdminAddUser";
import UsersList from "../../components/Admin/UsersList/UsersList";
import AdminUserInfo from "../../components/Admin/AdminUserInfo/AdminUserInfo";
import SitesCheckButton from "../../components/SitesCheckButton/SitesCheckButton"
import SiteSettings from "../../components/Admin/SiteSettings/SiteSettings";
import './Admin.css'
import { useState, useEffect } from "react";
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getRequest from '../../functions/getRequest';
import loaderGif from "../../assets/images/loader.gif";
import {fetchSites} from "../../store/slices/sitesSlice";
import postRequest from "../../functions/postRequest"
// import { setSites } from '../../store/slices/sitesSettingsMock';
// import { loadState, saveState } from '../../functions/localStorage'


function CheckCurrentUserAccessPermissions(currentUser) {
  const navigate = useNavigate();
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

export default function Admin() {
  const currentUser = useSelector((state) => state.currentUser);
  const { currentUserCheckLoading } = CheckCurrentUserAccessPermissions(currentUser);
  useDocumentTitle("Admin");
  const { usersList, usersListLoading } = GetUsersList();
  const { sites } = useSelector((state) => state.sites);
  const [sitesList, setSiesList] = useState(sites)
  const [selectedSites, setSelectedSites] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const { sendRequest } = postRequest()
  const dispatch = useDispatch();
  
  useEffect(() => {setSelectedUser(usersList.filter(u => u.email == currentUser.email)[0])}, [usersList]);
  useEffect(() => {dispatch(fetchSites())}, [dispatch]);
  useEffect(() => {
    setSiesList(sites)
    setSelectedSites(sitesList.filter(s => s.is_active))
  }, [sites]);

  function handleSiteToggle(site) {
    setSelectedSites(prevSites => {
      if (prevSites.some(s => s.id == site.id)) {
        return prevSites.filter(s => s.id != site.id);
      } else {return [...prevSites, site];}
    });

    const newData = {title: site.title, url: site.url, is_active: !site.is_active}
    sendRequest(`https://parsing-app.onrender.com/site/id/${site.id}?cat_id=${site.id}`, "PATCH", newData)
        .catch(error => {
            console.error('Ошибка:', error);
        });

    let updatedSitesList = sitesList.map((s) => {
      if (s.id === site.id) {return {...s, is_active: !s.is_active}}
      else {return s}
    })

    setSiesList(updatedSitesList)
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
            <div className="w-24">
              <SitesCheckButton handleSiteToggle={handleSiteToggle} siteList={sitesList}/>
            </div>
            <div className="admin__bottom__block">
              {selectedSites.map((site, index) => (
                  <SiteSettings site={site} key={site.id} handleSiteToggle={handleSiteToggle}/>
              ))}
            </div>
          </div>
        </main>
      </>
      }

    </>
  );
}
