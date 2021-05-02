import React, { Suspense, useRef } from "react";
import "x-data-spreadsheet/dist/xspreadsheet.css";
import XLSX from "xlsx";
import Spreadsheet from "x-data-spreadsheet";
const SpreadsheetEditor = React.lazy(() => import("./SpreadsheetEditor"));

const SpreadSheet = ({ height, width, readOnly, sampleData }) => {
  const [sheetState, setSheetState] = React.useState(
    sampleData || [{ name: "Sheet" }]
  );
  const block = useRef(null);
  const sheetBlock = useRef(null);
  let options = {
    mode: "edit",
    showToolbar: true,
    showGrid: true,
    // showContextmenu: true,
  };
  function stox(wb) {
    var out = [];
    wb.SheetNames.forEach(function (name) {
      var o = { name: name, rows: {} };
      var ws = wb.Sheets[name];
      var aoa = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
      aoa.forEach(function (r, i) {
        var cells = {};
        r.forEach(function (c, j) {
          cells[j] = { text: c };
        });
        o.rows[i] = { cells: cells };
      });
      out.push(o);
    });
    return out;
  }
  const onFileChangeHandler = (e) => {
    let excelFile = e.target.files[0];
    setSheetState(null);
    if (e.target.files[0]) {
      if (!excelFile.name.match(/\.(xlsx|xls|csv|xlsm)$/)) {
        alert("Please Upload Excel File");
      } else {
        const data = new Promise(function (resolve, reject) {
          var reader = new FileReader();
          var rABS = !!reader.readAsBinaryString;
          reader.onload = function (e) {
            var bstr = e.target.result;
            var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            resolve(wb);
          };
          if (rABS) reader.readAsBinaryString(excelFile);
          else reader.readAsArrayBuffer(excelFile);
        });
        data.then((exceldata) => {
          console.log(exceldata);
          let bc = block.current;
          bc.innerHTML = "";
          loadsheet(stox(exceldata));
          // console.log(stox(exceldata));
          // sheetBlock.current.loadData(stox(exceldata));
        });
      }
    }
  };

  const loadsheet = (ss) => {
    sheetBlock.current = new Spreadsheet(block?.current, {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth,
      },
      ...options,
    })
      .loadData(ss)
      .change((data) => {
        setSheetState(data);
        console.log(data);
        // save data to db
      });
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <button
        className="btn btn-secondary my-2"
        onClick={() => setRe((r) => !r)}
      >
        Toggle mode
      </button> */}
      <div className="my-3" style={{ width: "300px" }}>
        <div className="custom-file">
          <input
            type="file"
            name="customFile"
            className="custom-file-input"
            onChange={onFileChangeHandler}
          />
          <label className="custom-file-label" htmlFor="customFile">
            Choose a spreadsheet file
          </label>
        </div>
      </div>
      <Suspense fallback={<p>loading . . .</p>}>
        <SpreadsheetEditor
          block={block}
          readOnly={readOnly}
          loadsheet={(s) => loadsheet(s)}
          sheetState={sheetState}
          sheetBlock={sheetBlock}
        />
      </Suspense>
    </div>
  );
};

export default SpreadSheet;
