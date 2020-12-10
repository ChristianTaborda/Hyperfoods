import React, { useState, useEffect } from "react";
import axios from "axios";
import path from "../url";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

// Import chart configurations
import { chart1, chart2, chart3, chart4, chart5, chart6 } from "./Charts.js";

function GraphicReports() {
  const [loading, setLoading] = useState(false);

  // Report 1 variables
  const [bestSellingProducts, setBestSellingProducts] = useState({
    labels: [""],
    sales: [0],
  });

  // Report 2 variables
  const [TopSellingHours, setTopSellingHours] = useState({
    labels: [""],
    hours: [0],
  });

  // Report 3 variables
  const [CustomerWithMorePurchases, setCustomerWithMorePurchases] = useState({
    labels: [""],
    purchases: [0],
  });

  // Report 4 variables
  const [AddressesWithMostSales, setAddressesWithMostSales] = useState({
    labels: [""],
    purchases: [0],
  });

  // Report 5 variables
  const [topSellingWorkers, setTopSellingWorkers] = useState({
    labels: [""],
    sales: [0],
  });

  // Report 6 variables
  const [monthlyEarnings, setMonthlyEarnings] = useState({
    labels: [""],
    gains: [0],
  });

  const [typePlan, setTypePlan] = useState(null);

  // [X] Productos más vendidos           hyperfoods.team/api/reports/1/
  // [X] Horas del día con más ventas     hyperfoods.team/api/reports/2/
  // [X] Clientes con más compras         hyperfoods.team/api/reports/3/
  // [X] Direcciones con más ventas       hyperfoods.team/api/reports/4/
  // [X] Trabajadores con más ventas      hyperfoods.team/api/reports/5/
  // [X] Ganancias mensuales              hyperfoods.team/api/reports/6/

  useEffect(() => {
    setTypePlan(window.sessionStorage.getItem("type_plan"));

    setLoading(true);

    // Report 1
    axios
      .get("http://" + path + "/api/reports/1/")
      .then((res) => {
        let sales = res.data.report.map((product) => product.sales);
        let labels = res.data.report.map(
          (product) => product.product.nameProduct
        );
        setBestSellingProducts({ labels, sales });
        setLoading(false);
      })
      .catch((err) => console.log("report 1: ", err));

    // Report 2
    axios
      .get("http://" + path + "/api/reports/2/")
      .then((res) => {
        let hours = [];
        let labels = [];
        for (let i = 0; i < 24; i++) {
          hours[i] = 0;
          labels[i] = `${i < 10 ? "0" : ""}${i}:00`;
        }

        res.data.report.map((item) => {
          if (parseInt(item.time) < 24) {
            hours[parseInt(item.time)] = item.sales;
          }
        });

        setTopSellingHours({ labels, hours });
        setLoading(false);
      })
      .catch((err) => console.log("report 2: ", err));

    // Report 3
    axios
      .get("http://" + path + "/api/reports/3/")
      .then((res) => {
        let sum = res.data.report.reduce(
          (total, item) => total + item.purchases,
          0
        );
        let purchases = res.data.report.map((item) =>
          parseInt(((item.purchases * 100) / sum).toFixed(1))
        );
        let labels = res.data.report.map((item) => item.client.user.email);
        setCustomerWithMorePurchases({ labels, purchases });
        setLoading(false);
      })
      .catch((err) => console.log("report 3: ", err));

    // Report 4
    axios
      .get("http://" + path + "/api/reports/4/")
      .then((res) => {
        let purchases = res.data.report.map((item) => item.purchases);
        let labels = res.data.report.map((item) => item.zone);
        setAddressesWithMostSales({ labels, purchases });
        setLoading(false);
      })
      .catch((err) => console.log("report 4: ", err));

    // Report 5
    axios
      .get("http://" + path + "/api/reports/5/")
      .then((res) => {
        let sales = res.data.report.map((item) => item.sales);
        let labels = res.data.report.map((item) => item.worker.user.email);
        setTopSellingWorkers({ labels, sales });
        setLoading(false);
      })
      .catch((err) => console.log("report 5: ", err));

    // Report 6
    axios
      .get("http://" + path + "/api/reports/6/")
      .then((res) => {
        let gains = res.data.report.map((item) => item.gain);
        let labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        setMonthlyEarnings({ labels, gains });
        setLoading(false);
      })
      .catch((err) => console.log("report 6: ", err));
  }, []);

  if (loading)
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Graphics Reports</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="spinner" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  else {
    return (
      <>
        <div className="content">
          {console.log(typePlan)}
          <Row>
            <Col md="12">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Best-selling products</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chart1(bestSellingProducts)["data"]}
                      options={chart1().options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {typePlan === "Medium" ? null : (
            <Row>
              {typePlan === "Basic" ? null : (
                <Col md="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <CardTitle tag="h4">
                        Top-selling hours of the day
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                          data={chart2(TopSellingHours).data}
                          options={chart2().options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
          )}

          {typePlan === "Medium" ? null : (
            <Row>
              {typePlan === "Basic" ? null : (
                <Col md="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <CardTitle tag="h4">
                        Customers with more purchases
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Doughnut
                          data={chart3(CustomerWithMorePurchases).data}
                          options={chart3().options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
          )}

          {typePlan === "Medium" ? null : (
            <Row>
              {typePlan === "Basic" ? null : (
                <Col md="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <CardTitle tag="h4">Addresses with most sales</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                          data={chart4(AddressesWithMostSales).data}
                          options={chart4().options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
          )}

          {typePlan === "Basic" ? null : (
            <Row>
              <Col md="12">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">Top-selling workers</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={chart5(topSellingWorkers).data}
                        options={chart5().options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

          {typePlan === "Basic" ? null : (
            <Row>
              <Col md="12">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">Monthly Earnings</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={chart6(monthlyEarnings).data}
                        options={chart6().options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </>
    );
  }
}

export default GraphicReports;
