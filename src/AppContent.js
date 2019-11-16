import React, { Component } from 'react';
import { Container,Col,Form,FormGroup,Input,Label,Row } from 'reactstrap';
import myData from './easing-functions-subset-1.json';
import Chart from './Chart';

export default class AppContent extends Component {
	state = {
		easingFunctionData: myData.easingFunctions.easeInOutQuad,
		isMobile: window.innerWidth < 850,
	};
	constructor(props){
		super(props);
		this.setMobile = this.setMobile.bind(this);
		this.selectEasingFunction = this.selectEasingFunction.bind(this);
	}
	componentDidMount(){
		window.addEventListener("resize", this.setMobile);
	}
	componentWillUnmount(){
		window.removeEventListener("resize", this.setMobile);
	}
	setMobile(){
		if((window.innerWidth < 850) !== this.state.isMobile){
			this.setState({
				isMobile: window.innerWidth < 850,
			})
		}
	}
	selectEasingFunction(easingFunctionKey){
		this.setState({
			easingFunctionData: myData.easingFunctions[easingFunctionKey],
		})
	}
	render() {
		const { easingFunctionData,isMobile } = this.state;
		return (
			<Container className="py-3">
				<Row>
					{
						!isMobile ? 
							<React.Fragment>
								<EasingOptionForm selectEasingFunction={this.selectEasingFunction} easingFunctionData={easingFunctionData} />

								<Col sm="8">
									<Chart equation={easingFunctionData ? easingFunctionData.equation : null} />
								</Col>							
							</React.Fragment>
						:
							<React.Fragment>
								<Col sm="8">
									<Chart equation={easingFunctionData ? easingFunctionData.equation : null} />
								</Col>

								<EasingOptionForm selectEasingFunction={this.selectEasingFunction} easingFunctionData={easingFunctionData} />
							</React.Fragment>
					}

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

function EasingOptionForm(props){
	return(
		<Col>
			<Form>
				<FormGroup tag="fieldset">
					<legend>
						Select Easing Function
					</legend>
					<FormGroup check>
						<Label check>
							<Input type="radio" onChange={()=>props.selectEasingFunction("easeInOutQuad")} name="radio1"/>{' '}
							easeInOutQuad	
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" onChange={()=>props.selectEasingFunction("easeInQuad")} name="radio1" />{' '}
							easeInOutQuad
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" onChange={()=>props.selectEasingFunction("easeInQuint")} name="radio1" />{' '}
							easeInQuint
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" onChange={()=>props.selectEasingFunction("easeOutQuad")} name="radio1" />{' '}
							easeOutQuad
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" onChange={()=>props.selectEasingFunction("easeOutQuint")} name="radio1" />{' '}
							easeOutQuint
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" onChange={()=>props.selectEasingFunction("linear")} name="radio1" />{' '}
							linear
						</Label>
					</FormGroup>																																														
				</FormGroup>
			</Form>
			{
				props.easingFunctionData ? 
					<EasingFunctionInformation data={props.easingFunctionData}/>
				:
					null
			}
		</Col>		
	);
}