import { useState } from "react";

type DataTableProps = {
  data: {
    id: number;
    name: string;
    age: number;
  }[];
};

const DataTable = ({ data }: DataTableProps) => {
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rows);

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>

        <tbody>
          {currentPage === 1
            ? data.slice(0, rows).map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                </tr>
              ))
            : data
                .slice((currentPage - 1) * rows, currentPage * rows)
                .map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                  </tr>
                ))}
        </tbody>
      </table>
      <div className="controls-container">
        <div className="controls">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <div>
          <label htmlFor="rowsPerPage">Rows per page: </label>
          <select
            id="rowsPerPage"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
