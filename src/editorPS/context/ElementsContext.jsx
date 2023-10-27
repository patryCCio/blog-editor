/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { EditorContext } from "./EditorContext";

export const ElementsContext = createContext();

const ElementsContextProvider = ({ children }) => {

    const { elements, setElements, stateSettings, setStateSettings, setIsVisible } = useContext(EditorContext);

    const checkElement = (type, element) => {


        if (element !== undefined && element !== null) {
            console.log(element);

            if (type === "source") {
                const data = element;
                return {
                    id: data.id,
                    type: "source",
                    actualIndex: data.actualIndex,
                    source: data.source,
                }

            } else if (type === "text") {
                return {
                    id: new Date().getTime(),
                    type: "text",
                    text: {
                        time: new Date().getTime(),
                        blocks: element
                    }
                }
            }
        } else {
            if (type === "source") {
                return {
                    id: new Date().getTime(),
                    type: "source",
                    source: [],
                }

            } else if (type === "text") {
                return {
                    id: new Date().getTime(),
                    type: "text",
                    text: {
                        time: new Date().getTime(),
                        blocks: []
                    }
                }
            }
        }


    }

    const addElement = (type, element) => {
        const array = stateSettings;
        array.push(false);

        setIsVisible(false);

        setStateSettings(array);

        const obj = checkElement(type, element);
        setElements((prevState) => ([
            ...prevState,
            obj
        ]))
    }

    const deleteElement = (id, index) => {

        const array2 = []
        stateSettings.forEach((el, i) => {
            if (i != index) {
                return array2.push(false);
            }
        })

        setStateSettings(array2);


        let array = [];
        array = elements.filter(el => {
            if (el.id !== id) {
                return array;
            }
        })
        setElements(array);
    }

    const checkElementErrors = (obj) => {
        let isCheckIf = false;

        if (obj.sourceUrl === "url") {
            if (obj.input === "") return true;
            if (obj.sourceType === "image") {
                if (!obj.input.includes(".jpg") && !obj.input.includes(".png") && !obj.input.includes(".jpeg") && !obj.input.includes(".gif") && !obj.input.includes("drive.google")) {
                    isCheckIf = true;
                }
            }

            if (obj.sourceType === "video") {
                if (!obj.input.includes(".mp4") && !obj.input.includes("youtube")) {
                    isCheckIf = true;
                }
            }
        }

        if (obj.sourceUrl === "computer") {
            if (obj.file === "") return true;
            if (obj.file.type === undefined) return true;
            if (obj.sourceType === "image") {
                if (obj.file.type !== "image/jpeg" && obj.file.type !== "image/jpg" && obj.file.type !== "image/png" && obj.file.type !== "image/gif") {
                    isCheckIf = true;
                }
            }
            if (obj.sourceType === "video") {
                if (obj.file.type !== "video/mp4") {
                    isCheckIf = true;
                }
            }
        }

        return isCheckIf;
    }

    const getUrl = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => resolve(reader.result)
        })
    }

    const addElementSource = async (obj, id, setInput, setFile) => {
        let array = [];

        const isErrors = checkElementErrors(obj);

        if (isErrors) return null;

        for (let x = 0; x < elements.length; x++) {
            let arrayHelper = elements[x].source;
            let urlPush;
            let urlFile;

            if (elements[x].id === id) {
                if (obj.sourceUrl == "url") {
                    const helper = "none";
                    arrayHelper.push({ url: obj.input, sourceType: obj.sourceType, sourceReader: helper, publicId: "none" });
                    array.push({
                        id: elements[x].id,
                        type: elements[x].type,
                        source: arrayHelper,
                        actualIndex: 0
                    })
                } else {
                    const helper = await getUrl(obj.file);
                    urlFile = await URL.createObjectURL(obj.file);
                    urlPush = urlFile;
                    arrayHelper.push({ url: urlPush, sourceType: obj.sourceType, sourceReader: helper, publicId: "none" });
                    array.push({
                        id: elements[x].id,
                        type: elements[x].type,
                        source: arrayHelper,
                        actualIndex: 0
                    })
                }

            } else {
                array.push(elements[x]);
            }


        }

        setElements(array);
        setInput("");
        setFile("");

    }

    const deleteElementSource = (url, id) => {
        let array = [];

        array = elements.map((element) => {
            if (element.id === id) {
                array = element.source.filter(source => {
                    if (source.url !== url) return source;
                });
                return {
                    id: element.id,
                    type: element.type,
                    source: array,
                    actualIndex: 0
                }
            } else {
                return element;
            }
        });

        setElements(array);
    }

    return (
        <ElementsContext.Provider value={{ addElementSource, deleteElementSource, addElement, deleteElement }}>
            {children}
        </ElementsContext.Provider>
    );
}

export default ElementsContextProvider;