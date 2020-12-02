import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

export default function Order(props) {
  const indexProducts = [];
  const products = props.order.filter((item, index) => {
    if (item.codeProduct) indexProducts.push(index);
    return item.codeProduct;
  });

  const indexCombos = [];
  const combos = props.order.filter((item, index) => {
    if (item.codeCombo) indexCombos.push(index);
    return item.codeCombo;
  });

  const taxes = 19 / 100;
  const fixed = 0;

  const [priceProducts, setpriceProducts] = useState(0);
  const [priceCombos, setpriceCombos] = useState(0);
  const [priceProductsCombos, setpriceProductsCombos] = useState(0);

  function calculatePricesProducts() {
    return products.reduce((accumulator, item) => {
      let ingredientsPrices = item.ingredientProduct
        .filter((ingredient) => ingredient.additionalIngredient)
        .reduce((total, ingredient) => total + ingredient.priceIngredient, 0);

      return accumulator + item.priceProduct + ingredientsPrices;
    }, 0);
  }

  function calculatePricesCombos() {
    let price = combos.reduce((accumulator, item) => {
      let discount = item.priceCombo * (item.discountCombo / 100);

      let extra = item.productCombo.reduce(
        (accumulatorProduct, product) =>
          accumulatorProduct + product.ingredientProduct.length
            ? product.ingredientProduct
                .map((ingredient) => ingredient.priceIngredient)
                .reduce((a, b) => a + b, 0)
            : 0,
        0
      );
      let totalComboItem = item.priceCombo + extra - discount;
      return accumulator + totalComboItem;
    }, 0);

    return price;
  }

  useEffect(() => {
    let pricesProducts = calculatePricesProducts();
    let pricesCombos = calculatePricesCombos();
    let pricesProductsCombos = pricesProducts + pricesCombos;

    setpriceProducts(pricesProducts);
    setpriceCombos(pricesCombos);
    setpriceProductsCombos(pricesProductsCombos);

    props.setGranTotal(pricesProductsCombos + pricesProductsCombos * taxes);
  });

  function trimCommas(str) {
    str = str.join("").replaceAll(",,", ", ");
    if (str[0] === ",") {
      return str.slice(1);
    } else {
      return str.slice(0, -1);
    }
  }

  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Order Details</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="order-tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Remove</th>
                    <th>Code Product</th>
                    <th>Category</th>
                    <th>Name Product</th>
                    <th>Basic Price</th>
                    <th>Extra</th>
                    <th>Extra Price</th>
                    <th className="text-right">Products Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, i) => {
                    let ingredients = item.ingredientProduct
                      .filter((ingredient) => ingredient.additionalIngredient)
                      .map((ingredient) => ingredient.nameIngredient)
                      .join(", ");

                    let ingredientsPrices = item.ingredientProduct
                      .filter((ingredient) => ingredient.additionalIngredient)
                      .reduce(
                        (total, ingredient) =>
                          total + ingredient.priceIngredient,
                        0
                      );

                    return (
                      <tr key={i}>
                        <td className="text-center">
                          <button
                            className="delete-order"
                            onClick={() =>
                              props.setOrder((prev) =>
                                prev.filter(
                                  (item, index) => index != indexProducts[i]
                                )
                              )
                            }
                          >
                            x
                          </button>
                        </td>
                        <td>{item.codeProduct}</td>
                        <td>{item.categoryProduct.nameCategory}</td>
                        <td>{item.nameProduct}</td>
                        <td>$ {item.priceProduct.toFixed(fixed)}</td>
                        <td>{ingredients}</td>
                        <td>$ {ingredientsPrices}</td>
                        <td className="text-right">
                          ${" "}
                          {(item.priceProduct + ingredientsPrices).toFixed(
                            fixed
                          )}
                        </td>
                        <td></td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="text-right">
                      $ {priceProducts.toFixed(fixed)}
                    </th>
                    <th></th>
                  </tr>
                </tbody>
              </Table>

              {/*  */}

              <Table className="order-tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Remove</th>
                    <th>Code Combo</th>
                    <th>Name Combo</th>
                    <th>Basic</th>
                    <th>Basic Price</th>
                    <th>Discount Combo</th>
                    <th>Extra</th>
                    <th>Extra Price</th>
                    <th className="text-right">Combos Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {combos.map((item, i) => {
                    let discount = item.priceCombo * (item.discountCombo / 100);

                    let basic = item.productCombo.map((product) =>
                      product.ingredientProduct.length
                        ? product.ingredientProduct.map((ingredient) =>
                            ingredient.priceIngredient
                              ? ""
                              : ingredient.nameIngredient
                          )
                        : ""
                    );
                    basic = trimCommas(basic);

                    let extraPriceItem = 0;
                    let extra = item.productCombo.map((product) =>
                      product.ingredientProduct.length
                        ? product.ingredientProduct.map((ingredient) => {
                            if (ingredient.priceIngredient) {
                              extraPriceItem += ingredient.priceIngredient;
                              return ingredient.nameIngredient;
                            } else return "";
                          })
                        : ""
                    );
                    extra = trimCommas(extra);

                    let totalComboItem =
                      item.priceCombo + extraPriceItem - discount;

                    return (
                      <tr key={i}>
                        <td className="text-center">
                          <button
                            className="delete-order"
                            onClick={() =>
                              props.setOrder((prev) =>
                                prev.filter(
                                  (item, index) => index != indexCombos[i]
                                )
                              )
                            }
                          >
                            X
                          </button>
                        </td>
                        <td>{item.codeCombo}</td>
                        <td>{item.nameCombo}</td>
                        <td>{basic}</td>
                        <td>$ {item.priceCombo.toFixed(fixed)}</td>
                        <td>-$ {discount.toFixed(fixed)}</td>
                        <td> {extra}</td>
                        <td>$ {extraPriceItem.toFixed(fixed)}</td>
                        <td className="text-right">
                          $ {totalComboItem.toFixed(fixed)}
                        </td>
                        <td></td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="text-right">
                      $ {priceCombos.toFixed(fixed)}
                    </th>
                    <th></th>
                  </tr>
                </tbody>
              </Table>

              {/*  */}

              <Table className="order-tablesorter-results" responsive>
                <tbody>
                  <tr>
                    <th className="text-right">PRICE PRODUCTS AND COMBOS</th>
                    <th className="text-right">
                      $ {priceProductsCombos.toFixed(fixed)} {`<`}
                    </th>
                  </tr>

                  <tr>
                    <th className="text-right">TAXES (19%)</th>
                    <th className="text-right">
                      $ {(priceProductsCombos * taxes).toFixed(fixed)} {`<`}
                    </th>
                  </tr>

                  <tr>
                    <th className="text-right">TOTAL</th>
                    <th className="text-right">
                      $ {props.granTotal.toFixed(fixed)} {`<`}
                    </th>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
