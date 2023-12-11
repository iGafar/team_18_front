import "./SiteSettings.css"
import Tag from "../../Tags/Tags";
import chevron from "../../../assets/images/chevron.svg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSites } from '../../../store/slices/sitesSettingsMock';
import { loadState, saveState } from '../../../functions/localStorage'
import {fetchTags} from "../../../store/slices/tagsSlice";
import postRequest from "../../../functions/postRequest"
// import siteTags from "../mock/tags.json"


export default function SiteSettings({site, handleSiteToggle, sitesList}) {
    const [showAllTags, setShowAllTags] = useState(false)
    // const [sites, setSites] = useState(sitesList)
    const { sendRequest } = postRequest()
    const { tags, status: tagsLoading } = useSelector((state) => state.tags);
    const [tagsReady, setTagsReady] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {dispatch(fetchTags())}, [dispatch]);
    const [sortedTags, setSortedTags] = useState([])

    useEffect(() => {
        if (tagsLoading == "succeeded") {
            setTagsReady(true)
            setSortedTags(tags.slice()
                            .filter(tag=>tag.site_list.some(s => s.id === site.id))
                            .sort((a, b) => a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1)
            )
        }
    }, [tagsLoading])

    function changeTagActiveStatus(tag){
        sendRequest(`https://parsing-app.onrender.com/category/id/${tag.id}?cat_id=${tag.id}`, "PATCH", {is_active: !tag.is_active})
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }

    function activeteAllTags() {
        setSortedTags(prev => prev.map(oldTag => {
            if (!oldTag.is_active) {changeTagActiveStatus(oldTag)}
            return oldTag.is_active ? oldTag : {...oldTag, is_active:true}
        }))
    }

    // function UpdateSitesInStore(site, tag) {
    //     const newSitesList = sites.map((s) => {
    //         if (s.name == site.name) {
    //             return {...s, tags: s.tags.map(t => t.name === tag.name ? {...t, active: !t.active} : t)};
    //         }
    //         return {...s}
    //     })
    //     setSites(newSitesList)
    //     dispatch(setSites(newSitesList));
    // }


    function toggleTagStatus(tag) {
        setSortedTags(prev => {
            const newList = prev.map(oldTag => {        
                if (oldTag === tag) {return {...oldTag, is_active: !oldTag.is_active}}
                return oldTag;
                });
            return newList.sort((a, b) => a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1);
        })
        changeTagActiveStatus(tag)
        // UpdateSitesInStore(site, tag)
    }

    return (
        <div className="siteSettings-container">
            <div className="siteSettings-wrapper">
                <div className="siteSettings-inner">
                    <div className="siteSettings-name">
                        <p>{site.title}</p>
                    </div>

                    <div className="siteSettings-menu">
                        <p>Тэги</p>
                        <button className="siteSettings-tagsButton" onClick={activeteAllTags}><p>Включить все</p></button>
                    </div>
                    <div className="siteSettings-tags-container">
                        {tagsReady ?
                        
                            showAllTags ? 
                                <>
                                    {sortedTags.map((tag, index) => <Tag key={index} tag={tag} clickHandler={toggleTagStatus} />)}
                                    <button className="siteSettings-tagsButton siteSettings-hideAll" onClick={() => setShowAllTags(false)}>
                                        <p>Свернуть</p>
                                        <div><img src={ chevron } alt="" /></div>
                                    </button>
                                </>
                            :
                                <>
                                    {sortedTags.slice(0, 7).map((tag, index) => <Tag key={index} tag={tag} clickHandler={toggleTagStatus} />)}
                                    {sortedTags.length > 10 &&
                                    <button className="siteSettings-tagsButton" onClick={() => setShowAllTags(true)}>
                                        <p>Развернуть</p>
                                        <div><img src={ chevron } alt="" /></div>
                                    </button>
                                    }
                                </>
                        :
                            <div>loading...</div>
                        }

                    </div>
                </div>
                <button onClick={() => handleSiteToggle(site)}>Удалить</button>
            </div>
        </div>
    )
}