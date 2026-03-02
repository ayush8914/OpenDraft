
function Avatar(props: {
    authorName : String 
}) {
  return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
            <span className="font-medium text-body">{props.authorName.slice(0,2).toUpperCase()}</span>
        </div>
  )
}

export default Avatar