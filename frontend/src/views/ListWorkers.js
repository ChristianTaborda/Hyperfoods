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

function ListWorkers() {
  const [userList, setUserList] = useState([
    {
      user_type: "-",
      user: {
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
    },
  ]);

  useEffect(() => {
    axios
      .get("http://tenant1.hyperfoods.team/api/users/worker/")
      .then((res) => setUserList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Workers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Status</th>
                      <th>User Type</th>
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
                          <td>{user.user.is_active ? "true" : "false"}</td>
                          <td>
                            {user.user_type === 1 ? "Manager" : "Digitalizer"}
                          </td>
                          <td>{user.user.document}</td>
                          <td>{user.user.type_document === 1 ? "CC" : "TI"}</td>
                          <td>{user.user.id_user}</td>
                          <td>{user.user.name}</td>
                          <td>{user.user.surname}</td>
                          <td>{user.user.phone}</td>
                          <td>{user.user.address}</td>
                          <td>{user.user.email}</td>
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

export default ListWorkers;
