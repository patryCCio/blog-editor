/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { EditorContext } from "./EditorContext";
import { SliderContext } from "./SliderContext";
import MaximizePS from "../assets/svg/MaximizePS";

import SettingsPS from "../assets/svg/SettingsPS";

import TextElPS from "../components/text/TextElPS";
import SourcePS from "../components/source/SourcePS";
import SliderPS from "../components/slider/SliderPS";
import BlockEditorSettings from "../components/BlockEditorSettings";

export const EditorFunctionsContext = createContext();

const EditorFunctionsContextProvider = ({ children }) => {

    const { setElements, elements, setStateSettings, stateSettings, setIsVisible } = useContext(EditorContext);
    const { setActualPopUpTarget, popUp, setPopUp, url } = useContext(SliderContext);


    const checkElement = (type) => {
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
                text: {}
            }
        }
    }

    const createElement = (type) => {
        const obj = checkElement(type);
        setElements((prevState) => ([
            ...prevState,
            obj
        ]));
    }

    const deleteElement = (id, index) => {
        let array = [];

        let arraySettings = [];
        setStateSettings.forEach((el, i) => {
            if (index != i) {
                arraySettings.push(false);
            }
        })

        setStateSettings(arraySettings);

        array = elements.filter(el => {
            if (el.id !== id) {
                return el;
            }
        })
        setElements(array);
    }

    const checkRender = (el, index) => {
        if (el.type === "source") {
            return (
                <SourcePS index={index} key={el.id} id={el.id} />
            );
        } else if (el.type === "text") {
            return (
                <TextElPS index={index} key={el.id} id={el.id} />
            )
        }
    }

    const checkIsYt = (el) => {
        let isYt = false;
        let urlYt;

        if (el.source[el.actualIndex].url.includes("youtube")) {
            isYt = true;
            urlYt = el.source[el.actualIndex].url;
            urlYt = urlYt.replace("watch?v=", "embed/");
        }

        if (isYt) return { isYt, urlYt };

        return { isYt, urlYt: null };
    }

    const handleClickPopUp = (idElement, idArray, popUpState) => {
        if (popUpState) {
            setActualPopUpTarget(idElement, idArray);
        }
        setPopUp(popUpState);
    }

    const handleSetSettings = (index) => {

        let array = stateSettings.map((el, i) => {
            if (index === i) {
                return !el;
            } else {
                return false;
            }
        });

        setStateSettings(array);
    }

    const checkActualSourceType = (el, index, state) => {

        if (state) {
            let string = "&sliders-ps";
            el.source.forEach((inel) => {
                string += " type:" + inel.sourceType + " ";
                string += " sourceReader:" + inel.sourceReader + " ";
                string += " publicId:" + inel.publicId + " ";

                if (inel.url.includes("https")) {
                    string += "url:" + inel.url + "&end-slide";
                } else {
                    string += "computer:" + inel.url + "&end-slide";
                }
            })
            string += "&end-element-ps";

            return string;
        } else {
            if (el.source[el.actualIndex].sourceType === "image") {
                return (
                    <div key={index} className="slider-container-ps">
                        <div className={!stateSettings[index] ? "render-add-element" : "render-add-element active"}>
                            <span onClick={() => handleSetSettings(index)}>
                                <SettingsPS className="settings-svg" />
                            </span>
                            <BlockEditorSettings index={index} />
                        </div>
                        {popUp &&
                            <div className="image-popup">
                                <div className="image-popup-relative">
                                    <div className="image-buttons active">
                                        <MaximizePS className="maximize-icon" onClick={() => handleClickPopUp(el.actualIndex, index, false)} />
                                    </div>
                                    <img className="image-popup-content" src={url}></img>
                                </div>
                            </div>
                        }
                        <div className="iframe-container">
                            <div className="img-container" style={{
                                backgroundImage: `url(${el.source[el.actualIndex].url})`
                            }}></div>
                            {!popUp &&
                                <div className="image-buttons">
                                    <MaximizePS className="maximize-icon" onClick={() => handleClickPopUp(el.actualIndex, index, true)} />
                                </div>
                            }
                        </div>
                        {el.source.length > 1 &&
                            <SliderPS el={el} idArray={index} />
                        }
                    </div >
                )

            } else {

                const obj = checkIsYt(el);
                if (obj.isYt) {
                    return (
                        <div key={index} className="slider-container-ps">

                            <div className={!stateSettings[index] ? "render-add-element" : "render-add-element active"}>
                                <span onClick={() => handleSetSettings(index)}>
                                    <SettingsPS className="settings-svg" />
                                </span>
                                <BlockEditorSettings index={index} />
                            </div>
                            <div className="iframe-container">
                                <iframe title="Youtube video player" src={obj.urlYt} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                                </iframe>
                            </div>
                            {el.source.length > 1 &&
                                <SliderPS el={el} idArray={index} />
                            }
                        </div >
                    );
                } else {
                    return (
                        <div key={index} className="slider-container-ps">
                            <div className={!stateSettings[index] ? "render-add-element" : "render-add-element active"}>
                                <span onClick={() => handleSetSettings(index)}>
                                    <SettingsPS className="settings-svg" />
                                </span>
                                <BlockEditorSettings index={index} />
                            </div>
                            <div className="iframe-container" style={{ paddingTop: 0 }}>
                                <video controls frameBorder="0">
                                    <source src={el.source[el.actualIndex].url} type="video/mp4" />
                                    <source src={el.source[el.actualIndex].url} type="video/ogg" />
                                </video>
                            </div>
                            {el.source.length > 1 &&
                                <SliderPS el={el} idArray={index} />
                            }
                        </div>
                    )
                }

            }
        }

    }

    const setSource = (el, index, state) => {
        if (el.source.length === 0) return null;

        return checkActualSourceType(el, index, state);
    }

    const addTargetBlank = (content) => {
        let string = content;
        if (!string.includes("<a target")) {
            string = string.replace("<a", "<a target='_Blank'");
        }
        return string;
    }

    const recursionFunction = (allItems, helper, style) => {
        allItems.forEach((item) => {
            helper += "<li><p>";
            if (item.items.length === 0) {
                if (item.content.includes("<a")) {
                    item.content = addTargetBlank(item.content);
                }
                helper += item.content + "</p>";
            } else {
                if (style === "ordered") {
                    if (item.content.includes("<a")) {
                        item.content = addTargetBlank(item.content);
                    }
                    helper += item.content + "</p>";
                    helper += "<ol class='list-ps'>";
                    helper = recursionFunction(item.items, helper, style);
                    helper += "</ol>";
                } else {
                    if (item.content.includes("<a")) {
                        item.content = addTargetBlank(item.content);
                    }
                    helper += item.content + "</p>";
                    helper += "<ul class='list-ul-ps'>";
                    helper = recursionFunction(item.items, helper, style);
                    helper += "</ul>";
                }
            }
            helper += "</li>";
        })

        return helper;
    }



    const setSourceText = (el, index, state) => {


        if (el.text === null) return null;
        if (el.text.length === 1 && el.text[0].text === "") return null;
        if (el.text.blocks.length === 0) return null;


        let stringDataBase = "&text-ps";
        let string = "";

        el.text.blocks.forEach(block => {

            if (block.type === "header") {

                if (block.data.text.includes("<a")) {
                    block.data.text = addTargetBlank(block.data.text);
                }

                string += `<h${block.data.level} style="text-align: ${block.data.alignment}">${block.data.text}</h${block.data.level}>`;

                stringDataBase += `<h${block.data.level} style="text-align: ${block.data.alignment}">${block.data.text}</h${block.data.level}>&end-text`;
            } else if (block.type === "paragraph") {
                if (block.data.text.includes("<a")) {
                    block.data.text = addTargetBlank(block.data.text);
                }
                string += `<p style="text-align: ${block.data.alignment}">${block.data.text}</p>`;
                stringDataBase += `<p style="text-align: ${block.data.alignment}">${block.data.text}</p>&end-text`;
            } else if (block.type === "list") {
                let helper = "";
                if (block.data.style === "ordered") {
                    helper = "<ol class='list-ps'>";
                } else {
                    helper = "<ul class='list-ul-ps'>";
                }

                const allItems = block.data.items;
                helper = recursionFunction(allItems, helper, block.data.style);

                if (block.data.style === "ordered") {
                    helper += "</ol>";
                } else {
                    helper += "</ul>";
                }
                string += helper;
                stringDataBase += helper + "&end-text";
            } else if (block.type === "table") {
                let helper = '<table>';

                let allTables = block.data.content;

                allTables.forEach((tab, index) => {
                    if (index === 0) {
                        if (block.data.withHeadings) {
                            helper += "<thead><tr>";
                            tab.forEach((tab2) => {
                                helper += "<th>" + tab2 + "</th>";
                            })
                            helper += "</tr></thead>";
                            helper += "<tbody>";
                        } else {
                            helper += "<tbody><tr>";
                            tab.forEach((tab2) => {
                                helper += "<td>" + tab2 + "</td>";
                            })
                            helper += "</tr>";
                        }
                    } else {
                        helper += "<tr>";
                        tab.forEach((tab2) => {
                            helper += "<td>" + tab2 + "</td>";
                        })
                        helper += "</tr>";
                    }
                })


                helper += '</tbody></table>';

                string += helper;
                stringDataBase += helper + "&end-text"
            } else if (block.type === "delimiter") {
                string += "<p class='delimiter-ps'></p>";
                stringDataBase += "<p class='delimiter-ps'></p>&end-text";
            }
        })

        if (state) {
            string = '<div class="text-rendered-ps">' + string + "</div>";
            stringDataBase += "&end-element-ps"

            return stringDataBase;
        }

        if (!state) {
            return (
                <div className="text-rendered-box-ps" key={index}>
                    <div className={!stateSettings[index] ? "render-add-element" : "render-add-element active"}>
                        <span onClick={() => handleSetSettings(index)}>
                            <SettingsPS className="settings-svg" />
                        </span>
                        <BlockEditorSettings index={index} />
                    </div>
                    <div className="text-rendered-ps" dangerouslySetInnerHTML={{ __html: string }}>
                    </div>
                </div>
            )
        }

    }

    const clearSettingsState = () => {
        let array = stateSettings.map(() => {
            return false;
        })

        setIsVisible(false);

        setStateSettings(array);
    }

    const setElementsIndex = (type, index) => {
        let array = [];
        let arrayOne = [];
        let arrayTwo = [];

        clearSettingsState();

        if (type === "up") {
            arrayOne = elements[index - 1];
            arrayTwo = elements[index];

            elements.forEach((el, indexA) => {
                if (indexA === index - 1) {
                    array.push(arrayTwo);
                }
                else if (indexA === index) {
                    array.push(arrayOne);
                }
                else {
                    array.push(elements[indexA]);
                }

            })

        } else {
            arrayOne = elements[index + 1];
            arrayTwo = elements[index];

            elements.forEach((el, indexA) => {
                if (indexA === index + 1) {
                    array.push(arrayTwo);
                } else if (indexA === index) {
                    array.push(arrayOne);
                } else {
                    array.push(elements[indexA]);
                }
            })


        }

        setElements(array);
    }

    const renderSource = (el, index, state) => {
        switch (el.type) {
            case "source":
                return setSource(el, index, state);

            case "text":
                return setSourceText(el, index, state);
        }

    }

    return (
        <EditorFunctionsContext.Provider value={{ createElement, deleteElement, checkRender, renderSource, setElementsIndex, clearSettingsState }}>
            {children}
        </EditorFunctionsContext.Provider>
    );
}

export default EditorFunctionsContextProvider;