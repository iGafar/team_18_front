import { useState, useEffect } from "react";
import getRequest from './getRequest';


function GetSitesList() {
    const { isLoading, data, sendRequest } = getRequest()
    const [sitesList, setSitesList] = useState([])
    
    useEffect(() => {sendRequest(`https://parsing-app.onrender.com/site`)}, [])
    useEffect(() => {
        if (data) {setSitesList(data)}
        console.log("GetSitesList", sitesList)
    }, [data])
    
    return {sitesListqq:sitesList, setSitesList, sitesListLoading: isLoading}
}

function GetNewsList() {
    const { isLoading, data, sendRequest } = getRequest()
    const [newsList, setNewsList] = useState([])
    
    useEffect(() => {sendRequest(`https://parsing-app.onrender.com/news`)}, [])
    useEffect(() => {
        setNewsList(data); 
        console.log("newsListnewsList", newsList)
    }, [data])
  
    return {newsList, newsListLoading: isLoading}
}

export default function useGetSiteSettingsList() {
    const {sitesList, setSitesList, sitesListLoading} = GetSitesList()
    // const {newsListqq, newsListLoading} = await GetNewsList()

    // useEffect(() => {
    //     if(sitesList) {
    //         return {sitesList}
    //     }
    // }, [sitesListqq])

    return {sitesList, sitesListLoading}
}