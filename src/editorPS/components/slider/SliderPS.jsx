import { useContext, useEffect, useRef } from "react";
import { SliderContext } from "../../context/SliderContext";

const SliderPS = ({ el, idArray }) => {

    const { indexEl, setIndexEl, setActualIndex } = useContext(SliderContext);
    const spanRef = useRef([]);

    const handleClickDot = (idArray, idElement) => {
        setSpanRef(idElement);
        setActualIndex(idArray, idElement);
    }

    const setSpanRef = (id) => {
        for (let x = 0; x < spanRef.current.length; x++) {
            if (x === id) {
                spanRef.current[x].className = "active";
            } else {
                spanRef.current[x].className = "";
            }
        }
    }

    useEffect(() => {
        if (el.source.length > 0) {
            setIndexEl((prevState) => ([
                ...prevState,
                {
                    idArray: idArray,
                    idElement: el.actualIndex
                }
            ]))
        }
    }, [])

    useEffect(() => {
        if (spanRef.current.length > 0) {
            setSpanRef(el.actualIndex);
        }
    }, [spanRef])

    return (
        <div className="slider-dots-ps">
            {el.source.map((elR, idElement) => {
                return <span ref={(el2) => spanRef.current[idElement] = el2} key={idElement} onClick={() => handleClickDot(idArray, idElement)}></span>
            })}
        </div>
    );
}

export default SliderPS;