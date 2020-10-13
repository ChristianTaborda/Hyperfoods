import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

function CreateUser() {
  const notificationAlert = useRef();
  const [initialValues, setInitialValues] = useState({
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
  });
  const [documentType, setDocumentType] = useState("CC");

  const onSubmit = (values, { resetForm }) => {
    let res = values;
    res.DocumentType = documentType;
    console.table(res);
    notify("br", "success", "User Created Successfully");
    // notify("br", "danger", "Error establishing a database connection");
    // if error do not reset the form
    setTimeout(() => {
      resetForm(initialValues);
    }, 600);
  };

  //Schema for input data valiation using Yup
  const formSchema = Yup.object().shape({
    Id: Yup.string()
      .trim()
      .required("Required field")
      .min(8, "Minimum of 8 characters")
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
      .min(5, "Minimum of 5 characters"),
    changepassword: Yup.string()
      .required("This field is required")
      .min(5, "Minimum of 5 characters")
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
                <h5 className="title">Create Users</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="5">
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
                        <option>Passport</option>
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

export default CreateUser;
