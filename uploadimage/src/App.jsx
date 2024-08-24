import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState()

  const upload = async()=>{
    const formData = new FormData();
    formData.append('file',file)
    await axios.post('http://localhost:3000/upload',formData)
    .then((res)=>console.log('uploaded')).catch((er)=>console.log('rroe'))
  }
  return (
    <>
     <div>
      <input type='file' onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={upload}>upload</button>
     </div>
      
    </>
  )
}

export default App
