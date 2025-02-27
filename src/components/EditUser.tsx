import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type inputObject = {
  name: string;
  email: string;
  option: string;
};

export default function EditUser() {
  const navigate = useNavigate();

  const [input, setInput] = useState<inputObject>({
    name: "",
    email: "",
    option: "",
  });

  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get("https://www.custojoin.com.br/pocs/react-crud/php/api.php", {
        params: {
          id: id,
          option: "get user",
        },
      })
      .then(function (response) {
        setInput(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleChange(event: React.ChangeEvent) {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    setInput((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    input.option = "update user";
    axios
      .put("https://www.custojoin.com.br/pocs/react-crud/php/api.php", input)
      .then(function (response) {
        console.log(response);
        navigate("/");
      });
  }

  return (
    <div>
      <h1>Editar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={input.name}
          type="text"
          name="name"
          required
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          value={input.email}
          type="email"
          name="email"
          required
          onChange={handleChange}
        />

        <button>Update</button>
      </form>
    </div>
  );
}
