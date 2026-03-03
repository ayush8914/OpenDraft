import { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import AppBar from "../components/AppBar"

function Blogs() {
    const [blogs, setBlogs] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

     const fetchBlogs = async () => {
           try{
                setIsLoading(true)
                const response = await fetch("https://backend.ayush-gevariya.workers.dev/api/v1/blog/bulk", {
                    method : "GET",
                    headers : {
                        "Authorization" : localStorage.getItem("token") as string
                    }
                })
                const data = await response.json()
                console.log(data)
                setBlogs(data.blogs)

           }
           catch(e){
               console.log(e)
           }
           finally{
               setIsLoading(false)
           }
    }

    useEffect(() => {
        document.title = "Blogs"
        if(!localStorage.getItem("token")){
            window.location.href = "/signin"
        }
        fetchBlogs();       
    }, [])


  return (
      <div>
        <AppBar isLoggedIn={localStorage.getItem("token") !== null} />
    
        <div className="flex justify-center items-center p-4">
            {isLoading &&  
                <div className="text-center w-full">
                  <div
                    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                  ></div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    This may take a few seconds
                  </p>
                </div>
            }
            {!isLoading && <div className="w-full sm:w-6/8  h-screen   flex flex-col gap-14 p-6">
                {blogs.map((blog : any) => {
                    return <BlogCard key={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={blog.publishedDate} />
                })}
            </div>
            }
        </div>
    </div>
  )
}

export default Blogs