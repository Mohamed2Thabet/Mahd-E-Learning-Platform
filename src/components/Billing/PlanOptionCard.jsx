// components/Billing/PlanOptionCard.jsx
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaCheck, FaStar, FaCrown } from "react-icons/fa";

const PlanOptionCard = ({
  title,
  price,
  features,
  isCurrent = false,
  isUpgrade = false,
  isPopular = false,
  currency = "$",
  billingCycle = "month",
  description,
  onSelect
}) => {
  const cardStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    border: isCurrent
      ? "2px solid #10b981"
      : isPopular
        ? "2px solid #667eea"
        : "1px solid rgba(229, 231, 235, 0.6)",
    borderRadius: "24px",
    color: "#1f2937",
    position: "relative",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    height: "100%",
    backdropFilter: "blur(20px)",
    boxShadow: isCurrent || isPopular
      ? "0 12px 40px rgba(0, 0, 0, 0.12)"
      : "0 8px 25px rgba(0, 0, 0, 0.08)",
    minHeight: "480px",
    display: "flex",
    flexDirection: "column"
  };

  const headerStyles = {
    padding: "clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px) 0",
    textAlign: "center",
    flex: "0 0 auto"
  };

  const bodyStyles = {
    padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px) clamp(28px, 5vw, 40px)",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column"
  };

  const titleStyles = {
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    lineHeight: "1.2"
  };

  const priceStyles = {
    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
    fontWeight: "900",
    color: "#1f2937",
    lineHeight: "0.9",
    marginBottom: "8px",
    background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  const cycleStyles = {
    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
    color: "#6b7280",
    fontWeight: "500"
  };

  const descriptionStyles = {
    color: "#6b7280",
    fontSize: "0.95rem",
    marginBottom: "24px",
    textAlign: "center"
  };

  const buttonStyles = {
    width: "100%",
    borderRadius: "16px",
    fontWeight: "700",
    padding: "16px 24px",
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
    marginBottom: "32px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "none",
    textTransform: "none",
    letterSpacing: "0.025em",
    minHeight: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const currentButtonStyles = {
    ...buttonStyles,
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#ffffff",
    cursor: "default",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)"
  };

  const upgradeButtonStyles = {
    ...buttonStyles,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
  };

  const selectButtonStyles = {
    ...buttonStyles,
    backgroundColor: "rgba(113, 128, 150, 0.08)",
    border: "2px solid rgba(113, 128, 150, 0.15)",
    color: "#374151",
    backdropFilter: "blur(10px)"
  };

  const featureListStyles = {
    listStyle: "none",
    padding: "0",
    margin: "0",
    flex: "1 1 auto"
  };

  const featureItemStyles = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "clamp(12px, 2vw, 18px)",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    color: "#374151",
    lineHeight: "1.6"
  };

  const checkIconStyles = {
    color: "#10b981",
    marginRight: "12px",
    marginTop: "2px",
    flexShrink: 0
  };

  const popularBadgeStyles = {
    position: "absolute",
    top: "-1px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    padding: "10px 28px",
    borderRadius: "0 0 16px 16px",
    fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
  };

  const handleButtonClick = () => {
    if (!isCurrent && onSelect) {
      onSelect();
    }
  };

  const handleMouseEnter = (e) => {
    if (!isCurrent) {
      e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
      e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.15)";
    }
  };

  const handleMouseLeave = (e) => {
    if (!isCurrent) {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = cardStyles.boxShadow;
    }
  };

  return (
    <Card
      style={cardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="plan-option-card"
    >
      {isPopular && (
        <div style={popularBadgeStyles}>
          <FaStar className="me-1" size={12} />
          Most Popular
        </div>
      )}

      <div style={headerStyles}>
        <h4 style={titleStyles}>
          {(isCurrent || isPopular) && <FaCrown size={20} color="#f59e0b" />}
          {title}
        </h4>

        {description && (
          <p style={descriptionStyles}>{description}</p>
        )}

        <div className="mb-3">
          <div style={priceStyles}>
            {currency}{price}
          </div>
          <span style={cycleStyles}>/{billingCycle}</span>
        </div>
      </div>

      <div style={bodyStyles}>
        {isCurrent ? (
          <Button style={currentButtonStyles} disabled>
            <FaCheck className="me-2" />
            Current Plan
          </Button>
        ) : (
          <Button
            style={isUpgrade ? upgradeButtonStyles : selectButtonStyles}
            onClick={handleButtonClick}
            onMouseOver={(e) => {
              if (isUpgrade) {
                e.target.style.transform = "translateY(-3px) scale(1.02)";
                e.target.style.boxShadow = "0 8px 30px rgba(102, 126, 234, 0.4)";
              } else {
                e.target.style.backgroundColor = "rgba(113, 128, 150, 0.12)";
                e.target.style.borderColor = "rgba(113, 128, 150, 0.25)";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (isUpgrade) {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
              } else {
                e.target.style.backgroundColor = "rgba(113, 128, 150, 0.08)";
                e.target.style.borderColor = "rgba(113, 128, 150, 0.15)";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {isUpgrade ? "Upgrade Now" : "Select Plan"}
          </Button>
        )}

        <ul style={featureListStyles}>
          {features.map((feature, idx) => (
            <li key={idx} style={featureItemStyles}>
              <FaCheck style={checkIconStyles} size={14} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default PlanOptionCard;