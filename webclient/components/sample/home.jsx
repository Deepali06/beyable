// import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// import img from '../photo.jpg'
// import FontIcon from 'material-ui/FontIcon';
// import ActionAndroid from 'material-ui/svg-icons/action/account-box';
// import Touch from 'material-ui/svg-icons/action/touch-app';
// import Send from 'material-ui/svg-icons/content/send';
// import IconButton from 'material-ui/IconButton';
// import TextFieldIcon from 'material-ui-textfield-icon';
// import Paper from 'material-ui/Paper';
// import LoginForm from './loginform.jsx'
// import Snackbar from 'material-ui/Snackbar';
//
// export default class Home extends React.Component {
// 	constructor () {
// 		super();
// 		this.state = {
//
// 		}
// 		// this.alertOptions = {
// 		// 				offset: 14,
// 		// 				position: 'top left',
// 		// 				theme: 'dark',
// 		// 				time: 5000,
// 		// 				transition: 'scale'
// 		// 			};
// 	}
//
//
// 	render () {
//
// console.log(this.props)
//
//
// 		return (
// 			<div>
// 			<p>wellcome to 4ALL solutions</p>
// 			</div>
// 		);
// 	}
// }//end of class
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

// class Login extends Component {
//   static muiName = 'FlatButton';
//
//   render() {
//     return (
//       <FlatButton {...this.props} label="Login" />
//     );
//   }
// }

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);



/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
export default class Home extends Component {




  render() {
    return (
      <div>

        <AppBar
          title="Title"
          iconElementRight={<Logged />}
        />
        <p>wellcome to 4ALL solutions</p>
      </div>
    );
  }
}
