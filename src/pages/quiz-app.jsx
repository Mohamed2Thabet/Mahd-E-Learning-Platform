"use client"

import { useState } from "react"
import styled from "styled-components"
import {
  FaHome,
  FaUser,
  FaBook,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTrophy,
  FaBell,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa"

// Professional Styled Components
const AppContainer = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`

const Sidebar = styled.aside`
  background: linear-gradient(180deg, var(--card-background) 0%, #1a1f1b 100%);
  min-height: 100vh;
  width: 80px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  border-right: 1px solid var(--border-color);
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
`

const SidebarIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: ${(props) =>
    props.active ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 16px;
  position: relative;
  
  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)"
        : "rgba(255, 255, 255, 0.08)"};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: -24px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: ${(props) => (props.active ? "24px" : "0")};
    background: var(--primary);
    border-radius: 0 2px 2px 0;
    transition: height 0.3s ease;
  }
  
  svg {
    color: ${(props) => (props.active ? "#000" : "var(--text-light)")};
    font-size: 20px;
    transition: all 0.3s ease;
  }
`

const MainContent = styled.main`
  margin-left: 80px;
  padding: 32px;
  min-height: 100vh;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 0 8px;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const HeaderTitle = styled.h1`
  color: var(--heading-color);
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--primary) 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: var(--primary);
    background: rgba(0, 230, 118, 0.1);
  }
  
  svg {
    font-size: 18px;
  }
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
  
  svg {
    color: #000;
    font-size: 16px;
  }
`

const QuizContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const ProgressSection = styled.section`
  background: var(--card-background);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ProgressText = styled.div`
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
`

const ProgressPercentage = styled.div`
  color: var(--primary);
  font-size: 18px;
  font-weight: 700;
`

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: var(--border-color);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`

const ProgressBarFill = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "progress",
})`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 6px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`

const QuestionCard = styled.article`
  background: var(--card-background);
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 32px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
  }
`

const QuestionNumber = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
`

const QuestionTitle = styled.h2`
  color: var(--heading-color);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  line-height: 1.4;
`

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`

const AnswerOption = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "selected",
})`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: ${(props) => (props.selected ? "rgba(0, 230, 118, 0.1)" : "rgba(255, 255, 255, 0.03)")};
  border: 2px solid ${(props) => (props.selected ? "var(--primary)" : "var(--border-color)")};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: var(--primary);
    background: rgba(0, 230, 118, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${(props) => (props.selected ? "4px" : "0")};
    background: var(--primary);
    transition: width 0.3s ease;
  }
`

const RadioButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "selected",
})`
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => (props.selected ? "var(--primary)" : "var(--border-color)")};
  border-radius: 50%;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) => (props.selected ? "var(--primary)" : "transparent")};
    transition: all 0.3s ease;
    transform: scale(${(props) => (props.selected ? 1 : 0)});
  }
`

const OptionText = styled.span`
  color: var(--text-light);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`

const PrimaryButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: 16px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 230, 118, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: var(--border-color);
    color: var(--text-secondary);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover:not(:disabled)::before {
    left: 100%;
  }
`

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`

const SecondaryButton = styled.button`
  background: transparent;
  border: 2px solid var(--primary);
  border-radius: 16px;
  padding: 12px 24px;
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    background: var(--primary);
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
  
  &:disabled {
    border-color: var(--border-color);
    color: var(--text-secondary);
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      background: transparent;
      color: var(--text-secondary);
    }
  }
`

const ResultsCard = styled.div`
  background: var(--card-background);
  border-radius: 24px;
  padding: 64px 48px;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
  }
`

const ResultsIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  animation: bounce 0.6s ease-out;
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0,-15px,0);
    }
    70% {
      transform: translate3d(0,-7px,0);
    }
    90% {
      transform: translate3d(0,-2px,0);
    }
  }
  
  svg {
    color: #000;
    font-size: 32px;
  }
`

const ResultsTitle = styled.h2`
  color: var(--heading-color);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`

