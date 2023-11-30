import { useState, useEffect } from "react";
import getRequest from './getRequest';


function GetSitesList() {
    const { isLoading, data, sendRequest } = getRequest()
    const [sitesList, setSitesList] = useState([])
    
    useEffect(() => {sendRequest(`https://parsing-app.onrender.com/user`)}, [])
  
    useEffect(() => {setSitesList(Array.from(data))}, [data])
    
    console.log(sitesList)
  
    // return {usersList, usersListLoading: isLoading}
}

function GetNewsList() {
    const { isLoading, data, sendRequest } = getRequest()
    const [newsList, setNewsList] = useState([])
    
    useEffect(() => {sendRequest(`https://parsing-app.onrender.com/user`)}, [])
  
    useEffect(() => {setNewsList(Array.from(data))}, [data])
    
    console.log(newsList)
  
    // return {usersList, usersListLoading: isLoading}
}

export default function getSiteSettingsList() {
    GetSitesList()
    GetNewsList()
}