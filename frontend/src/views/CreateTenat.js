import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import ruta from "./url.js";
import {
  Card,
  CardTitle,
  CardHeader,
  Row,
  Col,
  CardBody,
  CardFooter,
  FormGroup,
  Button,
  UncontrolledAlert,
  Alert,
  Container,
} from "reactstrap";
import "../layouts/Suscription.css";
import { isReturnStatement } from "typescript";

function CreateTenant() {
  const [isSend, setSend] = useState(false);
  /*
    const [schema_name, setNTenant] = useState("");
    const [name, setNEmpresa] = useState("")
    const [paid_until, setpaid_until]= useState("")*/

  const initialValues = {
    schema_name: "",
    name: "",
    paid_until: "",
  };
  /*const onClick = (e) => {
        e.preventDefault();

       
        const mensaje ={
          schema_name: schema_name,
          name: name,
          paid_until: paid_until,
       
        } 
        console.log(JSON.stringify(mensaje));
        setSend(true)
        cleanForm()
      
        //history.push("/");
    
      };*/
  const onSubmit = (values, { resetForm }) => {
    const domain = values["schema_name"] + ".hyperfoods.team";
    const mensaje = {
      is_primary: true,
    };
    values.on_trial = true;
    mensaje.domain = domain;
    mensaje.tenant = values;

    console.log(JSON.stringify(mensaje));
    setSend(true);
    setTimeout(() => {
      resetForm(initialValues);
    }, 600);
    axios
      .post("http://" + ruta + "/tenants/create/", mensaje)
      .then((res) => {
        console.log("%c response ", "background: #222; color: #bada55");
        console.table(res.data);
      })
      .catch((err) => console.log(err));
  };

  const formSchema = Yup.object().shape({
    schema_name: Yup.string()
      .trim()
      .required("Required field")
      .min(2, "Minimum of 2 characters")
      .matches(
        /^([a-z,.'-])+/g,
        "Must contain only lowercase letters and these symbols , . '   - "
      ),
    name: Yup.string()
      .trim()
      .required("Required field")
      .min(2, "Minimum of 2 characters")
      .matches(
        /^[a-z ,.'-]+$/i,
        "Must contain only letters and these symbols , . '   - "
      ),
    paid_until: Yup.string().trim().required("Required field"),
  });

  const mostrarAlerta = () => {
    if (isSend) {
      return (
        <UncontrolledAlert color="success">
          <span>
            <b>Successfully created</b>
          </span>
        </UncontrolledAlert>
      );
    }
  };
  return (
    <>
      <div className="content">
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
        >
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Create Tenant</CardTitle>
              </CardHeader>
              <CardBody>
                {/* <Container className="d-flex justify-content-center align-items-center"> */}
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Tenant name</label>
                      <Field
                        className="form-control"
                        placeholder="Type the tenant name"
                        type="text"
                        name="schema_name"
                      />
                      <ErrorMessage
                        name="schema_name"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label> Company name</label>
                      <Field
                        className="form-control"
                        placeholder="Type the company name"
                        type="text"
                        name="name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="4">
                    <FormGroup>
                      <label>Expiration</label>
                      <Field
                        className="form-control"
                        placeholder="fecha limite"
                        type="date"
                        name="paid_until"
                      />
                      <ErrorMessage
                        name="paid_until"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="info" type="submit">
                  Create
                </Button>
              </CardFooter>
              {/* </Container> */}
            </Card>
          </Form>
        </Formik>
        {mostrarAlerta()}
      </div>
    </>
  );
}

export default CreateTenant;
