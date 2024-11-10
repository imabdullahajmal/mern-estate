import { createClient } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
// import supabase from "../utils/supabase"

const Profile = () => {
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [status, setStatus] = useState('')
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(formData);
  

  console.log(file)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = async (file) => {
    setUploading(true)
    const fileName = `${Math.random().toString(36).slice(-6)}-${file.name}`;
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
    const filePath = `pfps/${fileName}`
    const { data, error } = await supabase.storage.from('mern-estate').upload(filePath, file)
    if (error) {
      setUploading(false)
      setStatus('Failed to Upload!')
      console.log(error)
    } else {
      setUploading(false)
      setStatus('Uploaded Successfully!')
      console.log("success")
      const { data } = supabase.storage.from('mern-estate').getPublicUrl(filePath)
      console.log(data.publicUrl)
      
      setFormData({ ...formData, avatar: data.publicUrl })
    }

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4" alt="profile" />
        <span className='font-bold text-center mt-5'>{uploading ?
          (<p className='text-gray-600'>uploading...</p>)
          : (<p className={status === 'Uploaded Successfully!' ? 'text-green-600' : '' || status === 'Failed to Upload!' ? 'text-red-600' : ''}>{status}</p>)}</span>
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-bold">Delete account</span>
        <span className="text-red-700 cursor-pointer font-bold">Sign out</span>
      </div>
    </div>
  )
}

export default Profile
