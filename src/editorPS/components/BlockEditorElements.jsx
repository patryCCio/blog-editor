import { useContext } from "react";
import FilePS from "../assets/svg/FilePS";
import TextPS from "../assets/svg/TextPS";
import { ElementsContext } from "../context/ElementsContext";

const BlockEditorElements = () => {

    const { addElement } = useContext(ElementsContext);

    return (
        <div className="block-editor-elements">
            <div className="editor-elements" onClick={() => addElement("source")}>
                <FilePS className="svg-file" />
                <p>
                    Zdjęcia / wideo
                </p>
            </div>

            <div className="editor-elements" onClick={() => addElement("text")}>
                <TextPS className="svg-text" />
                <p>
                    Tekst
                </p>
            </div>
        </div>
    );
}

export default BlockEditorElements;