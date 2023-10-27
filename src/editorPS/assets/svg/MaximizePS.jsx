import "../styles/svg.css";

const MaximizePS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} height="1em" width="1em" onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.81 192.82">
            <g className="cls-maximize-borders">
                <path className="cls-1" d="m.5,126.26v42.07c0,13.25,10.74,23.99,23.99,23.99h42.07" />
                <path className="cls-1" d="m192.31,66.55V24.49c0-13.25-10.74-23.99-23.99-23.99h-42.07" />
            </g>
            <g className="cls-maximize-up-arrow">
                <polygon className="cls-1 cls-arrow" points="145.2 47.62 140.92 43.33 146.91 41.62 152.91 39.91 151.19 45.9 149.48 51.9 145.2 47.62" />
                <line className="cls-1 cls-line" x1="142.91" y1="49.9" x2="113.91" y2="78.91" />
            </g>
            <g className="cls-maximize-down-arrow">
                <polygon className="cls-1 cls-arrow" points="48.19 144.62 52.48 148.9 46.48 150.62 40.49 152.33 42.2 146.34 43.91 140.34 48.19 144.62" />
                <line className="cls-1 cls-line" x1="79.12" y1="113.7" x2="50.12" y2="142.7" />
            </g>
        </svg>
    );
}

export default MaximizePS;