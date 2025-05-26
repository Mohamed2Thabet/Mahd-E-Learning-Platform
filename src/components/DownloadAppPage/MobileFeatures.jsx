import { Button } from "react-bootstrap";
import {
  FaBell,
  FaDownload,
  FaMobileAlt,
  FaQuestionCircle,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

export default function MobileFeatures() {
  const features = [
    {
      icon: <FaMobileAlt className="text-success me-2" />,
      text: "Resume learning on-the-go",
    },
    {
      icon: <FaDownload className="text-success me-2" />,
      text: "Download lessons for offline viewing",
    },
    {
      icon: <FaQuestionCircle className="text-success me-2" />,
      text: "Take quizzes directly from your phone",
    },
    {
      icon: <FaBell className="text-success me-2" />,
      text: "Get notifications and reminders",
    },
  ];

  return (
    <div className="text-white card-background p-4 rounded-4 shadow-sm">
      <h4 className="mb-4">Mobile & Tablet Apps</h4>

      <ul className="list-unstyled">
        {features.map((item, idx) => (
          <li key={idx} className="d-flex align-items-center mb-2">
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <div className="d-flex flex-wrap gap-3 mt-4">
        <Button variant="outline-success" className="px-4 py-2 rounded-pill d-flex align-items-center gap-2">
          <FaApple size={18} />
          <span>App Store</span>
        </Button>
        <Button variant="outline-success" className="px-4 py-2 rounded-pill d-flex align-items-center gap-2">
          <FaGooglePlay size={18} />
          <span>Google Play</span>
        </Button>
      </div>
    </div>
  );
}
