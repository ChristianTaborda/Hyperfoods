import React , { useState,useEffect }from 'react'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import {
    Card,Table,Col,  CardBody,
    CardFooter, FormGroup,  Button,UncontrolledAlert,Spinner,Container, Label
  } from 'reactstrap';
import './spinner.css'
import ruta from "./url.js"
function CreateCategory(){

    const [isSend, setSend]= useState(false)
    const [categorys, setCategorys]= useState([])
    const [loading, setLoading]=useState(false)

    const [initialValues, setInitialValues] = useState({
       nameCategory: ""
    });
    useEffect(() => {
      setLoading(true)
      axios.get('http://'+ruta+'/api/categories/')
      .then((response) => {
        setLoading(false)
        setCategorys(response.data)
      });
    },[]);

    
      const onSubmit = async(values, { resetForm }) => {
   
        console.log(JSON.stringify(values));
        setLoading(true)
        
        setTimeout(() => {
          resetForm(initialValues);
        }, 600);
        await axios
        .post("http://"+ruta+"/api/categories/create/",values)
        .then((res) => {
          setSend(true)
          setLoading(false)
          console.log("%c response ", "background: #222; color: #bada55");
          console.table(res.data);
          axios.get('http://'+ruta+'/api/categories/')
          .then((response) => {
            setCategorys(response.data)
          });
        })
       .catch((err) => console.log(err)) 
      
      
      }

      const formSchema = Yup.object().shape({
   
         nameCategory: Yup.string()
            .trim()
            .required("Required field")
            .min(2, "Minimum of 2 characters")
            .matches(
              /^([A-Z,a-z.'-])+/g,
              "Must contain only letters and these symbols , . '   - "
            ),
            
      });
    
    const mostrarAlerta = () => {
        if (isSend) {
            return (
              <UncontrolledAlert color="success" toggle={()=>setSend(false)} >
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
              <h3 className="title pl-md-4 py-2">Create Category</h3>
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
                            <label>Category name</label>
                            <Field
                            className="form-control"
                              placeholder="Type the category name"
                              type="text"
                              name="nameCategory"
                              />
                              <ErrorMessage
                                      name="nameCategory"
                                      component="div"
                                      className="field-error text-danger"
                                    />
                        </FormGroup>
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
                    Create
                    </Button>
                  </CardFooter>
                </Form>
             </Formik>
             {mostrarAlerta()}
             <h3 className="title pl-md-4 py-2">Categorys</h3>
             <Container className="text-center">
               {
                 loading ? 
                 <div className="spinner"></div>:
                    <Table responsive>
                    <thead >
                        <tr>
                          <th>Code</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categorys.map((category, i) => {
                          return (
                            <tr key={i}>
                              <td>{category.codeCategory}</td>
                              <td>{category.nameCategory}</td>
                              <td>
                                <Button
                                type="button"
                               
                                 color="warning"
                                 className="fa fa-cog"
                               >{" "}Edit</Button>
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

  export default CreateCategory;