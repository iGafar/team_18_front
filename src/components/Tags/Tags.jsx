import "./Tags.css"
import close from "../../assets/images/close.svg"
import addclose from "../../assets/images/addClosed.svg"


export default function TagBlue({tag}) {
    return (
        <button className={tag.active ? "tag tag-blue" : "tag tag-white"}>
            <span className="tagSpan">{tag.name}</span>
            <img src={tag.active ? close : addclose} alt="" />
        </button>
    )
}
