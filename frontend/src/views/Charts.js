import React, { useState, useEffect } from "react";
import { Card, Col, Table, CardBody, CardTitle, Row } from "reactstrap";
import axios from "axios";
import ruta from "./url.js";
import "./spinner.css";

function Example() {
  const [productSalesTop, setProductSalesTop] = useState("");
  const [salesHour, setSalesHour] = useState("");
  const [CustomerWithMorePurchases, setCustomerWithMorePurchases] = useState(
    ""
  );
  const [AddressesWithMostSales, setAddressesWithMostSales] = useState("");
  const [topSellingWorkers, setTopSellingWorkers] = useState("");
  const [loading, setLoading] = useState(false);
  const [typePlan, setTypePlan] = useState(null);

  useEffect(() => {
    setTypePlan(window.sessionStorage.getItem("type_plan"));

    setLoading(true);
    axios
      .get("http://" + ruta + "/api/reports/1")
      .then((res) => {
        setProductSalesTop(res.data);
        axios
          .get("http://" + ruta + "/api/reports/2")
          .then((res) => {
            setSalesHour(res.data);
            axios
              .get("http://" + ruta + "/api/reports/3")
              .then((res) => {
                setCustomerWithMorePurchases(res.data);
                axios
                  .get("http://" + ruta + "/api/reports/4")
                  .then((res) => {
                    setAddressesWithMostSales(res.data);
                    axios
                      .get("http://" + ruta + "/api/reports/4")
                      .then((res) => {
                        setAddressesWithMostSales(res.data);
                        axios
                          .get("http://" + ruta + "/api/reports/5")
                          .then((res) => {
                            setTopSellingWorkers(res.data);
                            setLoading(false);
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="content">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <Row>
            <Col sm="6">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Best-selling products</CardTitle>
                  <Table className="tablesorter text-center">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productSalesTop.report === undefined
                        ? null
                        : productSalesTop.report.map((product, i) => {
                            return (
                              <tr key={i}>
                                <td>{product.product.nameProduct}</td>
                                <td>{product.sales}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col sm="6">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Top-selling hours of the day</CardTitle>
                  <Table className="tablesorter">
                    <thead>
                      <tr>
                        <th>Hour</th>
                        <th>Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesHour.report === undefined
                        ? null
                        : salesHour.report.map((product, i) => {
                            return (
                              <tr key={i}>
                                <td>{product.time}</td>
                                <td>{product.sales}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {typePlan === "Basic" ? null : (
            <Row>
              {typePlan === "Medium" ? null : (
                <Col sm="6">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">Best-selling products</CardTitle>
                      <Table className="tablesorter text-center">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Purchases</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CustomerWithMorePurchases.report === undefined
                            ? null
                            : CustomerWithMorePurchases.report.map(
                                (customer, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{customer.client.user.email}</td>
                                      <td>{customer.purchases}</td>
                                    </tr>
                                  );
                                }
                              )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              )}
              
              {typePlan === "Medium" ? null : (
                <Col sm="6">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">Addresses with most sales</CardTitle>
                      <Table className="tablesorter text-center">
                        <thead>
                          <tr>
                            <th>Addresses</th>
                            <th>Purchases</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AddressesWithMostSales.report === undefined
                            ? null
                            : AddressesWithMostSales.report.map(
                                (adresse, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{adresse.zone}</td>
                                      <td>{adresse.purchases}</td>
                                    </tr>
                                  );
                                }
                              )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
          )}

          {typePlan === "Basic" ? null : (
            <Row>
              <Col sm="6">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Top-selling workers</CardTitle>
                    <Table className="tablesorter text-center">
                      <thead>
                        <tr>
                          <th>worker</th>
                          <th>Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topSellingWorkers.report === undefined
                          ? null
                          : topSellingWorkers.report.map((workers, i) => {
                              return (
                                <tr key={i}>
                                  <td>{workers.worker.user.email}</td>
                                  <td>{workers.sales}</td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  );
}

export default Example;
