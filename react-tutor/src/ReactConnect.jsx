import { useEffect, useState } from 'react';

import './App.css'



function ReactConnect() {

    const [message, setMessage] = useState("...Loading...");

    async function fetchData() {
        const resp = await fetch('http://localhost:3000/api/hello');
        const json = await resp.json();
        console.log("resp: ", resp);
        console.log("json:", json);
        setMessage(json.message);
    }



    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            Message: {message}
        </div>
    )

}



export default ReactConnect 