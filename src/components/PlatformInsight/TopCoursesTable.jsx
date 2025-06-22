// components/TopCoursesTable.js
import { Table, Card, ProgressBar, Button } from 'react-bootstrap';

export default function TopCoursesTable() {
  const courses = [
    {
      name: 'UI/UX Design Fundamentals',
      instructor: 'John Smith',
      enrolled: '2,451',
      rating: '4.8',
      completion: 89,
    },
    {
      name: 'Advanced Web Development',
      instructor: 'Sarah Johnson',
      enrolled: '1,892',
      rating: '4.7',
      completion: 82,
    },
  ];

  const cardStyle = {
    background: 'var(--card-background)',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  };

  const rowStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  };

  const hoverEffect = {
    transition: 'transform 0.2s ease',
  };

  return (
    <Card className="p-4 m-3 " style={cardStyle}>
      <h5 className="mb-4 fw-bold ">Top Performing Courses</h5>
      <Table responsive hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>Course</th>
            <th>Instructor</th>
            <th>Enrollments</th>
            <th>Rating</th>
            <th>Completion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr
              key={i}
              style={{ ...rowStyle, ...hoverEffect }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <td className="fw-medium">{c.name}</td>
              <td>{c.instructor}</td>
              <td>{c.enrolled}</td>
              <td>
                <span className="badge bg-success">{c.rating}</span>
              </td>
              <td style={{ width: '150px' }}>
                <ProgressBar  now={c.completion} label={`${c.completion}%`} variant="info" />
              </td>
              <td>
                <Button size="sm" variant="outline-success">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
