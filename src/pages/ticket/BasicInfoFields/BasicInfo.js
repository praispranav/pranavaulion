import React, { useState } from "react";
import Priority from "./Priority";
import Category from "./Category";
import Status from "./Status";
import DateRangePicker from "./DateRangePicker";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Panel, PanelBody } from "./../../../components/panel/panel.jsx";
import FilePreview from "./FilePreview";
export default function BasicInfo({ readOnly, setReadOnly }) {
  const [modalCreatedOn, setModalCreatedOn] = useState(false);
  const [modalDeadline, setModalDeadline] = useState(false);
  const toggleModal = (name) => {
    switch (name) {
      case "modalCreatedOn":
        setModalCreatedOn((mco) => !mco);
        break;
      case "modalDeadline":
        setModalDeadline((mdl) => !mdl);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-8">
          <Panel>
            <PanelBody>
              <h3 className="m-t-10">Basic information</h3>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Requester</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Assigned To</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Category</label>
                <div className="col-sm-9">
                  <Category readOnly={readOnly} />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Priority</label>
                <div className="col-sm-9">
                  <Priority readOnly={readOnly} />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Priority</label>
                <div className="col-sm-9">
                  <Status readOnly={readOnly} />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Department</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">
                  Sub-department
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Field</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Tags</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Locations</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Created On</label>
                <div className="col-sm-9">
                  <button
                    disabled={readOnly}
                    onClick={() => toggleModal("modalCreatedOn")}
                    className="btn btn-sm btn-default"
                  >
                    Edit
                  </button>
                  <Modal
                    isOpen={modalCreatedOn}
                    toggle={() => toggleModal("modalCreatedOn")}
                    modalClassName="modal-message"
                  >
                    <ModalHeader toggle={() => toggleModal("modalCreatedOn")}>
                      Created On
                    </ModalHeader>
                    <ModalBody>
                      <DateRangePicker readOnly={readOnly} />
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btn btn-white"
                        onClick={() => toggleModal("modalCreatedOn")}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => toggleModal("modalCreatedOn")}
                      >
                        Done
                      </button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Deadline</label>
                <div className="col-sm-9">
                  <button
                    disabled={readOnly}
                    onClick={() => toggleModal("modalDeadline")}
                    className="btn btn-sm btn-default"
                  >
                    Edit
                  </button>
                  <Modal
                    isOpen={modalDeadline}
                    toggle={() => toggleModal("modalDeadline")}
                    modalClassName="modal-message"
                  >
                    <ModalHeader toggle={() => toggleModal("modalDeadline")}>
                      Deadline
                    </ModalHeader>
                    <ModalBody>
                      <DateRangePicker readOnly={readOnly} />
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btn btn-white"
                        onClick={() => toggleModal("modalDeadline")}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => toggleModal("modalDeadline")}
                      >
                        Done
                      </button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Reference</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <p className="text-right m-b-0">
                {readOnly ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setReadOnly((ro) => !ro)}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-white m-r-5"
                      onClick={() => setReadOnly((ro) => !ro)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary">Submit</button>
                  </>
                )}
              </p>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-4">
          <Panel>
            <PanelBody>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                alt="qr-code"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  minHeight: "100px",
                  minWidth: "100px",
                  maxHeight: "200px",
                  maxWidth: "200px",
                  padding: "10px",
                }}
              />
            </PanelBody>
          </Panel>
        </div>
      </div>
      <div>
        <Panel>
          <PanelBody>
            <h1>Problem:</h1>
            <h3>Problem of the ticket</h3>
          </PanelBody>
        </Panel>
      </div>
      <div>
        <Panel>
          <PanelBody>
            <h1>Attachments:</h1>
            <button className="btn btn-success">Add attachments</button>
            <FilePreview />
          </PanelBody>
        </Panel>
      </div>
    </>
  );
}
