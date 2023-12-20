import "./SiteFilter.css";
import React, {useEffect, useState} from "react";
import {fetchSites} from "../../store/slices/sitesSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchTags} from "../../store/slices/tagsSlice"
import "../Tags/Tags.css"
import SitesCheckButton from "../SitesCheckButton/SitesCheckButton"
import Tag from "../Tags/Tags"
import { setFilterSettings } from "../../store/slices/currentUserSlice";
import { useNavigate } from 'react-router-dom';
import getUpdatedNewsAndTags from "../../functions/getUpdatedNewsAndTAgs";

export default function SiteFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  if (!currentUser.email) {navigate('/');}

  const { sites: dbSites, status: dbSitesLoading } = useSelector((state) => state.sites);
  const { tags: dbTags, status: dbTagsLoading } = useSelector((state) => state.tags);
  const [ userSites, setUserSites ] = useState([])  // все сайты, разрешенные в админке
  const [ userTags, setUserTags ] = useState([])    // все теги, разрешенные в админке
  const [ showTags, setShowTags ] = useState([])    // отображаемые теги
  const [ siteObjIdActive, setSiteObjIdActive ] = useState({})  // использ. в handleTagToggle для определения активных сайтов

  useEffect(()=>{
    dispatch(fetchSites());
    dispatch(fetchTags());
  },[dispatch])

  useEffect(()=>{
    // берем данные из бд (и LS) списки сайтов и тегов
    // в getUpdatedNewsAndTags определяем что изменилось в бд и присваиваем в соответствующие переменные
    if (dbTagsLoading === "succeeded" && dbSitesLoading === "succeeded") {
      const dbData = {sites: dbSites, tags: dbTags}
      const {allowedSites, allowedTags, allowedSitesObjIdActive} = getUpdatedNewsAndTags(dbData, currentUser)

      const filteredTagsForActiveSites = allowedTags.filter(tag => tag.site_list.some(site => allowedSitesObjIdActive[site.id]))

      setUserSites(allowedSites)
      setUserTags(allowedTags)
      setSiteObjIdActive(allowedSites.reduce((map, site) => ({...map, [site.id]: site.is_active}), {}))
      setShowTags(filteredTagsForActiveSites)
    }
  },[dbSitesLoading, dbTagsLoading])


  function handleSiteToggle(site) {
    const siteListAfterClick = userSites.map(uSite => uSite.id === site.id ? {...uSite, is_active: !uSite.is_active} : uSite);
    const siteMap = siteListAfterClick.reduce((map, site) => ({...map, [site.id]: site.is_active}), {});
    const tagsForCheckedSites = userTags.filter(tag => tag.site_list.some(site => siteMap[site.id]));
    
    setUserSites(siteListAfterClick)
    setShowTags(tagsForCheckedSites)
    setSiteObjIdActive(siteMap)
    dispatch(setFilterSettings({sites: siteListAfterClick, tags: userTags}));
  }

  function handleTagToggle(tag) {
    // при клике на тег обновляются отображаемые теги и те что в сторе(+ лс)
    const updatedUserTagsList = userTags.map(oldTag => oldTag.id === tag.id ? {...oldTag, is_active: !oldTag.is_active} : oldTag);
    setUserTags(updatedUserTagsList)
    setShowTags(updatedUserTagsList.filter(tag => tag.site_list.some(site => siteObjIdActive[site.id])))
    dispatch(setFilterSettings({sites: userSites, tags: updatedUserTagsList}));
  }

  return (
    <div className="news-filter">
      <div className="news-source-item">

        <SitesCheckButton siteList={userSites} handleSiteToggle={handleSiteToggle}/>
        {/* <div className="data-filters">
          <div className="date-range">
            <label className="margin-bottom-1rem">Дата</label>
            <div className="date-container">
              <label htmlFor="start-date">с</label>
              <input type="date" id="start-date" />
            </div>
            <div className="date-container">
              <label htmlFor="end-date">по</label>
              <input type="date" id="end-date" />
            </div>
          </div>
        </div> */}
        
        <p className="margin-bottom-1rem margin-top-1rem">Метки:</p>

        <div className="tags-container">

          {showTags
            .sort((a, b) => b.is_active - a.is_active)
            .map((tag, index) => <Tag key={index} tag={tag} clickHandler={handleTagToggle} />)
          }
          
        </div>


      </div>
    </div>
  );
}
