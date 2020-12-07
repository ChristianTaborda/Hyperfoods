import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, isEmptyArray } from "formik";
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
  Table,
  Row,
  Col,
} from "reactstrap";

function ListClients() {
  const emptyList = [
    {
      credit_card: "-",
      id_user: "-",
      user: {
        is_active: "-",
        type_document: "-",
        document: "-",
        name: "-",
        surname: "-",
        phone: "-",
        address: "-",
        email: "-",
      },
    },
  ];
  const [clientList, setClientList] = useState(emptyList);

  const notificationAlert = useRef();
  const [editing, setEditing] = useState(false);
  const [idUserEdited, setIdUserEdited] = useState(0);
  const [documentType, setDocumentType] = useState("CC");
  const [status, setStatus] = useState(true);
  const [initialValues, setInitialValues] = useState({
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
  });

  const editHandler = (event, client) => {
    setEditing(true);
    setIdUserEdited(client.id_user);
    setStatus(client.user.is_active);
    setInitialValues({
      Id: client.user.id_user,
      DocumentType: client.user.type_document ? "CC" : "TI",
      DocumentNumber: client.user.document,
      Name: client.user.name,
      LastName: client.user.surname,
      PhoneNumber: client.user.phone,
      Email: client.user.email,
      CreditCard: client.credit_card,
      Address: client.user.address,
      password: "",
      changepassword: "",
    });
  };

  useEffect(() => {
    axios
      .get("http://" + ruta + "/api/users/client/")
      .then((res) => setClientList(res.data))
      .catch((err) => console.log(err));
  }, [editing]);

  const onSubmit = (values, { resetForm }) => {
    let user = values;
    let payload = {
      credit_card: user.CreditCard,
      user: {
        id_user: parseInt(user.Id),
        is_active: status,
        // type_document: documentType === "CC" ? 1 : 2,
        // document: user.DocumentNumber,
        name: user.Name,
        surname: user.LastName,
        phone: user.PhoneNumber,
        // email: user.Email,
        address: user.Address,
      },
    };

    if (user.password !== "") {
      payload.user = { ...payload.user, password: user.password };
    }

    // console.log(payload);
    axios
      .patch(`http://${ruta}/api/users/client/update/${idUserEdited}/`, payload)
      .then((res) => {
        if (res.status === 200) {
          setClientList(emptyList);
          setEditing(false);
          notify("br", "success", "Changes saved");
        }
      })
      .catch((err) => {
        notify("br", "danger", "error in data change");
        setEditing(false);
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
      // .required("This field is required")
      .min(4, "Minimum of 4 characters"),
    changepassword: Yup.string()
      // .required("This field is required")
      .min(4, "Minimum of 4 characters")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string()
          .oneOf([Yup.ref("password")], "Both password need to be the same")
          .required("This field is required"),
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

  if (editing) {
    return (
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
                <CardTitle tag="h4">Edit Client</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="2">
                    <FormGroup>
                      <label htmlFor="Status">status</label>
                      <Input
                        type="select"
                        name="Status"
                        defaultValue={status ? "Active" : "Inactive"}
                        onChange={(e) =>
                          setStatus(e.target.value === "Active" ? true : false)
                        }
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="4">
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
                  <Col className="pl-md-1" md="4">
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
                      <label htmlFor="PhoneNumber">New Password</label>
                      <Field
                        className="form-control"
                        name="password"
                        placeholder="type your new password"
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
                        New Password Confirmation
                      </label>

                      <Field
                        className="form-control"
                        name="changepassword"
                        placeholder="type your new password again"
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
                  color="info"
                  onSubmit={() => {}}
                >
                  &nbsp;Save&nbsp;
                </Button>
                <Button
                  className="btn-fill"
                  color="info"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Formik>
      </div>
    );
  } else {
    // When no editing only is rendered the list of clients
    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlert} />
          </div>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">List Clients</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Edit</th>
                        <th>Status</th>
                        <th>Document</th>
                        <th>Id Type</th>
                        <th>Id User</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Credit Card</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientList.map((client, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <i
                                style={{ cursor: "pointer" }}
                                className="tim-icons icon-pencil"
                                onClick={(e) => editHandler(e, client)}
                              />
                            </td>
                            <td>
                              {client.user.is_active === "-"
                                ? "-"
                                : client.user.is_active
                                ? "true"
                                : "false"}
                            </td>
                            <td>{client.user.document}</td>
                            <td>
                              {client.user.is_active === "-"
                                ? "-"
                                : client.user.type_document === 1
                                ? "CC"
                                : "TI"}
                            </td>
                            <td>{client.user.id_user}</td>
                            <td>{client.user.name}</td>
                            <td>{client.user.surname}</td>
                            <td>{client.user.phone}</td>
                            <td>{client.user.address}</td>
                            <td>{client.user.email}</td>
                            <td>{client.credit_card}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ListClients;
