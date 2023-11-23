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

    return (
        <div className="siteSettings-container">
            <div className="siteSettings-wrapper">
                <div className="siteSettings-inner">
                    <div className="siteSettings-name">
                        <p>{site.name}</p>
                    </div>

                    <div className="siteSettings-menu">
                        <p>Тэги</p>
                        <button className="siteSettings-tagsButton"><p>Включить все</p></button>
                    </div>
                    <div className="siteSettings-tags-container">
                        {showAllTags ? 
                            <>
                                {site.tags.map((tag, index) => <Tag tag={tag} key={index}/>)}
                                <button className="siteSettings-tagsButton siteSettings-hideAll" onClick={() => setShowAllTags(false)}>
                                    <p>Свернуть</p>
                                    <div><img src={ chevron } alt="" /></div>
                                </button>
                            </>
                        :
                            <>
                                {site.tags.slice(0, 10).map((tag, index) => <Tag tag={tag} key={index}/>)}
                                {site.tags.length > 10 &&
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