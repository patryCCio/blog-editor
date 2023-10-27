import { useContext } from "react";
import ArrowDownPS from "../assets/svg/ArrowDownPS";
import ArrowUpPS from "../assets/svg/ArrowUpPS";
import TrashPS from "../assets/svg/TrashPS";
import { EditorFunctionsContext } from "../context/EditorFunctionsContext";
import { EditorContext } from "../context/EditorContext";
import { ElementsContext } from "../context/ElementsContext";

// eslint-disable-next-line react/prop-types
const BlockEditorSettings = ({ index }) => {

    const { setElementsIndex } = useContext(EditorFunctionsContext);
    const { deleteElement } = useContext(ElementsContext);
    const { elements } = useContext(EditorContext);

    const checkArrowUp = () => {
        if (index === 0) {
            return null;
        } else {
            return (
                <div className="editor-elements" onClick={() => setElementsIndex("up", index)}>
                    <ArrowUpPS className="arrow-up-ps" />
                    <p>
                        Do góry
                    </p>
                </div>
            )
        }
    }



    const checkArrowDown = () => {
        if (index === elements.length - 1) {
            return null;
        } else {
            return (
                <div className="editor-elements" onClick={() => setElementsIndex("down", index)}>
                    <ArrowDownPS className="arrow-down-ps" />
                    <p>
                        W dół
                    </p>
                </div>
            )
        }
    }

    return (
        <div className="block-editor-elements">
            {checkArrowUp()}
            <div className="editor-elements" onClick={() => deleteElement(elements[index].id, index)}>
                <TrashPS className="delete-icon" />
                <p>
                    Usuń
                </p>
            </div>
            {checkArrowDown()}
        </div>
    );
}

export default BlockEditorSettings;