import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { getAppointments, deleteAppointment } from "./../../services/appointments";
import {
	savereqForAppointment,
	deletereqForAppointment,
	getreqForAppointments,
} from "./../../services/reqforappointments";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import ReqforappointmentsTable from "../../components/reqforappointmentsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import shareIcon from "../../assets/Icons/sharing.svg";

class ReqforappointmentTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reqforappointments: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedFields: [],
		};

		this.handleDelete = this.handleDelete.bind(this);
	}

	async componentDidMount() {
		const { data } = await getreqForAppointments();
		this.setState({ reqforappointments: data });
	}

	// delete request for appointments
	handleDelete = async (reqforappointment) => {
		const originalreqforappointments = this.state.reqforappointments;
		const reqforappointments = this.state.reqforappointments.filter(
			(reqforappointment) => reqforappointment._id !== reqforappointment._id
		);
		this.setState({ reqforappointments });
		try {
			await http.delete(apiUrl + "/reqforappointments/" + reqforappointment._id);
		} catch (ex) {
			//ex.request
			//ex.response
			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}
			this.setState({ reqforappointments: originalreqforappointments });
		}
	};

	// delete multiple requests for appointments
	handleMassDelete = (CheckedRequests) => {
		const originalRequests = this.state.reqforappointments;
		CheckedRequests.map(async (request) => {
			const requests = this.state.reqforappointments.filter((Request) => Request._id !== request);
			this.setState({ reqforappointments:requests });
			try {
				await http.delete(apiUrl + "/reqforappointments/" + request);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ reqforappointment: originalRequests });
			}
			console.log("Requests for appointments: ", this.state.reqforappointments);
		});
	};

	//check box change
	// handleCheckboxChange = ({ target: { checked, value } }) => {
	// 	if (checked) {
	// 		this.setState(({ checkedReqforappointments }) => ({
	// 			checkedReqforappointments: [...checkedReqforappointments, value],
	// 		}));
	// 	} else {
	// 		this.setState(({ checkedReqforappointments }) => ({
	// 			checkedReqforappointments: checkedReqforappointments.filter((e) => e !== value),
	// 		}));
	// 	}
	// 	console.log("checked users: ", this.state.checkedReqforappointments);
	// };

	handleCheckboxChange =  ({ target: { checked, value } }) => {
		if (checked) {
        const checkedFields = [...this.state.checkedFields,value];
        this.setState({checkedFields:checkedFields});
		} else {
          const checkedFields = [...this.state.checkedFields];
          this.setState({ checkedFields:checkedFields.filter((e) => e !== value)});
		}
	};



	//sorting columns
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handlePageChange = (page) => {
		console.log(page);
		this.setState({ currentPage: page });
	};

	handleSearch = (query) => {
		console.log(query);
		this.setState({ searchQuery: query, currentPage: 1 });
	};

	getDataPgnation = () => {
		const { pageSize, currentPage, reqforappointments: reqForAppointments, sortColumn, searchQuery } = this.state;
		//filter maybe next time
		let filtered = reqForAppointments;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = reqforappointments.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.reqforappointmentname.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const reqforappointments = paginate(sorted, currentPage, pageSize);
		return { data: reqforappointments };
	};

	render() {
		const { length: count } = this.state.reqforappointments;
		const { pageSize, currentPage, sortColumn, searchQuery,checkedFields } = this.state;
		// if (count === 0) return <p>No data available</p>;

		const { data: reqforappointments } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Tables</Link>
					</li>
					<li className="breadcrumb-item active">Data Tables</li>
				</ol>
				<h1 className="page-header">Requests for Appointments </h1>
				<Panel>
					<PanelHeader>Requests for Appointments Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="add Request for Appointment"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/reqforappointments/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="edit Request for Appointment"
								style={btnStyles}
							>
								{" "}
								<Link
									to={
										checkedFields
											? `/clinic/reqforappointments/${checkedFields[0]}`
											: "/clinic/reqforappointments/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete Request for Appointment"
								style={btnStyles}
								onClick={() => this.handleMassDelete(checkedFields)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>

							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={shareIcon} />
								</Link>{" "}
							</button>
						</div>
						<div className="table-responsive">
							<SearchBox value={searchQuery} onChange={this.handleSearch} />
							<p
								className="page-header float-xl-left"
								style={({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })}
							>
								{count} entries
							</p>

							<ReqforappointmentsTable
								reqforappointments={reqforappointments}
								onDelete={this.handleDelete}
								onSort={this.handleSort}
								sortColumn={sortColumn}
								handleCheckboxChange={this.handleCheckboxChange}
							/>
						</div>
					</React.Fragment>

					<hr className="m-0" />
					<PanelBody>
						<div className="d-flex align-items-center justify-content-center">
							<Pagination
								itemsCount={count}
								pageSize={pageSize}
								onPageChange={this.handlePageChange}
								currentPage={currentPage}
							/>
						</div>
					</PanelBody>
				</Panel>
			</div>
		);
	}
}

const toolbarStyles = {
	background: "#c8e9f3",
	padding: "10px",
};

const btnStyles = { background: "#348fe2", margin: "0rem" };

const iconStyles = {
	width: "25px",
	height: "25px",
	marginRight: "0rem",
};

export default ReqforappointmentTable;
