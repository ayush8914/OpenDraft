import { use, useState } from "react"
import { useNavigate , useLocation } from "react-router-dom"

function AppBar(props: {
    isLoggedIn : boolean
    handlePublish? : () => void
}) {

    const [showCreatePost, setShowCreatePost] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/signin")
    }

    const handleNavigate = () => {
        navigate("/create")
    }

    const isCreatePage = location.pathname === "/create"

  return (
            <div className="w-full flex justify-between shadow-sm p-3 mb-5">
            <div className="text-xl font-semibold flex items-center">
                OpenDraft
            </div>
            <div className="flex gap-3 items-center">
                {isCreatePage ?
                (   <div className="text-white bg-green-600 hover:bg-green-800 text-md px-4 py-1 rounded-2xl hidden sm:block"
                    onClick={props.handlePublish}>
                       Publish
                   </div>)
                :
                <div onClick={handleNavigate}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-9 text-gray-400 hover:text-gray-600 hover:size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                }
                
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={()=>setShowCreatePost(!showCreatePost)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-lg text-white bg-gray-800 hover:bg-black px-2 py-1 rounded" onClick={handleLogout} >{props.isLoggedIn ? "Logout" : "Login"}</div>
            </div>
        </div>
  )
}

export default AppBar