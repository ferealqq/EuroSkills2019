import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { LineChart, CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line } from 'recharts';
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
		let dataList = [];
		for (var i = 0; i <= 100; i++) {
			let sec = (i*9)/300;
			let pr = i/100;
			let dataPoint = {
				"name": sec+"s",
				"second": sec,
				"percent": toPercentage(calculateEquation(equation)(pr)),
			};
			dataList.push(dataPoint);
		}				
		return dataList;
	}
	render() {
		const { dataList } = this.state;
		return (
			<LineChart width={730} height={250} data={dataList}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name"/>
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="percent" stroke="#82ca9d" />
			</LineChart>
		);
	}
}