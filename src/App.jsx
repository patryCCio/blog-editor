import { useEffect, useState } from "react"
import EditorPS from "./editorPS/EditorPS"
import "./assets/index.css";
import "./editorPS/assets/styles/editorPS.css";


const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, [])


  useEffect(() => {

  }, [text])

  useEffect(() => {
    console.log('text', text);
  }, [text])

  if (isLoading) return null;

  const handleFunctionEdit = async (textEditor) => {
    let data = "";

    textEditor.forEach((el) => {
      data += el;
    })


    console.log('textEditor', data);


  }

  return (
    <div className="wrapper">
      <EditorPS setText={setText} fun={handleFunctionEdit} filled={false} />
    </div>
  )
}

export default App
