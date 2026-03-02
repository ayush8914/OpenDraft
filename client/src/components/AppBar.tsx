
function AppBar(props: {
    isLoggedIn : boolean
}) {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/signin"
    }

  return (
    <div className='w-full h-15 bg-white text-gray-700 shadow-sm mb-8 flex flex-row justify-between sticky top-0 z-1000'>
        <div className=''>
            <span className='px-4 py-2 text-3xl font-bold'>
                {/* {props.isLoggedIn ? props.username : ""} */}
            </span>
        </div>
        <div className='flex flex-col justify-center p-4'>
            <span className='px-4 py-2 rounded text-md p-6 text-white bg-gray-700 hover:bg-gray-900' onClick={handleLogout}>{props.isLoggedIn ? "Logout" : "Login"}</span>
        </div>
    </div>
  )
}

export default AppBar