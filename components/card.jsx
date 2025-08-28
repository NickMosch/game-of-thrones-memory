import placeholder from "../utils/elementor-placeholder-image.png";
import "../styles/card.css"

export default function MemoryCard({name,onClick}){
    return (<div id={name} onClick={onClick}>
        <h1>{name}</h1>
        <img src={placeholder} alt="" />
    </div>)
}