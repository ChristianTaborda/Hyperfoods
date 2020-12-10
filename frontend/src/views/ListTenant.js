import React , { useState,useEffect}from 'react'
import axios from "axios";
import {
    Card,
    Table,
    Col,
    CardBody,
    CardFooter,
    FormGroup,  
    Button,UncontrolledAlert,
    Container,
    Input
  } from 'reactstrap';
import './spinner.css'

import ruta from "./url.js"

function ListTenant(){
    const [tenants, setTenants]= useState([])
    const [loading, setLoading]=useState(false)

    useEffect(() => {
        setLoading(true)
          axios.get('http://hyperfoods.team/tenants/domain/')
          .then((response) => {
           
            setTenants(response.data)
            setLoading(false)
          });
      },[]);

    return(
        <>
         <div className="content">
            <Card >
              <h3 className="title pl-md-4 py-2">List Tenant</h3>
            
                <Container className="text-center">
                    {loading ? 
                    <div className="spinner"></div>:
                        <Table responsive>
                            <thead >
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Paid until</th>
                                <th>Create on</th>
                            </tr>
                            </thead>
                            <tbody>
                                {tenants.map((tenant1, i) => {
                                    return (
                                    <tr key={i}>
                                        <td>{tenant1.tenant.id}</td>
                                        <td>{tenant1.tenant.name}</td>
                                        <td>{tenant1.tenant.paid_until}</td>
                                        <td>{tenant1.tenant.created_on}</td>   
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    }
                </Container>
           </Card>
         
       
        
       </div>
        
        </>


    );

}

export default ListTenant;