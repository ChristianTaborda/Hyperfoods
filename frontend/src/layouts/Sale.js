import React , { useState, useEffect }from 'react'
import { useHistory } from "react-router-dom";
import Footer from "components/Footer.js";
import axios from "axios";
import "./Sale.css"
import "views/spinner.css"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Col,
  Row,
  UncontrolledAlert,
  
} from "reactstrap";
import logo from "assets/img/simple-logo.png";

import "./Suscription.css";
import ruta from "views/url.js" 
import CardProduct from "views/CardProduct.js"

function Suscription(props) {
  let brokenImage = "http://karinlifoods.com/wp-content/uploads/2017/09/imagen-no-disponible.jpg"
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setSend] = useState(false);
  const [productChoosed, setproductChoosed]= useState([])
  const [loading, setLoading]=useState(false)

 
  const toggle = () => setIsOpen(!isOpen);
  let history = useHistory();

  const [productList, setProdcutList] = useState([
    {
      codeProduct: "-",
      categoryProduct: {
        codeCategory: "-",
        nameCategory: "-",

      },
      nameProduct: "-",
      descriptionProduct: "-",
      priceProduct: "-"
    },
  ]);

  function sale(product){
    let tLista = productChoosed;
                 tLista.push(product);
    setproductChoosed(tLista)
    console.log(productChoosed.length)
  }

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://'+ruta+'/api/products/')
      .then(
        (res) => {setProdcutList(res.data)  
        console.log(res.data)
        setLoading(false)}
      )
      .catch((err) => console.log(err));
  }, []);



  const onSubmit = (values, { resetForm }) => {
   
    /*axios
      .post("", mensaje)
      .then((res) => {
        console.log("%c response ", "background: #222; color: #bada55");
        console.table(res.data);
      })
      .catch((err) => console.log(err));*/
    //    setTimeout(() => {  history.push("/"); }, 800);

    //history.push("/");
  };
  

  return (
    <>
    <body data-spy="scroll" data-target="#navbar-l" data-offset="20">
      
      <section id="home">
        <Navbar
          id="navbar-l"
          className="navbar-l navbar-expand-lg navbar-dark "
        >
          <Container>
            <a className="navbar-brand-l" href="/">
              <img src={logo} alt="logo" />
            </a>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink onClick={() => history.push("/landing")}>
                    Home
                  </NavLink>
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

        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner "></div>
          </div>
        </div>

        <div className="caption text-center">
          <h1>Sale</h1>
       
        </div>
        <div className="onda-s">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="ondaa-s"
          >
            <path
              d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="ondaaa-s"
            ></path>
          </svg>
        </div>
      </section>
      <section className="campos py-5">
      <h2 className="title">Productos</h2>
     
      <Container className="text-center">
        { loading ? 
          <div className="spinner"></div>:
          productList.map((product, i) => {
            return (
              <CardProduct key={i} product1={product} setSale={sale}/>
            );
          })
        }
          
       </Container>
      
      </section>
      <div className="onda-footer-s">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="ondaa-footer-s"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="ondaaa-footer-s"
          ></path>
        </svg>
      </div>
     
      <Footer fluid />
    </body>
    </>
  );
}

export default Suscription;
