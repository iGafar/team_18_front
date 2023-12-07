import "./SiteSettings.css"
import Tag from "../../Tags/Tags";
import chevron from "../../../assets/images/chevron.svg";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSites } from '../../../store/slices/sitesSettingsMock';
import { loadState, saveState } from '../../../functions/localStorage'


export default function SiteSettings({site, handleSiteToggle, siteList}) {
    const [showAllTags, setShowAllTags] = useState(false)
    const [sortedTags, setSortedTags] = useState(site.tags.slice().sort((a, b) => a.active === b.active ? 0 : a.active ? -1 : 1))
    const [sitesList, setSitesList] = useState(siteList)

    function activeteAllTags() {
        setSortedTags(prev => {
            return prev.map(oldTag => (oldTag.active ? oldTag : {...oldTag, active:true}))
        })
    }

    const dispatch = useDispatch();

    function UpdateSitesInStore(site, tag) {
        const newSitesList = sitesList.map((s) => {
            if (s.name == site.name) {
                return {...s, tags: s.tags.map(t => t.name === tag.name ? {...t, active: !t.active} : t)};
            }
            return {...s}
        })
        setSitesList(newSitesList)
        dispatch(setSites(newSitesList));
    }


    function toggleTagStatus(tag) {
        setSortedTags(prev => {
            const newList = prev.map(oldTag => {        
                if (oldTag === tag) {return {...oldTag, active: !oldTag.active}}
                return oldTag;
                });
            return newList.sort((a, b) => a.active === b.active ? 0 : a.active ? -1 : 1);
        })
        UpdateSitesInStore(site, tag)
    }

    return (
        <div className="siteSettings-container">
            <div className="siteSettings-wrapper">
                <div className="siteSettings-inner">
                    <div className="siteSettings-name">
                        <p>{site.name}</p>
                    </div>

                    <div className="siteSettings-menu">
                        <p>Тэги</p>
                        <button className="siteSettings-tagsButton" onClick={activeteAllTags}><p>Включить все</p></button>
                    </div>
                    <div className="siteSettings-tags-container">
                        {showAllTags ? 
                            <>
                                {sortedTags.map((tag, index) => <Tag key={index} tag={tag} clickHandler={toggleTagStatus} />)}
                                <button className="siteSettings-tagsButton siteSettings-hideAll" onClick={() => setShowAllTags(false)}>
                                    <p>Свернуть</p>
                                    <div><img src={ chevron } alt="" /></div>
                                </button>
                            </>
                        :
                            <>
                                {sortedTags.slice(0, 10).map((tag, index) => <Tag key={index} tag={tag} clickHandler={toggleTagStatus} />)}
                                {sortedTags.length > 10 &&
                                <button className="siteSettings-tagsButton" onClick={() => setShowAllTags(true)}>
                                    <p>Развернуть</p>
                                    <div><img src={ chevron } alt="" /></div>
                                </button>
                                }
                            </>
                        }

                    </div>
                </div>
                <button onClick={() => handleSiteToggle(site)}>Удалить</button>
            </div>
        </div>
    )
}