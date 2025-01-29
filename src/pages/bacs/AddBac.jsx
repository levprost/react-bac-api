import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";

const AddBac = () => {
  const navigate = useNavigate();

  const [noteBac, setnoteBac] = useState("");
  const [typeId, setTypeId] = useState("");
  const [userId, setUserId] = useState("");
  const [types, setTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getUsers();
    getTypes();
  }, []);

  const getUsers = async () => {
    await axios.get("http://127.0.0.1:8000/api/user").then((res) => {
      setUsers(res.data);
    });
  };

  const getTypes = async () => {
    await axios.get("http://127.0.0.1:8000/api/types").then((res) => {
      setTypes(res.data);
    });
  };

  const addBac = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("note_bac", noteBac);
    formData.append("type_id", typeId);
    formData.append("user_id", userId);
    await axios
      .post("http://127.0.0.1:8000/api/bacs", formData)
      .then(() => navigate("/bacs"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Menu />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Création d'un nouveau BAC NOTE</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={addBac}>
                    <Row>
                      <Col>
                        <Form.Group controlId="Name">
                          <Form.Label>Note de bac</Form.Label>
                          <Form.Control
                            type="text"
                            value={noteBac}
                            onChange={(event) => {
                              setnoteBac(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="position">
                          <Form.Label>Club</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => setUserId(event.target.value)}
                          >
                            <option>Choisissez un élève</option>
                            {users.map((user) => (
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
                            aria-label="Default select example"
                            onChange={(event) => setTypeId(event.target.value)}
                          >
                            <option>Choisissez un type de bac</option>
                            {types.map((type) => (
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
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Créer
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

export default AddBac;
