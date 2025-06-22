import { FaBolt, FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { slideInRight } from "../common/Animations";
import { Button as BSButton } from "react-bootstrap";

const CoursePurchaseBox = ({ includes = [], course = {} }) => {
  const navigate = useNavigate();

  return (
    <PurchaseBoxWrapper>
      <PurchaseCard>
        <PreviewImageWrapper>
          <PreviewImage
            src={course?.imageUrl || "/image/default-avatar.jpg"}
            alt="Course Preview"
          />
          <PlayIconWrapper>
            <FaPlayCircle />
          </PlayIconWrapper>
        </PreviewImageWrapper>
        <PurchaseBody>
          <PriceWrapper>
            <CurrentPrice>${(course?.price - (course?.price * 0.1)) || 0}</CurrentPrice>
            <OriginalPrice>${course?.price  || 0}</OriginalPrice>
          </PriceWrapper>
          <SecondaryButton onClick={() => navigate(`/checkout/${course._id}`)}>
            <FaBolt className="me-2" /> Buy Now
          </SecondaryButton>

          {includes.length > 0 && (
            <CourseIncludesList>
              {includes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <CourseIncludesItem key={index}>
                    {Icon && <Icon />} {item.text}
                  </CourseIncludesItem>
                );
              })}
            </CourseIncludesList>
          )}
        </PurchaseBody>
      </PurchaseCard>
    </PurchaseBoxWrapper>
  );
};

export default CoursePurchaseBox;

// Purchase Box Components
const PurchaseBoxWrapper = styled.div`
  position: sticky;
  top: 20px;
  z-index: 10;
  animation: ${slideInRight} 0.8s ease-out 0.2s;
  animation-fill-mode: both;

  @media (max-width: 991px) {
    position: static;
    margin-top: 32px;
  }
`;

const PurchaseCard = styled.div`
  background: linear-gradient(145deg, var(--card-background) 0%, rgba(24, 29, 25, 0.95) 100%);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(0, 230, 118, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(0, 230, 118, 0.2);
  }
`;

const PreviewImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${PreviewImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const PlayIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 4rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  opacity: 0.9;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);

  ${PreviewImageWrapper}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
    background: rgba(0, 230, 118, 0.8);
  }
`;

const PurchaseBody = styled.div`
  padding: 28px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
`;

const CurrentPrice = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--heading-color);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const OriginalPrice = styled.span`
  font-size: 1.4rem;
  color: var(--text-secondary);
  text-decoration: line-through;
  font-weight: 500;
`;

const StyledButton = styled(BSButton)`
  width: 100%;
  padding: 16px;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;



const SecondaryButton = styled(StyledButton)`
  background-color: transparent;
  border: 2px solid var(--border-color);
  color: var(--text-light);

  &:hover {
    background-color: var(--border-color);
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const CourseIncludesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 28px;
`;

const CourseIncludesItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: var(--text-light);
  font-size: 0.95rem;
  font-weight: 500;
  
  svg {
    color: var(--primary);
    font-size: 1.1rem;
  }
`;



