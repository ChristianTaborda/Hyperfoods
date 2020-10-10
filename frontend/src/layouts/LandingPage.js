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
    Card,Row,Col, CardText, CardBody,
    CardTitle, CardSubtitle, CardFooter, Table, Button
  } from 'reactstrap';
  import { useHistory } from "react-router-dom";
  import Footer from "components/Footer.js";
import logo from "assets/img/simple-logo.png";
import avatar from "assets/img/anime3.png"
import "./Landing.css"

function LandingPage(){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    let history = useHistory();
    
  
    return (
   
      <body data-spy="scroll" data-target="#navbar-l" data-offset="20">
         {//Barra de navegación
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
                    <NavLink href="#home">Home</NavLink>
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
            <h1>Bienvenido a Hyperfoods</h1>
            <h3 class=" lead px-5">Sistema de gestion de venta de comidas
              </h3>
            
          </div>
          <div className="onda">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="ondaa">
                <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="ondaaa">
                </path>
               </svg>
          </div>
        </section>
        

        <section id="pricing" className="pricing offsset py-3 ">
          <h1 className="tex-center"> Nuestros planes</h1>
          <Container>

             <Row>
                <Col className="col-12 col-lg-4">
                 <Card>
                    <CardBody>
                      <div className="d-flex mb-3 text-primary">
                        <span className="h5 mb-0">$</span>
                        <CardTitle className="price display-2 mb-0 price1" data-annual="199" data-monthly="99">
                          100</CardTitle>
                        
                        <CardSubtitle className="h6 font-weight-normal align-self-end">/mes</CardSubtitle>
                      </div>
                      <h4 className="mb-3 text-black">Paquete Basico</h4>
                      <CardSubtitle>
                            Ofrece las funcionalidades más básicas y cero nivel de personalización.
                        </CardSubtitle> 
                   </CardBody>
                 
                   <CardBody>
                   <Table  responsive>
                        <div className="features">
                          <tbody>
                            <tr>
                              <td ><span className="check"><i className=" far fa-check-circle"></i></span> Gestion de usuarios</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de clientes</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de productos</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de ventas</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Reportes(formato texto)</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Reportes graficos</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Personalización</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Actualización de menú(Excel)</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Ubicación de clientes</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Monitoreo del sistema</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> PWA</td>
                            </tr>
                          </tbody>
                        </div>
                      </Table>
                      <CardFooter>
         
                         <Button className="btn-fill "  onClick={() => history.push("/request/basic")} color="success" type="submit">
                          Adquirir <i className="p-2 fas fa-arrow-right"></i>
                         </Button>
                     
                      </CardFooter>
                   </CardBody>
                  </Card>
                </Col>
                <Col className="col-12 col-lg-4">
                <Card>
                    <CardBody>
                      <div className="d-flex mb-3 text-primary">
                        <span className="h5 mb-0">$</span>
                        <CardTitle className="price display-2 mb-0 price1" data-annual="199" data-monthly="99">
                          150</CardTitle>
                        
                        <CardSubtitle className="h6 font-weight-normal align-self-end">/mes</CardSubtitle>
                      </div>
                      <h4 className="mb-3 text-black">Paquete Normal</h4>
                      <CardSubtitle>
                       Funcionalidades adicionales(reportes y nivel intermedio de personalización).
                        </CardSubtitle> 
                   </CardBody>
                 
                   <CardBody>
                   <Table  responsive>
                        <div className="features">
                          <tbody>
                            <tr>
                              <td ><span className="check"><i className=" far fa-check-circle"></i></span> Gestion de usuarios</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de clientes</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de productos</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de ventas</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Reportes(formato texto)</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Reportes graficos</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Personalización</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Actualización de menú(Excel)</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Ubicación de clientes</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> Monitoreo del sistema</td>
                            </tr>
                            <tr>
                            <td><span className="cancel"><i className="fas fa-times"></i></span> PWA</td>
                            </tr>
                          </tbody>
                        </div>
                      </Table>
                      <CardFooter>
                         <Button className="btn-fill" onClick={() => history.push("/request/medium")} color="success" type="submit">
                          Adquirir <i className="p-2 fas fa-arrow-right"></i>
                         </Button>
                      </CardFooter>
                   </CardBody>
                  </Card>
                </Col>
                <Col className="col-12 col-lg-4">
                  <Card>
                    <CardBody>
                      <div className="d-flex mb-3 text-primary">
                        <span className="h5 mb-0">$</span>
                        <CardTitle className="price display-2 mb-0 price1" data-annual="199" data-monthly="99">
                          200</CardTitle>
                        
                        <CardSubtitle className="h6 font-weight-normal align-self-end">/mes</CardSubtitle>
                      </div>
                      <h4 className="mb-3 text-black">Paquete Full</h4>
                      <CardSubtitle>
                        Características adicionales además de las funcionalidades básicas e intermedias
                        </CardSubtitle> 
                   </CardBody>
                 
                   <CardBody>
                   <Table  responsive>
                        <div className="features">
                          <tbody>
                            <tr>
                              <td ><span className="check"><i className=" far fa-check-circle"></i></span> Gestion de usuarios</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de clientes</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de productos</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Gestion de ventas</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Reportes(formato texto)</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Reportes graficos</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Personalización</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Actualización de menú(Excel)</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Ubicación de clientes</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> Monitoreo del sistema</td>
                            </tr>
                            <tr>
                            <td><span className="check"><i className="far fa-check-circle"></i></span> PWA</td>
                            </tr>
                          </tbody>
                        </div>
                      </Table>
                      <CardFooter>
                         <Button className="btn-fill" onClick={() => history.push("/request/full")} color="success" type="submit">
                          Adquirir <i className="p-2 fas fa-arrow-right"></i>
                         </Button>
                      </CardFooter>
                   </CardBody>
                  </Card>
                </Col>
             </Row>
          </Container>
       
        </section>
        <div className="onda-pricing-team">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="ondaa-pricing-team">
                <path d="M0.00,49.98 C193.28,128.78 292.61,-24.17 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" className="ondaaa-pricing-team">
                </path>
              </svg>
          </div>
        <div className="onda-team">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="ondaa-team">
                <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="ondaaa-team">
                </path>
              </svg>
          </div>
          
        <section id="team" className="team offsset text-center">
          <Container className=" p-5">
          <h1 className="text-white">Team Development</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices nisi libero, sed dignissim leo.</p>
            <Row className="py-4">
              <Col className="col-12 col-lg-3">
                <Card>
                  <CardBody>
                    <CardTitle className="text-black">Cristian Vallecilla</CardTitle>
                    <CardSubtitle>Desarrollador frontend</CardSubtitle>
                  </CardBody>
                  <img width="50%" src={avatar} alt="avatar" className="img-fluid rounded-circle"/>
                  <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <div className="d-flex flex-row justify-content-center">
                      <div className="p-2">
                      <i className="fab fa-facebook"></i>
                        </div>
                      <div className="p-2">
                      <i className="fab fa-github"></i>
                      </div>
                      <div className="p-2">
                        <i className="fab fa-discord"></i>
                      </div>
                    </div>
                  </CardBody>

                </Card>
              </Col>
              <Col className="col-12 col-lg-3">
                <Card>
                  <CardBody>
                    <CardTitle className="text-black">Jem Pool Suarez</CardTitle>
                    <CardSubtitle>Desarrollador frontend</CardSubtitle>
                  </CardBody>
                  <img width="50%" src={avatar} alt="avatar" className="img-fluid rounded-circle"/>
                  <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <div className="d-flex flex-row justify-content-center">
                      <div className="p-2">
                      <i className="fab fa-facebook"></i>
                        </div>
                      <div className="p-2">
                      <i className="fab fa-github"></i>
                      </div>
                      <div className="p-2">
                        <i className="fab fa-discord"></i>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="col-12 col-lg-3">
                <Card>
                  <CardBody>
                    <CardTitle  className="text-black">Esneider Manzano</CardTitle>
                    <CardSubtitle>Desarrollador backend</CardSubtitle>
                  </CardBody>
                  <img width="50%" src={avatar} alt="avatar" className="img-fluid rounded-circle"/>
                  <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <div className="d-flex flex-row justify-content-center">
                      <div className="p-2">
                      <i className="fab fa-facebook"></i>
                        </div>
                      <div className="p-2">
                      <i className="fab fa-github"></i>
                      </div>
                      <div className="p-2">
                        <i className="fab fa-discord"></i>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="col-12 col-lg-3">
                <Card>
                  <CardBody>
                    <CardTitle className="text-black">Christian Taborda</CardTitle>
                    <CardSubtitle>Desarrollador backend</CardSubtitle>
                  </CardBody>
                  <img width="50%" src={avatar} alt="avatar" className="img-fluid rounded-circle"/>
                  <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <div className="d-flex flex-row justify-content-center">
                      <div className="p-2">
                      <i className="fab fa-facebook"></i>
                        </div>
                      <div className="p-2">
                      <i className="fab fa-github"></i>
                      </div>
                      <div className="p-2">
                        <i className="fab fa-discord"></i>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            </Container>
        </section>
        <div className="onda-footer">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="ondaa-footer">
                <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="ondaaa-footer">
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
                              <a href="./contact.html"><strong>Chat with us</strong></a><span class="border-right border-gray mx-2"></span>Send us an email to <a href="mailto:support@yourcompany.com"><strong>support@yourcompany.com</strong></a>
                          </div>
                      </div> 
                  </div>   

        </section>
        <Footer fluid />
      
        
            
      </body>

    );
    
    


};

export default LandingPage;