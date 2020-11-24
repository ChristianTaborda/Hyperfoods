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
import './spinner.css'

function Combo() {
  const [loading, setLoading]=useState(false)
  const [comboList, setCombolist] = useState([
   { 
    codeCombo: "-",
    productCombo: [
        {
            codeProduct: "-",
            categoryProduct: {
                codeCategory:"-",
                nameCategory: "-"
            },
            nameProduct: "-",
            descriptionProduct: "-",
            priceProduct: "-",
            imageProduct: "-"
        },
        {
            codeProduct: "-",
            categoryProduct: {
                codeCategory: "-",
                nameCategory: "-"
            },
            nameProduct: "-",
            descriptionProduct: "-",
            priceProduct: "-",
            imageProduct: "-"
        },
    ],
    nameCombo: "-",
    descriptionCombo: "-",
    discountCombo: "-",
    priceCombo: "-",
    imageCombo: "-"
}

  ]);

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://'+ruta+'/api/combos/')
      .then(
        (res) => {
          setCombolist(res.data)  
          setLoading(false)

        }
      )
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <div className="content">
       
        <Row>
          <Col md="12">
            <Card>
             
              <CardBody>
              {
                 loading ? 
                 <div className="spinner"></div>:
                <Table className="tablesorter" responsive bordered>
                  <thead className="text-primary">
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th className="text-center">Products</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comboList.map((combo, i) => {
                      return (
                        <tr key={i}>
                          <td>{combo.codeCombo}</td>
                          <td>{combo.nameCombo}</td>
                          <td> 
                            <Table className="tablesorter" style={{background: "white"}}>
                              <thead>
                                <tr>
                                  <th>code</th>
                                  <th>Category</th>
                                  <th>Name</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                            {combo.productCombo.map((product, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{product.codeProduct}</td>
                                      <td>{product.categoryProduct.nameCategory}</td>
                                      <td>{product.nameProduct}</td>
                                      <td>{product.descriptionProduct}</td>
                                      
                                    </tr>
                                  );
                                }
                                )
                                }
                          </Table>
                          </td>
                          <td>{combo.descriptionCombo}</td>
                          <td>{combo.priceCombo}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Combo;
