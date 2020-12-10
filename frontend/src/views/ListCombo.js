import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ruta from "./url.js"

//Actualizar Combo
import NotificationAlert from "react-notification-alert";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Multiselect } from 'multiselect-react-dropdown';
// reactstrap components
import {
  Card,
  CardBody,
  Table,
  Row,
  Col,
  //Actualizar combo
  Container,
  Label,
  Input,
  FormGroup,
  CardFooter,
  FormText,
  Button
} from "reactstrap";
import './spinner.css'

function Combo() {
  const [loading, setLoading]=useState(false)
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
  //Edit Combo
  const notificationAlert = useRef();
  const [editing, setEditing] = useState(false);
  const [idCombo, setIdCombo] = useState(0);
 
  const [isSelected, setSelected]= useState(false)
  const [products, setProducts]= useState([])
  const [initialValues, setInitialValues] = useState({
    nameProduct: "",
    priceProduct: "",
    descriptionProduct: ""
   
  });
  const [productsChoosed, setproductsChoosed]=useState([])
  const [image,setImage] = useState({
    image: [],
    size: 0,
  }) 
   
  const editHandler = (event, combo) => {
   
    setEditing(true);
    setIdCombo(combo.codeCombo);
    setInitialValues({
      nameCombo: combo.nameCombo,
      discountCombo:combo.discountCombo,
      descriptionCombo:combo.descriptionCombo,
     
    });
    setImage({image: combo.imageCombo,size: 2})
    setSelected(true)
    setproductsChoosed(combo.productCombo)
  };

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

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://'+ruta+'/api/combos/')
      .then(
        (res) => {
          setCombolist(res.data)  
          setLoading(false)

        }
      )
      .catch((err) => console.log(err));
    axios.get('http://'+ruta+'/api/products/')
      .then((response) => {
        setProducts(response.data)
      });
  }, [editing]);

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
   
    if(image.size==1){
      data.append("imageCombo",image.image)
    }

    const config = {
      headers: {
          'content-type': "multipart/form-data; boundary=---011000010111000001101001"
      }
    };
    setLoading(true)
    await axios
        .patch(`http://${ruta}/api/combos/update/${idCombo}/`,data, config)
        .then((res) => {
          setLoading(true)
          setEditing(false)
          notify("br", "success", "Combo saved");
         })
   .catch((err) =>  notify("br", "danger", "error in data charge"))           
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
        
  })

  if(editing){
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
                          `valid image has been selected` :
                          "(1 maximum image). No image has been selected"}
                      </FormText>

                      {image.size ? 
                        <div className="img-ctn">                                    
                          <button type="button" value={1} 
                          className="fa fa-times img-delete" 
                          onClick={(e)=>deleteImage(e)}/>
                          <img alt=""  
                              src={ image.size==2 ? image.image: URL.createObjectURL(image.image)}/>
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
                      selectedValues={productsChoosed}
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
             Save
             </Button>
             <Button 
               className="btn-fill" 
               color="danger"
               onClick={()=>setEditing(false)}
             >
             Cancel
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


  }else{
    return (
      <>
        <div className="content">
        
          <Row>
            <Col md="12">
              <Card>
              
                <CardBody>
                {
                  loading ? 
                  <div className="spinner"></div>:
                  <Table className="tablesorter" responsive bordered>
                    <thead className="text-primary">
                      <tr>
                        <th>Edit</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th className="text-center">Products</th>
                        <th>Description</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comboList.map((combo, i) => {
                        return (
                          <tr key={i}>
                             <td>
                                <i
                                style={{ cursor: "pointer" }}
                                className="tim-icons icon-pencil"
                                onClick={(e) => editHandler(e, combo)}
                                />
                            </td>
                            <td>{combo.codeCombo}</td>
                            <td>{combo.nameCombo}</td>
                            <td> 
                              <Table className="tablesorter" style={{background: "white"}}>
                                <thead>
                                  <tr>
                                    <th>code</th>
                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                  </tr>
                                </thead>
                              {combo.productCombo.map((product, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>{product.codeProduct}</td>
                                        <td>{product.categoryProduct.nameCategory}</td>
                                        <td>{product.nameProduct}</td>
                                        <td>{product.descriptionProduct}</td>
                                        
                                      </tr>
                                    );
                                  }
                                  )
                                  }
                            </Table>
                            </td>
                            <td>{combo.descriptionCombo}</td>
                            <td>{combo.priceCombo}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>}
                </CardBody>
                <div className="react-notification-alert-container">
               <NotificationAlert ref={notificationAlert} />
              </div>
              <br />
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Combo;
