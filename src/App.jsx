import { useCallback, useRef, useState } from 'react';
import * as parser from '@babel/parser';
import * as generator from '@babel/generator';
import Editor from "@monaco-editor/react"
const generate = generator.default;

 
function indent(code, lang, tabsize) {
  if (lang === "js") {
    let ast = parser.parse(code);
    const formatted = generate(ast).code;
    return formatted;
  }
  return 0;
}
function App() {
  
  const [code, setCode] = useState(`function foo( ){console.log("bad")}`);
  const [lang, setLang] = useState("js");
  const codeRef = useRef(null);
  const copy = useCallback(() => {
    const model = codeRef.current.getModel();
    const fullRange = model.getFullModelRange(); // Gets full range of text

    codeRef.current.setSelection(fullRange); // Highlights the entire code
    codeRef.current.focus(); // Focus the editor to see the selection
    window.navigator.clipboard.writeText(code);
  }, [code]);
  const fixIndentation = useCallback(() => {
    setCode(indent(code, lang, 4));
  }, [code, lang]);
  const  handleEditorDidMount = useCallback((editor, monaco)=> {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    codeRef.current = editor;
    console.log(codeRef)
  },[codeRef])
  return (
    <>
    <div className='border-1 h-20 flex items-center justify-center'>
      <h1 className='text-4xl'>Code Fixer</h1>
    </div>
    <div className='flex flex-col items-center justify-center' >
      <div className='w-340 m-8'>
        <Editor 
        className="border-1 border-black " 
        height="60vh"
        value={code}
        onMount={handleEditorDidMount}
        onChange={(e)=> setCode(e.target.value)}
        ref={codeRef}
        />

      </div>
      <div className='flex flex-col items-center justify-center'> 
        <select name="" id="" value={lang} onChange={e => setLang(e.target.value)}>
        <option value="py">Python</option>
        <option value="js">JavaScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        </select>
        <div className=' flex items-center justify-center'>
        	  <button className="border-1 border-blue-700 rounded-lg p-0.5 pr-2 pl-2 cursor-pointer bg-blue-700 text-white h-12 w-25 m-2" onClick={fixIndentation}>
        Fix
        </button>
        <button className="border-1 border-blue-700 rounded-lg p-0.5 pr-2 pl-2 cursor-pointer bg-blue-700 text-white h-12 w-25 m-2" onClick={copy}>Copy</button>
        </div>
      </div>
     
    </div>
    </>
  )
}
export default App;