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
		const { payroll } = this.props
		const dataToJS = payroll || [];
		this.chart.config.data.labels = this.generateLabels(dataToJS)
		this.chart.config.data.datasets[0].data = this.generateValues(dataToJS) 
		this.chart.config.data.datasets[1].data = this.generateNet(dataToJS)
		this.chart.config.data.datasets[2].data = this.generateDeductions(dataToJS)
		this.chart.config.data.datasets[3].data = this.generateEarnings(dataToJS)
		this.chart.config.data.datasets[0].pointBackgroundColor = this.randomPointBackgroundColor(dataToJS)
		this.chart.update()
	}

	componentWillUnmount() {
		this.chart.destroy()
	}

	generateLabels = (data=[]) => {
		return data.map(item => item['date'])
	}

	generateValues = (data=[]) => {
		return data.map(item => item['gross'])
	}
	generateNet = (data=[]) => {
		return data.map(item => item['net'])
	}
	generateDeductions = (data=[]) => {
		return data.map(item => item['deductions'])
	}
	generateEarnings = (data=[]) => {
		return data.map(item => item['earnings'])
	}
	// generateGross = (data) => {
	// 	return data.map(item => item['net'])
	// }
	// generateNet = (data) => {
	// 	return data.map(item => item['net'])
	// }


	randomPointBackgroundColor = (data) => {
		return data.map(item =>  '#'+Math.floor(Math.random()*16777215).toString(16))
	}

	renderChart = ({ payroll, dataSetLabel }) => {
		this.chart = new Chart(this.refs.ctx.getContext("2d"), {
		    type: 'line',
		    data: {
		    	// label: dataSetLabel,
		        labels: this.generateLabels(payroll),
		        datasets: [
			        {	
			        	label:'Gross',
			            data: this.generateValues(payroll),
			            borderColor:"rgba(38, 171, 255, 1)",
			            lineTension: 0, 
			            // borderDash:[8,3], 
			            borderWidth:1,
			            pointBackgroundColor: "rgba(255,255,255, 1)",
				    	pointHitRadius:10,
				    	// pointBorderWidth:15,
				    	pointRadius:5,
				    	pointHoverRadius:8,
				    	// pointBorderWidth:30,
			            backgroundColor: "rgba(38, 171, 255, .1)",
			            // pointBackgroundColor: this.randomPointBackgroundColor(data)
			        },
			        {
			        	label:'Net Income',
						data: this.generateNet(payroll),
			            borderColor:"rgba(169, 192, 242, 1)",
			            lineTension: 0, 
			            // borderDash:[8,3], 
			            borderWidth:1,
			            pointBackgroundColor: "rgba(255,255,255, 1)",
				    	pointHitRadius:10,
				    	// pointBorderWidth:15,
				    	pointRadius:5,
				    	pointHoverRadius:8,
				    	// pointBorderWidth:30,
			            backgroundColor: "rgba(169, 192, 242, .1)",
			            // pointBackgroundColor: this.randomPointBackgroundColor(data)
			        },
			        {
			        	label:'Earnings',
						data: this.generateEarnings(payroll),
						borderColor:"rgba(0, 193, 190, 1)",
			            lineTension: 0, 
			            // borderDash:[8,3], 
			            borderWidth:1,
			            pointBackgroundColor: "rgba(255,255,255, 1)",
				    	pointHitRadius:10,
				    	// pointBorderWidth:15,
				    	pointRadius:5,
				    	pointHoverRadius:8,
				    	// pointBorderWidth:30,
			            backgroundColor: "rgba(0, 193, 190, .1)",
			            // pointBackgroundColor: this.randomPointBackgroundColor(data)
					},
					{
			        	label:'Deductions',
			            data: this.generateDeductions(payroll),
			            borderColor:"rgba(11, 102, 229, 1)",
			            lineTension: 0, 
			            // borderDash:[8,3], 
			            borderWidth:1,
			            pointBackgroundColor: "rgba(255,255,255, 1)",
				    	pointHitRadius:10,
				    	// pointBorderWidth:15,
				    	pointRadius:5,
				    	pointHoverRadius:8,
				    	// pointBorderWidth:30,
						backgroundColor: "rgba(11, 102, 229, .1)",
						// pointBackgroundColor: this.randomPointBackgroundColor(data)
			        },
		        ]
		    },
		    options: {
		    	// bezierCurve: false,
		    	// pointRadius:10,
		    	// borderDash:[2,5], 
		    	elements: {
		            line: {
		                tension: 1, // disables bezier curves
		            }
		        },
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:false
		                }
		            }]
		        },
		        legend: {
				    display: true,
				    position:'bottom'
				}
		    }
		});
	}

	componentDidMount() {
		const { payroll, dataSetLabel } = this.props
		this.renderChart({ payroll, dataSetLabel })
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