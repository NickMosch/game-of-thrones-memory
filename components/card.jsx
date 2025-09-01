//import placeholder from "../utils/placeholder.png";
import "../styles/card.css"

export default function MemoryCard({name,id,onClick,url}){
    return (<div id={name} onClick={onClick}>
        <h1>{name}</h1>
        <img src={url || "../utils/placeholder.png"} alt="" />
    </div>)
}