import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import axios from "axios";

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

function CreateClient() {
  const notificationAlert = useRef();
  const initialValues = {
    // Id: "2",
    // DocumentType: "1",
    // DocumentNumber: "577653910",
    // Name: "Alexandra",
    // LastName: "Usma",
    // PhoneNumber: "5234201007",
    // Email: "a.usma@gmail.com",
    // CreditCard: "908883883",
    // Address: "4460 Green Street",
    // password: "1234",
    // changepassword: "1234",

    Id: "",
    DocumentType: "",
    DocumentNumber: "",
    Name: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    CreditCard: "",
    Address: "",
    password: "",
    changepassword: "",
  };
  const [documentType, setDocumentType] = useState("CC");

  const onSubmit = (values, { resetForm }) => {
    let user = values;

    let payload = {
      credit_card: user.CreditCard,
      user: {
        id_user: parseInt(user.Id),
        is_active: true,
        type_document: documentType === "CC" ? 1 : 2,
        document: user.DocumentNumber,
        name: user.Name,
        surname: user.LastName,
        phone: user.PhoneNumber,
        email: user.Email,
        address: user.Address,
        password: user.password,
      },
    };

    console.log(payload);
    axios
      .post("http://tenant1.hyperfoods.team/api/users/client/create/", payload)
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
    CreditCard: Yup.string()
      .trim()
      .required("Required field")
      .min(7, "Minimum of 7 characters")
      .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"),
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
                <h5 className="title">Create Client</h5>
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
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="CreditCard">Credit Card Number</label>
                      <Field
                        className="form-control"
                        name="CreditCard"
                        placeholder="type your credit card number"
                      />
                      <ErrorMessage
                        name="CreditCard"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
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

export default CreateClient;
