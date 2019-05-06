import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusSocket from "./socket.jsx"
import axios from 'axios';

function generate(){
	
		var cpu =(Math.floor(Math.random() *100))+"%";
		var temp1 =(Math.floor(Math.random() *80)+20)+"°";
		var temp2 =(Math.floor(Math.random() *80)+20)+"°";
		return {"Temp1": temp1,"Temp2": temp2,"Cpu": cpu};
}

class App extends React.Component  {
	
	
	handleStart(event) {
	  axios.post("http://localhost:4000/start", "{}").then(function (res){
			console.log("HTTP request for start ris->"+JSON.parse(res.data));
        }).catch(function (err) {
            console.log("HTTP request for start FAIL->"+err);
         });
	}	
  
	handleStop(event) {
	  axios.post("http://localhost:4000/stop", "{}").then(function (res){
			console.log("HTTP request for stop ris->"+JSON.parse(res.data));
        }).catch(function (err) {
            console.log("HTTP request for stop FAIL->"+err);
         });
	}	
	
	handleGenerate(event) {
	  axios.post("http://localhost:4000/setStatus", generate()).then(function (res){
			console.log("HTTP request for handleGenerate ris->"+JSON.parse(res.data));
        }).catch(function (err) {
            console.log("HTTP request for handleGenerate FAIL->"+err);
         });
	}	
	
	render() {
		return (    <div className="container">
								<div className="form-group"><br></br><br></br>
								 <label>HTTP</label><br></br>
								 <button type="button" className="btn btn-primary" onClick={this.handleStart}>Start</button><br></br><br></br>
								 <button type="button" className="btn btn-primary" onClick={this.handleStop}>Stop</button><br></br><br></br>
								 <button type="button" className="btn btn-primary" onClick={this.handleGenerate}>Generate new status</button><br></br>
								</div>
								<label>SOCKET</label>
								 <div className="media">
								
								  <div className="media-body">
									<h5 className="mt-0">Status</h5>
									<StatusSocket/>
								  </div>
								  
								</div>
					</div>
				);	
	}

	
}
export default App;
