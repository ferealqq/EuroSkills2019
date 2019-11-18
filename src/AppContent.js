import React, { Component } from 'react';
import { Container,Col,Form,FormGroup,Input,Label,Row,UncontrolledTooltip,Button } from 'reactstrap';
import { InlineMath } from 'react-katex';
import myData from './easing-functions-subset-1.json';
import Chart from './Chart';

export default class AppContent extends Component {
	state = {
		easingFunctionData: null,
		isMobile: window.innerWidth < 900,
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
		if((window.innerWidth < 900) !== this.state.isMobile){
			this.setState({
				isMobile: window.innerWidth < 900,
			})
		}
	}
	selectEasingFunction(easingFunctionKey){
		if(this.state.easingFunctionData && this.state.easingFunctionData.text === easingFunctionKey){
			document.getElementById(easingFunctionKey).checked = false;
			this.setState({
				easingFunctionData: null,
			})
		}else{
			this.setState({
				easingFunctionData: myData.easingFunctions[easingFunctionKey],
			})
		}	
	}
	render() {
		const { easingFunctionData,isMobile } = this.state;
		if(!isMobile){
			return (
				<Container className="py-1">
					<Row className="app-content-div py-2">
						<Col className="pt-5">
							<EasingOptionForm selectEasingFunction={this.selectEasingFunction} easingFunctionData={easingFunctionData} />
						</Col>
						
						<Col sm="8" id="chart-col-id">
							<Chart equation={easingFunctionData ? easingFunctionData.equation : null} />
						</Col>
					</Row>
				</Container>
			);
		}else{
			return(
				<Container className="py-3">
					<Row>
						<Chart equation={easingFunctionData ? easingFunctionData.equation : null} />
					</Row>
					
					<Row className="justify-content-center">
							<EasingOptionForm selectEasingFunction={this.selectEasingFunction} easingFunctionData={easingFunctionData} />
					</Row>
					
					<Row className="justify-content-center p-3 d-flex" id="bck-btn-col">
						<Button className="play-btn m-auto w-50" onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}>
							Back to the top
						</Button>
					</Row>					
				</Container>
			);
		}
	}
}


function EasingOptionForm(props){
	return(
		<div className="option-form">
			<Form>
				<FormGroup tag="fieldset">
					<legend id="test">
						Select Easing Function
					</legend>
					<FormGroup id="easeInOutQuadForm" check>
						<Input type="radio" id="easeInOutQuad" onClick={()=>props.selectEasingFunction("easeInOutQuad")} name="r-grp"/>{' '}
						<Label for="easeInOutQuad">
							easeInOutQuad	
						</Label>
						<UncontrolledTooltip target="easeInOutQuadForm" placement="left">
							{myData.easingFunctions.easeInOutQuad.equation}
						</UncontrolledTooltip>
					</FormGroup>
					<FormGroup id="easeInQuadForm" check>
						<Input type="radio" id="easeInQuad"onClick={()=>props.selectEasingFunction("easeInQuad")} name="r-grp" />{' '}
						<Label for="easeInQuad">
							easeInQuad
						</Label>
						<UncontrolledTooltip target="easeInQuadForm" placement="left">
							{myData.easingFunctions.easeInQuad.equation}
						</UncontrolledTooltip>
					</FormGroup>
					<FormGroup id="easeOutQuadForm" check>
						<Input type="radio" id="easeOutQuad"onClick={()=>props.selectEasingFunction("easeOutQuad")} name="r-grp" />{' '}
						<Label for="easeOutQuad">
							easeOutQuad
						</Label>
						<UncontrolledTooltip target="easeOutQuadForm" placement="left">
							{myData.easingFunctions.easeOutQuad.equation}
						</UncontrolledTooltip>
					</FormGroup>
					<FormGroup id="easeInQuintForm" check>
						<Input type="radio" id="easeInQuint" onClick={()=>props.selectEasingFunction("easeInQuint")} name="r-grp" />{' '}
						<Label for="easeInQuint">
							easeInQuint
						</Label>
						<UncontrolledTooltip target="easeInQuintForm" placement="left">
							{myData.easingFunctions.easeInQuint.equation}
						</UncontrolledTooltip>	
					</FormGroup>
					<FormGroup id="easeOutQuintForm" check>
						<Input type="radio" id="easeOutQuint" onClick={()=>props.selectEasingFunction("easeOutQuint")} name="r-grp" />{' '}
						<Label for="easeOutQuint">
							easeOutQuint
						</Label>
						<UncontrolledTooltip target="easeOutQuintForm" placement="left">
							{myData.easingFunctions.easeOutQuint.equation}
						</UncontrolledTooltip>							
					</FormGroup>
					<FormGroup id="linearForm" check>
						<Input type="radio" id="linear" onClick={()=>props.selectEasingFunction("linear")} name="r-grp" />{' '}
						<Label for="linear">
							linear
						</Label>
						<UncontrolledTooltip target="linearForm" placement="left">
							{myData.easingFunctions.linear.equation}
						</UncontrolledTooltip>							
					</FormGroup>																																														
				</FormGroup>
			</Form>
			{
				props.easingFunctionData ? 
					<EasingFunctionInformation data={props.easingFunctionData}/>
				:
					null
			}
		</div>		
	);
}

function EasingFunctionInformation(props){
	return(
		<React.Fragment>
			<Row className="px-3">
				<p className="px-1"> Formula: </p>
				<InlineMath math={props.data ? props.data.formula : ""}/>
			</Row>
			<Row className="px-3">
				<p> Description: {props.data.description} </p>
			</Row>
		</React.Fragment>
	);
}
