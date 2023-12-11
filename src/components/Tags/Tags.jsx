import "./Tags.css"
import close from "../../assets/images/close.svg"
import addclose from "../../assets/images/addClosed.svg"


export default function Tag({tag, clickHandler}) {
    return (
        <button className={tag.is_active ? "tag tag-blue" : "tag tag-white"} onClick={() => clickHandler(tag)}>
            <span className="tagSpan">{tag.title}</span>
            <img src={tag.is_active ? close : addclose} alt="" />
        </button>
    )
}
