import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import { useHistory } from "react-router-dom";
// reactstrap components
import {
  Row,
  Col,
  Card,
  CardFooter,
  Button,
  CardBody,
  FormGroup,
  CardText,
} from "reactstrap";

export default function FinishOrder(props) {
  const notificationAlert = useRef();
  let history = useHistory();
  const [disabledFields, setDisabledFields] = useState(false);
  const [initialValues, setInitialValues] = useState({
    Name: "",
    LastName: "",
    CreditCard: "",
    paid_until: "12/11/2020",
    CVV: "",
  });

  const [placeHolders, setPlaceHolders] = useState([
    "Type your name",
    "Type your last name",
    "Type your credit card number",
    "",
    "CVV",
  ]);

  useEffect(() => {
    if (props.payment.creditCard) {
      setInitialValues({
        Name: "Jem Pool",
        LastName: "Suarez",
        CreditCard: "2342342344",
        paid_until: "12/11/2020",
        CVV: "1234",
      });
      setDisabledFields(true);
    }
  }, []);

  //Schema for input data valiation using Yup
  const formSchema = Yup.object().shape({
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
    CreditCard: Yup.string()
      .trim()
      .required("Required field")
      .min(7, "Minimum of 7 characters")
      .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"),
    paid_until: Yup.string().trim().required("Required field"),
    CVV: Yup.string()
      .required("This field is required")
      .min(4, "Minimum of 4 characters"),
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

  const onSubmit = (values, { resetForm }) => {
    let user = values;

    let payload = {
      user: {
        name: user.Name,
        surname: user.LastName,
        credit_card: user.CreditCard,
      },
    };

    console.log(payload);

    notify("br", "success", "Successful Payment");
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  const onSubmitCash = () => {
    notify("br", "success", "Successful Payment");
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  // props.payment.creditCard
  // props.payment.newCreditCard
  // props.payment.cash
  // <CardTitle tag="h4">Confirm your order</CardTitle>

  const CreditCardPayments = () => (
    <Col md="8">
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
      >
        <Form>
          <Card
            outline
            color=""
            //         payment-card text-center border rounded
            className="payment-card text-center border rounded"
          >
            <br />
            <h4>{props.payment.creditCard && "Credit Card Payment"}</h4>
            <h4>{props.payment.newCreditCard && "New Credit Card Payment"}</h4>
            <h4>{props.payment.cash && "Cash Payment"}</h4>

            <CardBody className="text-center Card-body-center">
              <Row>
                <Col md="2" />
                <Col md="8">
                  <FormGroup className="finish-order-form">
                    <label htmlFor="Name">Card Owner Name</label>
                    <Field
                      disabled={disabledFields}
                      className="form-control"
                      name="Name"
                      placeholder={placeHolders[0]}
                    />
                    <ErrorMessage
                      name="Name"
                      component="div"
                      className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md="2" />
              </Row>

              <Row>
                <Col md="2" />
                <Col md="8">
                  <FormGroup>
                    <label htmlFor="LastName">Card Owner Last Name</label>
                    <Field
                      disabled={disabledFields}
                      className="form-control"
                      name="LastName"
                      placeholder={placeHolders[1]}
                    />
                    <ErrorMessage
                      name="LastName"
                      component="div"
                      className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md="2" />
              </Row>

              <Row>
                <Col md="2" />
                <Col md="8">
                  <FormGroup>
                    <label htmlFor="CreditCard">Credit Card Number</label>
                    <Field
                      disabled={disabledFields}
                      className="form-control"
                      name="CreditCard"
                      placeholder={placeHolders[2]}
                    />
                    <ErrorMessage
                      name="CreditCard"
                      component="div"
                      className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col md="2" />
              </Row>

              <Row>
                <Col md="2" />
                <Col className="pr-md-1" md="5">
                  <FormGroup>
                    <label>Expiration Date</label>
                    <Field
                      disabled={disabledFields}
                      className="form-control"
                      type={disabledFields ? "" : "date"}
                      name="paid_until"
                      defaultValue={"12/12/2020"}
                    />
                    <ErrorMessage
                      name="paid_until"
                      component="div"
                      className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label htmlFor="CVV">CVV</label>
                    <Field
                      disabled={disabledFields}
                      className="form-control"
                      type="password"
                      name="CVV"
                      placeholder={placeHolders[4]}
                    />
                    <ErrorMessage
                      name="CVV"
                      component="div"
                      className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col md="2" />
              </Row>

              <Row>
                <Col md="2" />
                <Col md="8">
                  <br />
                  <CardText>
                    When you click on the <b>Confirm</b> button you will proceed
                    to consolidate the payment of your product invoice for a
                    total
                    <h4>
                      <br /> <b>$ {props.granTotal.toFixed(2)}</b>
                    </h4>{" "}
                    Thank you for using our services, any questions, concerns or
                    complaints may be made to our support email{" "}
                    <a href="url">helpdesk@hyperfoods.com</a>
                  </CardText>
                </Col>
                <Col md="2" />
              </Row>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-confirm btn-fill"
                size="sm"
                color="info"
                onSubmit={() => {}}
              >
                Confirm
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </Formik>
    </Col>
  );

  const Cash = () => (
    <Card
      outline
      color=""
      //         payment-card text-center border rounded
      className="payment-card text-center border rounded"
    >
      <CardBody className="text-center Card-body-center">
        <Row>
          <Col md="2" />
          <Col md="8">
            <CardText>
              When you click on the <b>Confirm</b> button you will proceed to
              consolidate the payment of your product invoice for a total of{" "}
              <h4>
                {" "}
                <b>$ {props.granTotal.toFixed(2)}</b>
              </h4>{" "}
              Thank you for using our services, any questions, concerns or
              complaints may be made to our support email{" "}
              <a href="url">helpdesk@hyperfoods.com</a>
            </CardText>
          </Col>
          <Col md="2" />
        </Row>
      </CardBody>

      <CardFooter>
        <Button
          className="btn-confirm btn-fill"
          size="sm"
          color="info"
          onClick={onSubmitCash}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div>
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlert} />
      </div>
      <Row>
        <Col md="2">
          <Card className="payment-card" />
        </Col>

        {props.payment.creditCard || props.payment.newCreditCard ? (
          <CreditCardPayments />
        ) : (
          <Cash />
        )}

        <Col md="2">
          <Card className="payment-card" />
        </Col>
      </Row>
    </div>
  );
}
