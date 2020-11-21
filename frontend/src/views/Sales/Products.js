import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import CardProduct from "../CardProduct"
// import Footer from "components/Footer.js";
import axios from "axios";
import "./Sale.css"
// import "views/spinner.css"
import ruta from "../url"

// reactstrap components
import { CardTitle,
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

export default function Products(props) {
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

  return (
    <div>
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
    </div>
  );
}
