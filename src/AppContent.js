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
			<Row className="px-3">
				<p> Formula: {props.data.formula} </p>
			</Row>
			<Row className="px-3">
				<p> Description: {props.data.description} </p>
			</Row>
		</React.Fragment>
	);
}

function EasingOptionForm(props){
	return(
		<Col className="option-form">
			<Form>
				<FormGroup tag="fieldset">
					<legend>
						Select Easing Function
					</legend>
					<FormGroup check>
						<Input type="radio" id="easeInOutQuad" onChange={()=>props.selectEasingFunction("easeInOutQuad")} name="r-grp"/>{' '}
						<Label for="easeInOutQuad">
							easeInOutQuad	
						</Label>
					</FormGroup>
					<FormGroup check>
						<Input type="radio" id="easeInQuad"onChange={()=>props.selectEasingFunction("easeInQuad")} name="r-grp" />{' '}
						<Label for="easeInQuad">
							easeInOutQuad
						</Label>
					</FormGroup>
					<FormGroup check>
						<Input type="radio" id="easeInQuint" onChange={()=>props.selectEasingFunction("easeInQuint")} name="r-grp" />{' '}
						<Label for="easeInQuint">
							easeInQuint
						</Label>
					</FormGroup>
					<FormGroup check>
						<Input type="radio" id="easeOutQuad"onChange={()=>props.selectEasingFunction("easeOutQuad")} name="r-grp" />{' '}
						<Label for="easeOutQuad">
							easeOutQuad
						</Label>
					</FormGroup>
					<FormGroup check>
						<Input type="radio" id="easeOutQuint" onChange={()=>props.selectEasingFunction("easeOutQuint")} name="r-grp" />{' '}
						<Label for="easeOutQuint">
							easeOutQuint
						</Label>
					</FormGroup>
					<FormGroup check>
						<Input type="radio" id="linear" onChange={()=>props.selectEasingFunction("linear")} name="r-grp" />{' '}
						<Label for="linear">
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