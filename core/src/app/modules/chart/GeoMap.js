import React, { PureComponent } from 'react';
import _ from 'lodash';
import { loadExternalAPI } from '../../Utils';
import { regionList }  from './_region_codes';

class GeoChartMap extends PureComponent{

    static defaultProps = {
        data: [],
        height: "100%",
        id: "1"
    }

    state = {
        _mapHasLoaded: false
    }

    componentDidMount(){
        try{
            loadExternalAPI(
            document, 
            'script', 
            'geo-chart', 
            "https://www.gstatic.com/charts/loader.js",
            this.apiHasLoaded);
        }catch(err){
            console.log(err)
        }
        
    }

    componentWillReceiveProps(props){
        if(!_.isEqual(props.data, this.props.data)){
            this.apiHasLoaded();
        }
    }

    apiHasLoaded = () => {
        try{
            // eslint-disable-next-line
            google.charts.load('current', {'packages':['geochart'], mapsApiKey:"AIzaSyDJCU2YVZtBg_4_dqDD3HRLT7N938F2F_U"});
            // eslint-disable-next-line
            google.charts.setOnLoadCallback(this.drawRegionsMap);
        }catch(err){
            console.log(err);
        }
    }

    drawRegionsMap = () => {
        // eslint-disable-next-line
        var data = google.visualization.arrayToDataTable(this.generateData());

        var options = {
            sizeAxis: { minValue: 0, maxValue: 10 },       
            // displayMode: 'markers',
            'resolution': 'provinces',
            // colorAxis: {colors: ['#33ADFF', '#003D66']},
            // enableRegionInteractivity: false,
            keepAspectRatio: true,
            legend : 'none',
            // tooltip: {isHtml: true},
            'region': 'PH',
            'colorAxis': { colors: ['#7ea8fc', '#f0ad4e', '#5cb85c', '#0055ff'] },



            // 'sizeAxis': { minValue: 0, maxValue: 100 },
            // 'region': 'PH',
            // 'resolution': 'provinces',
            // 'title': 'Sample Data',
            // 'keepAspectRatio': true,
            // 'width': '100%',
            // 'legend': 'none',
            // 'colorAxis': { colors: ['#7ea8fc', '#f0ad4e', '#5cb85c', '#0055ff'] },
        }

        // eslint-disable-next-line
        var chart = new google.visualization.GeoChart(document.getElementById(`map-${this.props.id}`));

        chart.draw(data, options);

        this.setState({
            _mapHasLoaded: true
        })
    }

    generateData = () => {
        const { data } = this.props;

        let newData = [
            ['Region', 'Total', ''],
        ];

        data.forEach(item => {
            regionList.forEach(item2 => {
                if(item.region_code === item2.code){
                    const map_code = item2.map_code;
                    const name = item2.name;
                    const aggregate = +item.aggregate;
                    newData.push([ map_code, name, aggregate ])
                }
            })
        })
        return newData;
    }

    render(){
        return(
            <div>
                {  !this.state._mapHasLoaded && 
                    <div className="text-center px-3 py-5">
                        <div className="progress m-auto" style={{maxWidth: 300}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
                                Loading Map
                            </div>
                        </div>
                    </div> 
                }
                <div style={{overflow: "hidden", position: "relative"}}>
                    <div
                        style={{
                            width: '175%',
                            marginLeft: "-35%",
                            marginTop: "-5%",
                            height: 700
                        }}
                        id={`map-${this.props.id}`} />
                </div>
            </div>
            );
    }
}

export default GeoChartMap;