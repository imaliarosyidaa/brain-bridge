import { Link } from 'react-router-dom';

export default function Card({ topic, route }) {
    return (
        <Link to={route} state={{ topicName: topic.name }} className="no-underline text-inherit">
            <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-sky-50 hover:outline hover:outline-2 hover:outline-indigo-400">
                <div className="p-6 ">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 capitalize group-hover:text-blue-500 transition-colors">
                        {topic.name}
                    </h3>
                    <p className='mt-1 text-sm text-slate-700 dark:text-slate-400'>
                        {topic.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}