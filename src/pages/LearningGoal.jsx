import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaRocket, FaChartLine, FaTrophy, FaRegCompass } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import SkipButton from "../components/UI/SkipButton";
import NextButton from "../components/UI/NextButton";

const LearningGoal = () => {
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
    <div class="learning-goal" style={{ backgroundColor: "#101310" }}>
      <Container className="text-center text-white  vh-100 d-flex flex-column justify-content-center" style={{ width: "896px" }}>
        <h2 className="mb-3">What is your learning goal?</h2>
        <p className="mb-4 p">Select the option that best describes your career aspirations</p>
        <Row className="" >
          {options.map((option) => (
            <Col md={6} className="mb-3" key={option.id}>
              <Card
                className={`p-3 text-white `}
                onClick={() => setSelectedOption(option.id)}
                style={{
                  backgroundColor: selectedOption === option.id ? "#198754" : "#181D19",
                  cursor: "pointer",
                  borderRadius: "20px"
                }}
              >
                <Card.Body className="d-flex gap-4">
                  <div class="d-flex justify-content-center align-items-center rounded-3" style={{ width: "60px", backgroundColor: "#01FE841A", height: "40px" }}>
                    {option.icon}
                  </div>
                  <div className="text-start">
                    <div className="d-flex ">
                      <h5 style={{ width: "156px" }}>{option.title} </h5>
                      <span style={{ display: "inline-block", borderRadius: "50%", width: "20px", height: "20px", border: "1px solid white", marginLeft: "auto" }}></span>
                    </div>                    <p className="p">{option.description}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <SkipButton color="#01FE84" />
          <NextButton color="#01FE84" />
        </div>
      </Container>
    </div>
  );
};

export default LearningGoal;
