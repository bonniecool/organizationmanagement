import React, { PureComponent } from 'react'
import Chart from 'chart.js';

export default class extends PureComponent {

	static defaultProps = {
		width: 1200,
		height: 900,
		data: [],
		index_name: '',
		index_value: ''
	}

	componentDidUpdate(prevProps, prevState) {
		const { data } = this.props
		const dataToJS = data.toJS();

		this.chart.config.data.labels = this.generateLabels(dataToJS)
		this.chart.config.data.datasets[0].data = this.generateValues(dataToJS)
		this.chart.config.data.datasets[0].pointBackgroundColor = this.randomPointBackgroundColor(dataToJS)
		this.chart.update()
	}

	componentWillUnmount() {
		this.chart.destroy()
	}

	generateLabels = (data) => {

		return data.map(item => item[this.props.index_name])
	}

	generateValues = (data) => {
		return data.map(item => item[this.props.index_value])
	}

	randomPointBackgroundColor = (data) => {
		return data.map(item =>  '#'+Math.floor(Math.random()*16777215).toString(16))
	}

	renderChart = ({ data, dataSetLabel }) => {

		this.chart = new Chart(this.refs.ctx.getContext("2d"), {
		    type: 'line',
		    data: {
		    	// label: dataSetLabel,
		        labels: this.generateLabels(data),
		        datasets: [
			        {
			            data: this.generateValues(data),
			            // lineTension: 0, 
			            borderDash:[10,5], 
			            // backgroundColor: "rgba(60, 95, 171, 0.5)",
			            borderWidth: 1,
			            // pointBackgroundColor: this.randomPointBackgroundColor(data)
			        }
		        ]
		    },
		    options: {
		    	// bezierCurve: false,
		    	pointRadius:10,
		    	// borderDash:[2,5], 
		    	elements: {
		            line: {
		                tension: 0, // disables bezier curves
		            }
		        },
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        },
		  //       legend: {
				//     display: true,
				// }
		    }
		});
	}

	componentDidMount() {

		const { data, dataSetLabel } = this.props
		this.renderChart({ data: data.toJS(), dataSetLabel })
	}

	render(){
		return (
			<canvas 
				ref="ctx" 
				width={this.props.width} 
				height={this.props.height}>
			</canvas>
			)
	}

} 