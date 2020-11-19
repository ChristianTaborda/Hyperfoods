import React , { useState }from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import { setIn } from 'formik';

function CardProduct({product1, setSale}){
    let product={...product1}
    console.log(product)
    const [ingredients, setIngredients]= useState([])
    const [ingredientChoosed, setIngredientsChoosed]=useState([])
/*
    product.ingredientProduct ===undefined ? 
    setIngredients([]):
    setIngredients(product.ingredientProduct)*/
   
    const onSelect=(selectedList, selectedItem)=> {
        product['ingredientProduct']=selectedList
      
    }
  
    const onRemove=(selectedList, removedItem)=> {
          product['ingredientProduct']=selectedList
    }
  
    return(
      
        <div className="product">
              <div className="product-img">
                  <img src={product.imageProduct} className="App-logo" alt="Producto" />
              </div>
              <div className="product-body">
                  <p className="product-category">
                      Category: {product.categoryProduct.nameCategory ===undefined ? null : product.categoryProduct.nameCategory}
                  </p>
                  <h3 className="product-name">{product.nameProduct}</h3>
                  <h4 className="product-price">{product.priceProduct}</h4>  
                  <p className="product-name">Ingredients</p>
                  
                  <Multiselect 
                    options={ingredients}
                    selectedValues={product.ingredientProduct ===undefined ? 
                      []:product.ingredientProduct.filter(
                        ingredient=>ingredient.additionalIngredient===false)} 
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue='nameIngredient'/>  
                 
              </div>
              <div className="add-to-cart">                
                  <button 
                    className="add-to-cart-btn" 
                    onClick={
                        
                        ()=>setSale(product)
                    }
                    ><i className="fa fa-shopping-cart"></i> Elegir</button>
              </div> 
          </div>

    );
}

export default CardProduct