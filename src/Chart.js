import React, { Component } from 'react';
import { Container,Row,Input,Button,Col } from 'reactstrap';
import { times } from 'lodash';
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
	/**
	* Defines the styles needed for the chart
	**/
	defineStyles(){
		if(window.innerWidth < 850){
			return {
				// circle radius has to be determined in javascript because the text is cordinated in the middle of the cicle
				// the circle boundries can be calculated by the radius
				circleRadius: 45,
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
	/**
	* Creates the needed data points to use in the chart.
	* Calculates the needed equations to get the right chart.
	**/
	createDataList(equation){
		if(!equation)
			return;
		let dataList = [];
		let progressPoints = 100;
		for (var i = 0; i <= progressPoints; i++) {
			// we need to divide the progress times three with i times 9 because of the needed amount of points
			let sec = (i*3)/(progressPoints);
			let pr = i/progressPoints;
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
	/*
	* If the rangeInterval is still running when the component is unmounted it could cause an memory leak. So this prevents the memory leak from happening.
	*/
	componentWillUnmount(){
		if(this.rangeInterval){
			clearInterval(this.rangeInterval);
		}
	}
    /*
    * @return {Number} returns the svg cordinate for a x axis.
    */
    getSvgX(x){
    	let { svgWidth: width } = this.props.styles;
    	return (x / this.maxX * width);
    }
    /*
    * @return {Number} returns the svg cordinate for a y axis.
    */
    getSvgY(y){
    	let { svgHeight: height } = this.props.styles;
    	return height - (y / this.maxY * height);
    }
    /*
    * Calculates the path points of the data values
    * @return {String} returns a string of svg path data. This path data can be rendered to visualize the chart
    */
	makePath() {
		const { data, color } = this.props
		if(!data) return "";
		let pathD = `M${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `
		pathD += data.map((point, i) => {
			return `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)}  `
		})
		// needed because firefox svg path syntax will not work with commas
		pathD = pathD.replace(/\,/g,'');
		return pathD;
	}    
	handleRangeChange(event){
		// to prevent change in rangeValue if data set has not been selected
		if(!this.props.data) return;
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
	/*
	* Starts the playing animation on the chart. 
	* The circle will move one percent per 30 millisecond.
	* This would be ineffective way to do the moving of the circle, but as this is just a single page app it's enough to do the job.
	* @event {Object} MousePressEvent object which contains the data of the mouse event. 
	*/
	play(event){
		event.preventDefault();
		if(this.state.playing){
			clearInterval(this.rangeInterval);
			this.setState({
				playing: false,
				rangeValue: 0,
				circleVisibility: false,
			})		
		// to prevent playing without selected data set.
		}else if(!this.props.data){
			return;
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
			<Container fluid>
				<svg viewBox={`-100 -100 ${styles.svgWidth+200} ${styles.svgHeight+200}`} className="graph">
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
						{data && data[rangeValue] ? Math.round(data[rangeValue].y) : null}%
					</text>
				</svg>
				<Row className="p-1 justify-content-center">
					<Input className="w-75" type="range" min="0" max="99" value={!playing ? rangeValue : 0} onChange={this.handleRangeChange} disabled={playing}/>
				</Row>
				<Row className="p-2">
					<Button className="m-auto play-btn" color="warning" onClick={this.play}> Play </Button>
				</Row>
			</Container>
		);
	}
}

class Axis extends Component{
	calculateYPoint(point){
		return (point*this.props.styles.svgHeight);
	}
	calculateXPoint(point){
		return (point*this.props.styles.svgWidth);
	}
	render(){
		const { svgHeight:height, svgWidth: width } = this.props.styles;
		return(
			<g className="grid" id="xGrid">
				<g className="x-axis">
					<line className="axis-line" x1={width} y1={height}  x2="0" y2={height}/>				
					<text x={width} y={height}>3sec</text>
					{
						times(10,(round)=><line className="axis-line-grey" x1={this.calculateXPoint(round/10)} y1="0" x2={this.calculateXPoint(round/10)} y2={height}/>)
					}					
				</g>
				<g>
					<line className="axis-line" x1="0" y1="0"  x2="0" y2={height}/>				
					<text x="0" y="25">100%</text>
					<text x="0" y={this.calculateYPoint(1/4)}>75%</text>
					<text x="0" y={this.calculateYPoint(2/4)}>50%</text>
					<text x="0" y={this.calculateYPoint(3/4)}>25%</text>
					{
						times(10,(round)=><line className="axis-line-grey" x1={width} y1={this.calculateYPoint(round/10)}  x2="0" y2={this.calculateYPoint(round/10)}/>)
					}
					<text x="0" y={height}>0%</text>
				</g>
			</g>
		);
	}
}