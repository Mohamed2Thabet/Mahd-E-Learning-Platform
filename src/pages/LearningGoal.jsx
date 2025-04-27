import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaRocket, FaChartLine, FaTrophy, FaRegCompass } from "react-icons/fa";
import NextButton from "../components/UI/NextButton";
import { Link, useNavigate } from "react-router-dom";

const LearningGoal = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: "new-field",
      title: "Entering a new field",
      description: "Start your journey in a completely new career direction",
      icon: <FaRegCompass size={24} />,
    },
    {
      id: "advancing",
      title: "Advancing in my current career",
      description: "Enhance your skills and expertise in your current field",
      icon: <FaChartLine size={24} />,
    },
    {
      id: "promotion",
      title: "Getting a promotion",
      description: "Prepare yourself for the next level in your career",
      icon: <FaTrophy size={24} />,
    },
    {
      id: "personal-project",
      title: "Starting a personal project",
      description: "Learn the skills needed to bring your ideas to life",
      icon: <FaRocket size={24} />,
    },
  ];

  return (
    <div className="learning-goal">
      <Container
        className="text-center text-white d-flex flex-column justify-content-center align-items-center background-dark"
        style={{ maxWidth: "100%", minHeight: "100vh", padding: "20px" }}
      >
        <div className="boxshadowBg p-4 rounded-4 w-100 " style={{ maxWidth: "800px" }}>
          <h2 className="mb-3">What is your learning goal?</h2>
          <p className="mb-4">Select the option that best describes your career aspirations</p>
          <Row className="g-3 justify-content-center">
            {options.map((option) => (
              <Col xs={12} md={6} key={option.id}>
                <Card
                  className="p-3 text-white"
                  onClick={() => setSelectedOption(option.id)}
                  style={{
                    backgroundColor: selectedOption === option.id ? "#198754" : "#181D19",
                    cursor: "pointer",
                    borderRadius: "20px",
                  }}
                >
                  <Card.Body className="d-flex align-items-center">
                    <div
                      className="d-flex justify-content-center align-items-center rounded-3"
                      style={{
                        width: "45px",
                        height: "35px",
                        backgroundColor: "#01FE841A",
                      }}
                    >
                      {option.icon}
                    </div>
                    <div className="text-start ms-3">
                      <h5 className="mb-1">{option.title}</h5>
                      <p className="p mb-0">{option.description}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
              <Link to="/" className="text-success fw-bold text-decoration-none">
                      Skip
              </Link>
            <NextButton color="#01FE84" onClick={() => navigate('/profession')} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LearningGoal;
