import React , { useState }from 'react'
import { useHistory } from "react-router-dom";
import Footer from "components/Footer.js";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink, Container,
    Card,Row,Col,  CardBody,
    CardFooter,FormGroup,  Button,UncontrolledAlert,Alert, Input
  } from 'reactstrap';
  
import logo from "assets/img/simple-logo.png";
import "./Suscription.css"

function Suscription(props){
    const [isOpen, setIsOpen] = useState(false);
    const [isSend, setSend]= useState(false)

    const toggle = () => setIsOpen(!isOpen);
    let history = useHistory();
    /*
    const [empresa, setEmpresa] = useState("");
    const [correo, setCorreo] = useState("")
    const [nombre, setNombre]= useState("")
    const [ciudad, setCiudad]= useState("")
    const [direccion, setDireccion]= useState("")*/
    const [initialValues, setInitialValues] = useState({
      Company: "",
      Name: "",
      City:"",
      Email: "",
      Address: "",
    });

    const onSubmit = (values, { resetForm }) => {
      let res = values;
      res.Plan=props.match.params.id
      console.log(JSON.stringify(res));
      setSend(true)
      setTimeout(() => {
        resetForm(initialValues);
      }, 600);
    
      //history.push("/");
  
    };
      //Schema for Field data valiation using Yup
  const formSchema = Yup.object().shape({
   
    Company: Yup.string()
      .trim()
      .required("Required field")
      .min(2, "Minimum of 2 characters")
      .matches(
        /^[a-z ,.'-]+$/i,
        "Must contain only letters and these symbols , . '   - "
      ),
    Name: Yup.string()
      .trim()
      .required("Required field")
      .min(2, "Minimum of 2 characters")
      .matches(
        /^[a-z ,.'-]+$/i,
        "Must contain only letters and these symbols , . '   - "
      ),
  
    Email: Yup.string()
      .trim()
      .required("Required field")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Must be a valid e-mail address"
      ),
    City: Yup.string()
      .trim()
      .required("Required field")
      .min(2, "Minimum of 2 characters")
      .matches(
        /^[a-z ,.'-]+$/i,
        "Must contain only letters and these symbols , . '   - "
      ),
       

    Address: Yup.string()
      .trim()
      .required("Required field")
      .min(7, "Minimum of 7 characters")
      .matches(
        /[\w\[\]`#\^(),.'-]/g,
        "Must contain only letters, numbers and these symbols #  ^ ( ) , . ' -"
      ),
   
   
  });
    const mostrarAlerta = () => {
      if (isSend) {
          return (
            <UncontrolledAlert color="success">
            <span>
              <b>Sent successfully-</b>
              We will get in touch with you in the shortest time possible
            </span>
          </UncontrolledAlert>
          )
      }
  }

  
    return (
      <body data-spy="scroll" data-target="#navbar-l" data-offset="20">
      {//Barra de navegación
      console.log(props.match.params.id)
      }
     <section id="home" >

       <Navbar id="navbar-l" className="navbar-l navbar-expand-lg navbar-dark ">
         <Container>
           <a className="navbar-brand-l" href="/">
             <img src={logo} alt="logo" />
           </a>
           <NavbarToggler onClick={toggle} />
           <Collapse isOpen={isOpen} navbar>
             <Nav className="ml-auto" navbar>
               <NavItem >

                 <NavLink onClick={() => history.push("/landing") }>Home</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink href="#pricing">Plans</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink href="#team">Team</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink href="#m-pay">Pays</NavLink>
               </NavItem>    
             </Nav>        
           </Collapse>
         </Container>
       </Navbar>

       <div  className="landing">
         <div className="home-wrap">
           <div className="home-inner ">
           </div>
         </div>
       </div>
       
       <div className="caption text-center" >
         <h1>Suscription to Hyperfoods</h1>
         <h3 className=" lead px-5">Foods sales management system
           </h3>
         
       </div>
       <div className="onda-s">
           <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="ondaa-s">
             <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="ondaaa-s">
             </path>
            </svg>
       </div>
     </section>
     <section className="campos py-5">
     <h2 className="title">Plan {props.match.params.id}</h2>

       <Container className="d-flex justify-content-center align-items-center"  >
       <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
        >
          <Form>
            <Card className="card-campos">
              <CardBody >
                <Row >
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="Company">Company</label>
                      <Field
                        className="form-control"
                        name="Company"
                        placeholder="type your company name"
                      />
                      <ErrorMessage
                        name="Company"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="Name">Name</label>
                      <Field
                        className="form-control"
                        name="Name"
                        placeholder="type your full name"
                      />
                      <ErrorMessage
                        name="Name"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row > 
                <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="Email">Email address</label>

                      <Field
                        className="form-control"
                        name="Email"
                        placeholder="type your email address"
                      />
                      <ErrorMessage
                        name="Email"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="City">City</label>
                      <Field
                        className="form-control"
                        name="City"
                        placeholder="type your company city"
                      />
                      <ErrorMessage
                        name="City"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                 
                </Row>
                
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label htmlFor="Email">Address</label>
                      <Field
                        className="form-control"
                        name="Address"
                        placeholder="type your address"
                      />
                      <ErrorMessage
                        name="Address"
                        component="div"
                        className="field-error text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                
           
              </CardBody>
              <CardFooter className="text-center">
                <Button 
                  className="btn-fill" 
                  color="primary" 
                  color="success" 
                  type="submit"
                >
                  Send
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Formik>
       </Container>
       {mostrarAlerta()}
    
     </section>
   
     <div className="onda-footer-s">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="ondaa-footer-s">
                <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="ondaaa-footer-s">
                </path>
              </svg>
          </div>
        <section id="m-pay" className="pay offsset py-2">
          <div className="container">
             <div className="row justify-content-center"> 
                 <div className="col-12">
                    <h3 className="mb-4 text-center">We accept the following payment methods</h3>
                  </div>
                  <div className="d-flex flex-row justify-content-center">
                    <div className="p-2">
                       <i className=" tamano fab fa-cc-visa" ></i>
                    </div>
                  <div className="p-2">
                     <i className="tamano fab fa-bitcoin"></i>
                  </div>
                  <div className="p-2">
                    <i className=" tamano fab fa-cc-mastercard"></i>
                  </div>
                  <div className="p-2"> 
                    <i className="tamano fab fa-cc-stripe"></i>
                  </div>
                  <div className="p-2">  
                    <i className=" tamano  fab fa-cc-amazon-pay"></i>
                  </div>     
                  <div className="p-2">  
                    <i className="tamano fab fa-cc-paypal"></i>
                  </div>
                        
                </div>
                          <div className="col-12 text-center py-3">
                              <a href="./contact.html"><strong>Chat with us</strong></a><span className="border-right border-gray mx-2"></span>Send us an email to <a href="mailto:support@yourcompany.com"><strong>support@yourcompany.com</strong></a>
                          </div>
                      </div> 
                  </div>   

        </section>
        <Footer fluid />
      
        
            
      </body>
   
     

    );
    
    


};

export default Suscription;