
import {useState, useEffect } from 'react'
function Profile() {

    const [form, setForm] = useState({

        firstname:"",
        lastname:"",
        age:0,
    })
    
    async function changeForm() {
        const resp = await fetch('http://localhost:3000/api/myname')
        const json = await resp.json();
        console.log(json)
        console.log(json.firstname);
        setForm( {
            firstname: json.firstname,
            lastname: json.lastname,
            age: json.age,
    })
    }

    useEffect(() => {
        changeForm();
    }, []);

    return (
        <div>
            <p>FirstName: {form.firstname}</p>
            <p>LastName: {form.lastname}</p>
            <p>Age: {form.age}</p>
        </div>
    )
}

export default Profile;