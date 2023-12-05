import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")
  const [buttonText, setButtonText] = useState('copy')
  const passwordRef = useRef(null)



  //function to generate any random password
  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])




  //copy to clipboard method
  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
    setButtonText("copied!")
  },[Password, setButtonText])




  // useEffect hook 
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed, passwordGenerator])



  //XML code
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center my-1' >Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={Password} className='outline-none w-full py-1 px-3' placeholder='password' 
          ref={passwordRef}
          style={{ textDecoration: 'none' }}
          />
          <button className='bt outline-none bg-blue-700 text-white px-3 py-0.5 shirnk-0 hover:bg-sky-400'
          onClick={
            copyToClipboard// passing only reference and not calling the copyToClipboard function immediately.
          }
           >{buttonText}</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={30} value={length} className='cursor-pointer' 
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
       
    </>
  )
}



export default App
