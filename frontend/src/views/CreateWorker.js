import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import ruta from "./url.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

function CreateWorker() {
  const notificationAlert = useRef();
  const initialValues = {
    // userType: "3",
    // Id: "4",
    // DocumentType: "1",
    // DocumentNumber: "777653910",
    // Name: "Cristian",
    // LastName: "Vallecilla",
    // PhoneNumber: "6234231507",
    // Email: "c.vallecilla@email.com",
    // Address: "6510 Bay Street",
    // password: "1234",
    // changepassword: "1234",

    userType: "",
    Id: "",
    DocumentType: "",
    DocumentNumber: "",
    Name: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Address: "",
    password: "",
    changepassword: "",
  };
  const [documentType, setDocumentType] = useState("CC");
  const [userType, setUserType] = useState("manager");

  const onSubmit = (values, { resetForm }) => {
    let user = values;

    let payload = {
      user_type: userType === "manager" ? 1 : 2,
      user: {
        id_user: parseInt(user.Id),
        is_active: true,
        type_document: documentType === "CC" ? 1 : 2,
        document: user.DocumentNumber,
        name: user.Name,
        surname: user.LastName,
        phone: user.PhoneNumber,
        address: user.Address,
        email: user.Email,
        password: user.password,
      },
    };

    console.log(payload);
    axios
      .post("http://" + ruta + "/api/users/worker/create/", payload)
      .then((res) => {
        if (res.status === 201) {
          notify("br", "success", "User Created Successfully");
          setTimeout(() => {
            resetForm(initialValues);
          }, 600);
        }
      })
      .catch((err) => {
        console.log(err);
        notify("br", "danger", "Error establishing a database connection");
      });
  };

  //Schema for input data valiation using Yup
  const formSchema = Yup.object().shape({
    Id: Yup.string()
      .trim()
      .required("Required field")
      .min(1, "Minimum of 1 characters")
      .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"),
    DocumentNumber: Yup.string()
      .trim()
      .required("Required field")
      .min(7, "Minimum of 7 characters")
      .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"),
    Name: Yup.string()
      .trim()
      .required("Required field")
      .min(2, "Minimum of 2 characters")
      .matches(
        /^[a-z ,.'-]+$/i,
        "Must contain only letters and these symbols , . '   - "
      ),
    LastName: Yup.string()
      .trim()
      .required("Required field")
      .min(2, "Minimum of 2 characters")
      .matches(
        /^[a-z ,.'-]+$/i,
        "Must contain only letters and these symbols , . '   - "
      ),
    PhoneNumber: Yup.string()
      .trim()
      .required("Required field")
      .min(7, "Minimum of 7 characters")
      .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"),
    Email: Yup.string()
      .trim()
      .required("Required field")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Must be a valid e-mail address"
      ),
    Address: Yup.string()
      .trim()
      .required("Required field")
      .min(7, "Minimum of 7 characters")
      .matches(
        /[\w\[\]`#\^(),.'-]/g,
        "Must contain only letters, numbers and these symbols #  ^ ( ) , . ' -"
      ),
    password: Yup.string()
      .required("This field is required")
      .min(4, "Minimum of 4 characters"),
    changepassword: Yup.string()
      .required("This field is required")
      .min(4, "Minimum of 4 characters")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
  });

  //Function for notification settings
  const notify = (place, type, message) => {
    notificationAlert.current.notificationAlert({
      place: place,
      type: type, //["primary", "success", "danger", "warning", "info"]
      message: <b>{message}</b>,
      icon:
        type === "success"
          ? "tim-icons icon-check-2"
          : "tim-icons icon-alert-circle-exc",
      autoDismiss: 7,
    });
  };

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlert} />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
        >
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Create Worker</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="2">
                    <FormGroup>
                      <label htmlFor="UserType">User type</label>
                      <Input
                        type="select"
                        name="UserType"
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option>Manager</option>
                        <option>Digitalizer</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="3">
                    <FormGroup>
                      <label htmlFor="Id">Id</label>
                      <Field
                        className="form-control"
                        name="Id"
                        placeholder="type your id"
                      />
                      <ErrorMessage
                        name="Id"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="2">
                    <FormGroup>
                      <label htmlFor="DocumentType">Document Type</label>
                      <Input
                        type="select"
                        name="DocumentType"
                        onChange={(e) => setDocumentType(e.target.value)}
                      >
                        <option>CC</option>
                        <option>TI</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="5">
                    <FormGroup>
                      <label htmlFor="documentNumber">Document Number</label>
                      <Field
                        className="form-control"
                        name="DocumentNumber"
                        placeholder="type your id"
                      />
                      <ErrorMessage
                        name="DocumentNumber"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="Name">Name</label>
                      <Field
                        className="form-control"
                        name="Name"
                        placeholder="type your name"
                      />
                      <ErrorMessage
                        name="Name"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="LastName">Last Name</label>
                      <Field
                        className="form-control"
                        name="LastName"
                        placeholder="type your lastname"
                      />
                      <ErrorMessage
                        name="LastName"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="PhoneNumber">Phone Number</label>
                      <Field
                        className="form-control"
                        name="PhoneNumber"
                        placeholder="type your phone number"
                      />
                      <ErrorMessage
                        name="PhoneNumber"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="Email">Email address</label>

                      <Field
                        className="form-control"
                        name="Email"
                        placeholder="type your email address"
                      />
                      <ErrorMessage
                        name="Email"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label htmlFor="Email">Address</label>
                      <Field
                        className="form-control"
                        name="Address"
                        placeholder="type your address"
                      />
                      <ErrorMessage
                        name="Address"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="PhoneNumber">Password</label>
                      <Field
                        className="form-control"
                        name="password"
                        placeholder="type your password"
                        type="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="changepassword">
                        Password Confirmation
                      </label>

                      <Field
                        className="form-control"
                        name="changepassword"
                        placeholder="type your password again"
                        type="password"
                      />
                      <ErrorMessage
                        name="changepassword"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  className="btn-fill"
                  color="success"
                  onSubmit={() => {}}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default CreateWorker;
