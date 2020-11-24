import React, { useState, useEffect } from "react";
import axios from "axios";
import ruta from "./url.js"
import './spinner.css'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  Col,
} from "reactstrap";

function Clients() {
  const [loading, setLoading]=useState(false)
  const [productList, setProdcutList] = useState([
    {
      codeProduct: "-",
      categoryProduct: {
        codeCategory: "-",
        nameCategory: "-",

      },
      nameProduct: "-",
      descriptionProduct: "-",
      priceProduct: "-"
    },
  ]);

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://'+ruta+'/api/products/')
      .then(
       
        (res) => { setLoading(false)
          setProdcutList(res.data) } 
      )
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <div className="content">
       
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Products</CardTitle>
              </CardHeader>
              <CardBody>
              {console.log(productList)}
              {loading ? 
           <div className="spinner"></div>:
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Code</th>
                      <th>Category</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product, i) => {
                         
                      return (
                    
                        <tr key={i}>
                          <td>{product.codeProduct}</td>
                          
                          <td>{product.categoryProduct.nameCategory}</td>
                          <td>{product.nameProduct}</td>
                          <td>{product.descriptionProduct}</td>
                          <td>{product.priceProduct}</td>
                          <td>
                       <Button
                         type="button"
                         color="warning"
                         className="fa fa-cog"
                       >Edit</Button>
                     </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Clients;
