import { Link } from "react-router-dom"
import InputBox from "./InputBox"
import Button from "./Button"
import { useState } from "react"
import type { SignupInput} from "@ayushgevariya/opendraft"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Auth (props : {type : "signin" | "signup"}) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<SignupInput>({
        username: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        try{
            setIsLoading(true)
            setError(null)
            if(props.type === "signup"){
                 const response = await axios.post("https://backend.ayush-gevariya.workers.dev/api/v1/signup", 
                 {
                     email: formData.email,
                     name: formData.username,
                     password: formData.password
                 })
                 if(response.status === 200){
                     localStorage.setItem("token","Bearer "+response.data.token)
                     setFormData({
                         username: "",
                         email: "",
                         password: ""
                     })
                     navigate("/blogs")
                 }
                 else{
                     setError(response.data.error)
                 }
            }
            else if(props.type === "signin"){
                const response = await axios.post("https://backend.ayush-gevariya.workers.dev/api/v1/signin", 
                {
                    email: formData.email,
                    password: formData.password
                })
                if(response.status === 200){
                    localStorage.setItem("token","Bearer "+response.data.token)
                    setFormData({
                         username: "",
                         email: "",
                         password: ""
                     })
                    navigate("/blogs")
                }
                else{
                    setError(response.data.error)
                }
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
    <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                        {error && <div className="text-red-600 bg-red-100 px-4 py-6 rounded mt-2  mb-5 w-3/4 sm:w-1/2 text-center">{error}</div>}
                </div>
            <div className="flex justify-center">
                <div className="flex flex-col gap-1 text-center w-7/8 sm:w-1/2 border border-gray-200 p-3 sm:p-5 sm:pt-14 sm:pb-12 rounded-xl">
                    <div className="font-bold text-3xl mb-1">
                        {props.type === "signin" ? "Sign In" : "Create an account"}
                    </div>
                    <div className="text-lg font-sans mb-5 text-gray-500">
                        {props.type === "signin" ? "Don't have an account?" : "Already have an account?"} 
                        <Link to={props.type === "signin" ? "/signup" : "/signin"}>
                            <span className="text-blue-500 ml-2 underline">
                                {props.type === "signin" ? "Sign Up" : "Login"}
                            </span>
                        </Link>
                    </div>
                        { props.type === "signup" &&
                        <InputBox placeholder="Enter your username"  label="Username" value={formData.username}  onChange={(e) => setFormData({
                            ...formData,
                            username: e.target.value
                        })}  />
                        }
                        <InputBox placeholder="Enter your email" label="Email" value={formData.email} onChange={(e)=>setFormData({
                            ...formData,
                            email: e.target.value
                        })
                        } />
                        <InputBox placeholder="Enter your password" type={"password"} label="Password" value={formData.password} onChange={(e)=>setFormData({
                            ...formData,
                            password : e.target.value
                        })} />
                        <Button text={props.type === "signin" ? "Login" : "Sign Up"} onClick={handleSubmit} isLoading={isLoading} loadingLabel={props.type === "signin" ? "Signing you in..." : "Setting up your account..." } />
                </div>
            </div>
    </div>
  )
}

export default Auth