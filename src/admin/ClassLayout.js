import { useEffect } from "react";
import TopicList from "./class/ClassList";

export default function ClassLayout({ initialAsset }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <TopicList initialAsset={initialAsset} />
        </>
    );
}