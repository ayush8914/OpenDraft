import { useState } from "react"
import AppBar from "../components/AppBar"
import type { BlogInput } from "@ayushgevariya/opendraft"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function CreateBlog() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [blogData, setBlogData] = useState<BlogInput>({
        "title" : "",
        "content" : "",
        "published" : false
    })

    const handlePublish =async () => {
        try{
            setIsLoading(true)
            const response =await axios.post("https://backend.ayush-gevariya.workers.dev/api/v1/blog",{
                title : blogData.title,
                content : blogData.content,
                published : true
            },{
                headers : {
                    "Authorization" : localStorage.getItem("token") as string
                }
            })
            
            if(response.status === 200){
                navigate("/blogs")
            }
            else{
                setError(response.data.error)
            }

        }
        catch(e:any){
            setError(e.message)
        }
        finally{
            setIsLoading(false)
        }
    }

  return (
    <div>
        <AppBar isLoggedIn={localStorage.getItem("token") ? true : false} handlePublish={handlePublish} />
        <div className="flex justify-center p-4 sm:p-1">
            <div className="flex flex-col justify-center border p-5 rounded-md border-gray-300 w-full sm:w-2/3 ">
                {isLoading &&  
                <div className="text-center w-full">
                  <div
                    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                  ></div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Creating your Post....
                  </p>
                </div>
                }
                {error && <div className="text-red-500">{error}</div>}
                {!isLoading && <div className="flex flex-col gap-4">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-13 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <div className="border py-8 border-gray-300 ml-1 mr-2"/>
                        <textarea placeholder="Title" rows={2} value={blogData.title}  className="px-2 py-1 text-5xl focus:outline-none text-gray-500 rounded-sm border-gray-300 font-sans w-full resize-none"
                        onChange={(e)=>{
                            setBlogData({
                                ...blogData,
                                "title" : e.target.value 
                            })
                        }}
                        />
                    </div>
                    <div className="w-full">
                        <textarea placeholder="Tell me your story..." value={blogData.content} rows={16} className="text-xl text-gray-600 p-5 focus:outline-gray-300 focus:outline-rounded-md w-full"
                        onChange={(e) => setBlogData({
                            ...blogData,
                            "content" : e.target.value 
                        })}
                        />
                    </div>
                </div>}
            </div>
        </div>
        <div className="flex justify-center p-2">
                <div className="text-white w-full bg-green-600 hover:bg-green-800 text-md text-center px-4 py-2 rounded-lg block sm:hidden"
                        onClick={handlePublish}>
                           Publish
                </div>
        </div>
    </div>
  )
}

export default CreateBlog