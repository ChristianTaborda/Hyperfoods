import React , { useState }from 'react'
import {
    Card,Row,Col,  CardBody,
    CardFooter, Form,FormGroup, Input, Button,UncontrolledAlert,Alert,Container
  } from 'reactstrap';
  import "../layouts/Suscription.css"

  function CreateTenant(){

    const [isSend, setSend]= useState(false)
    const [nombre_tenant, setNTenant] = useState("");
    const [nombre_empresa, setNEmpresa] = useState("")
    const [caducidad, setCaducidad]= useState("")
    const onClick = (e) => {
        e.preventDefault();

       
        const mensaje ={
          nombre_tenant: nombre_tenant,
          nombre_empresa: nombre_empresa,
          caducidad: caducidad,
       
        } 
        console.log(JSON.stringify(mensaje));
        setSend(true)
        cleanForm()
      
        //history.push("/");
    
      };

    const cleanForm = () => {
        document.getElementById("form").reset();
      }

    const mostrarAlerta = () => {
        if (isSend) {
            return (
              <UncontrolledAlert color="success">
              <span>
                <b>Successfully created-</b>
              </span>
            </UncontrolledAlert>
            )
        }
    }
    return(
        <>
        <div className="content">
               
        <Card >
          <CardBody className="text-center">
          <Container>
           <Form id="form" onSubmit={onClick }>
            
           <FormGroup>
             <Col >
               <label>Tenant name</label>
               <Input
                 placeholder="Type the tenant name"
                 type="text"
                 onChange={(e) => setNTenant(e.target.value)}
                 required
                />
             </Col>
             <Col >
              <label> Company name
              </label>
              <Input 
                 placeholder="Type the company name" 
                 type="text"
                 onChange={(e) => setNEmpresa(e.target.value)}
                 required />
             </Col>
             <Col >
              <label>Expiration</label>
                <Input
                  placeholder="fecha limite"
                  type="date"
                  onChange={(e) => setCaducidad(e.target.value)}
                  required
                />
             </Col>
             </FormGroup>
              <CardFooter className="text-center">
                 <Button 
                   className="btn-fill" 
                   color="primary" 
                   color="success" 
                   type="submit"
                 >
                 Enviar
                 </Button>
              </CardFooter>
          </Form>
          </Container>   
        </CardBody>
           
     </Card>
     
      {mostrarAlerta()}
      </div>
      </>
    );

  }

  export default CreateTenant;