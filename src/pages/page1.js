import CommonHead from '../components/commonHead';
import NavBar from '../components/navBar';
import { Form, Button} from 'react-bootstrap';
import Link from 'next/link'

export default class Page1 extends React.Component {
	// static getInitialProps = async ({ query }) => {
	// 	console.log('X',query)
	// 	return { name: query.name }
	// }

	render() {
		return (
			<div>
				<CommonHead title={'Page 1'} />
				<NavBar /> 
				<div style={{ alignItems: 'center', justifyContent: 'center', margin: 25, backgroundColor: 'red' }}>
					<Form style={{ marginLeft: 20, marginRight: 20, marginTop: 20, borderWidth: 10, maxWidth: 360 }}>

						<Link href="/">
							<Button variant="primary" type="submit">
								Back 1
              </Button>
						</Link>
					</Form>
				</div>
			</div>
		)
	}
}

