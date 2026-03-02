
function InputBox(props : {
    placeholder : string
    label : string
    onChange : (e:any) => void
    value : string
    type? : string | "text" 
}) {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
        <label className="text-md font-bold font-sans">{props.label}</label>
        <input type={props.type} id={props.label} className="border px-3 py-2 rounded-md border-gray-300" placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
    </div>
  )
}

export default InputBox