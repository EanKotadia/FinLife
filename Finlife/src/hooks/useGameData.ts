
import { useState } from 'react';
import { Decision } from '@/components/DecisionCard';

export interface GameState {
  age: number;
  money: number;
  happiness: number;
  health: number;
  financialIQ: number;
  decisions: Decision[];
}

const generateDecisions = (age: number): Decision[] => {
  const decisions: Decision[] = [];

  if (age === 16) {
    decisions.push({
      id: 'first-job',
      title: 'Your First Job Opportunity',
      description: 'You\'ve just turned 16 and several job opportunities have come your way. Each choice will shape your financial future differently.',
      options: [
        {
          id: 'fast-food',
          text: 'Work at a fast-food restaurant',
          effects: { money: 2000, happiness: -5, health: -5, financialIQ: 5 },
          consequence: 'You learn the value of hard work and basic money management, but the hours are long and tiring.'
        },
        {
          id: 'babysit',
          text: 'Start a babysitting business',
          effects: { money: 1500, happiness: 10, health: 5, financialIQ: 15 },
          consequence: 'You develop entrepreneurial skills and enjoy working with kids, building valuable business experience.'
        },
        {
          id: 'tutor',
          text: 'Tutor younger students',
          effects: { money: 1800, happiness: 15, health: 0, financialIQ: 20 },
          consequence: 'You strengthen your own knowledge while helping others, and parents pay well for quality tutoring.'
        }
      ]
    });
  } else if (age === 17) {
    decisions.push({
      id: 'education-choice',
      title: 'Planning Your Education',
      description: 'As you approach graduation, you need to decide how to continue your education and what financial commitments you\'re willing to make.',
      options: [
        {
          id: 'community-college',
          text: 'Attend community college',
          effects: { money: -5000, happiness: 5, health: 0, financialIQ: 25 },
          consequence: 'You save money on tuition while getting quality education and keeping your options open for transfer.'
        },
        {
          id: 'state-university',
          text: 'Go to state university',
          effects: { money: -15000, happiness: 15, health: 5, financialIQ: 35 },
          consequence: 'You get the full college experience and valuable networking opportunities, but take on significant debt.'
        },
        {
          id: 'trade-school',
          text: 'Enroll in trade school',
          effects: { money: -8000, happiness: 10, health: -5, financialIQ: 20 },
          consequence: 'You learn practical skills that are in high demand and can start earning good money quickly.'
        }
      ]
    });
  } else if (age === 18) {
    decisions.push({
      id: 'credit-card-offer',
      title: 'Your First Credit Card Offer',
      description: 'A credit card company is offering you a card with a $1,000 limit. How do you handle this financial milestone?',
      options: [
        {
          id: 'accept-responsible',
          text: 'Accept and use it responsibly for small purchases',
          effects: { money: 0, happiness: 5, health: 0, financialIQ: 30 },
          consequence: 'You build good credit history by making small purchases and paying them off in full each month.'
        },
        {
          id: 'decline',
          text: 'Decline the offer and stick to cash',
          effects: { money: 0, happiness: -5, health: 0, financialIQ: 10 },
          consequence: 'You avoid potential debt but miss the opportunity to build credit history early.'
        },
        {
          id: 'accept-splurge',
          text: 'Accept and use it for a shopping spree',
          effects: { money: -800, happiness: 20, health: 0, financialIQ: -10 },
          consequence: 'You enjoy immediate gratification but rack up debt and learn bad financial habits.'
        }
      ]
    });
  } else if (age >= 19 && age <= 22) {
    const jobDecisions = [
      {
        id: 'part-time-job',
        title: 'Balancing Work and Studies',
        description: 'You need to decide how to balance earning money with your education and personal life.',
        options: [
          {
            id: 'work-study',
            text: 'Take a work-study position on campus',
            effects: { money: 3000, happiness: 10, health: 0, financialIQ: 15 },
            consequence: 'You earn money while staying close to your studies and building campus connections.'
          },
          {
            id: 'retail-job',
            text: 'Work retail nights and weekends',
            effects: { money: 5000, happiness: -10, health: -10, financialIQ: 10 },
            consequence: 'You earn good money but your studies and health suffer from the demanding schedule.'
          },
          {
            id: 'focus-studies',
            text: 'Focus entirely on studies',
            effects: { money: -2000, happiness: 5, health: 10, financialIQ: 25 },
            consequence: 'Your grades improve and you feel healthier, but you miss out on work experience and income.'
          }
        ]
      }
    ];
    decisions.push(jobDecisions[Math.floor(Math.random() * jobDecisions.length)]);
  } else if (age >= 23 && age <= 26) {
    decisions.push({
      id: 'first-career-job',
      title: 'Your First Real Job',
      description: 'You\'ve graduated and received several job offers. Each comes with different salary levels and growth opportunities.',
      options: [
        {
          id: 'startup',
          text: 'Join a promising startup with equity',
          effects: { money: 8000, happiness: 15, health: -5, financialIQ: 35 },
          consequence: 'You take a lower salary for potential big returns, learning valuable skills in a fast-paced environment.'
        },
        {
          id: 'corporate',
          text: 'Take a stable corporate position',
          effects: { money: 15000, happiness: 5, health: 5, financialIQ: 20 },
          consequence: 'You enjoy steady income and good benefits, building a solid foundation for your career.'
        },
        {
          id: 'nonprofit',
          text: 'Work for a nonprofit organization',
          effects: { money: 5000, happiness: 25, health: 10, financialIQ: 15 },
          consequence: 'You earn less money but find deep fulfillment in meaningful work that helps others.'
        }
      ]
    });
  }

  // Add random events for any age
  if (Math.random() < 0.3) {
    const randomEvents = [
      {
        id: 'unexpected-expense',
        title: 'Unexpected Car Repair',
        description: 'Your car breaks down and needs $800 in repairs. How do you handle this financial emergency?',
        options: [
          {
            id: 'emergency-fund',
            text: 'Use your emergency fund',
            effects: { money: -800, happiness: 5, health: 0, financialIQ: 10 },
            consequence: 'You handle the crisis calmly thanks to your financial planning and quickly rebuild your emergency fund.'
          },
          {
            id: 'credit-card-debt',
            text: 'Put it on credit card',
            effects: { money: -800, happiness: -10, health: -5, financialIQ: -5 },
            consequence: 'You cover the expense but add to your debt burden and stress about the monthly payments.'
          },
          {
            id: 'borrow-money',
            text: 'Borrow from family/friends',
            effects: { money: -500, happiness: -15, health: -5, financialIQ: 0 },
            consequence: 'You get help but feel embarrassed about your financial situation and strain relationships.'
          }
        ]
      }
    ];
    decisions.push(randomEvents[0]);
  }

  return decisions;
};

