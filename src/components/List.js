import { Link } from "react-router-dom";

export default function List({ data, route, auth, onDelete }) {
    return (
        <li className='font-normal list-disc text-sky-500' key={data || data} >
            <Link to={route} aria-label={`Open ${data}`}>
                {data}
            </Link>
        </li>

    );
}