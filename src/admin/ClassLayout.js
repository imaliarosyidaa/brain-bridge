import { useEffect } from "react";
import TopicList from "./class/ClassList";

export default function ClassLayout({ initialAsset }) {


    return (
        <>
            <TopicList initialAsset={initialAsset} />
        </>
    );
}