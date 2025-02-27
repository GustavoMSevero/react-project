import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("https://www.custojoin.com.br/pocs/react-crud/php/api.php", {
        params: {
          option: "get users",
        },
      })
      .then(function (response) {
        console.log(response);
        setUsers(response.data);
      });
  }

  function deleteUser(id: number) {
    axios
      .delete("https://www.custojoin.com.br/pocs/react-crud/php/api.php", {
        params: {
          id: id,
          option: "delete user",
        },
      })
      .then(function (response) {
        console.log(response);
        getUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Listar Usuários</h1>
      <div className="table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`user/${user.id}/edit`}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
