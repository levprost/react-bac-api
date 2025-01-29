import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";

const EditBac = () => {
  const { bac } = useParams(); // ID URL
  const navigate = useNavigate();

  const [noteBac, setnoteBac] = useState("");
  const [typeId, setTypeId] = useState([]);
  const [userId, setUserId] = useState([]);
  const [types, setTypes] = useState([]); // Array vide
  const [users, setUsers] = useState([]); // Array vide
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getBac(); // preloader BAC
    getUsers(); // preloader User
    getTypes(); // preloader Type
  }, []);

  const getUsers = async () => {
    await axios.get("http://127.0.0.1:8000/api/user")
      .then((res) => {
        setUsers(res.data); // enrigistrer les utilisateurs
    });
  };

  const getTypes = async () => {
    await axios.get("http://127.0.0.1:8000/api/types").then((res) => {
      setTypes(res.data); // enregistrer les types
    });
  };

  const getBac = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/bacs/${bac}`)
      .then((res) => {
        setnoteBac(res.data.note_bac);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBac = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("note_bac", noteBac);
    formData.append("type_id", typeId);
    formData.append("user_id", userId);
    
    await axios
      .post(`http://127.0.0.1:8000/api/bacs/${bac}`, formData)
      .then(navigate("/bacs"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un bac</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="alert alert-danger">
                      <ul>
                        {Object.entries(validationError).map(
                          ([key, value]) => (
                            <li key={key}>{value}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  <Form onSubmit={updateBac}>
                    <Row>
                      <Col>
                        <Form.Group controlId="Name">
                          <Form.Label>Note de bac</Form.Label>
                          <Form.Control
                            type="text"
                            value={noteBac}
                            onChange={(event) =>
                              setnoteBac(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="position">
                          <Form.Label>Élève</Form.Label>
                          <Form.Select
                            onChange={(event) => setUserId(event.target.value)}
                          >
                            <option>Choisissez un élève</option>
                            {users.length > 0 &&
                              users.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="position">
                          <Form.Label>Type</Form.Label>
                          <Form.Select
                            onChange={(event) => setTypeId(event.target.value)}
                          >
                            <option>Choisissez un type</option>
                            {types.length > 0 &&
                              types.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name_bac}
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      type="submit"
                    >
                      Enregistrer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBac;
