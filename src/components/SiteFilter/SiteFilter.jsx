import "./SiteFilter.css";
import React, {useEffect, useState} from "react";
import arrowDown from "../../assets/images/arrown-down.svg";
import checkBox from "../../assets/images/checkbox.svg";
import checkBoxChecked from "../../assets/images/checkbox-checked.svg";
import {fetchSites} from "../../store/slices/sitesSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchTags} from "../../store/slices/tagsSlice"
import "../Tags/Tags.css"
import close from "../../assets/images/close.svg"
import addclose from "../../assets/images/addClosed.svg"
import SitesCheckButton from "../SitesCheckButton/SitesCheckButton"
import Tag from "../Tags/Tags"


export default function SiteFilter() {
  const [checkboxStates, setCheckboxStates] = useState({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const options = [
		{ value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "youtube", label: "Youtube" },
    { value: "tiktok", label: "Tiktok" },
		{ value: "all", label: "Все сайты" },
	]

  const dispatch = useDispatch();
  const sitesData = useSelector((state) => state.sites);
  const { sites, status: sitesStatus, error } = sitesData;
  const [ allowedSites, setAllowedSites ] = useState([])

  useEffect(() => {
    if (sitesStatus === "succeeded") {
      setAllowedSites(sites.filter(s => s.is_active))
    }
  }, [sitesStatus])

  const { tags, status: tagsLoading } = useSelector((state) => state.tags);
  const [tagsReady, setTagsReady] = useState(false)
  useEffect(() => {dispatch(fetchTags())}, [dispatch]);
  const [sortedTags, setSortedTags] = useState([])

  useEffect(() => {
      if (tagsLoading == "succeeded") {
          setSortedTags(tags.slice()
                          .filter(tag => tag.site_list.some(tagSite => allowedSites.some(allowedSite => allowedSite.id === tagSite.id)))
                          .filter(tag => tag.is_active)
          )
          setTagsReady(true)
      }
  }, [tags])


  // Toggle accordion state
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  useEffect(() => {
    if (sites) {
      // Initialize checkbox states
      const initialStates = sites.reduce((states, site) => {
        states[site.id] = false; // Initially all checkboxes are unchecked
        return states;
      }, {});
      setCheckboxStates(initialStates);
    }
  }, [sites]);

  const handleCheckboxClick = (siteId) => {
    setCheckboxStates(prevStates => ({
      ...prevStates,
      [siteId]: !prevStates[siteId] // Toggle the state
    }));
  };

  return (
    <div className="news-filter">
      <div className="news-source-item">
        {/* <div className="accordion" onClick={toggleAccordion}>
          <div className="accordion-header">
            <a className="accordion-title">Ресурс</a>
            <img
                src={arrowDown}
                alt="Toggle Arrow"
                className={isAccordionOpen ? 'rotate-arrow' : ''}
            />
          </div>
        </div> */}

        <SitesCheckButton siteList={allowedSites} handleSiteToggle={()=>{}}/>

        {isAccordionOpen && (
            <div className="sites-data-container">
              <div className="sites-data-container">
                {allowedSites.map((site) => (
                    <div key={site.id} className="site-item">
                      <span className="site-title">{site.title}</span>
                      <img
                          className="site-checkbox"
                          src={checkboxStates[site.id] ? checkBoxChecked : checkBox}
                          onClick={() => handleCheckboxClick(site.id)}
                          alt="Checkbox"
                      />
                    </div>
                ))}
              </div>
            </div>
        )}

        <div className="data-filters">
          <div className="date-range">
            <label className="margin-bottom-1rem">Дата</label>
            <div className="date-container">
              <label htmlFor="start-date">с</label>
              <input type="text" id="start-date" />
            </div>
            <div className="date-container">
              <label htmlFor="end-date">по</label>
              <input type="text" id="end-date" />
            </div>
          </div>
        </div>
        
        <p className="margin-bottom-1rem">Метки:</p>

        <div className="tags-container">

          {tagsReady ? 
            sortedTags.map((tag, index) => <Tag key={index} tag={tag} clickHandler={()=>{}} />)
          :
            <div>Loading...</div>
          }
          
        </div>


      </div>
    </div>
  );
}
