import React , { useState,useEffect }from 'react'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import {
    Card,Table,Col,  CardBody,
    CardFooter, FormGroup,  Button,UncontrolledAlert,Spinner,Container, Input
  } from 'reactstrap';
import './spinner.css'

import ruta from "./url.js"

function CreateIngredient(){

    const [isSend, setSend]= useState(false) 
    const [ingredients, setIngredients]= useState([])
    const [loading, setLoading]=useState(false)

    const [initialValues, setInitialValues] = useState({
        nameIngredient: "",
        priceIngredient:"",
        additionalIngredient:""
    });
    const [aditional, setAditional]=useState(true)
    useEffect(() => {
      setLoading(true)
        axios.get('http://'+ruta+'/api/ingredients/')
        .then((response) => {
          setLoading(false)
            console.log(response.data)
          setIngredients(response.data)
        });
    },[]);

    
    const onSubmit = async(values, { resetForm }) => {
      setLoading(true)
      if(aditional===undefined){
          setAditional(true)
      }  
      values["additionalIngredient"]=aditional
      console.log(JSON.stringify(values));
       
     setTimeout(() => {
         resetForm(initialValues);
      }, 600);
      await axios
      .post("http://'+ruta+'/api/ingredients/create/",values)
      .then((res) => {
         setSend(true)
         setLoading(false)
         console.log("%c response ", "background: #222; color: #bada55");
         console.table(res.data);
         axios.get('http://'+ruta+'/api/ingredients/')
          .then((response) => {
            setIngredients(response.data)
         });
        })
       .catch((err) => console.log(err)) 
     
      
      }

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
    
    const mostrarAlerta = () => {
        if (isSend) {
            return (
              <UncontrolledAlert color="success" toggle={()=>setSend(false)}>
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
                 name="select" 
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
                      color="success" 
                      type="submit"
                    >
                    Create
                    </Button>
                  </CardFooter>
                  </Form>
         </Formik>
         {mostrarAlerta()}
         
         <h3 className="title pl-md-4 py-2">Ingredients</h3>
         <Container className="text-center">
           {loading ? 
           <div className="spinner"></div>:
            <Table responsive>
            <thead >
              <tr>
                <th>Code</th>
                <th>Nombre</th>
                <th>Price</th>
                <th>Aditional?</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, i) => {
                 return (
                   <tr key={i}>
                     <td>{ingredient.codeIngredient}</td>
                     <td>{ingredient.nameIngredient}</td>
                     <td>{ingredient.priceIngredient}</td>
                     <td>{ingredient.additionalIngredient? "Si":"No"}</td>
                     <td>
                       <Button
                         type="button"
                         color="warning"
                         className="fa fa-cog"
                       >Edit</Button>
                     </td>
                         
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

  export default CreateIngredient;