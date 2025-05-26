import { Button } from "react-bootstrap";
import { FaDownload, FaTrash } from "react-icons/fa";

const DataManagement = () => {
  return (
    <div className="mb-4">
      <h5>Data Management</h5>
      <div className="d-flex gap-2 mt-3">
        <Button variant="dark"><FaDownload /> Download My Data</Button>
        <Button variant="danger"><FaTrash /> Delete My Account</Button>
      </div>
    </div>
  );
};

export default DataManagement;
