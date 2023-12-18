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

export default function SiteFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  if (!currentUser.email) {navigate('/');}
  const { sites: dbSites, status: dbSitesStatus } = useSelector((state) => state.sites);
  const [ allowedSites, setAllowedSites ] = useState([])
  const { tags: dbTags, status: dbTagsLoading } = useSelector((state) => state.tags);
  const [ allTags, setAllTags ] = useState([])
  const [ sortedTags, setSortedTags ] = useState([])

  // получаем данные сайтов и тегов - если есть, то из local storage, если нет - берем с сервера
  useEffect(() => {
    const filters = currentUser.filterSettings
    if (Object.keys(filters).length) {
      setAllowedSites(filters.sites);
      setAllTags(filters.tags);
      const siteMap = filters.sites.reduce((map, site) => ({...map, [site.id]: site.is_active}), {});
      setSortedTags(filters.tags
        .filter(tag => tag.site_list.some(tagSite => siteMap[tagSite.id]))
        .sort((a, b) => a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1)
      );
    } else {
      dispatch(fetchSites());
      dispatch(fetchTags());
    }
  }, [currentUser.filterSettings, dispatch]);

  // если берем данные с сервера
  useEffect(() => {
      if (dbTagsLoading === "succeeded") {
        const activeTags = dbTags.slice().filter(tag => tag.is_active)
        const siteMap = allowedSites.reduce((map, site) => ({...map, [site.id]: site.is_active}), {});
        setSortedTags(activeTags.filter(tag => tag.site_list.some(tagSite => siteMap[tagSite.id])));
        setAllTags(activeTags)
      }
      if (dbSitesStatus === "succeeded") {
        setAllowedSites(dbSites.filter(s => s.is_active))
      }
  }, [dbTags, dbSitesStatus])


  function handleSiteToggle(site) {
    const newSiteList = allowedSites.slice().map(oldSite => oldSite.id === site.id ? {...oldSite, is_active: !oldSite.is_active} : oldSite);
    const siteMap = newSiteList.reduce((map, site) => ({...map, [site.id]: site.is_active}), {});
    const newTagsList = allTags.filter(tag => tag.site_list.some(tagSite => siteMap[tagSite.id]));
    setAllowedSites(newSiteList)
    setSortedTags(newTagsList.sort((a, b) => a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1))
    
    dispatch(setFilterSettings({sites: newSiteList, tags: allTags}));
  }

  function handleTagToggle(tag) {
    const updateTag = (oldTag) => oldTag.id === tag.id ? {...oldTag, is_active: !oldTag.is_active} : oldTag;
    setAllTags(allTags.map(updateTag))
    
    const newSortedTags = sortedTags.map(updateTag)
    setSortedTags(newSortedTags.sort((a, b) => a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1))

    dispatch(setFilterSettings({sites: allowedSites, tags: newSortedTags}));
  }

  return (
    <div className="news-filter">
      <div className="news-source-item">

        <SitesCheckButton siteList={allowedSites} handleSiteToggle={handleSiteToggle}/>
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

          {sortedTags.map((tag, index) => <Tag key={index} tag={tag} clickHandler={handleTagToggle} />)}
          
        </div>


      </div>
    </div>
  );
}
