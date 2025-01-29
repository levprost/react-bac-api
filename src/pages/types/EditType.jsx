import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";

const EditType = () => {
  const { type } = useParams(); // ID URL
  const navigate = useNavigate();

  const [typeBac, settypeBac] = useState([]);
  const [nameBac, setnameBac] = useState([]);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getType(); // preloader BAC
  }, []);


  const getType = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/types/${type}`)
      .then((res) => {
        setnameBac(res.data.name_bac);
        settypeBac(res.data.type_bac);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateType = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("name_bac", nameBac);
    formData.append("type_bac", typeBac);
    
    await axios
      .post(`http://127.0.0.1:8000/api/types/${type}`, formData)
      .then(navigate("/types"))
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
                <h4 className="card-title">Modifier un type de bac</h4>
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
                  <Form onSubmit={updateType}>
                    <Row>
                      <Col>
                        <Form.Group controlId="Name">
                          <Form.Label>Name de bac</Form.Label>
                          <Form.Control
                            type="text"
                            value={nameBac}
                            onChange={(event) =>
                              setnameBac(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Name">
                          <Form.Label>Type de bac</Form.Label>
                          <Form.Control
                            type="text"
                            value={typeBac}
                            onChange={(event) =>
                              settypeBac(event.target.value)
                            }
                          />
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

export default EditType;
