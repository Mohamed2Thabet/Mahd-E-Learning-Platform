// QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getExamById } from '../store/examSlice';

const QuizContainer = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding: 32px;

  :root {
    --primary: #00E676;
    --primary-dark: #00C853;
    --background-dark: #101310;
    --card-background: #181d19;
    --text-light: rgba(255, 255, 255, 0.87);
    --text-secondary: rgba(255, 255, 255, 0.6);
    --border-color: #333;
    --heading-color: white;
  }
`;

const QuizWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const BackButton = styled.button`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-light);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    color: #000;
    border-color: var(--primary);
  }
`;

const QuizTitle = styled.h1`
  color: var(--heading-color);
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const ProgressSection = styled.div`
  background: var(--card-background);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid var(--border-color);
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProgressText = styled.div`
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
`;

const ProgressPercentage = styled.div`
  color: var(--primary);
  font-size: 18px;
  font-weight: 700;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: var(--border-color);
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  border-radius: 6px;
  transition: width 0.6s ease;
`;

const QuestionCard = styled.div`
  background: var(--card-background);
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 32px;
  border: 1px solid var(--border-color);
`;

const QuestionNumber = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
`;

const QuestionTitle = styled.h2`
  color: var(--heading-color);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  line-height: 1.4;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const AnswerOption = styled.label`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: ${props => props.selected ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 255, 255, 0.03)'};
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'var(--border-color)'};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    background: rgba(0, 230, 118, 0.05);
  }
`;

const RadioButton = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'var(--border-color)'};
  border-radius: 50%;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.selected ? 'var(--primary)' : 'transparent'};
    transform: scale(${props => props.selected ? 1 : 0});
    transition: transform 0.3s ease;
  }
`;

const OptionText = styled.span`
  color: var(--text-light);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const PrimaryButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 16px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 230, 118, 0.4);
  }
  
  &:disabled {
    background: var(--border-color);
    color: var(--text-secondary);
    cursor: not-allowed;
    transform: none;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

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
  }
  
  &:disabled {
    border-color: var(--border-color);
    color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const ResultsCard = styled.div`
  background: var(--card-background);
  border-radius: 24px;
  padding: 64px 48px;
  text-align: center;
  border: 1px solid var(--border-color);
`;

const ResultsIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  font-size: 32px;
`;

const ResultsTitle = styled.h2`
  color: var(--heading-color);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ResultsScore = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--primary);
`;

const ResultsMessage = styled.p`
  color: var(--text-secondary);
  font-size: 18px;
  margin-bottom: 40px;
  line-height: 1.6;
`;

function QuizPage() {
  const { id:examId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const { exam, loading } = useSelector(state => state.exam);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (examId && token) {
      dispatch(getExamById({ examId, token }));
    }
  }, [examId, token, dispatch]);

  const questions = exam?.mcq || [];

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === parseInt(question.answerIndex)) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    const passed = percentage >= 60;

    if (passed) {
      if (percentage >= 90) return "Outstanding! You're mastering this material! 🎉";
      if (percentage >= 80) return "Excellent work! You have strong knowledge! 👏";
      return "Good job! You passed the exam! 👍";
    } else {
      return "Keep studying and try again! You've got this! 💪";
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (loading) {
    return (
      <QuizContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-color)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </QuizContainer>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= Math.ceil(questions.length * 0.6);

    return (
      <QuizContainer>
        <QuizWrapper>
          <Header>
            <BackButton onClick={() => navigate(-1)}>
              ← Back to Course
            </BackButton>
          </Header>

          <ResultsCard>
            <ResultsIcon>
              {passed ? '🏆' : '📚'}
            </ResultsIcon>
            <ResultsTitle>
              {passed ? 'Congratulations! You Passed!' : 'Keep Learning!'}
            </ResultsTitle>
            <ResultsScore>
              {score}/{questions.length}
            </ResultsScore>
            <div style={{
              color: passed ? 'var(--primary)' : '#ff6b6b',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              {passed ? '✅ PASSED' : '❌ TRY AGAIN'}
            </div>
            <ResultsMessage>
              {getScoreMessage(score, questions.length)}
            </ResultsMessage>
            <PrimaryButton onClick={() => navigate(-1)}>
              {passed ? 'Continue Course' : 'Back to Course'}
            </PrimaryButton>
          </ResultsCard>
        </QuizWrapper>
      </QuizContainer>
    );
  }

  if (!questions.length) {
    return (
      <QuizContainer>
        <QuizWrapper>
          <Header>
            <BackButton onClick={() => navigate(-1)}>
              ← Back to Course
            </BackButton>
            <QuizTitle>No Questions Available</QuizTitle>
          </Header>
        </QuizWrapper>
      </QuizContainer>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <QuizContainer>
      <QuizWrapper>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            ← Back to Course
          </BackButton>
          <QuizTitle>{exam?.title || 'Course Exam'}</QuizTitle>
        </Header>

        <ProgressSection>
          <ProgressHeader>
            <ProgressText>
              Question {currentQuestion + 1} of {questions.length}
            </ProgressText>
            <ProgressPercentage>{Math.round(progress)}% Complete</ProgressPercentage>
          </ProgressHeader>
          <ProgressBarContainer>
            <ProgressBarFill progress={progress} />
          </ProgressBarContainer>
        </ProgressSection>

        <QuestionCard>
          <QuestionNumber>Question {currentQuestion + 1}</QuestionNumber>
          <QuestionTitle>{currentQ.question}</QuestionTitle>

          <OptionsContainer>
            {currentQ.choices.map((option, index) => (
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
            {currentQuestion === questions.length - 1 ? (
              <PrimaryButton
                onClick={handleSubmit}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Submit Exam
              </PrimaryButton>
            ) : (
              <PrimaryButton
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Next Question
              </PrimaryButton>
            )}
          </ButtonContainer>

          <NavigationContainer>
            <SecondaryButton
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </SecondaryButton>
            <SecondaryButton
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1 || selectedAnswers[currentQuestion] === undefined}
            >
              Next →
            </SecondaryButton>
          </NavigationContainer>
        </QuestionCard>
      </QuizWrapper>
    </QuizContainer>
  );
}

export default QuizPage;
