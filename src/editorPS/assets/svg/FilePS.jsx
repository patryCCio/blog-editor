import "../styles/svg.css";

const FilePS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} height="1em" width="1em" onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183.3 182.34">

            <path className="cls-1 cls-file-frame" d="m162.35,163.5H18.22c-9.79,0-17.72-7.93-17.72-17.72V39.94c0-5.8,2.84-11.24,7.61-14.55L39.36,3.67c2.97-2.06,6.5-3.17,10.11-3.17h112.88c9.79,0,17.72,7.93,17.72,17.72v127.57c0,9.79-7.93,17.72-17.72,17.72Z" />
            <g>
                <circle className="cls-1 cls-file-circle" cx="105.71" cy="56.74" r="31.82" />
                <line className="cls-1 cls-file-line" x1="132.39" y1="84.36" x2="141.56" y2="93.85" />
                <line className="cls-1 cls-file-line" x1="69.86" y1="19.63" x2="79.03" y2="29.11" />
                <line className="cls-1 cls-file-line" x1="69.86" y1="19.63" x2="79.03" y2="29.11" />
                <line className="cls-1 cls-file-line" x1="78.08" y1="83.42" x2="68.6" y2="92.59" />
                <line className="cls-1 cls-file-line" x1="142.82" y1="20.89" x2="133.33" y2="30.06" />
                <line className="cls-1 cls-file-line" x1="67.31" y1="56.07" x2="54.12" y2="55.84" />
                <line className="cls-1 cls-file-line" x1="157.3" y1="57.63" x2="144.11" y2="57.4" />
                <line className="cls-1 cls-file-line" x1="106.37" y1="18.34" x2="106.6" y2="5.15" />
                <line className="cls-1 cls-file-line" x1="104.81" y1="108.33" x2="105.04" y2="95.14" />
            </g>
            <path className="cls-1 cls-file-mountains" d="m.5,94.02s65.03-14.49,72.21,9.78,107.36,59.7,107.36,59.7" />
            <path className="cls-1 cls-file-mountains" d="m101.5,128.8s24.18-25.78,78.57-28.91" />
            <path className="cls-1 cls-file-mountains" d="m.5,130.41s25.9-10.13,72.21,33.09" />
        </svg>
    );
}

export default FilePS;