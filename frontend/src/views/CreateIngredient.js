import React , { useState,useEffect,useRef }from 'react'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import {
    Card,
    Table,
    Col,
    CardBody,
    CardFooter,
    FormGroup,  
    Button,UncontrolledAlert,
    Container,
    Input
  } from 'reactstrap';
import './spinner.css'

import ruta from "./url.js"

function CreateIngredient(){

    const notificationAlert = useRef();
    const [ingredients, setIngredients]= useState([])
    const [loading, setLoading]=useState(false)
    const [editing, setEditing] = useState(false);
    const [idIngredientEdited, setIdIngredientEdited] = useState(0);

    const [initialValues, setInitialValues] = useState({
        nameIngredient: "",
        priceIngredient:"",
        additionalIngredient:""
    });
    const [aditional, setAditional]=useState(true)

    const editHandler = (event, ingredient) => {
      setEditing(true);
      setIdIngredientEdited(ingredient.codeIngredient);
      setInitialValues({
        nameIngredient: ingredient.nameIngredient,
        priceIngredient:ingredient.priceIngredient,
        additionalIngredient:ingredient.additionalIngredient
      });
    };
    
    useEffect(() => {
      setLoading(true)
        axios.get('http://'+ruta+'/api/ingredients/')
        .then((response) => {
         
          setIngredients(response.data)
          setLoading(false)
        });
    },[editing]);
    
    const onSubmit = async(values, { resetForm }) => {

      setLoading(true)
      
      setTimeout(() => {
         resetForm(initialValues);
      }, 600);
      if(editing){
        await axios
        .put(`http://${ruta}/api/ingredients/update/${idIngredientEdited}`,values)
        .then((res) => {
          setLoading(false)
          setEditing(false)
          setInitialValues({
            nameIngredient: "",
            priceIngredient:"",
            additionalIngredient:""
           })
          notify("br", "success", "Changes saved");
          })
        .catch((err) => {
          notify("br", "danger", "error in data change")
          setEditing(false)
        })
      }else{
        if(aditional===undefined){
          setAditional(true)
        }  
        values["additionalIngredient"]=aditional
        await axios
        .post("http://"+ruta+"/api/ingredients/create/",values)
        .then((res) => {
          axios.get('http://'+ruta+'/api/ingredients/')
            .then((response) => {
              setIngredients(response.data)
              setLoading(false)
              setInitialValues({
                nameIngredient: "",
                priceIngredient:"",
                additionalIngredient:""
               })
              notify("br", "success", "Ingredient saved");
          });
          })
        .catch((err) =>{
          notify("br", "danger", "error in data charge")
        })

      } 
      
    }
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
    

    const formSchema = Yup.object().shape({
   
        nameIngredient: Yup.string()
            .trim()
            .required("Required field")
            .min(2, "Minimum of 2 characters")
            .matches(
              /^([A-Z,a-z.'-])+/g,
              "Must contain only letters and these symbols , . '   - "
            ),
        priceIngredient: Yup.string()
          .trim()
          .required("Required field")
          .min(1, "Minimum of 1 characters")
          .matches(/^[0-9][0-9]*$/, "Must be an integer and positive number"),
            
      });
    
    
    if(editing){
      return( 
      <div className="content">
        
      <Card >
        
        <h3 className="title pl-md-4 py-2">Create Ingredient</h3>
        
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
        > 
       
       <Form  > 
        <CardBody >
        <Container className="d-flex justify-content-center align-items-center">
          <Col >
          <FormGroup>
            <label>Ingredient name</label>
            <Field
            className="form-control"
              placeholder="Type the ingredient name"
              type="text"
              name="nameIngredient"
              />
              <ErrorMessage
                      name="nameIngredient"
                      component="div"
                      className="field-error text-danger"
                    />
            </FormGroup>
          </Col>
          <Col >
            <FormGroup>
              <label>Ingredient price</label>
              <Field
                className="form-control"
                placeholder="Type the price "
                type="text"
                name="priceIngredient"
                />
              <ErrorMessage
                 name="priceIngredient"
                 component="div"
                 className="field-error text-danger"
               />
            </FormGroup>
          </Col>
          <Col >
         
            <label>Aditional?</label>
            <Input 
              type="select" 
              name="additionalIngredient" 
              id="exampleSelect" 
              onChange={(e)=>setAditional(e.target.value)}
            >
              <option value={true} >Yes</option>
              <option value={false} >No</option>
            </Input>    
             
          </Col>
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
   <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlert} />
        </div>
   <br />
   </Card>
   </div>
   )
    }else{
    return(
        <>
        
        <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlert} />
        </div>
            <Card >
              <h3 className="title pl-md-4 py-2">Create Ingredient</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
              > 
             
             <Form  > 
              <CardBody >
              <Container className="d-flex justify-content-center align-items-center">
                <Col >
                <FormGroup>
                  <label>Ingredient name</label>
                  <Field
                  className="form-control"
                    placeholder="Type the ingredient name"
                    type="text"
                    name="nameIngredient"
                    />
                    <ErrorMessage
                            name="nameIngredient"
                            component="div"
                            className="field-error text-danger"
                          />
                  </FormGroup>
                </Col>
                <Col >
                <FormGroup>
                  <label>Ingredient price</label>
                  <Field
                  className="form-control"
                    placeholder="Type the price "
                    type="text"
                    name="priceIngredient"
                    />
                    <ErrorMessage
                            
                            name="priceIngredient"
                            component="div"
                            className="field-error text-danger"
                          />
                  </FormGroup>
                </Col>
                <Col >
               
                  <label>Aditional?</label>
                  <Input 
                 type="select" 
                 name="additionalIngredient" 
                 id="exampleSelect" 
                 onChange={(e)=>setAditional(e.target.value)}
                >
                <option value={true} >Yes</option>
                <option value={false} >No</option>
                </Input>    
                   
                </Col>
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
                  </CardFooter>
                  </Form>
         </Formik>
         <br />
         
         <h3 className="title pl-md-4 py-2">Ingredients</h3>
         <Container className="text-center">
           {loading ? 
           <div className="spinner"></div>:
            <Table responsive>
            <thead >
              <tr>
                <th>Edit</th>
                <th>Code</th>
                <th>Name</th>
                <th>Price</th>
                <th>Aditional?</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, i) => {
                 return (
                   <tr key={i}>
                     <td>
                        <i
                         style={{ cursor: "pointer" }}
                         className="tim-icons icon-pencil"
                         onClick={(e) => editHandler(e, ingredient)}
                        />
                      </td>
                     <td>{ingredient.codeIngredient}</td>
                     <td>{ingredient.nameIngredient}</td>
                     <td>{ingredient.priceIngredient}</td>
                     <td>{ingredient.additionalIngredient? "Si":"No"}</td>   
                   </tr>
                 );
               })}
            </tbody>
          </Table>
           }
          

         </Container>
            
             
              
           </Card>
         
       
        
       </div>
      </>
    );
          }
  }

  export default CreateIngredient;