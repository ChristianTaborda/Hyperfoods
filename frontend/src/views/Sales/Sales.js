import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import Stepper from "react-stepper-horizontal";
import "./Sales.css";

// Import steps views &nbsp;
import Products from "./Products"; // [1] Food List
import Order from "./Order"; // [2] Order
import Payment from "./Payment"; // [3] Payment
import FinishOrder from "./FinishOrder"; // [4] Finish Order

// Listar Productos -> http://tenant1.hyperfoods.team/api/products/

// Listar Combos -> http://tenant1.hyperfoods.team/api/combos/
const combos = [
  {
    codeCombo: 1,
    productCombo: [
      {
        codeProduct: 1,
        categoryProduct: {
          codeCategory: 1,
          nameCategory: "Bebidas",
        },
        ingredientProduct: [],
        nameProduct: "Limonada",
        descriptionProduct: "Agua, Limón y Azúcar",
        priceProduct: 2500,
      },
      {
        codeProduct: 2,
        categoryProduct: {
          codeCategory: 2,
          nameCategory: "Hamburguesas",
        },
        ingredientProduct: [
          {
            codeIngredient: 1,
            nameIngredient: "Cebolla",
            priceIngredient: 0,
            additionalIngredient: false,
          },
          {
            codeIngredient: 2,
            nameIngredient: "Tocineta",
            priceIngredient: 3500,
            additionalIngredient: true,
          },
          {
            codeIngredient: 3,
            nameIngredient: "Queso",
            priceIngredient: 0,
            additionalIngredient: false,
          },
          {
            codeIngredient: 4,
            nameIngredient: "Queso",
            priceIngredient: 2000,
            additionalIngredient: true,
          },
        ],
        nameProduct: "Perro Caliente",
        descriptionProduct: "Queso y Tocino",
        priceProduct: 8000,
      },
    ],
    nameCombo: "Personal 1",
    descriptionCombo: "Hamburguesa + Limonada",
    discountCombo: 15,
    priceCombo: 14875,
  },
  {
    codeCombo: 2,
    productCombo: [
      {
        codeProduct: 1,
        categoryProduct: {
          codeCategory: 1,
          nameCategory: "Bebidas",
        },
        ingredientProduct: [],
        nameProduct: "Limonada",
        descriptionProduct: "Agua, Limón y Azúcar",
        priceProduct: 2500,
      },
      {
        codeProduct: 2,
        categoryProduct: {
          codeCategory: 2,
          nameCategory: "Perro Caliente",
        },
        ingredientProduct: [
          {
            codeIngredient: 1,
            nameIngredient: "Cebolla",
            priceIngredient: 0,
            additionalIngredient: false,
          },
          {
            codeIngredient: 2,
            nameIngredient: "Tocino",
            priceIngredient: 3500,
            additionalIngredient: true,
          },
          {
            codeIngredient: 3,
            nameIngredient: "Queso",
            priceIngredient: 0,
            additionalIngredient: false,
          },
          {
            codeIngredient: 4,
            nameIngredient: "Queso",
            priceIngredient: 2000,
            additionalIngredient: true,
          },
        ],
        nameProduct: "Perro Caliente",
        descriptionProduct: "Queso y Tocino",
        priceProduct: 8000,
      },
    ],
    nameCombo: "Personal 2",
    descriptionCombo: "Hamburguesa + Limonada",
    discountCombo: 10,
    priceCombo: 17875,
  },
];

const products = [
  {
    codeProduct: 1,
    categoryProduct: {
      codeCategory: 1,
      nameCategory: "Bebidas",
    },
    ingredientProduct: [],
    nameProduct: "Limonada",
    descriptionProduct: "Agua, Limón y Azúcar",
    priceProduct: 2000,
  },
  {
    codeProduct: 2,
    categoryProduct: {
      codeCategory: 2,
      nameCategory: "Hamburguesas",
    },
    ingredientProduct: [
      {
        codeIngredient: 1,
        nameIngredient: "Cebolla",
        priceIngredient: 0,
        additionalIngredient: false,
      },
      {
        codeIngredient: 2,
        nameIngredient: "Tocineta",
        priceIngredient: 3500,
        additionalIngredient: true,
      },
      {
        codeIngredient: 3,
        nameIngredient: "Queso",
        priceIngredient: 0,
        additionalIngredient: false,
      },
      {
        codeIngredient: 4,
        nameIngredient: "Queso",
        priceIngredient: 2000,
        additionalIngredient: true,
      },
    ],
    nameProduct: "Perro Caliente",
    descriptionProduct: "Queso y Tocino",
    priceProduct: 8000,
  },
];

function Sales() {
  const [activeStep, setActiveStep] = useState(0);
  const order = [...products, ...combos];

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const previousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Payment method
  const [payment, setPayment] = useState({
    creditCard: false,
    newCreditCard: false,
    cash: false,
  });

  // Price of the order
  const [granTotal, setGranTotal] = useState(0);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Sales</CardTitle>
                <div className="stepper-head">
                  <Stepper
                    className="stepper"
                    steps={[
                      { title: "Food List" },
                      { title: "Order" },
                      { title: "Payment" },
                      { title: "Finish Order" }, // Options: Cancel Order, back to Payment
                    ]}
                    activeStep={activeStep}
                    lineMarginOffset={8}
                  />
                </div>
                <div className="order-buttons">
                  {activeStep > 0 ? (
                    <Button
                      className="btn-sales btn-fill"
                      size="sm"
                      color="info"
                      onClick={() => previousStep()}
                    >
                      Return
                    </Button>
                  ) : null}
                  {activeStep < 3 ? (
                    <Button
                      disabled={
                        !payment.creditCard &&
                        !payment.newCreditCard &&
                        !payment.cash &&
                        activeStep > 1
                      }
                      className="btn-sales btn-fill"
                      size="sm"
                      color="info"
                      onClick={() => nextStep()}
                    >
                      Next
                    </Button>
                  ) : null}{" "}
                </div>
              </CardHeader>
            </Card>
          </Col>

          <Col md="12">
            <div className="stepper-body">
              <Card>
                <CardBody>
                  {activeStep === 0 ? <Products nextStep={nextStep} /> : null}
                  {activeStep === 1 ? (
                    <Order
                      nextStep={nextStep}
                      previousStep={previousStep}
                      order={order}
                      granTotal={granTotal}
                      setGranTotal={setGranTotal}
                    />
                  ) : null}
                  {activeStep === 2 ? (
                    <Payment
                      nextStep={nextStep}
                      previousStep={previousStep}
                      payment={payment}
                      setPayment={setPayment}
                    />
                  ) : null}
                  {activeStep === 3 ? (
                    <FinishOrder
                      previousStep={previousStep}
                      payment={payment}
                      granTotal={granTotal}
                    />
                  ) : null}
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Sales;
