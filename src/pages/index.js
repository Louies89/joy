import CommonHead from '../components/commonHead';
import NavBar from '../components/navBar';
import { Form,Button,Col} from 'react-bootstrap';
import Link from 'next/link'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyname:'',
      contacttitle:'',
      contactname:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      country:'',
      postalcode:'',
      phone: '',
      email: '',
      website:'',
      logo:'',
    };
  }

  render() {
    return (
      <div>
        <CommonHead title={'Index Page'}/>
        <NavBar/>
        <div style={{alignItems:'center',justifyContent:'center',margin:25,backgroundColor:'red'}}>
          <Form style={{marginLeft:20,marginRight:20,marginTop:20,borderWidth:10,maxWidth:360}}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control style={{fontSize:12}} type="email" placeholder="Enter Email" onChange />
            </Form.Group>

            <Form.Group controlId="formGridEmail">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control style={{fontSize:12}} type="number" placeholder="Enter Mobile Number" onChange />
            </Form.Group>

            <Form.Group controlId="formGridPassword">
              <Form.Label>Company Name</Form.Label>
              <Form.Control style={{fontSize:12}} placeholder="Name of the company" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control style={{fontSize:12}} placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control style={{fontSize:12}} placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control style={{fontSize:12}} as="select" value="Choose..." onChange={(e)=>{}}>
                <option>Choose State</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control style={{fontSize:12}} placeholder="Ex.: Puri" />
            </Form.Group>

            <Form.Group controlId="formGridZip">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control style={{fontSize:12}} placeholder="564602"/>
            </Form.Group>

            <Form.Group controlId="formGridZip">
              <Form.Label>Website</Form.Label>
              <Form.Control style={{fontSize:12}} placeholder="564602"/>
            </Form.Group>

            <Form.Label>Contact Person Details</Form.Label>
            <Form.Row>
              <Form.Group as={Col} md="3" controlId="formGridPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control style={{fontSize:12}} as="select" placeholder="Mr." onChange={(e)=>{}}>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Miss.</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Name</Form.Label>
                <Form.Control style={{fontSize:12}} placeholder="Name of the Contact Person" />
              </Form.Group>
            </Form.Row>
            <Link href="/page1">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    )
  }
}