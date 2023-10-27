import "../styles/svg.css";

const DeleteSignPS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.3 102.09" height="1em" width="1em" onClick={onClick}>
            <polygon className="cls-1" points="40.8 3.5 175.8 3.5 175.8 98.59 40.8 98.59 4.41 51.04 40.8 3.5" />
            <line className="cls-1" x1="70.93" y1="15.35" x2="145.67" y2="86.74" />
            <line className="cls-1" x1="145.67" y1="15.35" x2="70.93" y2="86.74" />
        </svg>
    );
}

export default DeleteSignPS;