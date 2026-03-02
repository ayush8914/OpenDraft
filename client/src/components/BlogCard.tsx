import Avatar from "./Avatar";

interface BlogCardProps {
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
}

function BlogCard(props : BlogCardProps) {
  return (
    <div className="flex flex-col gap-4 w-full text-left shadow-sm p-4">
        <div className="flex gap-1 items-center">
            <Avatar authorName={props.authorName} />
            <div className="text-md font-bold font-sans">{props.authorName}</div>
            <div className="text-sm text-gray-500 font-sans">{props.publishedDate}</div>
        </div>
        <div className="flex flex-col gap-1">
            <div className="text-lg font-bold font-sans">{props.title}</div>
            <div className="text-sm text-gray-500 font-sans">{props.content.slice(0,200)} {props.content.length > 0 ? "..." : ""}</div>
        </div>
       
    </div>
  )
}


export default BlogCard