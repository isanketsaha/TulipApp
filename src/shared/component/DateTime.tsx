import dayjs from "dayjs";
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
            <label> {dayjs(date).format('hh:mm:ss A')}   ||   {dayjs(date).format('DD-MMM-YYYY')} </label>
        </>
    )

}