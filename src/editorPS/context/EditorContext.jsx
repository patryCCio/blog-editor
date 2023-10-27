import { createContext, useState } from "react";

export const EditorContext = createContext();

// eslint-disable-next-line react/prop-types
const EditorContextProvider = ({ children }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleRender, setIsVisibleRender] = useState(false);
    const [elements, setElements] = useState([]);
    const [dataEditorJS, setDataEditorJS] = useState([]);
    const [textEditor, setTextEditor] = useState([]);
    const [stateSettings, setStateSettings] = useState([]);

    return (
        <EditorContext.Provider value={{ dataEditorJS, setDataEditorJS, isVisible, setIsVisible, elements, setElements, isVisibleRender, setIsVisibleRender, textEditor, setTextEditor, setStateSettings, stateSettings }}>
            {children}
        </EditorContext.Provider>
    );
}

export default EditorContextProvider;