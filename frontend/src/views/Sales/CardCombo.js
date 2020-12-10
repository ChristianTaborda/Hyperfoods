import React, { useState } from "react";

function CardCombo({ combo1, setSale }) {
  let combo = { ...combo1 };
 

  return (
    <div className="product">
      <div className="product-img">
        <img src={combo.imageCombo} className="App-logo" alt="Producto" />
      </div>
      <div className="product-body">
        
        <h3 className="product-name">{combo.nameCombo}</h3>
        <p className="product-category">{combo.descriptionCombo}</p>
        <h4 className="product-price">{combo.priceCombo}</h4>
        <p className="product-name">Products:</p>
       
        {combo.productCombo.map((product, i) => {
            return(
                <p className="product-category">*
                    {product.nameProduct}
                </p>
           );
        })}
                
       
      </div>
      <div className="add-to-cart">
        <button
          style={{ cursor:"pointer" }}
          className="add-to-cart-btn"
          onClick={
            //   (console.log(product), 
              () => setSale(combo)}
        >
          <i className="fa fa-shopping-cart"></i> Elegir
        </button>
      </div>
    </div>
  );
}

export default CardCombo;
