import { useEffect, useState } from "react";


export const DateTime = () => {

    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });


    return (
        <>
            <h4> {date.toLocaleTimeString()}   ||   {date.toLocaleDateString()} </h4>
        </>
    )

}