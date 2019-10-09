import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { _ } from 'app/Utils';

export const acl = (module, permission) => {
        const permissions = JSON.parse(sessionStorage.getItem('permission'))
        const store = JSON.parse(sessionStorage.getItem('_store'));
		const userType = store.auth.profile.profile_type;
        if(module === 'tabbing'){

            if(userType !== 'Employee')
                return true;

            let access = false;
            // eslint-disable-next-line
            permission.map( item => {
                if(_.find(permissions, {'code':item}))
                    return access = true;
            })
            return access;
        }

        if(module === 'submenu'){
            if(userType !== 'Employee')
                return true;

            let access = false;
            // eslint-disable-next-line
            permission.map( item => {
                if(_.find(permissions, {'acl_module_code':item}))
                    return access = true;
            })
            return access;

        }

        if(module === 'module'){
            if(_.some(permissions, {'acl_module_code':permission}))
                return true
        }

        if(module === 'head'){
            let access = false;
            // eslint-disable-next-line
            permission.map( item => {
                if(_.find(permissions, {'acl_module_code':item}))
                    access = true;
            })
            return access;
        }

        if(module === 'tab'){
            let access = false;
            // eslint-disable-next-line
            permission.map( item => {
                if(_.find(permissions, {'code':item}))
                    return access = true;
            })
            return access;
        }

        if(module === 'code'){
            let access = "";

            // eslint-disable-next-line
            permission.map( item => {
                const permit = _.find(permissions, {'code':item})
                if(permit){
                    if(access === true)
                        return access;
                    if(permit.code.split("-").splice(-1)[0] === 'manage')
                       return access = true
                    if(permit.code.split("-").splice(-1)[0] === 'view')
                        return access = false
                }
            })
            return access;
        }
}

class Acl extends PureComponent {

    state = {
        component: null
    }
    
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "CHECK_AUTH"
        });
        
    }

    modules = (module, permission) => {
		const { permissions } = this.props;
		const store = JSON.parse(sessionStorage.getItem('_store'));
		const userType = store.auth.profile.profile_type;

        if(userType !== 'Employee')
            return true;
		
        
        if(module === 'module'){
            if(_.some(permissions, {'acl_module_code':permission}))
                return true
        }

        if(module === 'head'){
            let access = false;
            // eslint-disable-next-line
            permission.map( item => {
                if(_.find(permissions, {'acl_module_code':item}))
                    access = true;
            })
            return access;
        }

        if(module === 'tab'){
            let access = false;
            // eslint-disable-next-line
            permission.map( item => {
                if(_.find(permissions, {'code':item}))
                    return access = true;
            })
            return access;
        }

        if(module === 'code'){
            let access = "";

            // eslint-disable-next-line
            permission.map( item => {
                const permit = _.find(permissions, {'code':item})
                if(permit){
                    if(access === true)
                        return access;
                    if(permit.code.split("-").splice(-1)[0] === 'manage')
                    	return access = true
                    if(permit.code.split("-").splice(-1)[0] === 'view')
                    	return access = false
                }
            })
            return access;
        }
    }

    render() {
        const { children, module, permission } = this.props;

        return this.modules(module, permission) ? children : ''

    }
}

const mapStateToProps = (state, routeParams) => {
    const permissions = state.auth.get('permissions').toJS();
    const profile = state.auth.get('profile');
    return {
        permissions,
        profile
    };
};

export default withRouter(connect(mapStateToProps)(Acl));
