import React, { useState, useEffect } from "react";
import CardProduct from "./CardProduct";
import CardCombo from "./CardCombo"
import axios from "axios";
import "./Products.css";
import ruta from "../url";


// reactstrap components
import { Container } from "reactstrap";

export default function Products(props) {
  const [productChoosed, setproductChoosed] = useState(props.order);
  const [comboChoosed, setcomboChoosed] = useState([]);
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
    let tLista = productChoosed;
    tLista.push(product);
    setproductChoosed(tLista);
    // console.log("productChoosed", productChoosed);
    props.setOrder(productChoosed);
  }
  function sale2(combo) {
    let tLista = comboChoosed;
    tLista.push(combo);
    setcomboChoosed(tLista);
    console.log("productChoosed", comboChoosed);
    //props.setOrder(productChoosed);
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

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList);
    setproductChoosed(selectedList)
  };


  return (
    <div>
      <Container className="text-center">
        {loading ? (
          <div className="spinner"></div>
        ) : 
        <div>
          
           <h2>Combos</h2>
          {
            comboList.map((combo, i) => {
              return <CardCombo key={i} combo1={combo} setSale={sale2} />;
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
