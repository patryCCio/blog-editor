import { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";
import { EditorContext } from "../../context/EditorContext";
import TrashPS from "../../assets/svg/TrashPS";
import { ElementsContext } from "../../context/ElementsContext";

// eslint-disable-next-line react/prop-types
const TextElPS = ({ id, index }) => {

    const { elements, setElements } = useContext(EditorContext);
    const { deleteElement } = useContext(ElementsContext);
    const ejInstance = useRef(null);
    const [data, setData] = useState({
        time: new Date().getTime(),
        blocks: []
    });



    useEffect(() => {
        let array = elements.map((element) => {
            if (element.id === id) {
                return {
                    id: element.id,
                    type: element.type,
                    text: data,
                }
            } else {
                return element;
            }
        })

        setElements(array);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const initializeEditor = () => {
        let array = elements.filter((el) => {
            if (el.id === id) {
                return el;
            }
        })
        console.log('arrayeditor', array);
        const editor = new EditorJS({
            holder: `editor-js-${id}`,
            onReady: () => {
                ejInstance.current = editor;
            },
            data: array[0].text,

            onChange: async () => {
                let content = await editor.saver.save();

                console.log(content);
                setData(content);
            },
            tools: EDITOR_JS_TOOLS,
        });
    }

    useEffect(() => {

        let array = elements.filter((el) => {
            if (el.id === id) {
                return el;
            }
        })

        setData(array[0].text);

        if (ejInstance.current === null) {
            initializeEditor();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div key={id} className="box-text-ps">
            <div className="box-wrapper">
                <div className="box-ps">
                    <p>Text {id}</p>
                    <div className="editor-text" id={"editor-js-" + id} />
                </div>
                <span onClick={() => deleteElement(id, index)}>
                    <TrashPS className="delete-icon" />
                </span>
            </div>
            <hr />

        </div>
    )

}

export default TextElPS;