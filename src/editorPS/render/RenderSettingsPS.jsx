import { useContext, useEffect, useState } from "react";
import { EditorFunctionsContext } from "../context/EditorFunctionsContext";
import { EditorContext } from "../context/EditorContext";
import DashLeftPS from "../assets/svg/DashLeftPS";
import { startInterpreterEditor } from "./Interpreter";
import { ElementsContext } from "../context/ElementsContext";

const RenderSettingsPS = ({ filled, element }) => {
    const { elements, setIsVisibleRender, isVisibleRender } = useContext(EditorContext);
    const { checkRender } = useContext(EditorFunctionsContext);
    const { addElement } = useContext(ElementsContext);

    const [isLoading, setIsLoading] = useState(true);

    const createData = async () => {
        if (filled && elements.length === 0) {

            const data = await startInterpreterEditor(element);

            console.log('hello!', data);

            data.forEach(el => {
                addElement(el.type, el.data);
            })
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        createData();
    }, [])


    if (isLoading) return null;

    return (
        <div className="render-settings-box-ps">
            <span onClick={() => setIsVisibleRender(!isVisibleRender)}>
                <DashLeftPS className="dash-left" />
            </span>
            {elements.map((el, index) => {
                return checkRender(el, index);
            })}
        </div>

    );
}

export default RenderSettingsPS;