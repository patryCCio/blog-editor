import RenderPS from "../render/RenderPS";

// eslint-disable-next-line react/prop-types
const BlockEditorView = ({ setText, fun }) => {

    return (
        <div className="block-editor-view">
            <div className="editor-view">
                <h4 style={{ padding: '1rem' }}>Editor by Patryk Szczerbiński - https://github.com/patryCCio. For text editor I've used Editor.js</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: '1rem' }}>
                    <a target="_Blank" style={{ fontSize: 16, color: "tomato", textDecoration: "none" }} href="https://github.com/patryCCio/blog-editor" rel="noreferrer">Check project on GitHub</a>
                    <a target="_Blank" style={{ fontSize: 16, color: "tomato", textDecoration: "none" }} href="https://editorjs.io/" rel="noreferrer">Editor.js</a>

                </div>
                <RenderPS setText={setText} fun={fun} />
            </div>
        </div>
    );
}

export default BlockEditorView;