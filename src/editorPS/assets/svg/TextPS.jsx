import "../styles/svg.css";

const TextPS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} height="1em" width="1em" onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183.3 182.34">

            <path className="cls-1 text1-ps" d="m160.82,146.91l6.69,28.19-40.68-29.81c-2.96-2.17-6.52-3.39-10.19-3.43-75.21-.88-118.39,3.13-113.22-95.5C6.26-7.88,76.47,3.01,129.94,5.72c43.75,2.22,68.08,43.77,34.98,108.27-9.94,19.37-6.74,21.81-4.11,32.92Z" />
            <circle className="cls-1 cls-circle text2-ps" cx="50.17" cy="72.39" r="6.73" />
            <circle className="cls-1 cls-circle text3-ps" cx="89.07" cy="72.39" r="6.73" />
            <circle className="cls-1 cls-circle text4-ps" cx="127.98" cy="72.39" r="6.73" />
        </svg>
    );
}

export default TextPS;