import React, { PureComponent } from 'react'
import Chart from 'chart.js';

export default class extends PureComponent {

	static defaultProps = {
		width: 300,
		height: 300,
		data: [],
		index_name: '',
		index_value: ''
	}

	componentDidUpdate(prevProps, prevState) {
		const { data } = this.props
		const dataToJS = data;

		this.chart.config.data.labels = this.generateLabels(dataToJS)
		this.chart.config.data.datasets[0].data = this.generateValues(dataToJS)
		this.chart.config.data.datasets[0].backgroundColor = this.randomPointBackgroundColor(dataToJS)
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
		return data.map(item => {
			const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ",0.4)";
		})
	}

	renderChart = ({ data, dataSetLabel }) => {

		this.chart = new Chart(this.refs.ctx.getContext("2d"), {
		    type: 'bar',
		    data: {
		    	label: dataSetLabel,
		        labels: this.generateLabels(data),
		        datasets: [{
		            data: this.generateValues(data),
		            borderWidth: 1,
		            backgroundColor: this.randomPointBackgroundColor(data)
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        },
		        legend: {
				    display: false,
				}
		    }
		});
	}

	componentDidMount() {

		const { data, dataSetLabel } = this.props
		this.renderChart({ data: data, dataSetLabel })
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