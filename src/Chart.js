import React, { Component } from 'react';
import { Container,Row,Input,Button,Col } from 'reactstrap';
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
			styles: this.defineStyles(),
		}
		this.resizeStyles = this.resizeStyles.bind(this);
	}
	componentDidMount(){
		window.addEventListener("resize", this.resizeStyles);
	}
	componentWillUnmount(){
		window.removeEventListener("resize", this.resizeStyles);
	}
	resizeStyles(){
		this.setState({
			styles: this.defineStyles(),
		})
	}
	defineStyles(){
		if(window.innerWidth < 850){
			return {
				circleRadius: 40,
				svgHeight: 350,
				svgWidth: 750,
			}
		}else{
			return {
				circleRadius: 40,
				svgHeight: 600,
				svgWidth: 1000
			}
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
		const { dataList,styles } = this.state;
		return (
			<LineChart styles={styles} data={dataList}/>
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
			rangeValue: 10,
			circleVisibility: false,
			playing: false,
		};
		this.handleRangeChange = this.handleRangeChange.bind(this);
		this.play = this.play.bind(this);
	}
	componentWillUnmount(){
		if(this.rangeInterval){
			clearInterval(this.rangeInterval);
		}
	}
    getSvgX(x){
    	let { svgWidth: width } = this.props.styles;
    	return (x / this.maxX * width);
    }
    getSvgY(y){
    	let { svgHeight: height } = this.props.styles;
    	return height - (y / this.maxY * height);
    }
	makePath() {
		const { data, color } = this.props
		if(!data) return;
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
	centerText(x,y) {
		// Get current x and y values.
		let { circleRadius } = this.props.styles;
		let centerX = circleRadius / 2;
		let centerY = circleRadius / 4;

		return { 
			x :(x - centerX), 
			y: (y + centerY)
		};
	}	
	play(event){
		event.preventDefault();
		if(this.state.playing){
			clearInterval(this.rangeInterval);
			this.setState({
				playing: false,
				rangeValue: 0,
				circleVisibility: false,
			})		
		}
		this.setState({
			playing: true,
		})
		this.rangeInterval = setInterval(()=>{
			this.setState({
				rangeValue: this.state.rangeValue+1,
				circleVisibility: this.state.rangeValue+1 !== 0 && this.state.rangeValue+1 !== 100,
			},()=>{
				if(this.state.rangeValue>=100){
					clearInterval(this.rangeInterval);
					this.setState({
						playing: false,
						rangeValue: 0,
						circleVisibility: false,
					})
				}
			})
		},30)
	}
	render(){
		const { rangeValue,circleVisibility,playing } = this.state;
		const { data,styles } = this.props;
		let x = data ? this.getSvgX(data[rangeValue].x) : 0;
		let y = data ? this.getSvgY(data[rangeValue].y) : 0;
		const { x: textX, y: textY } = this.centerText(x,y);
		return(
			<React.Fragment>
				<svg viewBox={`-100 -100 ${styles.svgWidth+200} ${styles.svgHeight+200}`} className="graph" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<path d={this.makePath()} className="linechart_path"/>
					<Axis {...this.props} />
					<circle 
						cx={x} 
						cy={y} 
						className="progress-display"
						r={styles.circleRadius}
						style={{visibility: circleVisibility ? "" : "hidden"}}
            			/>
            		<text 
						x={textX} 
						y={textY}
						fill="#343a40"
						id="display-text"
						style={{visibility: circleVisibility ? "" : "hidden"}}
						className="progress-display-text">
						{rangeValue}%
					</text>
				</svg>
				<Row className="p-1 justify-content-center">
					<Input className="w-75" type="range" min="0" max="100" value={!playing ? rangeValue : 0} onChange={this.handleRangeChange} disabled={playing}/>
				</Row>
				<Row className="p-2">
					<Button className="m-auto play-btn" color="warning" onClick={this.play}> Play </Button>
				</Row>
			</React.Fragment>
		);
	}
}

class Axis extends Component{
	calculateYPoint(point){
		return (point*this.props.styles.svgHeight);
	}
	render(){
		const { svgHeight:height, svgWidth: width } = this.props.styles;
		return(
			<g className="grid" id="xGrid">
				<g className="x-axis">
					<text x={width} y={height}>3sec</text>
				</g>
				<g className="y-axis">
					<text x="0" y="25">100%</text>
					<text x="0" y={this.calculateYPoint(1/4)}>75%</text>
					<text x="0" y={this.calculateYPoint(2/4)}>50%</text>
					<text x="0" y={this.calculateYPoint(3/4)}>25%</text>
					<text x="0" y={height}>0%</text>
				</g>
			</g>
		);
	}
}