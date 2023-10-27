import { useContext, useEffect, useState } from "react";
import { EditorContext } from "../context/EditorContext";
import { EditorFunctionsContext } from "../context/EditorFunctionsContext";
import { SliderContext } from "../context/SliderContext";
import AddPS from "../assets/svg/AddPS";
import BlockEditorElements from "../components/BlockEditorElements";

const RenderPS = ({ setText, fun }) => {

    const { elements, isVisible, setIsVisible, setTextEditor, textEditor } = useContext(EditorContext);
    const { renderSource } = useContext(EditorFunctionsContext);
    const { setIndexEl, indexEl } = useContext(SliderContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (indexEl.length === 0) {
            setIsLoading(false);
        }
    }, [indexEl])

    useEffect(() => {
        setIndexEl([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {

        if (textEditor.length > 0) {
            setText(textEditor);
            fun(textEditor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textEditor])

    const handleClickSave = () => {

        setTextEditor([]);

        elements.forEach((el, index) => {
            let text = renderSource(el, index, true);
            setTextEditor((prevState) => ([
                ...prevState,
                text
            ]))
        })
    }

    const handleClickAdd = () => {
        if (isVisible) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }


    if (!isLoading) {
        return (
            <div className="render-ps" style={{ marginBottom: isVisible ? "150px" : 0 }}>
                {
                    elements.map((el, index) => {
                        return renderSource(el, index, false);
                    })
                }
                <div className={!isVisible ? "render-add-element" : "render-add-element active"}>
                    <AddPS className="add-svg-ps" onClick={handleClickAdd} />
                    <button onClick={handleClickSave}>Console log</button>
                    <BlockEditorElements />
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default RenderPS;