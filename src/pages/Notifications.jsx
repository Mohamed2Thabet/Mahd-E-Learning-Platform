// pages/NotificationsPage.js

import styled from "styled-components";
import Sidebar from "../components/Notification/Sidebar";
import NotificationList from "../components/Notification/NotificationList";

const PageWrapper = styled.div`
  display: flex;
`;

const ContentArea = styled.div`
  flex: 1;
  background-color: #0e0e0e;
  padding: 40px;
`;

export default function Notifications() {
  return (
    <PageWrapper>
      <Sidebar />
      <ContentArea>
        <h2 className="text-white mb-4">All Notifications</h2>
        <NotificationList />
      </ContentArea>
    </PageWrapper>
  );
}
