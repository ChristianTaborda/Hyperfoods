import React , { useState,useEffect }from 'react'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import {
    Card,Table,Col, Row, CardBody,
    CardFooter, Input,FormGroup, Label,FormText, Button,UncontrolledAlert,Alert,Container
  } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import ruta from "./url.js"

import "./createProduct.css";
function CreateCombo(){

    const [isSend, setSend]= useState(false)
    const [isSelected, setSelected]= useState(false)
    const [initialValues, setInitialValues] = useState({
        nameCombo: "",
        descriptionCombo: "",
        discountCombo: ""
    });
    const [loading, setLoading]=useState(false)
    const [products, setproducts]= useState([])
    const [productsChoosed, setproductsChoosed]=useState([])
   
    const [image,setImage] = useState({
      image: [],
      size: 0,
    })   

    useEffect(() => {
   
      axios.get('http://'+ruta+'/api/products/')
      .then((response) => {
        setproducts(response.data)
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
    
      setproductsChoosed(selectedList)
    }

    const onRemove=(selectedList, removedItem)=> {
      setproductsChoosed(selectedList)
    }

    
    const onSubmit = async(values, { resetForm }) => {
   
        
        //values.productCombo=combo
        let data= new FormData();
        for ( var key in values ) {
          data.append(key, values[key]);
          console.log(key)
          console.log(data.getAll(key))
        }
        for (var i=0; i<productsChoosed.length; i++){
          console.log(productsChoosed[i].codeProduct)
          data.append("productCombo",productsChoosed[i].codeProduct)
        }
       
      
        data.append("imageCombo",image.image)
        

        const config = {
          headers: {
              'content-type': "multipart/form-data; boundary=---011000010111000001101001"
          }
        };
        setLoading(true)
        await axios
            .post('http://'+ruta+'/api/combos/create/',data, config)
            .then((res) => {
             setSend(true)
             setLoading(false)
             console.log("%c response ", "background: #222; color: #bada55");
             console.table(res.data); 
             })
       .catch((err) => console.log(err))           
      }

      const formSchema = Yup.object().shape({
   
        nameCombo: Yup.string()
            .trim()
            .required("Required field")
            .min(2, "Minimum of 2 characters")
            .matches(
              /^([A-Z,a-z.'-])+/g,
              "Must contain only letters and these symbols , . '   - "
            ),
        descriptionCombo: Yup.string()
            .trim()
            .required("Required field"),
        discountCombo: Yup.string()
            .trim()
            .required("Required field")
            .min(1, "Minimum of 1 characters")
            .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"), 
            
      });
    
    const mostrarAlerta = () => {
        if (isSend) {
            return (
              <UncontrolledAlert color="success">
              <span>
                <b>Successfully created</b>
              </span>
            </UncontrolledAlert>
            )
        }
        
    }
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
              <h3 className="title pl-md-4 py-2">Combo</h3>
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
                      <label>Combo name</label>
                      <Field
                          className="form-control"
                          placeholder="Type the combo name"
                          type="text"
                          name="nameCombo"
                        />
                        <ErrorMessage
                          name="nameCombo"
                          component="div"
                          className="field-error text-danger"
                        />
                     
                      <label>products</label>
                      <Multiselect 
                        options={products} 
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue='nameProduct'
                      />
                      </FormGroup>
                  
                      <FormGroup>
                      <label>Discount</label>
                      <Field
                          className="form-control"
                          placeholder="Type the discount"
                          type="text"
                          name="discountCombo"
                      />
                      <ErrorMessage
                          name="discountCombo"
                          component="div"
                          className="field-error text-danger"
                      />
                      </FormGroup>
                      <label> Description</label>
                      <FormGroup>
                       < Field 
                          component="textarea"  
                          placeholder="Type the combo description"  
                          name="descriptionCombo" 
                        />
                        <ErrorMessage
                          name="descriptionCombo"
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
          </Card>
         
        {mostrarAlerta()}
        </div>
      </>
    );

  }

  export default CreateCombo;