import EditorContextProvider from "./context/EditorContext";
import EditorFunctionsContextProvider from "./context/EditorFunctionsContext";
import ElementsContextProvider from "./context/ElementsContext";
import SliderContextProvider from "./context/SliderContext";
import EditorMain from "./EditorMain";

// eslint-disable-next-line react/prop-types
const EditorPS = ({ setText, fun, filled, element }) => {
    return (
        <EditorContextProvider>
            <SliderContextProvider>
                <EditorFunctionsContextProvider>
                    <ElementsContextProvider>
                        <EditorMain setText={setText} fun={fun} filled={filled} element={element} />
                    </ElementsContextProvider>
                </EditorFunctionsContextProvider>
            </SliderContextProvider>
        </EditorContextProvider>
    );
}

export default EditorPS;