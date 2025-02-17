import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type inputObject = {
    name: string;
    email: string;
    option: string;
};
  

export default function CreateUser() {

    const navigate = useNavigate();

    const [input, setInput] = useState<inputObject>({
        name: "",
        email: "",
        option: ""
    });

    function handleChange(event: React.ChangeEvent) {
        const name = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        setInput(values => ({...values, [name]: value}));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        input.option = "Salvar dados";
        axios.post("https://www.custojoin.com.br/pocs/react-crud/php/api.php", input).then(function(response) {
            console.log(response)
            navigate("/");
        })
    }

    return(
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome</label>
                <input type="text" name="name" onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange} />

                <button type="submit">Save</button>
            </form>
        </div>
    )
}