const ResultsScore = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--primary) 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const ResultsMessage = styled.p`
  color: var(--text-secondary);
  font-size: 18px;
  margin-bottom: 40px;
  line-height: 1.6;
`
const BackButton = styled.button`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-light);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

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
    background: var(--primary);
    color: var(--heading-color);
    transform: scale(1.1) rotate(-5deg);
    border-color: var(--primary);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

// Quiz Data
const quizData = [
  {
    id: 1,
    question: "Which of the following best describes the primary purpose of a UI/UX design system?",
    options: [
      "A consistent framework for designing digital products",
      "A collection of random design elements",
      "A tool for creating animations",
      "A programming language for developers",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    correct: 1,
  },
  {
    id: 3,
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    correct: 2,
  },
  {
    id: 4,
    question: "What is the purpose of React hooks?",
    options: [
      "To style components",
      "To manage state and lifecycle in functional components",
      "To create HTML elements",
      "To handle routing",
    ],
    correct: 1,
  },
  {
    id: 5,
    question: "Which CSS property is used to change the text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    correct: 2,
  },
  {
    id: 6,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Interface",
      "Application Process Interface",
      "Automated Programming Interface",
    ],
    correct: 0,
  },
  {
    id: 7,
    question: "Which JavaScript method is used to add an element to the end of an array?",
    options: ["append()", "push()", "add()", "insert()"],
    correct: 1,
  },
  {
    id: 8,
    question: "What is the default display value for a div element?",
    options: ["inline", "block", "flex", "grid"],
    correct: 1,
  },
  {
    id: 9,
    question: "Which HTTP status code indicates a successful request?",
    options: ["404", "500", "200", "301"],
    correct: 2,
  },
  {
    id: 10,
    question: "What is the purpose of the 'key' prop in React lists?",
    options: [
      "To style list items",
      "To help React identify which items have changed",
      "To sort the list",
      "To add event listeners",
    ],
    correct: 1,
  },
]

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100
    const passed = score >= 6

    if (passed) {
      if (percentage >= 90) return "Outstanding! You're a web development expert! 🎉"
      if (percentage >= 80) return "Excellent work! You have strong knowledge! 👏"
      return "Good job! You passed the quiz! 👍"
    } else {
      return "Don't give up! Keep learning and try again! 💪"
    }
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100

  if (showResults) {
    const score = calculateScore()
    return (
      <AppContainer>
      

        <MainContent>
          <Header>
            <HeaderLeft>
              <HeaderTitle>Quiz Results</HeaderTitle>
            </HeaderLeft>
            <HeaderRight>
              <IconButton>
                <FaSearch />
              </IconButton>
              <IconButton>
                <FaBell />
              </IconButton>
              <UserAvatar>
                <FaUser />
              </UserAvatar>
            </HeaderRight>
          </Header>

          <QuizContainer>
            <ResultsCard className="fade-in">
              <ResultsIcon>{score >= 6 ? <FaTrophy /> : <FaCheck />}</ResultsIcon>
              <ResultsTitle>{score >= 6 ? "Congratulations! You Passed!" : "Quiz Failed"}</ResultsTitle>
              <ResultsScore>
                {score}/{quizData.length}
              </ResultsScore>
              <div
                style={{
                  color: score >= 6 ? "var(--primary)" : "#ff6b6b",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                {score >= 6 ? "✅ PASSED" : "❌ FAILED - Need 6 or more to pass"}
              </div>
              <ResultsMessage>{getScoreMessage(score, quizData.length)}</ResultsMessage>
              <PrimaryButton
                onClick={() => {
                  setCurrentQuestion(0)
                  setSelectedAnswers({})
                  setShowResults(false)
                }}
              >
                {score >= 6 ? "Take Quiz Again" : "Try Again"}
              </PrimaryButton>
            </ResultsCard>
          </QuizContainer>
        </MainContent>
      </AppContainer>
    )
  }

  const currentQ = quizData[currentQuestion]

  return (
    <AppContainer>
    

      <MainContent>
        <Header>
          <HeaderLeft>
            <BackButton onClick={() => window.history.back()} aria-label="Go back to course">
                      <FaArrowLeft />
                    </BackButton>
            <HeaderTitle>Web Development Quiz</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <IconButton>
              <FaSearch />
            </IconButton>
            <IconButton>
              <FaBell />
            </IconButton>
            <UserAvatar>
              <FaUser />
            </UserAvatar>
          </HeaderRight>
        </Header>

        <QuizContainer>
          <ProgressSection className="slide-in">
            <ProgressHeader>
              <ProgressText>
                Question {currentQuestion + 1} of {quizData.length}
              </ProgressText>
              <ProgressPercentage>{Math.round(progress)}% Complete</ProgressPercentage>
            </ProgressHeader>
            <ProgressBarContainer>
              <ProgressBarFill progress={progress} />
            </ProgressBarContainer>
          </ProgressSection>

          <QuestionCard className="fade-in">
            <QuestionNumber>Question {currentQuestion + 1}</QuestionNumber>
            <QuestionTitle>{currentQ.question}</QuestionTitle>

            <OptionsContainer>
              {currentQ.options.map((option, index) => (
                <AnswerOption
                  key={index}
                  selected={selectedAnswers[currentQuestion] === index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                >
                  <RadioButton selected={selectedAnswers[currentQuestion] === index} />
                  <OptionText>{option}</OptionText>
                </AnswerOption>
              ))}
            </OptionsContainer>

            <ButtonContainer>
              {currentQuestion === quizData.length - 1 ? (
                <PrimaryButton onClick={handleSubmit} disabled={selectedAnswers[currentQuestion] === undefined}>
                  Submit Quiz
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={handleNext} disabled={selectedAnswers[currentQuestion] === undefined}>
                  Next Question
                </PrimaryButton>
              )}
            </ButtonContainer>

            <NavigationContainer>
              <SecondaryButton onClick={handlePrevious} disabled={currentQuestion === 0}>
                <FaChevronLeft />
                Previous
              </SecondaryButton>
              <SecondaryButton
                onClick={handleNext}
                disabled={currentQuestion === quizData.length - 1 || selectedAnswers[currentQuestion] === undefined}
              >
                Next
                <FaChevronRight />
              </SecondaryButton>
            </NavigationContainer>
          </QuestionCard>
        </QuizContainer>
      </MainContent>
    </AppContainer>
  )
}
