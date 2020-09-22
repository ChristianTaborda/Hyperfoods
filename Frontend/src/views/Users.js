import React from "react";

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
  return (
    <>
      <div className="content">
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
                      <th>Role</th>
                      <th>Status</th>
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
                    <tr>
                      <td>Admin</td>
                      <td>Active</td>
                      <td>Code</td>
                      <td>1628373</td>
                      <td>Esneider</td>
                      <td>Manzano</td>
                      <td>+1 (201) 555 5455</td>
                      <td>301 2nd Avenue South</td>
                      <td>e.manzano@email.com</td>
                    </tr>

                    <tr>
                      <td>Admin</td>
                      <td>Active</td>
                      <td>Code</td>
                      <td>1630536</td>
                      <td>Jem Pool</td>
                      <td>Suárez</td>
                      <td>+1 (201) 552 6459</td>
                      <td>2320 4th Avenue</td>
                      <td>j.suarez@email.com</td>
                    </tr>

                    <tr>
                      <td>Admin</td>
                      <td>Active</td>
                      <td>Code</td>
                      <td>1628790</td>
                      <td>Cristian</td>
                      <td>Vallecilla</td>
                      <td>+1 (201) 555 6478</td>
                      <td>110 Lee Street</td>
                      <td>c.vallecilla@email.com</td>
                    </tr>

                    <tr>
                      <td>Admin</td>
                      <td>Active</td>
                      <td>Code</td>
                      <td>1632081</td>
                      <td>Christian</td>
                      <td>Taborda</td>
                      <td>+1 (201) 575 5419</td>
                      <td>3601 Beacon Avenue South</td>
                      <td>c.taborda@email.com</td>
                    </tr>
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
