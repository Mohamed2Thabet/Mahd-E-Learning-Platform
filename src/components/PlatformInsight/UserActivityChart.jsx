// components/UserActivityChart.js
import { Card } from 'react-bootstrap';

export default function UserActivityChart() {
  return (
    <Card className="p-3 m-2 card-background" style={{ height: '300px' }}>
      <h5>User Activity</h5>
      {/* Integrate Chart.js or Recharts here */}
      <div className="d-flex justify-content-center align-items-center h-100">
        <p>No data available</p>
      </div>
    </Card>
  );
}
