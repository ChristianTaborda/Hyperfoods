import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

export default function Order(props) {
  const products = props.order.filter((item) => item.codeProduct);
  const combos = props.order.filter((item) => item.codeCombo);

  let priceProducts = 0;
  let priceCombos = 0;
  let priceProductsCombos = 0;
  let taxes = 19 / 100;
  // let granTotal = 0;
  let fixed = 0;

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
                    <th>Code Product</th>
                    <th>Name Product</th>
                    <th>Category</th>
                    <th>Basic Price</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="text-right">Products Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, i) => {
                    priceProducts += item.priceProduct;
                    return (
                      <tr key={i}>
                        <td>{item.codeProduct}</td>
                        <td>{item.nameProduct}</td>
                        <td>{item.categoryProduct.nameCategory}</td>
                        <td>$ {(item.priceProduct).toFixed(fixed)}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-right">$ {(item.priceProduct).toFixed(fixed)}</td>
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
                    <th className="text-right">$ {priceProducts.toFixed(fixed)}</th>
                    <th></th>
                  </tr>
                </tbody>
              </Table>

              {/*  */}

              <Table className="order-tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
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
                    priceCombos += totalComboItem;

                    priceProductsCombos = priceProducts + priceCombos;
                    props.setGranTotal(
                      priceProductsCombos + priceProductsCombos * taxes
                      )

                    return (
                      <tr key={i}>
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
                <th className="text-right">$ {props.granTotal.toFixed(fixed)} {`<`}</th>
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
