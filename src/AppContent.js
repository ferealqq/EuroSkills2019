import React, { Component } from 'react';
import { Container,Col,Form,FormGroup,Input,Label,Row } from 'reactstrap';
import myData from './easing-functions-subset-1.json';
import Chart from './Chart';

export default class AppContent extends Component {
	state = {
		equation:myData.easingFunctions.linear.equation,
	}
	selectEquation(easingFunction){
		this.setState({
			equation: myData.easingFunctions[easingFunction].equation,
		})
	}
	render() {
		console.log(myData)
		const { equation } = this.state;
		return (
			<Container fluid>
				<Row>
					<Col>
						<Form>
							<FormGroup tag="fieldset">
								<legend>
									Select Easing Function
								</legend>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEquation("easeInOutQuad")} name="radio1"/>{' '}
										easeInOutQuad	
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEquation("easeInQuad")} name="radio1" />{' '}
										easeInQuad
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEquation("easeInQuint")} name="radio1" />{' '}
										easeInQuint
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEquation("easeOutQuad")} name="radio1" />{' '}
										easeOutQuad
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEquation("easeOutQuint")} name="radio1" />{' '}
										easeOutQuint
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEquation("linear")} name="radio1" />{' '}
										linear
									</Label>
								</FormGroup>																																														
							</FormGroup>
						</Form>
					</Col>

					<Col>
						<Chart equation={equation} />
					</Col>
				</Row>
			</Container>
		);
	}
}
