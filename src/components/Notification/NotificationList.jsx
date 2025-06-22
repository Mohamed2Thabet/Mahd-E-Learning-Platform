// components/NotificationList.js
import { Button } from 'react-bootstrap';
import NotificationItem from './NotificationItem';

export default function NotificationList() {
  return (
    <>
      <NotificationItem
        title="Course Progress Update"
        description="You've completed 3/10 lessons in UI/UX Design. Keep going to unlock your next badge!"
        time="2 hours ago"
        actions={<Button variant="success">Continue Course</Button>}
      />
      <NotificationItem
        title="Achievement Unlocked"
        description="You've earned the 'Quick Learner' badge for completing 5 lessons in one day."
        time="Yesterday"
        actions={<Button variant="warning">View Badge</Button>}
      />
      <NotificationItem
        title="System Maintenance"
        description="Scheduled maintenance will occur on January 25, 2025, from 2:00 AM to 4:00 AM UTC."
        time="2 days ago"
        actions={<Button variant="secondary">Learn More</Button>}
      />
      <NotificationItem
        title="New Reply to Your Comment"
        description="John Smith replied to your comment in the 'Advanced UI Patterns' discussion thread."
        time="3 days ago"
        actions={
          <>
            <Button variant="info" className="me-2">View</Button>
            <Button variant="outline-light">Reply</Button>
          </>
        }
      />
    </>
  );
}
