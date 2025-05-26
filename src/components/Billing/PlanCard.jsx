// components/Billing/PlanCard.jsx
import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { FaCheckCircle, FaCrown, FaCalendarAlt } from "react-icons/fa";

const PlanCard = ({
  planName = "Pro Plan",
  status = "Active",
  renewalDate = "Jan 24, 2025",
  price = 29,
  currency = "$",
  billingCycle = "month",
  onUpgrade,
  onCancel
}) => {
  const cardStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(20px)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    position: "relative"
  };

  const headerStyles = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    padding: "28px 32px",
    margin: "-1px -1px 0 -1px",
    borderRadius: "20px 20px 0 0",
    position: "relative"
  };

  const contentStyles = {
    padding: "32px",
    "@media (max-width: 768px)": {
      padding: "24px"
    }
  };

  const priceStyles = {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: "800",
    color: "#1a202c",
    lineHeight: "1.1",
    background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  const cycleStyles = {
    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
    color: "#718096",
    fontWeight: "500"
  };

  const badgeStyles = {
    backgroundColor: "#10b981",
    fontSize: "0.875rem",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "20px"
  };

  const renewalStyles = {
    color: "#6c757d",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px"
  };

  const buttonStyles = {
    borderRadius: "12px",
    fontWeight: "600",
    padding: "14px 28px",
    fontSize: "1rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "none",
    minWidth: "140px",
    textTransform: "none",
    letterSpacing: "0.025em"
  };

  const primaryButtonStyles = {
    ...buttonStyles,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
  };

  const secondaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: "rgba(113, 128, 150, 0.1)",
    border: "2px solid rgba(113, 128, 150, 0.2)",
    color: "#4a5568",
    backdropFilter: "blur(10px)"
  };

  return (
    <Card className="plan-card mb-4" style={cardStyles}>
      {/* Header Section */}
      <div style={headerStyles}>
        <Row className="align-items-center">
          <Col>
            <div className="d-flex align-items-center gap-2">
              <FaCrown size={20} />
              <h4 className="mb-0 fw-bold">{planName}</h4>
            </div>
          </Col>
          <Col xs="auto">
            <Badge style={badgeStyles}>
              <FaCheckCircle className="me-1" size={12} />
              {status}
            </Badge>
          </Col>
        </Row>
      </div>

      {/* Content Section */}
      <div style={contentStyles}>
        <Row className="align-items-center">
          <Col lg={7}>
            {/* Price Display */}
            <div className="mb-3">
              <div className="d-flex align-items-baseline">
                <span style={priceStyles}>
                  {currency}{price}
                </span>
                <span style={cycleStyles} className="ms-2">
                  /{billingCycle}
                </span>
              </div>
            </div>

            {/* Renewal Information */}
            <div style={renewalStyles}>
              <FaCalendarAlt size={14} />
              <span>Renews on {renewalDate}</span>
            </div>
          </Col>

          <Col xl={5} lg={6} className="text-lg-end mt-4 mt-lg-0">
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-lg-end align-items-stretch align-items-md-center">
              <Button
                style={primaryButtonStyles}
                className="order-1 order-md-0"
                onClick={onUpgrade}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px) scale(1.02)";
                  e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
                }}
              >
                Upgrade Plan
              </Button>
              <Button
                variant="outline-secondary"
                style={secondaryButtonStyles}
                className="order-0 order-md-1"
                onClick={onCancel}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(113, 128, 150, 0.15)";
                  e.target.style.borderColor = "rgba(113, 128, 150, 0.3)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(113, 128, 150, 0.1)";
                  e.target.style.borderColor = "rgba(113, 128, 150, 0.2)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default PlanCard;