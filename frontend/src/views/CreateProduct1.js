import React , { useState,useEffect, useRef }from 'react'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import {
    Card,Table,Col, Row, CardBody,
    CardFooter, Input,FormGroup, Label,FormText, Button,UncontrolledAlert,Alert,Container
  } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import ruta from "./url.js"
import NotificationAlert from "react-notification-alert";

import "./createProduct.css";
import './spinner.css'
function CreateProduct1(){

    const notificationAlert = useRef();
    const [isSelected, setSelected]= useState(false)
    const [loading, setLoading]=useState(false)
    const [initialValues, setInitialValues] = useState({
        nameProduct: "",
        priceProduct: "",
        descriptionProduct: ""
    });
    const [categorys, setCategorys]= useState([])
    const [ingredients, setIngredients]= useState([])
    const [ingredientChoosed, setIngredientsChoosed]=useState([])
    const [categoryChoosed, setCategoryChoosed]= useState(1)
    const [image,setImage] = useState({
      image: [],
      size: 0,
    })   

    useEffect(() => {
      axios.get('http://'+ruta+'/api/categories/')
      .then((response) => {
        setCategorys(response.data)
      });
      axios.get('http://'+ruta+'/api/ingredients/')
      .then((response) => {
        setIngredients(response.data)
      });
    },[]);

    const selectFiles = (event) => {
      let images = event.target.files.item(0);
      if(images!=null){
       let correct=images.name.match(/\.(jpg|jpeg|png|gif)$/)
       if(!(correct===null)){
         setImage({image: images,size: 1})
         setSelected(true)
       }else{
         setImage({image: "",size: 0})
       } 
      }     
    }

    const deleteImage = (e) =>{
      setImage({image: "",size: 0})
      setSelected(false)
     
    }
    const onSelect=(selectedList, selectedItem)=> {
    
      setIngredientsChoosed(selectedList)
    }

    const onRemove=(selectedList, removedItem)=> {
      setIngredientsChoosed(selectedList)
    }

    
    const onSubmit = async(values, { resetForm }) => {
   
        
      values.categoryProduct=categoryChoosed

      let data= new FormData();
      for ( var key in values ) {
        data.append(key, values[key]);
        console.log(key)
        console.log(data.getAll(key))
      }
      for (var i=0; i<ingredientChoosed.length; i++){
        console.log(ingredientChoosed[i].codeIngredient)
        data.append("ingredientProduct", ingredientChoosed[i].codeIngredient)
      }
        
      const config = {
         headers: {
             'content-type': "multipart/form-data; boundary=---011000010111000001101001"
         }
      };
      data.append("imageProduct",image.image)
       /*
        setTimeout(() => {
          resetForm(initialValues);
        }, 600);*/
      setLoading(true)
      await axios.post('http://'+ruta+'/api/products/create/',data, config)
              .then((res) => {
                 setLoading(false)
                 notify("br", "success", "Product saved")
                })
                .catch((err) =>notify("br", "danger", "error in data charge")) 
       
      }

      const formSchema = Yup.object().shape({
   
        nameProduct: Yup.string()
            .trim()
            .required("Required field")
            .min(2, "Minimum of 2 characters")
            .matches(
              /^([A-Z,a-z.'-])+/g,
              "Must contain only letters and these symbols , . '   - "
            ),
        descriptionProduct: Yup.string()
            .trim()
            .required("Required field"),
        priceProduct: Yup.string()
            .trim()
            .required("Required field")
            .min(1, "Minimum of 1 characters")
            .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"), 
            
      });
    
     //Function for notification settings
   const notify = (place, type, message) => {
    notificationAlert.current.notificationAlert({
      place: place,
      type: type, //["primary", "success", "danger", "warning", "info"]
      message: <b>{message}</b>,
      icon:
        type === "success"
          ? "tim-icons icon-check-2"
          : "tim-icons icon-alert-circle-exc",
      autoDismiss: 7,
    });
    };

    return(
        <>
        <div className="content">
        
            <Card >
              
              <Formik
                 initialValues={initialValues}
                 validationSchema={formSchema}
                 onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
              > 
              <Form  >  
              <h3 className="title pl-md-4 py-2">Product</h3>
              <CardBody >
                <Container className="d-flex justify-content-center align-items-center">
                  <Row> 
                    <Col >
                    <div id="img-container">
                        <br/>
                        {
                        isSelected ?
                        
                        null
                         :  
                         <>
                         <Label id="load-img-button" for="selectFile">
                            Cargar imagen
                            <i className="fas fa-upload"></i>
                        </Label>
                        <Input type="file" name="file" onChange={(e)=>selectFiles(e)}
                        id="selectFile" multiple/> </>
                      }

                        <FormText color="muted">
                            {image.size ? 
                            ` ${image.size} valid image has been selected` :
                            "(1 maximum image). No image has been selected"}
                        </FormText>

                        {image.size ? 
                          <div className="img-ctn">                                    
                            <button type="button" value={1} 
                            className="fa fa-times img-delete" 
                            onClick={(e)=>deleteImage(e)}/>
                            <img alt=""  
                                src={ URL.createObjectURL(image.image)}/>
                          </div>:
                            null
                        }
                      </div>
                    </Col>
                    <Col >
                      <FormGroup>
                      <label>Product name</label>
                      <Field
                          className="form-control"
                          placeholder="Type the product name"
                          type="text"
                          name="nameProduct"
                        />
                        <ErrorMessage
                          name="nameProduct"
                          component="div"
                          className="field-error text-danger"
                        />
                      </FormGroup>
                      <label>Category</label>
                      <Input 
                        type="select" 
                        name="select" 
                        id="exampleSelect" 
                        onChange={(e)=>setCategoryChoosed(e.target.value)}
                        >
                        {categorys.map((category, i) => {
                          return (
                          <option key={i} value={category.codeCategory} >{category.nameCategory}</option>
                          );
                        })}
                        
                      </Input>
                      <FormGroup>
                      <label>Ingredients</label>
                      <Multiselect 
                        options={ingredients} 
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue='nameIngredient'
                      />
                      </FormGroup>
                  
                      <FormGroup>
                      <label>Price</label>
                      <Field
                          className="form-control"
                          placeholder="Type the product price"
                          type="text"
                          name="priceProduct"
                      />
                      <ErrorMessage
                          name="priceProduct"
                          component="div"
                          className="field-error text-danger"
                      />
                      </FormGroup>
                      <label> Description</label>
                      <FormGroup>
                       < Field 
                          component="textarea"  
                          placeholder="Type the product description"  
                          name="descriptionProduct" 
                        />
                        <ErrorMessage
                          name="descriptionProduct"
                          component="div"
                          className="field-error text-danger"
                        />
                      </FormGroup>
                  
                    </Col>
                  </Row>
                </Container>   
              </CardBody>
           
              <CardFooter className="text-center">
               <Button 
                 className="btn-fill" 
                 color="primary" 
                 color="info"
                 type="submit"
               >
               Create
               </Button>
              </CardFooter> 
            </Form>
            </Formik>
            {loading ? 
                 <div className="spinner"></div>:null
            }
            <div className="react-notification-alert-container">
               <NotificationAlert ref={notificationAlert} />
            </div>
            <br />
          </Card>
         
       
        </div>
      </>
    );

  }

  export default CreateProduct1;