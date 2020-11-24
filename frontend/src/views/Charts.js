
import React, { useState, useEffect } from "react";
import {
  Card, CardImg, Table, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from "axios";
import ruta from "./url.js"

function Example() {
  const [productSalesTop, setProductSalesTop] = useState("")
  const [salesHour, setSalesHour] = useState("")
  useEffect(() => {
    axios
      .get('http://'+ruta+'/api/reports/1')
      .then(
        (res) => {setProductSalesTop(res.data) 
        console.log(res.data)
        } 
      )
      .catch((err) => console.log(err));
    axios
      .get('http://'+ruta+'/api/reports/2')
      .then(
        (res) => setSalesHour(res.data)  
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Top most sold products</CardTitle>
          <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sales</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                {productSalesTop.report.map((product, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{product.product.nameProduct}</td>
                                      <td>{product.sales}</td>
                                      
                                      
                                    </tr>
                                  );
                                }
                                )
                                }
                </tr>
            </tbody>
    </Table>
         
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Example;