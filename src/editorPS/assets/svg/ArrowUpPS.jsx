import "../styles/svg.css";

const ArrowUpPS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.48 160.35" height="1em" width="1em" onClick={onClick}>
            <line className="cls-1" x1="29.24" y1="160.35" x2="29.24" y2="25.61" />
            <path className="cls-2" d="m26.13,1.8L.49,46.21c-1.38,2.4.35,5.39,3.11,5.39h51.29c2.77,0,4.49-2.99,3.11-5.39L32.35,1.8c-1.38-2.4-4.84-2.4-6.22,0Z" />
        </svg>
    );
}

export default ArrowUpPS;