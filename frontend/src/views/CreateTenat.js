import React , { useState }from 'react'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
    Card,Row,Col,  CardBody,
    CardFooter, FormGroup,  Button,UncontrolledAlert,Alert,Container
  } from 'reactstrap';
  import "../layouts/Suscription.css"

  function CreateTenant(){

    const [isSend, setSend]= useState(false)
    /*
    const [nombre_tenant, setNTenant] = useState("");
    const [nombre_empresa, setNEmpresa] = useState("")
    const [caducidad, setCaducidad]= useState("")*/

    const [initialValues, setInitialValues] = useState({
      Nombre_tenant: "",
      Nombre_empresa: "",
      Caducidad:""
    });
    /*const onClick = (e) => {
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
    
      };*/
      const onSubmit = (values, { resetForm }) => {
        let res = values;
        console.log(JSON.stringify(res));
        setSend(true)
        setTimeout(() => {
          resetForm(initialValues);
        }, 600);  }

      const formSchema = Yup.object().shape({
   
          Nombre_tenant: Yup.string()
            .trim()
            .required("Required field")
            .min(2, "Minimum of 2 characters")
            .matches(
              /^([a-z,.'-])+/g,
              "Must contain only lowercase letters and these symbols , . '   - "
            ),
          Nombre_empresa: Yup.string()
            .trim()
            .required("Required field")
            .min(2, "Minimum of 2 characters")
            .matches(
              /^[a-z ,.'-]+$/i,
              "Must contain only letters and these symbols , . '   - "
            ),
          Caducidad: Yup.string()
            .trim()
            .required("Required field")        
      });
    
    const mostrarAlerta = () => {
        if (isSend) {
            return (
              <UncontrolledAlert color="success">
              <span>
                <b>Successfully created</b>
              </span>
            </UncontrolledAlert>
            )
        }
    }
    return(
        <>
        <div className="content">
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
        > 
           <Form  >  
        <Card >
           <h3 className="title pl-md-4 py-2">Create Tenant</h3>
          <CardBody >
          <Container className="d-flex justify-content-center align-items-center">
             <Col >
             <FormGroup>
               <label>Tenant name</label>
               <Field
               className="form-control"
                 placeholder="Type the tenant name"
                 type="text"
                 name="Nombre_tenant"
                />
                <ErrorMessage
                        name="Nombre_tenant"
                        component="div"
                        className="field-error text-danger"
                      />
               </FormGroup>
             </Col>
             <Col >
             <FormGroup>
              <label> Company name
              </label>
              <Field 
              className="form-control"
                 placeholder="Type the company name" 
                 type="text"
                 name="Nombre_empresa" />
                 <ErrorMessage
                        name="Nombre_empresa"
                        component="div"
                        className="field-error text-danger"
                      />
                </FormGroup>
             </Col>
             <Col >
             <FormGroup>
              <label>Expiration</label>
                <Field
                className="form-control"
                  placeholder="fecha limite"
                  type="date"
                  name="Caducidad"
                />
                 <ErrorMessage
                        name="Caducidad"
                        component="div"
                        className="field-error text-danger"
                      />
                </FormGroup>
             </Col>
              <CardFooter className="text-center">
                 <Button 
                   className="btn-fill" 
                   color="primary" 
                   color="success" 
                   type="submit"
                 >
                 Crear
                 </Button>
              </CardFooter>
        
          </Container>   
        </CardBody>
           
     </Card>
     </Form>
     </Formik>
      {mostrarAlerta()}
      </div>
      </>
    );

  }

  export default CreateTenant;