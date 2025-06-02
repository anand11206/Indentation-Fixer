import {
    useCallback, useRef, useState } from 'react'
function indent(code,lang,tabsize){
      var c= 0;
    var ans = "";
    	if(lang == "cpp"){
        let brace = []
        		var newline=0;
        		for(var i=0; i<code.length; i++){
                  if(code[i]=="(") brace.push("(");
                  if(code[i]==")") brace.pop();
            			if(code[i]=="{" || code[i]=="\n" || (code[i]==";" && brace.length == 0)){
                    newline=1
                    var j=i+1
                    while(code[j]==" " || code[j]=="\n"){
                        j++;
                        }
                    
                    }

                    else if(code[i]==";" && brace.length!=0){
                      ans+=" "
                    }
                    else if(code[i]==")"){
                      j=i+1
                    while(code[j]==" " || code[j]=="\n"){
                        j++;
                        }
                    
                    }
                			if(code[i]=="{") c++
                    			else if(code[i]=="}") c--
                if(code[i]!="\n") ans+=code[i]
                if(code[i]==";" && brace.length!=0){
                      ans+=" "
                    }
                if(newline){
                    				ans+="\n"
                    				console.log(c,tabsize);
                    				for(var k = 0; k<c*tabsize; k++) ans+=" ";
                    i=j-1
                    newline=0
                    			}
                		}
                    if(code[i]==")") i=j-1;
            	}
        	return ans;
        	
        }
    function App() {
        const [code, setCode] = useState("")
        const [lang, setLang] = useState("cpp")
        const codeRef = useRef(null)
        const copy = useCallback(()=> {
            codeRef.current?.select()
            window.navigator.clipboard.writeText(code)
            }, [code])
        const fixIndentation = useCallback(() => {
            setCode(indent(String(code),lang,4))
            },[code,lang])
        return (
        	<div className=' flex flex-col items-center  bg-blue-500 h-screen w-full p-5'>
        		<div className='text-6xl mb-5 mt-3 p-7 border-2 rounded-2xl bg-white'>Code Indentation Fixer</div>
        		<div className='flex flex-col items-center justify-center rounded-2xl p-10 h-full w-200 bg-white'>
        			<textarea 
        className="border-2 border-black rounded-md w-180 h-90 resize p-2" 
        value={
            code} 
        ref={
            codeRef}
        onChange={
            (e)=>setCode(e.target.value)} />
        <select name="" id="" value={
            lang} onChange={
            (e)=>setLang(e.target.value)}>
        <option value="py">Python</option>
        <option value="js">JavaScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        </select>
        <div className=' flex items-center justify-center'>
        	  <button 
        className="border-1 border-blue-700 rounded-lg p-0.5 pr-2 pl-2 cursor-pointer bg-blue-700 text-white h-12 w-25 m-2" 
        onClick={
            fixIndentation}>
        Fix
        </button>
        <button 
        className="border-1 border-blue-700 rounded-lg p-0.5 pr-2 pl-2 cursor-pointer bg-blue-700 text-white h-12 w-25 m-2" 
        onClick={
            copy}>Copy</button>
        </div>
        		</div>
        	
        	</div>
        )
        }
    export default App
    