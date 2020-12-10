import React, { useState, useEffect } from "react";
import CardProduct from "./CardProduct";
import CardCombo from "./CardCombo"
import axios from "axios";
import "./Products.css";
import ruta from "../url";


// reactstrap components
import { Container,ButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem } from "reactstrap";

export default function Products(props) {

  const [dropdownOpen, setOpen] = useState(false);
  const [cant, setCant]=useState(0)

   
  const [productChoosed, setproductChoosed] = useState(props.order);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([
    {
      codeProduct: "-",
      categoryProduct: {
        codeCategory: "-",
        nameCategory: "-",
      },
      nameProduct: "-",
      descriptionProduct: "-",
      priceProduct: "-",
    },
  ]);
  const [comboList, setCombolist] = useState([
    { 
     codeCombo: "-",
     productCombo: [
         {
             codeProduct: "-",
             categoryProduct: {
                 codeCategory:"-",
                 nameCategory: "-"
             },
             nameProduct: "-",
             descriptionProduct: "-",
             priceProduct: "-",
             imageProduct: "-"
         },
         {
             codeProduct: "-",
             categoryProduct: {
                 codeCategory: "-",
                 nameCategory: "-"
             },
             nameProduct: "-",
             descriptionProduct: "-",
             priceProduct: "-",
             imageProduct: "-"
         },
     ],
     nameCombo: "-",
     descriptionCombo: "-",
     discountCombo: "-",
     priceCombo: "-",
     imageCombo: "-"
 }
 
   ]);

  function sale(product) {
    setCant(cant+1)
    let tLista = productChoosed;
    tLista.push(product);
    setproductChoosed(tLista);
    // console.log("productChoosed", productChoosed);
    props.setOrder(productChoosed);
  }
 

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://" + ruta + "/api/products/")
      .then((res) => {
        setProductList(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    axios
      .get('http://'+ruta+'/api/combos/')
      .then(
        (res) => {
          setCombolist(res.data)  
          console.log(res.data)
        }
      )
  }, []);


  const deletProductChoosed=(value)=>{
    setCant(cant-1)
   
    setproductChoosed(productChoosed.filter(product=>product.codeProduct===value))
   

  }
  const deletComboChoosed=(value)=>{
    setCant(cant-1)    
    setproductChoosed(productChoosed.filter(combo=>combo.codeCombo===value))

  }



  return (
    <div>
      <Container className="text-center">
        {loading ? (
          <div className="spinner"></div>
        ) : 
        <div>
          <ButtonDropdown 
            className="text-left"
            isOpen={dropdownOpen} 
            toggle={() => setOpen(!dropdownOpen)
            }
            color="info">
            <DropdownToggle caret>
              Selecteds({cant})
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem header>Products</DropdownItem>
             {productChoosed.map((product,i)=>{
               return(
               <DropdownItem 
                  key={product.codeProduct}
                  value={product.codeProduct}
                  onClick={(e)=>deletProductChoosed(e.target.value)}
                  >{product.nameProduct}
                
               </DropdownItem>);

             })}
            <DropdownItem header>Combo</DropdownItem>
              {productChoosed.map((combo,i)=>{
               return(
               <DropdownItem 
                  key={combo.codeCombo}
                  value={combo.codeCombo}
                  onClick={(e)=>deletComboChoosed(e.target.value)}
                  >{combo.nameCombo}
                
               </DropdownItem>);
             })}
            </DropdownMenu>
          </ButtonDropdown>
           <h2>Combos</h2>
          {
            comboList.map((combo, i) => {
              return <CardCombo key={i} combo1={combo} setSale={sale} />;
            })
          }
          <br/>
          <br/>
          <h2>Products</h2>
          {
            productList.map((product, i) => {
              return <CardProduct key={i} product1={product} setSale={sale} />;
            })
          }
        </div>}
      </Container>
    </div>
  );
}
