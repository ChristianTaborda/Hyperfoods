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

function Users() {
  const [userList, setUserList] = useState([
    {
      id_user: "-",
      is_active: "-",
      type_document: "-",
      document: "-",
      name: "-",
      surname: "-",
      phone: "-",
      address: "-",
      email: "-",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://tenant1.hyperfoods.team/api/users")
      .then(
        (res) => setUserList(res.data)  
      )
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <div className="content">
        {console.log(userList)}
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
                      <th>Id Number</th>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>{user.is_active ? "true" : "false"}</td>
                          <td>{user.document}</td>
                          <td>{user.type_document}</td>
                          <td>{user.id_user}</td>
                          <td>{user.name}</td>
                          <td>{user.surname}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                          <td>{user.email}</td>
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

export default Users;
