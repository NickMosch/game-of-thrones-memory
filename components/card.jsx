import "../styles/card.css"

export default function MemoryCard({id,onClick,url,name}){
    return (<div id={id} className="card" onClick={onClick}>
        <img src={url} />
        <span>{name}</span>
    </div>)
}