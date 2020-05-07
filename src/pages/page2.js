import CommonHead from '../components/commonHead';
import NavBar from '../components/navBar';
import { Form,Button} from 'react-bootstrap';
import Link from 'next/link'

export default class Page2 extends React.Component {
  render() {
    return (
      <div>
        <CommonHead title={'Page 2'}/>
        <NavBar/>
        <div style={{alignItems:'center',justifyContent:'center',margin:25,backgroundColor:'red'}}>
          <Form style={{marginLeft:20,marginRight:20,marginTop:20,borderWidth:10,maxWidth:360}}>
            
            <Link href="/">
              <Button variant="primary" type="submit">
                Back 2
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    )
  }
}