import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class ReceptionsTable extends Component {
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
		{label: 'Username',   path: 'receptions.username' } ,
		{key:'avatar', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.imageSrc} alt="" /></span>) } ,
		{label: 'firstname',   path: 'receptions.contactName.firstName' } ,   
		{label: 'initials',   path: 'receptions.contactName.initials' } ,   	  
		{label: 'lastname',   path: 'receptions.contactName.lastName' } ,   	  
		{label: 'DOB',   path: 'receptions.dateBirth' } ,   	  
		{label: 'gender',   path: 'receptions.gender' } ,   	  
		{label: 'address1',   path: 'receptions.Address.address1' } ,   
		{label: 'address2',   path: 'receptions.Address.address2' } ,   
		{label: 'address3',   path: 'receptions.Address.address3' } ,           
		{label: 'zip',   path: 'receptions.Address.zip' } ,   	  
		{label: 'city',   path: 'receptions.Address.city' } ,   	      
		{label: 'state',   path: 'receptions.Address.state' } ,   	          
		{label: 'country',   path: 'receptions.Address.country' } ,   	  	  
		{label: 'website',   path: 'receptions.website' } , 
		{label: 'Linkedin',   path: 'receptions.linkedin' } ,       
		{label: 'mobile',   path: 'receptions.phones.mobile' } ,   	  
		{label: 'phone',   path: 'receptions.phones.phone' } ,   	  
		{label: 'skype',   path: 'receptions.phones.skype' } , 
		{label: 'IBAN',   path: 'receptions.bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'receptions.bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'receptions.bankInfo.branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicSolo' } ,   
		{label: 'primInsuranceNo',   path: 'receptions.insurance.primInsuranceNo' } ,   	  
		{label: 'primInsurance',   path: 'receptions.insurance.primInsurance' } ,   	  
		{label: 'primInsuranceValidTill',   path: 'receptions.insurance.primInsuranceValidTill' } , 
		{label: 'secInsuranceNo',   path: 'receptions.insurance.secInsuranceNo' } ,   	  
		{label: 'secInsurance',   path: 'receptions.insurance.secInsurance' } ,   	  
		{label: 'secInsuranceValidTill',   path: 'receptions.insurance.secInsuranceValidTill' } , 
		{label: 'idPaper',   path: 'receptions.identification.idPaper' } ,   	  
		{label: 'idPaperValidTill',   path: 'receptions.identification.idPaperValidTill' } , 
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

export default ReceptionsTable;
