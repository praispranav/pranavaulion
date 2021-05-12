import React from "react";
import { Link } from "react-router-dom";
import BasicInfo from "./BasicInfoFields/BasicInfo";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
// import SpreadSheet from "./SpreadSheet";
import ReusableTabNavs from "./ReusableTabNavs";
import ReusableTab from "./ReusableTab";
import {
  TabContent,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";
import Spreadsheet from "./Spreadsheet/SpreadSheet";
import "./index.css";
import Fishbone from "./Fishbone/Fishbone";

//import Actions from "./../../../src/components/ticket/Action";
//import Card from "./../../../src/components/ticket/Card";
//import Filter from "./../../../src/components/ticket/Filters";
//import Category from "./../../../src/components/ticket/Category";
//import "./../../../src/components/kanban/style.css";

class Ticketprofile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      readOnly: true,
      activeTab: 1,
      read: true,
    };
    this.setReadOnly = this.setReadOnly.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }
  setActiveTab = (n) => this.setState({ activeTab: n });
  actions = [
    {
      label: "Save",
      icon: "fa-save",
      trigger: () => {},
    },
    {
      label: "Edit",
      icon: "fa-edit",
      trigger: () => this.setReadOnly(),
    },
    {
      label: "Print",
      icon: "fa-print",
      trigger: () => {},
    },
    {
      label: "Share",
      icon: "fa-share",
      trigger: () => {},
    },
    {
      label: "Archive",
      icon: "fa-archive",
      trigger: () => {},
    },

    {
      label: "Save as PDF",
      icon: "fas-fa-file-pdf",
      trigger: () => {},
    },
    {
      label: "Save as XLS",
      icon: "fas-fa-file-excel",
      trigger: () => {},
    },
    {
      label: "Save as CSV",
      icon: "fa-csv",
      trigger: () => {},
    },
  ];

  toggleRead = () => this.setState({ read: !this.state.read });

  setReadOnly = () => this.setState({ readOnly: !this.state.readOnly });

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/tickets">Tickets</Link>
          </li>
        </ol>
        <h1 className="page-header">Ticket-profile</h1>
        <div className="row">
          <div className="col-12">
            <Panel>
              <PanelHeader noButton>Tickets</PanelHeader>
              <PanelBody>
                <h1>Ticket name</h1>

                <ReusableTabNavs
                  actions={this.actions}
                  setActiveTab={(n) => this.setActiveTab(n)}
                  activeTab={this.state.activeTab}
                  navprops={[
                    { label: "Basic information", background: "#FFC69F" },
                    { label: "Data Spreadsheet", background: "#DED99F" },
                    { label: "Comments", background: "#FFC6FF" },
                    { label: "Reviews", background: "#FFF5AD" },
                    { label: "Sharing", background: "#A2F5AD" },
                    { label: "Notes", background: "#FFFFC9" },
                    { label: "Fishbone", background: "#F4FF2B" },
                    { label: "Piechart", background: "#B09EFF" },
                  ]}
                />
                <TabContent activeTab={this.state.activeTab}>
                  <ReusableTab id={1}>
                    <BasicInfo
                      readOnly={this.state.readOnly}
                      setReadOnly={() => this.setReadOnly()}
                    />
                  </ReusableTab>
                  <ReusableTab id={2} height={"100%"} width={"100%"}>
                    <Spreadsheet
                      readOnly={this.state.readOnly}
                      setReadOnly={() => this.setReadOnly()}
                    />
                  </ReusableTab>
                  <ReusableTab id={3}>
                    <>
                      <h4>Comments</h4>
                      <p>
                        Nullam ac sapien justo. Nam augue mauris, malesuada non
                        magna sed, feugiat blandit ligula. In tristique
                        tincidunt purus id iaculis. Pellentesque volutpat tortor
                        a mauris convallis, sit amet scelerisque lectus
                        adipiscing.
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={4}>
                    <>
                      <h4>Reviews</h4>
                      <p>
                        task nr 11
                        http://cameronroe.github.io/react-star-rating/
                        https://github.com/SahajR/react-star-review
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={5}>
                    <>
                      <div className="p-3">
                        <h1>Sharing with others</h1>
                        <Form>
                          <FormGroup row>
                            <Label for="exampleEmail" md={4}>
                              <strong> Email for sharing</strong>
                            </Label>
                            <Col sm={6}>
                              <Input
                                type="email"
                                name="email"
                                placeholder="Enter email for sharing"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="exampleEmail" md={4}>
                              <strong> Usernames for sharing</strong>
                            </Label>
                            <Col sm={6}>
                              <Input
                                type="text"
                                name="username"
                                placeholder="Enter the usernames for sharing"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="d-flex align-items-center" row>
                            <Col md={4}>
                              <Label for="exampleEmail">
                                <strong>Rights &amp; permission</strong>
                              </Label>
                            </Col>
                            <Col md={6}>
                              <FormGroup check inline>
                                <Label check>
                                  <Input type="checkbox" checked />
                                  <strong>View</strong>
                                </Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Label check>
                                  <Input type="checkbox" />
                                  <strong>Comment</strong>
                                </Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Label check>
                                  <Input type="checkbox" />
                                  <strong>Edit</strong>
                                </Label>
                              </FormGroup>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md={4}>
                              <Label for="exampleEmail">
                                <strong>Share Till</strong>
                              </Label>
                            </Col>
                            <Col sm={3}>
                              <Input
                                type="text"
                                name="date"
                                placeholder="Select End-Date for sharing"
                              />
                            </Col>
                            <Col sm={3}>
                              <Button
                                type="submit"
                                className="btn btn-sm btn-primary "
                              >
                                Send invitation
                              </Button>
                            </Col>
                          </FormGroup>
                        </Form>
                        <Form>
                          <button
                            type="createlink"
                            className="btn btn-sm btn-info m-r-5"
                          >
                            Create sharing-link
                          </button>
                          <button
                            type="linkclipboard"
                            className="btn btn-sm btn-green m-r-5"
                          >
                            Copy link to clipboard
                          </button>
                        </Form>

                        {/* <!-- begin #accordion --> */}
                        <div id="accordion" className="accordion ">
                          {/* <!-- begin card --> */}
                          <div className="card pointer-cursor my-1">
                            <div
                              className="card-header bg-dark text-white pointer-cursor collapsed"
                              data-toggle="collapse"
                              data-target="#acl"
                            >
                              Access Control List
                            </div>
                            <div
                              id="acl"
                              className="collapse"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                {/* <!-- begin panel-body --> */}
                                <div
                                  className="panel-body table-responsive"
                                  id="mycustomtable"
                                >
                                  <Table bordered striped>
                                    <thead>
                                      <tr>
                                        <th className="text-nowrap">User</th>
                                        <th
                                          width="1%"
                                          data-orderable="false"
                                        ></th>
                                        <th className="text-nowrap">email</th>
                                        <th className="text-nowrap">Actions</th>
                                        <th className="text-nowrap">
                                          Share till
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="odd gradeX">
                                        <td>Dr. No</td>
                                        <td width="1%" className="with-img">
                                          <img
                                            src="../assets/img/user/user-1.jpg"
                                            className="img-rounded height-30"
                                          />
                                        </td>
                                        <td>info@gmail.com</td>
                                        <td>
                                          <div className="btn-group">
                                            <Link className="btn btn-default">
                                              Actions
                                            </Link>
                                            <Link
                                              type="button"
                                              className="btn btn-default dropdown-toggle dropdown-toggle-split"
                                              data-toggle="dropdown"
                                              // aria-haspopup="true"
                                              // aria-expanded="false"
                                            >
                                              <span className="sr-only">
                                                Toggle Dropdown
                                              </span>
                                            </Link>

                                            <ul
                                              className="dropdown-menu pull-right "
                                              style={{
                                                position: "absolute",
                                                transform:
                                                  "translate3d(67px,-87px,0px)",
                                                top: "0px",
                                                left: "0px",
                                                willChange: "transform",
                                              }}
                                            >
                                              <div className="checkbox checkbox-css">
                                                <Input
                                                  type="checkbox"
                                                  id="cssCheckbox1"
                                                  value=""
                                                />
                                                <label for="cssCheckbox1">
                                                  View
                                                </label>
                                              </div>
                                              <div className="checkbox checkbox-css is-valid">
                                                <Input
                                                  type="checkbox"
                                                  id="cssCheckbox3"
                                                  value=""
                                                />
                                                <label for="cssCheckbox3">
                                                  Comment
                                                </label>
                                              </div>
                                              <div className="checkbox checkbox-css is-invalid">
                                                <Input
                                                  type="checkbox"
                                                  id="cssCheckbox5"
                                                  value=""
                                                />
                                                <label for="cssCheckbox5">
                                                  Edit
                                                </label>
                                              </div>
                                            </ul>
                                          </div>
                                        </td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                                {/* <!-- end panel-body --> */}
                              </div>
                            </div>
                          </div>
                          {/*  end card 
											< begin card  */}
                          <div
                            className="card accordian"
                            id="accordionforpublicity"
                          >
                            <div
                              className="card-header pointer-cursor bg-dark text-white pointer-cursor collapsed"
                              data-toggle="collapse"
                              data-target="#publicity"
                            >
                              Publicity
                            </div>
                            <div
                              id="publicity"
                              className="collapse p-20"
                              data-parent="#accordionforpublicity"
                            >
                              <div className="col-md-9">
                                <div className="radio radio-css ">
                                  <input
                                    type="radio"
                                    name="radio_css"
                                    id="cssRadio1"
                                    value=""
                                  />
                                  <label for="cssRadio1">
                                    Only users listed in Access Control List
                                    have access.
                                  </label>
                                </div>
                                <div className="radio radio-css is-valid">
                                  <input
                                    type="radio"
                                    name="radio_css"
                                    id="cssRadio2"
                                    value=""
                                  />
                                  <label for="cssRadio2">
                                    Publish over the world.
                                  </label>
                                </div>
                                <div className="radio radio-css is-invalid">
                                  <input
                                    type="radio"
                                    name="radio_css"
                                    id="cssRadio3"
                                    value=""
                                  />
                                  <label for="cssRadio3">
                                    Access by having link for everyone.
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <!-- end card -->
                            
											<!-- begin card --> */}
                          <div
                            className="card accordian my-1"
                            id="accordionforsetting"
                          >
                            <div
                              className="card-header pointer-cursor bg-dark text-white pointer-cursor collapsed"
                              data-toggle="collapse"
                              data-target="#settings"
                            >
                              Settings
                            </div>
                            <div
                              id="settings"
                              className="collapse p-10"
                              data-parent="#accordionforsetting"
                            >
                              <Form row>
                                <FormGroup check inline>
                                  <Label
                                    className=" checkbox-css"
                                    check
                                  >
                                    <Input type="checkbox" invalid/>
                                    <strong>
                                      Allow viewers to download, save, copy
                                    </strong>
                                  </Label>
                                </FormGroup>
                                <FormGroup
                                  className=" checkbox-css"
                                  check
                                  inline
                                >
                                  <Label check>
                                    <Input type="checkbox" valid/>{" "}
                                    <strong>checkbox level 2</strong>
                                  </Label>
                                </FormGroup>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </ReusableTab>
                  <ReusableTab id={6}>
                    <>
                      <h4>Notes</h4>
                      <p>
                        task nr 10 making use of file email/inbox to for
                        implementation notes in tab “Notes” . the files you have
                        to use and work on are located in src/page/ticket When
                        clicking on the subject, the “details of note” will be
                        unfold. Use class accordion. For post a note make use of
                        notecompose. c. build in button to close the detail and
                        redirect back to noteinbox
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={7}>
                    <Fishbone />
                  </ReusableTab>
                  <ReusableTab id={8}>
                    <>
                      <h4>Pie-chart of tickets</h4>
                      <p>
                        pie-chart with tickets on it
                        https://stackoverflow.com/questions/10028182/how-to-make-a-pie-chart-in-css/51679606
                        https://keithclark.co.uk/articles/single-element-pure-css-pie-charts/
                        https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
                        https://codeburst.io/how-to-pure-css-pie-charts-w-css-variables-38287aea161e
                        https://css-tricks.com/simple-interactive-pie-chart-with-css-variables-and-houdini-magic/
                        !
                        http://mrbool.com/how-to-create-pie-charts-with-css3/29014
                        Creating a pie-chart with 9 equal sections. Each section
                        is a category of tickets. Each sections has its own
                        color Display a ticket on the pie-chart. Place it in the
                        right section. Create a pie-chart for tickets. Retrieve
                        data from table tickets and display them on the
                        pie-chart. The tickets will be divided into 8
                        categories: (bug-error (0 to 45 degree), complaint (45
                        to 90 degree), disconnection (90 to 135 degree),
                        invoices (135 to 180 degree), feature-request (180 to
                        225 degree), orders (225 to 270 degree, support (270 to
                        315 degree ), other (315 to 360 degree)) See next pic
                        create a card like next pic display in the pie-chart:
                        ticket-nr, username of the creator and username of the
                        one who is assigned to as a kind of “sticky note” in the
                        pie-chart , sort by category. If there are more cards
                        from the same category, display them cascades on that
                        piece of pie
                      </p>
                    </>
                  </ReusableTab>
                </TabContent>
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticketprofile;
