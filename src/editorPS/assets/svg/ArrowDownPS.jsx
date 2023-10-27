import "../styles/svg.css";

const ArrowDownPS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.48 160.35" height="1em" width="1em" onClick={onClick}>
            <line className="cls-1" x1="29.24" x2="29.24" y2="134.74" />
            <path className="cls-2" d="m32.35,158.55l25.64-44.42c1.38-2.4-.35-5.39-3.11-5.39H3.6c-2.77,0-4.49,2.99-3.11,5.39l25.64,44.42c1.38,2.4,4.84,2.4,6.22,0Z" />
        </svg>
    );
}

export default ArrowDownPS;