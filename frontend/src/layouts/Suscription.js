import React , { useState }from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink, Container
  } from 'reactstrap';
  import {
    Card,Row,Col,  CardBody,
    CardFooter, Form,FormGroup, Input, Button,UncontrolledAlert,Alert
  } from 'reactstrap';
  import { useHistory } from "react-router-dom";
  import Footer from "components/Footer.js";
import logo from "assets/img/simple-logo.png";
import "./Suscription.css"

function Suscription(props){
    const [isOpen, setIsOpen] = useState(false);
    const [isSend, setSend]= useState(false)

    const toggle = () => setIsOpen(!isOpen);
    let history = useHistory();
    const [empresa, setEmpresa] = useState("");
    const [correo, setCorreo] = useState("")
    const [nombre, setNombre]= useState("")
    const [ciudad, setCiudad]= useState("")
    const [direccion, setDireccion]= useState("")

    const cleanForm = () => {
      document.getElementById("form").reset();
    }
  
  
    const onClick = (e) => {
      e.preventDefault();
      const mensaje ={
        tipo: props.match.params.id,
        empresa: empresa,
        correo: correo,
        nombre: nombre,
        ciudad: ciudad,
        direccion: direccion
      } 
      console.log(JSON.stringify(mensaje));
      setSend(true)
      cleanForm()
    
      //history.push("/");
  
    };
    const mostrarAlerta = () => {
      if (isSend) {
          return (
            <UncontrolledAlert color="success">
            <span>
              <b>Enviado exitosamente-</b>
              nos pondremos en contacto contigo en el menor tiempo posible
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
         <h1>Suscripcion a Hyperfoods</h1>
         <h3 className=" lead px-5">Sistema gestor de venta de comidas
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
       
         <Card className="card-campos">
           <CardBody>
            <Form id="form" onSubmit={onClick }>
            <FormGroup>
              <Row>
                <Col className="pr-md-1" md="6">
               
                   <label>Empresa</label>
                     <Input
                       placeholder="Nombre empresa"
                       type="text"
                       onChange={(e) => setEmpresa(e.target.value)}
                       required
                      />
                 </Col>
                   <Col className="pl-md-1" md="6">
                   
                       <label htmlFor="exampleInputEmail1">
                        Correo electronico
                       </label>
                       <Input 
                        placeholder="mike@email.com" 
                        type="email"
                        onChange={(e) => setCorreo(e.target.value)}
                        required />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                        <label>Nombre</label>
                        <Input
                          placeholder="Nombre completo"
                          type="text"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                    </Col>
                    
                      <Col className="pr-md-1" md="4">
                          <label>Ciudad</label>
                          <Input
                            placeholder="Ciudad"
                            type="text"
                            onChange={(e) => setCiudad(e.target.value)}
                            required
                          />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <label>Dirección</label>
                        <Input
                          placeholder="Calle ..."
                          type="text"
                          onChange={(e) => setDireccion(e.target.value)}
                          required
                        />
                    
                    </Col>
                  </Row>
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
              </CardBody>
            
         </Card>
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
                    <h3 className="mb-4 text-center">Aceptamos los siguientes metodos de pago.</h3>
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