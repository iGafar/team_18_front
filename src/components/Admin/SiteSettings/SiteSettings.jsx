import "./SiteSettings.css"
import Tag from "../../Tags/Tags";
import chevron from "../../../assets/images/chevron.svg";
import { useState } from "react";



export default function SiteSettings({site, handleSiteToggle}) {
    const [showAllTags, setShowAllTags] = useState(false)

    function deleteSiteButtonHandler() {
        site.active = false
        handleSiteToggle(site)
    }

    const [sortedTags, setSortedTags] = useState(site.tags.sort((a, b) => a.active === b.active ? 0 : a.active ? -1 : 1))

    function toggleTagStatus(tag) {
        setSortedTags(prev => {
            const newList = prev.map(oldTag => {        
                if (oldTag === tag) {return {...oldTag, active: !oldTag.active}}
                return oldTag;
                });
            return newList.sort((a, b) => a.active === b.active ? 0 : a.active ? -1 : 1);
        })
    }

    function activeteAllTags() {
        setSortedTags(prev => {
            return prev.map(oldTag => (oldTag.active ? oldTag : {...oldTag, active:true}))
        })
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
                <button onClick={deleteSiteButtonHandler}>Удалить</button>
            </div>
        </div>
    )
}