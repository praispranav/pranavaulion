import React from "react";
import TableHeader from './tableHeader';
import TableBody from "./tableBody";
const Table = (props) => {
    const {data,columns,onSort,sortColumn} = props;
  return (
    <table className="table table-bordered">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};
export default Table;