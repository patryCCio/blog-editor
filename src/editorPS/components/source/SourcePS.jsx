import { useContext, useState } from "react";
import AddPS from "../../assets/svg/AddPS";
import DeleteSignPS from "../../assets/svg/DeleteSignPS";

import { EditorContext } from "../../context/EditorContext";
import { ElementsContext } from "../../context/ElementsContext";
import TrashPS from "../../assets/svg/TrashPS";

// eslint-disable-next-line react/prop-types
const SourcePS = ({ id, index }) => {

    const { elements } = useContext(EditorContext);
    const { addElementSource, deleteElementSource, deleteElement } = useContext(ElementsContext);

    const [input, setInput] = useState("");
    const [sourceUrl, setSourceUrl] = useState("");
    const [sourceType, setSourceType] = useState("");
    const [file, setFile] = useState("");

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleChangeSourceType = (e) => {
        setSourceType(e.target.value);
    }

    const handleChangeSourceUrl = (e) => {
        setSourceUrl(e.target.value);
    }



    return (
        <div key={id} className="box-movie-ps">
            <div className="box-wrapper">
                <div className="box-ps">
                    <p>Source {id}</p>
                    <div className="input-box">
                        <label>
                            Zdjęcie
                            <input type="radio" name="sourceType" value="image" onChange={handleChangeSourceType} />
                        </label>
                        <label>
                            Wideo
                            <input type="radio" name="sourceType" value="video" onChange={handleChangeSourceType} />
                        </label>
                    </div>
                    {sourceType !== "" &&
                        <div className="input-box">
                            <label>
                                URL
                                <input type="radio" name="sourceUrl" value="url" onChange={handleChangeSourceUrl} />
                            </label>
                            <label>
                                Z komputera
                                <input type="radio" name="sourceUrl" value="computer" onChange={handleChangeSourceUrl} />
                            </label>
                        </div>
                    }


                    {
                        sourceUrl === "url" &&
                        <div className="box-icon">
                            <input type="text" className="box-input-ps" placeholder="url" value={input} onChange={(e) => setInput(e.target.value)} />
                            <AddPS className="add-icon" onClick={() => addElementSource({ input, sourceType, sourceUrl, file }, id, setInput, setFile)} />
                        </div>
                    }

                    {
                        sourceUrl === "computer" &&
                        <div className="box-icon">
                            <div className="file-input-div">
                                <input type="file" className="input-file-ps" onChange={handleFile} />
                            </div>

                            <AddPS className="add-icon" onClick={() => addElementSource({ input, sourceType, sourceUrl, file }, id, setInput, setFile)} />
                        </div>
                    }

                    {
                        elements.map((el) => {
                            if (el.id === id) {
                                return el.source.map((el2, index) => {
                                    return (
                                        <div className="box-inner-el" key={index}>
                                            <p>{el2.sourceType}: {el2.url}</p>
                                            <DeleteSignPS className="delete-icon" onClick={() => deleteElementSource(el2.url, el.id)} />
                                        </div>
                                    );
                                })
                            }
                        })
                    }

                </div>
                <span onClick={() => deleteElement(id, index)}>
                    <TrashPS className="delete-icon" />
                </span>
            </div>
            <hr />

        </div>
    );
}

export default SourcePS;