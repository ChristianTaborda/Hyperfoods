import React, { useState, useEffect } from "react";
import axios from "axios";

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

function Combo() {
  const [comboList, setCombolist] = useState([
   { 
    codeCombo: "-",
    comboCombo: [
     {
      codecombo: "-",
      categorycombo: {
        codeCategory: "-",
        nameCategory: "-",

      },
      namecombo: "-",
      descriptioncombo: "-",
      pricecombo: "-"
    },],
    nameCombo: "-",
    descriptionCombo: "-",
    discountCombo: "-",
    priceCombo:"-",
    imageCombo:"-"



   }
  ]);

  useEffect(() => {
    axios
      .get("http://tenant1.hyperfoods.team/api/combo")
      .then(
        (res) => setCombolist(res.data)  
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
                <CardTitle tag="h4">combos</CardTitle>
              </CardHeader>
              <CardBody>
              {console.log(comboList)}
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Code</th>
                      <th>Category</th>
                      <th>Nombre</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comboList.map((combo, i) => {
                      return (
                        <tr key={i}>
                          <td>{combo.codecombo}</td>
                          <td>{combo.categorycombo.nameCategory}</td>
                          <td>{combo.namecombo}</td>
                          <td>{combo.descriptioncombo}</td>
                          <td>{combo.pricecombo}</td>
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

export default Combo;
