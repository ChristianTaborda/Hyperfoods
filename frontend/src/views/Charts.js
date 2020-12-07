
import React, { useState, useEffect } from "react";
import {
  Card, Col, Table, CardBody,
  CardTitle, CardSubtitle, Button, Row, Container
} from 'reactstrap';
import axios from "axios";
import ruta from "./url.js"
import './spinner.css'

function Example() {
  const [productSalesTop, setProductSalesTop] = useState("")
  const [salesHour, setSalesHour] = useState("")
  const [loading, setLoading]=useState(false)
  useEffect(() => {
    setLoading(true)
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
        (res) => {setSalesHour(res.data) 
            setLoading(false) }
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="content">
       {
                 loading ? 
                 <div className="spinner"></div>:  
      <Row>  
      <Col sm="6">   
      <Card>
        <CardBody>
          <CardTitle tag="h5">Top most sold products</CardTitle>
          <Table  className="tablesorter text-center">
            <thead>
                <tr >
                    <th>Name</th>
                    <th>Sales</th>
                </tr>
            </thead>
            <tbody>
                {productSalesTop.report ===undefined ? null :
                productSalesTop.report.map((product, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{product.product.nameProduct}</td>
                                      <td>{product.sales}</td>
                                    </tr>
                                  );
                                }
                                )
                                }
             
            </tbody>
    </Table>
    
         
        </CardBody>
      </Card>
      </Col>
      <Col sm="6">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Hours with more sales</CardTitle>
          <Table className="tablesorter">
            <thead>
                <tr>
                    <th>Hour</th>
                    <th>Sales</th>
                </tr>
            </thead>
            <tbody>
            
                {salesHour.report ===undefined ? null :
                salesHour.report.map((product, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{product.time}</td>
                                      <td>{product.sales}</td>
                                    </tr>
                                  );
                                }
                                )
                                }
               
            </tbody>
        </Table>
        </CardBody>
      </Card>
      </Col>
      </Row>
}
    </div>
  );
};

export default Example;