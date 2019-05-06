  import React from 'react';
  import Websocket from 'react-websocket';
 
  class StatusSocket extends React.Component {
 
    constructor(props) {
      super(props);
      this.state = {
		"Temp1":"?",
		"Temp2":"?",
		"Cpu":"?",
		"Enable": false,
		"CountConnections": "?",
	  };
	   this.handleData = this.handleData.bind(this);
    }
 
    handleData(data) {
      let result = JSON.parse(data);
	  console.log(result);
      this.setState({
		"Temp1":result.Temp1,
		"Temp2":result.Temp2,
		"Cpu":result.Cpu,
		"Enable":result.Enable,
		"CountConnections":result.CountConn
		  });
    }
 
    render() {
      return (
        <div>
			<label>Temp1: {this.state.Temp1}</label><br/>
			<label>Temp2: {this.state.Temp1}</label><br/>
			<label>Cpu: {this.state.Temp1}</label><br/>
			<label>Enable: {this.state.Enable}</label><br/>
			<label>CountConnections: {this.state.CountConnections}</label><br/>
		    <Websocket url='ws://localhost:3333' onMessage={this.handleData.bind(this)}/>
        </div>
      );
    }
	
  }
  
 
  export default StatusSocket;