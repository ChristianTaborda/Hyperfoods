import React, { useState, useEffect } from "react";
import CardProduct from "./CardProduct";
import axios from "axios";
import "./Products.css";
import ruta from "../url";

// reactstrap components
import { Container } from "reactstrap";

export default function Products(props) {
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

  function sale(product) {
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
  }, []);

  return (
    <div>
      <Container className="text-center">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          productList.map((product, i) => {
            return <CardProduct key={i} product1={product} setSale={sale} />;
          })
        )}
      </Container>
    </div>
  );
}
