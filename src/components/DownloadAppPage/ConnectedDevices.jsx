import { Button, Card } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FaTabletAlt } from "react-icons/fa";

export default function ConnectedDevices() {
  const devices = [
    { name: 'iPhone 13 Pro', status: 'Last active: 2 minutes ago' },
    { name: 'iPad Pro', status: 'Last active: 1 hour ago' },
    { name: 'Living Room TV', status: 'Last active: 2 days ago' },
  ];

  return (
    <Card className="card-background text-white p-4 rounded-4 shadow-sm">
      <h5 className="mb-4">Connected Devices</h5>
      {devices.map((device, idx) => (
        <div
          key={idx}
          className="d-flex justify-content-between align-items-center py-3 px-2 border-bottom border-secondary"
        >
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-1">
              <FaTabletAlt className="text-success me-2" size={18} />
              <span>{device.name}</span>
            </div>
            <small className="text-muted ms-4">{device.status}</small>
          </div>  
          <Button variant="link" className="text-danger p-0 d-flex align-items-center">
            <BsTrash className="me-1" />
            Remove
          </Button>
        </div>
      ))}
    </Card>
  );
}
