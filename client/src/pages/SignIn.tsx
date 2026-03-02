import Auth from "../components/Auth"
import Quote from "../components/Quote"

function SignIn() {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden h-screen">
            <div>
                <Auth type="signin" />
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    </div>
  )
}

export default SignIn