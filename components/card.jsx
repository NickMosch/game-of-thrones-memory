//import placeholder from "../utils/placeholder.png";
import "../styles/card.css"

export default function MemoryCard({name,onClick}){
    return (<div id={name} onClick={onClick}>
        <h1>{name}</h1>
        <img src="../utils/placeholder.png" alt="" />
    </div>)
}