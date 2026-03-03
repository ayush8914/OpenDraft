import Avatar from "./Avatar";

interface BlogCardProps {
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
}

function BlogCard(props : BlogCardProps) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

  return (
    <div className="flex flex-col gap-4 w-full text-left shadow-sm p-4">
        <div className="flex gap-3 items-center">
            <Avatar authorName={props.authorName} />
            <div className="text-md font-bold font-sans">{props.authorName.toUpperCase()}</div>
        </div>
        <div className="flex flex-col gap-1">
            <div className="text-4xl font-bold font-sans">{props.title}{props.title.length >50 ? "..." : ""}</div>
            <div className="text-lg text-gray-500 font-sans">{props.content.slice(0,200)} {props.content.length > 0 ? "..." : ""}</div>
        </div>
        <div>
            <div className="text-sm text-gray-500 font-sans">{formatter.format(new Date(props.publishedDate))}</div>
        </div>
    </div>
  )
}


export default BlogCard