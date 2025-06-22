import React, { useState } from "react";
import { BiCodeAlt, BiBriefcase, BiPlusCircle } from "react-icons/bi";
import { FaBrush, FaArrowLeft, FaCheck, FaSearch } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdBusinessCenter } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";



// ✅ Component
const ProfessionSelection = () => {
  const navigate = useNavigate();
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const professions = [
    {
      id: "software-development",
      name: "Software Development",
      icon: <BiCodeAlt />,
      keywords: ["programming", "coding", "developer", "software", "web", "app"]
    },
    {
      id: "design",
      name: "Design",
      icon: <FaBrush />,
      keywords: ["design", "ui", "ux", "graphic", "visual", "creative"]
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: <AiOutlineBarChart />,
      keywords: ["marketing", "sales", "advertising", "promotion", "digital"]
    },
    {
      id: "business",
      name: "Business & Finance",
      icon: <MdBusinessCenter />,
      keywords: ["business", "finance", "management", "accounting", "economics"]
    },
    {
      id: "engineering",
      name: "Engineering",
      icon: <GiArtificialIntelligence />,
      keywords: ["engineering", "technical", "mechanical", "civil", "electrical"]
    },
    {
      id: "ai-data",
      name: "AI & Data Science",
      icon: <GiArtificialIntelligence />,
      keywords: ["ai", "data", "machine learning", "analytics", "science", "artificial intelligence"]
    },
  ];

  // Filter professions based on search
  const filteredProfessions = professions.filter(profession =>
    profession.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profession.keywords.some(keyword =>
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleProfessionSelect = (professionId) => {
    setSelectedProfession(professionId);
    localStorage.setItem('selectedProfession', professionId);

    // Vibration feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleOtherSelect = () => {
    setSelectedProfession('other');
    localStorage.setItem('selectedProfession', 'other');
  };

  const handleNext = async () => {
    if (!selectedProfession) {
      alert('Please select your profession before continuing');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/thank-you', {
        state: { profession: selectedProfession }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('selectedProfession', 'skipped');
    navigate('/');
  };

  const isProfessionSelected = (professionId) => selectedProfession === professionId;

  return (
    <ProfessionContainer>
      <ContentBox>
        <ProgressIndicator>Step 2 of 3</ProgressIndicator>

        <Header>
          <Title>What is your current profession?</Title>
          <Subtitle>
            Select your industry or search for your specific role
          </Subtitle>
        </Header>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search for your profession..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
        </SearchContainer>

        <ProfessionsGrid>
          {filteredProfessions.map((profession, index) => (
            <ProfessionButton
              key={profession.id}
              $isSelected={isProfessionSelected(profession.id)}
              $delay={`${1.2 + index * 0.1}s`}
              onClick={() => handleProfessionSelect(profession.id)}
            >
              <IconContainer $isSelected={isProfessionSelected(profession.id)}>
                {profession.icon}
              </IconContainer>
              <ProfessionName $isSelected={isProfessionSelected(profession.id)}>
                {profession.name}
              </ProfessionName>
              <ArrowIcon $isSelected={isProfessionSelected(profession.id)} />
              {isProfessionSelected(profession.id) && (
                <SelectedCheckmark>
                  <FaCheck />
                </SelectedCheckmark>
              )}
            </ProfessionButton>
          ))}
        </ProfessionsGrid>

        {filteredProfessions.length === 0 && searchTerm && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', margin: '20px 0' }}>
            No professions found. Try searching with different keywords.
          </div>
        )}

        <OtherProfessionButton
          $isSelected={isProfessionSelected('other')}
          onClick={handleOtherSelect}
        >
          <BiPlusCircle size={20} />
          Other Profession
          {isProfessionSelected('other') && (
            <SelectedCheckmark>
              <FaCheck />
            </SelectedCheckmark>
          )}
        </OtherProfessionButton>

        <NavigationSection>
          <SkipLink to="/" onClick={handleSkip}>
            <FaArrowLeft size={14} />
            Skip
          </SkipLink>

          <NextButton
            onClick={handleNext}
            disabled={!selectedProfession || isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Processing...
              </>
            ) : (
              'Next'
            )}
          </NextButton>
        </NavigationSection>
      </ContentBox>
    </ProfessionContainer>
  );
};

export default ProfessionSelection;
// ✅ Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const flipUp = keyframes`
  from {
    opacity: 0;
    transform: rotateY(-15deg) translateY(20px);
  }
  to {
    opacity: 1;
    transform: rotateY(0) translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

// ✅ Main Container
const ProfessionContainer = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${css`${fadeIn} 0.8s ease-out`};
`;

const ContentBox = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 50px 40px;
  max-width: 700px;
  width: 100%;
  color: var(--text-light);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  animation: ${css`${zoomIn} 0.8s ease-out`};
  animation-delay: 0.3s;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  }

  @media (max-width: 768px) {
    padding: 35px 25px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 16px;
    margin: 10px;
  }
`;

// ✅ Header Section
const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h2`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--heading-color);
  animation: ${css`${fadeRight} 0.8s ease-out`};
  animation-delay: 0.6s;
  animation-fill-mode: both;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: clamp(14px, 2.5vw, 18px);
  color: var(--text-secondary);
  margin-bottom: 30px;
  animation: ${css`${fadeRight} 0.8s ease-out`};
  animation-delay: 0.8s;
  animation-fill-mode: both;
  line-height: 1.6;
`;

// ✅ Search Input Container
const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 1s;
  animation-fill-mode: both;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 50px 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  color: var(--text-light);
  font-size: 16px;
  transition: all 0.3s ease;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  @media (max-width: 480px) {
    padding: 14px 45px 14px 16px;
    font-size: 15px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 18px;
  pointer-events: none;
`;

// ✅ Professions Grid
const ProfessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 30px 0;

  @media (max-width: 480px) {
    gap: 12px;
    grid-template-columns: 1fr;
  }
`;

// ✅ Profession Button
const ProfessionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 20px;
  background: ${props => props.$isSelected ?
    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' :
    'rgba(255, 255, 255, 0.03)'
  };
  border: 2px solid ${props => props.$isSelected ?
    'var(--primary)' :
    'var(--border-color)'
  };
  border-radius: 16px;
  color: ${props => props.$isSelected ?
    'var(--heading-color)' :
    'var(--text-light)'
  };
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 80px;
  animation: ${css`${flipUp} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: ${props => props.$isSelected ?
    'var(--primary)' :
    'rgba(255, 255, 255, 0.3)'
  };
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }

  ${props => props.$isSelected && css`
    animation: ${pulse} 2s ease-in-out infinite;
    box-shadow: 0 0 30px rgba(0, 230, 118, 0.3);
  `}

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 70px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 14px;
    min-height: 60px;
    font-size: 13px;
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: ${props => props.$isSelected ?
    'rgba(255, 255, 255, 0.2)' :
    'rgba(0, 230, 118, 0.1)'
  };
  border-radius: 12px;
  margin-right: 16px;
  font-size: 24px;
  color: ${props => props.$isSelected ?
    'var(--heading-color)' :
    'var(--primary)'
  };
  transition: all 0.3s ease;
  flex-shrink: 0;

  ${ProfessionButton}:hover & {
    transform: rotate(5deg) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    margin-right: 12px;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 18px;
    margin-right: 10px;
  }
`;

const ProfessionName = styled.span`
  flex: 1;
  text-align: left;
  font-weight: ${props => props.$isSelected ? '600' : '500'};
`;

const ArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url('image/back.png') no-repeat center;
  background-size: contain;
  opacity: ${props => props.$isSelected ? '1' : '0.6'};
  transition: all 0.3s ease;
  flex-shrink: 0;

  ${ProfessionButton}:hover & {
    transform: translateX(4px);
    opacity: 1;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

// ✅ Selected Checkmark
const SelectedCheckmark = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  animation: ${css`${zoomIn} 0.4s ease-out`};
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.4);

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
`;

// ✅ Other Profession Button
const OtherProfessionButton = styled.button`
  width: 100%;
  padding: 18px 20px;
  background: ${props => props.$isSelected ?
    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' :
    'rgba(255, 255, 255, 0.03)'
  };
  border: 2px solid ${props => props.$isSelected ?
    'var(--primary)' :
    'var(--border-color)'
  };
  border-radius: 16px;
  color: ${props => props.$isSelected ?
    'var(--heading-color)' :
    'var(--text-light)'
  };
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 1.6s;
  animation-fill-mode: both;
  position: relative;

  &:hover {
    background: ${props => props.$isSelected ?
    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' :
    'rgba(255, 255, 255, 0.08)'
  };
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 15px;
    gap: 8px;
  }
`;

// ✅ Navigation Section
const NavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    margin-top: 30px;
  }
`;

const SkipLink = styled(Link)`
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  font-size: clamp(14px, 2vw, 16px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;

  &:hover {
    color: var(--primary-dark);
    background: rgba(0, 230, 118, 0.1);
    transform: translateX(-3px);
  }

  @media (max-width: 600px) {
    order: 2;
  }
`;

const NextButton = styled.button`
  background: ${props => props.disabled ?
    'rgba(255, 255, 255, 0.05)' :
    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
  };
  color: ${props => props.disabled ?
    'var(--text-secondary)' :
    'var(--heading-color)'
  };
  border: 2px solid ${props => props.disabled ?
    'var(--border-color)' :
    'var(--primary)'
  };
  border-radius: 12px;
  padding: 14px 32px;
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 120px;
  opacity: ${props => props.disabled ? '0.5' : '1'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 600px) {
    order: 1;
    width: 100%;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// ✅ Progress Indicator
const ProgressIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: clamp(12px, 1.5vw, 14px);
  color: var(--text-secondary);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 20px;
    display: inline-block;
  }
`;