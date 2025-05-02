import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Button({ name, color, type, route, icon }) {
    return (
        <div className="flex justify-center mt-6">
            <button type={type} className="bg-cyan-500 shadow-lg shadow-cyan-100/25 hover:bg-cyan-500/75 w-fit text-white relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none">
                <Link to={route} className="grid gap-2 grid-flow-col">
                    {name} {icon}
                </Link>
            </button>
        </div>
    );
}