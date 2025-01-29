import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import axios from "axios";
import { Link } from "react-router-dom";

const Bacs = () => {
  const [bacs, setBacs] = useState([]);
  const [users, setUsers] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    displayBacs();
    fetchUsers();
    fetchTypes();
  }, []); // Sans les crochets ça tourne en boucle

  const displayBacs = async () => {
    await axios.get("http://127.0.0.1:8000/api/bacs").then((res) => {
      setBacs(res.data);
    });
  };
  // RECUPERER LES USERS
  const fetchUsers = async () => {
    await axios.get("http://127.0.0.1:8000/api/user").then((res) => {
      setUsers(res.data);
    });
  };
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "N/A";
  };
  // RECUPERER LES TYPES
  const fetchTypes = async () => {
    await axios.get("http://127.0.0.1:8000/api/types").then((res) => {
      setTypes(res.data);
    });
  };
  const getTypeName = (typeId) => {
    const type = types.find((type) => type.id === typeId);
    return type ? type.name_bac : "N/A";
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Note du bac</th>
              <th>élève</th>
              <th>type de bac</th>
            </tr>
          </thead>
          <tbody>
            {bacs.map((bac) => (
              <tr key={bac.id}>
                <td>{bac.note_bac}</td>
                <td>{getUserName(bac.user_id)}</td>
                <td>{getTypeName(bac.type_id)}</td>
                <td>
                  <Link to={`/bacs/edit/${bac.id}`} className="btn btn-success me-2">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Bacs;
