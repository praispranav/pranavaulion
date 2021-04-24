import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
import DatePicker from "react-datepicker";
import DateTime from "react-datetime";
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import auth from "../../services/authservice";
import { saveTicket, getTicket } from "./../../services/tickets";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Ticket extends Form {
	constructor(props) {
		super(props);

		var maxYesterday = "";
		var minYesterday = DateTime.moment().subtract(1, "day");

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false,
			});
			maxYesterday = value;
		};

		this.state = {
			maxDateDisabled: true,
			users: [],
			data: {
				username: "",
				name: "",
				narrative: "",
				category: "orders",
				businessName: "",
				priority: "normal",
				department: "",
				subDepartment: "",
				locations: "",
				ticketNo: this.makeTicketNo(),
				createdOn: new Date(),
				deadline: "",
				documentNo: "",
				field: "",
				tags: "",
				ticketReference: "",
				sharingLink: "",
				assignedTo: "",
				sharedTo: "",
				status: "new",
			},
			selectedFile: null,
			errors: {},
		};

		this.categoryOptions = [
			{ value: "bug-error", label: "Bug/Error" },
			{ value: "complaint", label: "Complaint" },
			{ value: "disconnection", label: "Disconnection" },
			{ value: "feature-request", label: "Feature Request" },
			{ value: "orders", label: "orders" },
			{ value: "sales", label: "Sales" },
			{ value: "other", label: "Other" },
		];

		this.priorityOptions = [
			{ value: "normal", label: "normal" },
			{ value: "low", label: "low" },
			{ value: "high", label: "high" },
			{ value: "urgent", label: "urgent" },
		];

		this.statusOptions = [
			{ value: "in progress", label: "In Progress" },
			{ value: "pending", label: "Pending" },
			{ value: "new", label: "New" },
			{ value: "archive", label: "Archive" },
		];

		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}

	async populateCategory() {
		this.categoryoptions = this.categoryOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatePriority() {
		this.priorityoptions = this.priorityOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateStatus() {
		this.statusoptions = this.statusOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateAssignedTo() {
		const { data: users } = await http.get(apiUrl + "/users");
		this.setState({ users });
		this.selectUsers = this.state.users.map((option) => (
			<option key={option._id} value={option._id}>
				{option.username}
			</option>
		));
	}



	async populateTicket() {
		try {
			const ticketId = this.props.match.params.id;
			if (ticketId === "new") return;
			const { data: ticket } = await getTicket(ticketId);

			// ticket.name = ticket.name;
			// ticket.businessName = ticket.businessName;
			// ticket.narrative = ticket.narrative;
			// ticket.category = ticket.category;
			// ticket.priority = ticket.priority;
			// ticket.field = ticket.field;
			// ticket.tags = ticket.tags;
			// ticket.department = ticket.department;
			// ticket.subDepartment = ticket.subDepartment;
			// ticket.locations = ticket.locations;
			// ticket.ticketNo = ticket.ticketNo;
			// ticket.documentNo = ticket.documentNo;
			// ticket.ticketReference = ticket.ticketReference;
			// ticket.sharingLink = ticket.sharingLink;
			// ticket.sharedTo = ticket.sharedTo;
			// ticket.assignedTo = ticket.assignedTo;
			// ticket.createdOn = ticket.createdOn;
			// ticket.deadline = ticket.deadline;
			// ticket.status = ticket.status;

			this.setState({ data: this.mapToViewModel(ticket) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	async componentDidMount() {
		await this.populateCategory();
		await this.populatePriority();
		await this.populateStatus();
		await this.populateAssignedTo();
		await this.populateTicket();
	}

	schema = Joi.object({
		name: Joi.string(),
		businessName: Joi.any().optional(),
		narrative: Joi.any().optional(),
		priority: Joi.any().optional(),
		category: Joi.any().optional(),
		department: Joi.any().optional(),
		subDepartment: Joi.any().optional(),
		createdOn: Joi.any().optional(),
		deadline: Joi.any().optional(),
		locations: Joi.any().optional(),
		ticketNo: Joi.any().optional(),
		documentNo: Joi.any().optional(),
		field: Joi.any().optional(),
		tags: Joi.any().optional(),
		ticketReference: Joi.any().optional(),
		sharingLink: Joi.any().optional(),
		assignedTo: Joi.any().optional(),
		sharedTo: Joi.any().optional(),
		status: Joi.any().optional(),
	});

	handlecreatedOnChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data["createdOn"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	handledeadlineChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data["deadline"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	onChangeImgHandler = (event) => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	};

	doSubmit = async () => {
		console.log(this.state.data);
		const user = auth.getProfile();	
		const data = { ...this.state.data };
		data.username = user._id;
		this.setState({ data });
		try {
			await saveTicket(this.state.data);
			this.props.history.push("/clinic/tickets");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	makeTicketNo() {
		let ticketNumber = "TK-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 6; i++) ticketNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return ticketNumber;
	}

	mapToViewModel(ticket) {
		return {
			_id: ticket._id,
			username: ticket.username,
			name: ticket.name,
			narrative: ticket.narrative,
			category: ticket.category,
			businessName: ticket.businessName,
			priority: ticket.priority,
			department: ticket.department,
			subDepartment: ticket.subDepartment,
			locations: ticket.locations,
			ticketNo: ticket.ticketNo,
			createdOn: new Date(ticket.createdOn),
			deadline: new Date(ticket.deadline),
			documentNo: ticket.documentNo,
			field: ticket.field,
			tags: ticket.tags,
			ticketReference: ticket.ticketReference,
			sharingLink: ticket.sharingLink,
			assignedTo: ticket.assignedTo,
			sharedTo: ticket.sharedTo,
			status: ticket.status,
		};
	}

	render() {
		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to="/clinic/tickets">Tickets</Link>
						</li>
						<li className="breadcrumb-item active">Add Ticket</li>
					</ol>
					<h1 className="page-header">
						Add Ticket-Solo <small>Ticket-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Ticket</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput(
											"name",
											"Name of ticket",
											"text",
											"Enter Name/Title/subject for ticket"
										)}

										{this.renderInput("narrative", "Narrative", "text", "Enter your story...")}										

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="priority">Priority
											</label>
											<div className="col-lg-8">
												<select
													name="priority"
													id="priority"
													value={data.priority}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Priority</option>
													{this.priorityoptions}
												</select>
											</div>
											{errors.priority && <div className="alert alert-danger">{errors.priority}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="category">Category
											</label>
											<div className="col-lg-8">
												<select
													name="category"
													id="category"
													value={data.category}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Category</option>
													{this.categoryoptions}
												</select>
											</div>
											{errors.category && <div className="alert alert-danger">{errors.category}</div>}
										</div>

										{this.renderInput("department", "Department", "text", "Enter Department")}
										{this.renderInput("subDepartment", "Sub-Department", "text", "Enter Sub-department")}
										{this.renderInput("locations", "Locations", "text", "Enter Locations")}
										{this.renderInput("documentNo", "DocumentNo", "text", "Enter DocumentNo")}
										{this.renderInput("field", "field", "text", "Enter field")}
										{this.renderInput("tags", "Tags", "text", "Enter Tags")}
										
										
										{this.renderInput("ticketReference", "References", "text", "Enter References")}
										{this.renderInput("sharingLink", "Sharinglink", "text", "Enter sharinglink")}										
										{/* {this.renderInput("assignedTo", "Assigned To", "text", "Enter Assignees")} */}
										{/* {this.renderInput("sharedTo", "Shared To", "text", "Enter Shared tickets")} */}


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="assignedTo">
												Assigned To
											</label>
											<div className="col-lg-8">
												<select
													name="assignedTo"
													id="assignedTo"
													value={data.assignedTo}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select</option>
													{this.selectUsers}
												</select>
											</div>
											{errors.assignedTo && (
												<div className="alert alert-danger">{errors.assignedTo}</div>
											)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="sharedTo">
												Shared To
											</label>
											<div className="col-lg-8">
												<select
													name="sharedTo"
													id="sharedTo"
													value={data.sharedTo}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select</option>
													{this.selectUsers}
												</select>
											</div>
											{errors.sharedTo && (
												<div className="alert alert-danger">{errors.sharedTo}</div>
											)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="deadline">
												Created on
											</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handlecreatedOnChange}
													id={data.createdOn}
													value={data.createdOn}
													selected={data.createdOn}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.createdOn && <div className="alert alert-danger">{errors.createdOn}</div>}
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="deadline">
												Deadline
											</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handledeadlineChange}
													id={data.deadline}
													value={data.deadline}
													selected={data.deadline}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.deadline && <div className="alert alert-danger">{errors.deadline}</div>}
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status">
												Status
											</label>
											<div className="col-lg-8">
												<select
													name="status"
													id="status"
													value={data.status}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.status && <div className="alert alert-danger">{errors.status}</div>}
										</div>

										<div className="form-group row">
											<div className="col-lg-8">
												<button
													type="submit"
													disabled={this.validate()}
													className="btn btn-primary width-65"
												>
													Submit
												</button>
											</div>
										</div>
									</form>
								</PanelBody>
							</Panel>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Ticket);