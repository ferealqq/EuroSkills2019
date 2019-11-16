import React, { Component } from 'react';
import { Container,Row,Input,Button } from 'reactstrap';
import myData from './easing-functions-subset-1.json';
/**
* returns a function that can calculate the equation 
* example usage: calculateEquation("2+x")(2)
* example return: 4
**/
const calculateEquation = (str) => (t) => eval(str);

const toPercentage = (val) => (val*100).toFixed(2);

export default class Chart extends Component {
	constructor(props){
		super(props);

		this.state = {
			dataList: this.createDataList(this.props.equation),
		}
	}
	componentDidUpdate(prevProps){
		if(this.props.equation !== prevProps.equation){
			this.setState({
				dataList: this.createDataList(this.props.equation),
			})
		}
	}
	createDataList(equation){
		if(!equation)
			return;
		let dataList = [];
		let l = 100;
		for (var i = 0; i <= l; i++) {
			let sec = (i*9)/(l*3);
			let pr = i/l;
			let dataPoint = {
				"x": sec,
				"y": toPercentage(calculateEquation(equation)(pr)),
			};
			dataList.push(dataPoint);
		}				
		return dataList;
	}
	render() {
		const { dataList } = this.state;
		return (
			<LineChart width={1000} height={600} data={dataList}/>
		);
	}
}

class LineChart extends Component{
	constructor(props){
		super(props);
		this.maxY = 100;
		this.maxX = 3;
		this.min = 0;

		this.state = {
			rangeValue: 0,
			circleVisibility: false,
		};
		this.handleRangeChange = this.handleRangeChange.bind(this);
	}
    getSvgX(x){
    	return (x / this.maxX * this.props.width);
    }
    getSvgY(y){
    	return this.props.height - (y / this.maxY * this.props.height);
    }
	makePath() {
		const { data, color } = this.props
		let pathD = ` M  ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `
		pathD += data.map((point, i) => {
			return `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)}  `
		})
		return pathD;
	}    
	handleRangeChange(event){
		const rangeValue = parseInt(event.target.value);
		this.setState({
			rangeValue: rangeValue, 
			circleVisibility: rangeValue !== 0 && rangeValue !== 100,
		})
	}
	render(){
		const { rangeValue,circleVisibility } = this.state;
		console.log(circleVisibility,rangeValue);
		const { data } = this.props;
		return(
			<React.Fragment>
				<svg viewBox={`0 0 ${this.props.width} ${this.props.height}`} className="graph">
					<path d={this.makePath()} className="linechart_path"/>
					<Axis {...this.props} />
					<circle 
						cx={this.getSvgX(data[rangeValue].x)} 
						cy={this.getSvgY(data[rangeValue].y)} 
						className="progress-display"
						style={{visibility: circleVisibility ? "" : "hidden"}}
            			>
            			{rangeValue}
            		</circle>
				</svg>
				<Row className="p-1">
					<Input type="range" min="0" max="100" value={rangeValue} onChange={this.handleRangeChange} />
				</Row>
				<Row className="p-2">
					<Button className="m-auto" color="warning"> Play </Button>
				</Row>
			</React.Fragment>
		);
	}
}

class Axis extends Component{
	calculateYPoint(point){
		return (point*this.props.height);
	}
	render(){
		return(
			<g className="grid" id="xGrid">
				<g className="x-axis">
					<text x={this.props.width*0.96} y={this.props.height} class="label-title">3sec</text>
				</g>
				<g className="y-axis">
					<text x="0" y="25">100%</text>
					<text x="0" y={this.calculateYPoint(1/4)}>75%</text>
					<text x="0" y={this.calculateYPoint(2/4)}>50%</text>
					<text x="0" y={this.calculateYPoint(3/4)}>25%</text>
					<text x="0" y={this.props.height}>0%</text>
				</g>
			</g>
		);
	}
}