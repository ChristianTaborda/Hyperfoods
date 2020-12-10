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
    Button,
    UncontrolledAlert,
    Container
  } from 'reactstrap';
import './spinner.css'
import ruta from "./url.js"
function CreateCategory(){

  
    const notificationAlert = useRef();
    const [categorys, setCategorys]= useState([])
    const [loading, setLoading]=useState(false)

    const [initialValues, setInitialValues] = useState({
       nameCategory: ""
    });
    const [editing, setEditing] = useState(false);
    const [idCategoryEdited, setidCategoryEdited] = useState(0);

    const editHandler = (event, category) => {
      setEditing(true);
      setidCategoryEdited(category.codeCategory);
      setInitialValues({
        nameCategory: category.nameCategory,
        
      });
    };
    useEffect(() => {
      setLoading(true)
      axios.get('http://'+ruta+'/api/categories/')
      .then((response) => {
        setLoading(false)
        setCategorys(response.data)
      });
    },[editing]);

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

    
    const onSubmit = async(values, { resetForm }) => {
        setLoading(true)
        
        setTimeout(() => {
          resetForm(initialValues);
        }, 600);
        if(editing){
          await axios
            .put(`http://${ruta}/api/categories/update/${idCategoryEdited}`,values)
            .then((res) => {
              
              setLoading(false)
              setEditing(false)
              setInitialValues({
                nameCategory: ""
             })
              notify("br", "success", "Changes saved");
              
            })
           .catch((err) => {
              notify("br", "danger", "error in data change")
              setEditing(false)
            })
        }
        else{
          await axios
          .post("http://"+ruta+"/api/categories/create/",values)
          .then((res) => {
            axios.get('http://'+ruta+'/api/categories/')
            .then((response) => {
              setCategorys(response.data)
              setLoading(false)
              notify("br", "success", "Category saved");
            });
          })
          .catch((err) => {
            notify("br", "danger", "error in data charge")
          }) 
        }
      
      
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
    
   
    if(editing){
      return(
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
      );

    }
    return(
        <>
        <div className="content">
            <div className="react-notification-alert-container">
              <NotificationAlert ref={notificationAlert} />
            </div>
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
            
             <h3 className="title pl-md-4 py-2">Categorys</h3>
             <Container className="text-center">
               {
                 loading ? 
                 <div className="spinner"></div>:
                    <Table responsive>
                    <thead >
                        <tr>
                          <th>Edit</th>
                          <th>Code</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categorys.map((category, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="tim-icons icon-pencil"
                                  onClick={(e) => editHandler(e, category)}
                                />
                              </td>
                              <td>{category.codeCategory}</td>
                              <td>{category.nameCategory}</td>
                              
                            </tr>
                          );
                          })}
                      </tbody>
                    </Table>
               }
                
                </Container> 
                <br />
           </Card>
          
       
        
       </div>
      </>
    );

  }

  export default CreateCategory;