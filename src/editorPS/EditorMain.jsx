import { useContext } from "react";
import BlockEditorView from "./components/BlockEditorView";
import { EditorContext } from "./context/EditorContext";
import RenderSettingsPS from "./render/RenderSettingsPS";

// eslint-disable-next-line react/prop-types
const EditorMain = ({ setText, fun, filled, element }) => {

    const { isVisibleRender } = useContext(EditorContext);

    return (
        <div className={isVisibleRender ? "editor active" : "editor"}>
            <BlockEditorView setText={setText} fun={fun} />
            <div className={isVisibleRender ? "render-settings-ps active" : "render-settings-ps"} >
                <RenderSettingsPS filled={filled} element={element} />
            </div>
        </div>
    );
}

export default EditorMain;