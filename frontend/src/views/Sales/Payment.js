import React, { useState } from "react";
// reactstrap components
import { Row, Col, Card, CardBody, FormGroup, Label, Input } from "reactstrap";

export default function Payment(props) {
  const radioButtonHandler = (event) => {
    switch (event.target.id) {
      case "credit-card":
        props.setPayment({
          creditCard: true,
          newCreditCard: false,
          cash: false,
        });
        break;

      case "new-credit-card":
        props.setPayment({
          creditCard: false,
          newCreditCard: true,
          cash: false,
        });
        break;

      case "cash":
        props.setPayment({
          creditCard: false,
          newCreditCard: false,
          cash: true,
        });
        break;
    }
  };

  return (
    <div>
      <Row>
        <Col md="2">
          <Card className="payment-card" />
        </Col>
        <Col md="8">
          <Card
            outline
            color="info"
            className="payment-card text-center border rounded"
          >
            <br />
            <legend>Payment Methods</legend>
            <CardBody className="text-center Card-body-center">
              <FormGroup tag="fieldset" onChange={radioButtonHandler}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio"
                      id="credit-card"
                      defaultChecked={props.payment.creditCard}
                    />
                  </Label>

                  <Label>
                    <h4> Credit Card</h4>
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio"
                      id="new-credit-card"
                      defaultChecked={props.payment.newCreditCard}
                    />{" "}
                  </Label>
                  <Label>
                    <h4> New Credit Card</h4>
                  </Label>
                </FormGroup>

                {window.sessionStorage.getItem("userType") === "worker" ? (
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio"
                        id="cash"
                        defaultChecked={props.payment.cash}
                      />
                    </Label>
                    <Label>
                      {" "}
                      <h4> Cash</h4>
                    </Label>
                  </FormGroup>
                ) : null}
              </FormGroup>

              {props.payment.creditCard && (
                <Card>
                  <CardBody>
                    <b>Security Recommendations:</b> Do not give the card to be
                    taken to another place to make the transaction; avoid losing
                    sight of it. The card has an expiration date on it, so be
                    sure to renew it before that date to avoid problems with its
                    use.
                  </CardBody>
                </Card>
              )}
              {props.payment.newCreditCard && (
                <Card>
                  <CardBody>
                    <b>Security Recommendations:</b> For you new Credit card in
                    the case of payment by installments, it must be ensured who
                    is providing this benefit and whether it is a payment of the
                    same cash price divided into installments or whether a
                    surcharge is made for each installment paid.
                  </CardBody>
                </Card>
              )}

              {props.payment.cash && (
                <Card>
                  <CardBody>
                    <b>Security Recommendations:</b> Remember that the customer
                    must count very well money before you retire. Any
                    counterfeit bill will be destroyed and will not constitute
                    payment of the debt.
                  </CardBody>
                </Card>
              )}
            </CardBody>
          </Card>
        </Col>

        <Col md="2">
          <Card className="payment-card" />
        </Col>
      </Row>
    </div>
  );
}
