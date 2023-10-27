import { createContext, useContext, useState } from "react";
import { EditorContext } from "./EditorContext";

export const SliderContext = createContext();

// eslint-disable-next-line react/prop-types
const SliderContextProvider = ({ children }) => {

    const [popUp, setPopUp] = useState(false);
    const { elements, setElements } = useContext(EditorContext);
    const [url, setUrl] = useState("");
    const [indexEl, setIndexEl] = useState([]);

    const setActualPopUpTarget = (idElement, idArray) => {
        setUrl(elements[idArray].source[idElement].url);
    }

    const setActualIndex = (idArray, idElement) => {
        let array = [];

        array = elements.map((el, i) => {
            if (i === idArray) {
                return {
                    id: el.id,
                    type: el.type,
                    source: el.source,
                    actualIndex: idElement
                }
            } else {
                return el;
            }
        });

        setElements(array);
    }

    return (
        <SliderContext.Provider value={{ popUp, setPopUp, setActualPopUpTarget, url, indexEl, setIndexEl, setActualIndex }}>
            {children}
        </SliderContext.Provider>
    );
}

export default SliderContextProvider;