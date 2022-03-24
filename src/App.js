import './App.css';
import { useRef } from 'react';
import { Button, Card, Form, Row, Col, FormGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from './firebase';
import { collection, addDoc, query, where } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import bgImg  from "./pexels-zaksheuskaya-1568607 (1).jpg"


function App() {

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const zipRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const numberRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailsRef = collection(db, "participants")
    const emailQuery = query(emailsRef, where("email", "==", emailRef.current.value));
    if(firstNameRef.current.value === ""){return toast.error("Please enter first name")}
    if(lastNameRef.current.value === ""){return toast.error("Please enter last name")}
    if(emailRef.current.value === ""){return toast.error("Please enter email")}
    if(emailQuery){return toast.error("Email address already registered")}
    if(addressRef.current.value === ""){return toast.error("Please enter address")}
    if(cityRef.current.value === ""){return toast.error("Please enter city")}
    if(stateRef.current.value === ""){return toast.error("Please enter state")}
    if(zipRef.current.value === ""){return toast.error("Please enter zip")}
    if(numberRef.current.value === ""){return toast.error("Please enter number")}
    if(document.getElementById("checkRef").checked === false){return toast.error("Please accept terms and conditions")}
    storeToDatabase();
  }

  async function storeToDatabase() {
    try{
      const docRef = await addDoc(collection(db, "participants"), {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        address: addressRef.current.value,
        zip: zipRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        number: numberRef.current.value
      });
      // console.log("Document written with ID", docRef.id);
      // toast.success("Registered successfully")
    }catch(err){
      console.log("Error adding document ", err);
    }
  }


  return (
    <div className="App font-nunito">
      <img className='h-100 w-100 z-in' src="https://source.unsplash.com/1440x935/?Splash" alt="" />
      <Toaster position = "top-center" />
      <Card className='card' >
        <Card.Title className='text-center mb-5 mt-2' as="h3">Registration form</Card.Title>
      <Form>
        <Row>
          <Col>
        <Form.Group>
        <Form.Label >First Name</Form.Label>
        <Form.Control ref={firstNameRef} type="text" placeholder='John' />
        </Form.Group>
          </Col>
          <Col>
        <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control ref={lastNameRef} type="text" placeholder='Doe' />
        </Form.Group>
          </Col>
        </Row>

        <FormGroup className='mt-3' >
          <Form.Label>E-mail</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder='example@gmail.com' />
        </FormGroup>

        <FormGroup className='mt-3' >
          <Form.Label>Mobile number</Form.Label>
          <Form.Control ref={numberRef} type="email" placeholder='9876543210' />
        </FormGroup>

        <FormGroup className='mt-3' >
          <Form.Label>Address</Form.Label>
          <Form.Control ref={addressRef} placeholder='1234 Main st' />
        </FormGroup>

        <Row className="mt-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control ref={cityRef} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select ref={stateRef} defaultValue="Choose...">
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control ref={zipRef} type="number" />
          </Form.Group>
        </Row>

        <Form.Group className="mt-5" id="formGridCheckbox">
          <Form.Check id="checkRef" type="checkbox" label="I agree to the Terms and Conditions" />
        </Form.Group>

        <Form.Group className='d-flex mt-5' >
          <Button onClick={handleSubmit} className="m-auto px-5" >Register</Button>
        </Form.Group>

      </Form>
      </Card>
    </div>
  );
}

export default App;
