import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class AccountantsTable extends Component {
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
			content: (doctor) => (
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
						value={doctor._id}
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
		{label: 'Username',   path: 'login' } ,
		{key:'avatar', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.imageSrc} alt="" /></span>) } ,
		{label: 'firstname',   path: 'firstName' } ,   
		{label: 'initials',   path: 'initials' } ,   	  
		{label: 'lastname',   path: 'lastName' } ,   	  
		{label: 'DOB',   path: 'dateBirth' } ,   	  
		{label: 'gender',   path: 'gender' } ,   	  
		{label: 'address1',   path: 'address1' } ,   
		{label: 'address2',   path: 'address2' } ,   
		{label: 'address3',   path: 'address3' } ,           
		{label: 'zip',   path: 'zip' } ,   	  
		{label: 'city',   path: 'city' } ,   	      
		{label: 'state',   path: 'state' } ,   	          
		{label: 'country',   path: 'country' } ,   	  	  
		{label: 'website',   path: 'website' } , 
		{label: 'Linkedin',   path: 'linkedin' } ,       
		{label: 'mobile',   path: 'mobile' } ,   	  
		{label: 'phone',   path: 'phone' } ,   	  
		{label: 'skype',   path: 'skype' } , 
		{label: 'Clinic',   path: 'clinicSolo' } ,   
		{label: 'primInsuranceNo',   path: 'primInsuranceNo' } ,   	  
		{label: 'primInsurance',   path: 'primInsurance' } ,   	  
		{label: 'primInsuranceValidTill',   path: 'primInsuranceValidTill' } , 
		{label: 'secInsuranceNo',   path: 'secInsuranceNo' } ,   	  
		{label: 'secInsurance',   path: 'secInsurance' } ,   	  
		{label: 'secInsuranceValidTill',   path: 'secInsuranceValidTill' } , 
		{label: 'idPaper',   path: 'idPaper' } ,   	  
		{label: 'idPaperValidTill',   path: 'idPaperValidTill' } , 
	];

	render() {
		//console.log(this.columns) ;
		const { doctors, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={doctors}
			/>
		);
	}
}

export default AccountantsTable;