export const useGameData = () => {
  const [gameState, setGameState] = useState<GameState>({
    age: 16,
    money: 1000,
    happiness: 70,
    health: 90,
    financialIQ: 20,
    decisions: generateDecisions(16)
  });

  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [showOutcome, setShowOutcome] = useState(false);
  const [lastChoice, setLastChoice] = useState<any>(null);

  const makeDecision = (option: any) => {
    console.log('Making decision:', option);
    
    setGameState(prev => ({
      ...prev,
      money: Math.max(0, prev.money + (option.effects.money || 0)),
      happiness: Math.max(0, Math.min(100, prev.happiness + (option.effects.happiness || 0))),
      health: Math.max(0, Math.min(100, prev.health + (option.effects.health || 0))),
      financialIQ: Math.max(0, Math.min(100, prev.financialIQ + (option.effects.financialIQ || 0)))
    }));
    
    setLastChoice(option);
    setShowOutcome(true);
  };

  const continueGame = () => {
    console.log('Continuing game...');
    setShowOutcome(false);
    setLastChoice(null);
    
    if (currentDecisionIndex < gameState.decisions.length - 1) {
      setCurrentDecisionIndex(prev => prev + 1);
    } else {
      // Move to next age
      const newAge = gameState.age + 1;
      const newDecisions = generateDecisions(newAge);
      
      setGameState(prev => ({
        ...prev,
        age: newAge,
        decisions: newDecisions
      }));
      setCurrentDecisionIndex(0);
    }
  };

  const getCurrentDecision = () => {
    return gameState.decisions[currentDecisionIndex];
  };

  return {
    gameState,
    currentDecision: getCurrentDecision(),
    showOutcome,
    lastChoice,
    makeDecision,
    continueGame
  };
};
