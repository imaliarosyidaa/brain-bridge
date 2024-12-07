export default function AssesmentDetail() {
    return (
        <div className="p-2 rounded-md h-screen bg-white shadow-md border-gray-500 border-2">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 grid-flow-row">
                <div className="col-span-4">
                    <h1 className="bg-blue rounded-sm">Assigment Materi Programming 1</h1>
                    <h2 className="font-bold">Description</h2>
                    <h2>Apply math to solve complex economic problems. Boost problem-solving skills for careers in economics, finance, and business.  Navigate the world of money. Understand financial concepts, analyze investments, and make sound financial decisions. Navigate legal complexities for businesses. Ensure compliance, manage risk, and make informed decisions.</h2>
                </div>
                <div className="col-span-2 p-2 bg-orange rounded-md">
                    <h3 className="font-bold">Deadline</h3>
                    <p className="text-white">Kamis, 29 Desember 2024</p>
                    <div>
                        <h1 className="font-bold">Document</h1>
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-span-6 pt-1">
                <h1 className="font-bold">Answer</h1>
                <form>
                    <textarea id="answer" name="answer" className="mt-2 bg-pink w-full min-h-80 overflow-auto scroll-m-2 px-2" placeholder="Input here.."></textarea>
                    <div className="flex justify-between pt-4">
                        <div className="bg-orange rounded-sm p-1 text-white font-bold flex">
                            <div className="pr-4">Grade</div>
                            <div className="">90</div>
                        </div>
                        <button type="Submit" className="bg-yellow rounded-md px-4 py-1 font-bold">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    );
}