export default function SearchBar() {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex w-full px-24 py-4">
                <input
                    type="text"
                    placeholder="Search your book"
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button className="px-4 bg-blue text-white font-medium rounded-r-md hover:bg-sky-500">
                    Search
                </button>
            </div>

            {/* Categories Section */}
            <div className="flex gap-2 mt-4">
                {["General", "Math", "Science", "Social", "Fiction", "Language", "Jurnal"].map(
                    (category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 ${category === "Language" ? "bg-blue-400 text-white" : ""
                                }`}
                        >
                            {category}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};