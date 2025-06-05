import { useCallback, useRef, useState } from 'react';
import * as parser from '@babel/parser';
import * as generator from '@babel/generator';

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
    codeRef.current?.select();
    window.navigator.clipboard.writeText(code);
  }, [code]);
  const fixIndentation = useCallback(() => {
    setCode(indent(code, lang, 4));
  }, [code, lang]);
  return <div className=' flex flex-col items-center  bg-blue-500 h-screen w-full p-5'>
        		<div className='text-6xl mb-5 mt-3 p-7 border-2 rounded-2xl bg-white'>Code Indentation Fixer</div>
        		<div className='flex flex-col items-center justify-center rounded-2xl p-10 h-full w-200 bg-white'>
        			<textarea className="border-2 border-black rounded-md w-180 h-90 resize p-2" value={code} ref={codeRef} onChange={e => setCode(e.target.value)} />
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
        	
        	</div>;
}
export default App;