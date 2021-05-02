import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class AppointmentsTable extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		values: [],
	// 	};
	// }

	columns = [
		//   {path: '_id', label: 'Id'},
		{
			key: "checkbox",
			label: (
				<input
					type="check"
					style={{
						width: "15px",
						height: "15px",
						marginTop: "0.4rem",
						borderRadius: 0,
					}}
				/>
			),
			content: (appointment) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={{
							width: "15px",
							height: "15px",
							marginTop: "0.4rem",
							borderRadius: 0,
						}}
						onChange={this.props.handleCheckboxChange}
						value={appointment._id}
					/>
				</span>
			),
		},
		{
			key: "avatar",
			label: "avatar",
			content: (user) => (
				<span className="icon-img sm-r-5">
					<img
						style={{ width: "30px", height: "30px", borderRadius: "50%" }}
						src={user.imageSrc}
						alt=""
					/>
				</span>
			),
		},
		{label: 'Username',   path: 'username' } ,
		{label: 'email',   path: 'email' } ,   
		{label: 'Firstname',   path: 'contactName.first' } ,   
		{label: 'initials',   path: 'contactName.initials' } ,   	  
		{label: 'Lastname',   path: 'contactName.last' } ,   	  
		{label: 'DOB',   path: 'dateBirth' } ,   	  
		{label: 'Mobile',   path: 'phones.mobile' } ,   	  
		{label: 'Phone',   path: 'phones.phone' } ,   	  
		{label: 'Date',   path: 'date' } ,   	  
		{label: 'Start-time',   path: 'startTime' } ,   	  	
		{label: 'End-Time',   path: 'endTime' } ,   	  	  
		{label: 'Complaint',   path: 'complaint' } ,   	  	  			
		{label: 'Clinic',   path: 'businessName' } ,   	  	  	
		{label: 'Doctor',   path: 'doctorNo' } ,   	  	  		
		{label: 'Appointment-type',   path: 'appointmentType' } ,   	  	  		
		{label: 'Session-type',   path: 'sessionType' } ,   	  	  			
		{label: 'Note from Patient',   path: 'notePatient' } ,   	  	  		
		{label: 'Note',   path: 'note' } ,   	  	  
		{label: 'Status',   path: 'status' } ,   	  	  	
	];

	render() {
		//console.log(this.columns) ;
		const { appointments, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={appointments}
			/>
		);
	}
}

export default AppointmentsTable;
