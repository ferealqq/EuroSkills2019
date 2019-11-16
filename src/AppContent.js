import React, { Component } from 'react';
import { Container,Col,Form,FormGroup,Input,Label,Row } from 'reactstrap';
import myData from './easing-functions-subset-1.json';
import Chart from './Chart';

export default class AppContent extends Component {
	state = {
		easingFunctionData: myData.easingFunctions.easeInOutQuad,
	}
	selectEasingFunction(easingFunctionKey){
		this.setState({
			easingFunctionData: myData.easingFunctions[easingFunctionKey],
		})
	}
	render() {
		console.log(myData)
		const { easingFunctionData } = this.state;
		return (
			<Container className="py-3">
				<Row>
					<Col>
						<Form>
							<FormGroup tag="fieldset">
								<legend>
									Select Easing Function
								</legend>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEasingFunction("easeInOutQuad")} name="radio1"/>{' '}
										easeInOutQuad	
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEasingFunction("easeInQuad")} name="radio1" />{' '}
										easeInQuad
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEasingFunction("easeInQuint")} name="radio1" />{' '}
										easeInQuint
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEasingFunction("easeOutQuad")} name="radio1" />{' '}
										easeOutQuad
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEasingFunction("easeOutQuint")} name="radio1" />{' '}
										easeOutQuint
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="radio" onChange={()=>this.selectEasingFunction("linear")} name="radio1" />{' '}
										linear
									</Label>
								</FormGroup>																																														
							</FormGroup>
						</Form>
						{
							easingFunctionData ? 
								<EasingFunctionInformation data={easingFunctionData}/>
							:
								null
						}
					</Col>

					<Col>
						<Chart equation={easingFunctionData ? easingFunctionData.equation : null} />
					</Col>
				</Row>
			</Container>
		);
	}
}


function EasingFunctionInformation(props){
	return(
		<React.Fragment>
			<Row>
				<p> Formula: {props.data.formula} </p>
			</Row>
			<Row>
				<p> Description: {props.data.description} </p>
			</Row>
		</React.Fragment>
	);
}