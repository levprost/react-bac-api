import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import axios from "axios";
import { Link } from "react-router-dom";

const Types = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    displayTypes();
  }, []); // Sans les crochets ça tourne en boucle

  const displayTypes = async () => {
    await axios.get("http://127.0.0.1:8000/api/types").then((res) => {
      setTypes(res.data);
    });
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
            {types.map((type) => (
              <tr key={type.id}>
                <td>{type.name_bac}</td>
                <td>{type.type_bac}</td>
                <td>
                  <Link to={`/types/edit/${type.id}`} className="btn btn-success me-2">
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

export default Types;
