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

function Clients() {
  const [clientList, setClientList] = useState([
    {
      credit_card: "-",
      id_user: "-",
      user: {
        is_active: "-",
        type_document: "-",
        document: "-",
        name: "-",
        surname: "-",
        phone: "-",
        address: "-",
        email: "-",
      },
    },
  ]);

  useEffect(() => {
    axios
      .get("http://tenant1.hyperfoods.team/api/users/client/")
      .then((res) => setClientList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="content">
        {console.log(clientList)}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Users</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Status</th>
                      <th>Document</th>
                      <th>Id Type</th>
                      <th>Id User</th>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Credit Card</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientList.map((client, i) => {                      
                      return (
                        <tr key={i}>
                          <td>{client.user.is_active ? "true" : "false"}</td>
                          <td>{client.user.document}</td>
                          <td>{client.user.type_document === 1 ? "CC" : "TI"}</td>
                          <td>{client.id_user}</td>
                          <td>{client.user.name}</td>
                          <td>{client.user.surname}</td>
                          <td>{client.user.phone}</td>
                          <td>{client.user.address}</td>
                          <td>{client.user.email}</td>
                          <td>{client.credit_card}</td>
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
