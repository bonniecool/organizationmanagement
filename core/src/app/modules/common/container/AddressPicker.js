 import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import { services, _ } from 'app/Utils';

class AddressPicker extends PureComponent {

	static defaultProps = {
		value: {},
		required: false,
	}

	state = {
		_country_code: '',
		_country_loader: false,
		_country_id: '',
		_province_list: [],
		_province_loader: false,
		_province_id: '',
		_city_list: [],
		_city_loader: false,
		_city_id: '',
		_address: '',
		_zipcode: '',
	}

	componentWillMount() {
		this.setState({
			...this.props.value 
		}, () => this.onLoad());
	}

	componentWillReceiveProps(props) {
		if(!_.isEqual(props.value, this.props.value)){

			const oldValue = this.props.value;
            const newValue = props.value;

			this.setState({
				...props.value 
			}, () => {
				if(!_.isEqual(oldValue._country_code, newValue._country_code))
                    if(!_.isNil(this.state._country_code) && this.state._country_code !== ''){
						this.loadProvince();
					}
               	if(!_.isEqual(oldValue._province_id, newValue._province_id))
                    if(!_.isNil(this.state._province_id)){
						this.loadCity()
					}
			});
		}
	}

	onLoad = () => {

		if(!_.isNil(this.state._country_code) && this.state._country_code !== ''){
			this.loadProvince();
		}

		if(!_.isNil(this.state._province_id)){
			this.loadCity()
		}
	}

	loadCountry = async () => {
		try{
	        this.setState({ _country_loader: true });
	        const country_list = await this.getCountryList();
	        sessionStorage.setItem('country_list', JSON.stringify(country_list))
	        this.setState({ _country_loader: false, _country_list: country_list });
	    }catch(err){
	        sessionStorage.setItem('country_list', [])
	    }
	}

	getCountryList = () => {

	 	return new Promise(async (resolve, reject) => {
			let countryList = [];
			try{
				const url = `/agn/dataset/country`;
				const response = await services.get(url)({paginate:0});
				const { data } = response.data
				countryList = data.map((item) => {
					return{
						label: item.name.toUpperCase(),
						value: item.code,
						id: +item.id
					}
				})

			}catch(err){
				return resolve([]);
			}finally{
				return resolve(countryList)
			}
		});
	}

	loadProvince = async () => {

		try{
	        this.setState({ _province_loader: true });
	        const province_list = await this.getProvinceList();
	        this.setState({ _province_loader: false, _province_list: province_list });
	    }catch(err){
	        
	    }
	}

	getProvinceList = () => {
	 	return new Promise(async (resolve, reject) => {
	 		
			let provinceList = [];
			try{
				const { _country_code } = this.state
				const { dispatch } = this.props;
				dispatch({
					type: "SET_LOADING",
					key: "GET_LIST_PROVINCE"
				})

				const url = `/agn/dataset/country/${_country_code}/province`;
				const response = await services.get(url)({paginate:0});

				dispatch({
					type: "DONE_LOADING",
					key: "GET_LIST_PROVINCE"
				})

				const { data } = response.data
				provinceList = data.map((item) => {
					return{
						label: item.name.toUpperCase(),
						value: +item.id,
						id: +item.country_id
					}
				})

			}catch(err){
				return resolve([]);
			}finally{
				return resolve(provinceList)
			}
		});
	}

	handleOnChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({
            [name]:value.toUpperCase()
        },() => {
        	this.handleUpdate();
        })
    }

    handleChangeCountry = (e) => {
    	try{
    		this.setState({
    			_country_code: (e) ? e.value : '',
    			_country_id: (e) ? +e.id : '',
    			_province_id: '',
    			_province_list: [],
    			_city_id: '',
    			_city_list: [],
    			_zipcode: '',
    			_address: ''

    		}, () => {
    			if(_.isInteger(this.state._country_id)){
    				this.loadProvince()
    			}

    			this.handleUpdate();
    		});
    	}catch(err){

    	}
    }

  	handleChangeProvince = (e) => {
    	try{
    		this.setState({
    			_province_id: (e) ? +e.value : '',
    			_country_id: (e) ? +e.id : '',
    			_city_id: (e) ? +e.id : '',
    			_zipcode: '',
    			_address: ''

    		}, () => {
    			if(_.isInteger(this.state._province_id)){
    				this.loadCity()
    			}

    			this.handleUpdate();
    		});
    	}catch(err){

    	}
    }

    loadCity = async () => {
		try{
	        this.setState({ _city_loader: true });
	        const city_list = await this.getCityList();
	        this.setState({ _city_loader: false, _city_list: city_list });
	    }catch(err){
	        
	    }
	}

	getCityList = () => {
	 	return new Promise(async (resolve, reject) => {
			let cityList = [];
			try{

				const { dispatch } = this.props;
				dispatch({
					type: "SET_LOADING",
					key: "GET_LIST_CITY"
				})

				const { _country_code, _province_id } = this.state
				const url = `/agn/dataset/country/${_country_code}/province/${_province_id}/city`;
				const response = await services.get(url)({});

				dispatch({
					type: "DONE_LOADING",
					key: "GET_LIST_CITY"
				})

				
				const { data } = response.data

				cityList = data.map((item) => {
					return{
						label: item.name.toUpperCase(),
						value: +item.id
					}
				})

			}catch(err){
				return resolve([]);
			}finally{
				return resolve(cityList)
			}
		});
	}

	handleChangeCity = (e) => {
		try{
    		this.setState({
    			_city_id: (e) ? +e.value : '',
    			_zipcode: '',
    			_address: ''

    		},() => {
    			this.handleUpdate();
    		})
    	}catch(err){

    	}
	}


    handleUpdate = (e) => {
    	const { onBlur } = this.props
    	const payload = _.pick(
    		this.state,
    		["_country_code","_country_id", "_province_id", "_city_id", "_zipcode", "_address"]
    	)

    	onBlur(payload)

    }

	render() {

		const { required, country_list } = this.props
		const { _province_list, _city_list } = this.state

		return (
	  		<div className="">
	  			<div className="row">
	  				<div className="col-3">
						<div className="form-group">
							<label className="form-control-label">Country *</label>
							<Select 
                                required={ required }
                                isLoading={ this.state._country_loader }
                                className="text-uppercase"
                                value={ this.state._country_code }
                                name="permanent_country_id"
                                onChange={ this.handleChangeCountry }
                                options={ country_list.toJS() }/>
						</div>
					</div>
					{
						(this.state._country_code === "PH" || _.isEmpty(this.state._country_code)) &&
						<div className="col">
		  					<div className="form-group">
		                		<label className="form-control-label">Provice *</label>
		                		<Select
		                			disabled={_.isEmpty(_province_list)}
		                			isLoading={ this.state._province_loader }
		                			className="text-uppercase"
		                			required={ required }
								    value={ this.state._province_id }
								    options={ _province_list }
								    onChange={ this.handleChangeProvince }/>
		                	</div>
			  			</div>
					}
					{
						(this.state._country_code === "PH" || _.isEmpty(this.state._country_code)) &&
						<div className="col">
			  				<div className="form-group">
		                		<label className="form-control-label">City *</label>
		                		<Select
		                			className="text-uppercase"
		                			required={ required }
		                			isLoading={ this.state._city_loader }
		                			disabled={_.isEmpty(_city_list)}
								    value={ this.state._city_id }
								    options={ _city_list }
								    onChange={ this.handleChangeCity }/>
		                	</div>
			  			</div>
					}
		  		</div>
		  		<div className="row">
		  		{
		  			(this.state._country_code === "PH" || _.isEmpty(this.state._country_code)) &&
		  			<div className="col-3">
    					<div className="form-group">
                    		<label className="form-control-label">Zipcode *</label>
                    		<InputMask
                    			required={ required }
                    			type="text" 
                    			className="form-control text-uppercase"
                    			name="_zipcode"
                    			mask="9999"
                    			maskChar=""
                    			value={ this.state._zipcode }
                    			onChange={ this.handleOnChange }/>
                    	</div>	
    				</div>
		  		}
		  			<div className="col">
    					<div className="form-group">
                    		<label className="form-control-label">Address *</label>
                    		<input
                    			required={ required }
                    			type="text" 
                    			className="form-control text-uppercase"
                    			name="_address"
                    			value={ this.state._address }
                    			onChange={ this.handleOnChange }/>
                    	</div>	
    				</div>
		  		</div>
	  		</div>
		);
	}
}

const mapPropsToState = (state, routeParams) => {

	const country_list = state.countryList.get('country_list')

	return {
		country_list
	}
}

export default withRouter(connect(mapPropsToState)(AddressPicker))