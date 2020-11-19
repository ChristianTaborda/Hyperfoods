import React, { useState, useEffect } from "react";
import axios from "axios";
import ruta from "./url.js"

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

function Clients() {
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
    axios
      .get('http://'+ruta+'/api/products/')
      .then(
        (res) => setProdcutList(res.data)  
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
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Code</th>
                      <th>Imagen</th>
                      <th>Category</th>
                      <th>Nombre</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product, i) => {
                         
                      return (
                    
                        <tr key={i}>
                          <td>{product.codeProduct}</td>
                          <td><image  src={product.imageProduct} alt="abc" width="70px" height="65px"></image></td>
                          <td>{product.categoryProduct.nameCategory}</td>
                          <td>{product.nameProduct}</td>
                          <td>{product.descriptionProduct}</td>
                          <td>{product.priceProduct}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Clients;
