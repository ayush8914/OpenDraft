
function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex flex-col justify-center">
        <div className="flex justify-center">
                <div className="flex flex-col gap-3.5">
                    <div className="max-w-100 lg:max-w-xl flex flex-col gap-2 p-10 lg:p-8">
                        <div className="text-3xl font-bold">
                            "The Customer support I received was exceptional. The support team went above and beyond to address my concerns" 
                        </div>
                        <div className="flex flex-col gap-0 mt-5 ">
                            <div className="max-w-xl text-lg  font-semibold">
                                Julies Winfield
                            </div>
                            <div className="max-w-xl text-sm text-gray-500  font-light">
                                CEO | Acme Inc
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Quote