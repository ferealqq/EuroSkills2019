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
const str = myData.easingFunctions.easeInOutQuad.equation;

let dataList = [];

for (var i = 0; i <= 100; i++) {
	let sec = (i*9)/300;
	console.log(i*9);
	let pr = i/100;
	let dataPoint = {
		"name": sec+"s",
		"second": sec,
		"percent": toPercentage(calculateEquation(str)(pr)),
	};
	dataList.push(dataPoint);
}


export default class Chart extends Component {
	render() {
		return (
			<Container fluid>
				<LineChart width={730} height={250} data={dataList}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name"/>
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="percent" stroke="#82ca9d" />
				</LineChart>
			</Container>
		);
	}
}