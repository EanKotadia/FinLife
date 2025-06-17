
import React, { useState } from 'react';
import { Calculator, Home, Car, Utensils, ShoppingBag, Gamepad2, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const categories = [
  { id: 'housing', name: 'Housing', icon: Home, color: 'text-blue-600', min: 25, max: 50 },
  { id: 'transportation', name: 'Transportation', icon: Car, color: 'text-green-600', min: 10, max: 25 },
  { id: 'food', name: 'Food', icon: Utensils, color: 'text-orange-600', min: 10, max: 20 },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'text-purple-600', min: 5, max: 20 },
  { id: 'entertainment', name: 'Entertainment', icon: Gamepad2, color: 'text-pink-600', min: 5, max: 15 },
  { id: 'savings', name: 'Savings', icon: PiggyBank, color: 'text-yellow-600', min: 10, max: 30 },
];

interface BudgetChallengeGameProps {
  onGameComplete: (score: number) => void;
  onBack: () => void;
}

const BudgetChallengeGame = ({ onGameComplete, onBack }: BudgetChallengeGameProps) => {
  const [monthlyIncome] = useState(5000);
  const [allocations, setAllocations] = useState<Record<string, number>>({
    housing: 30,
    transportation: 15,
    food: 15,
    shopping: 10,
    entertainment: 10,
    savings: 20,
  });
  
  const [gameStep, setGameStep] = useState<'planning' | 'events' | 'results'>('planning');
  const [events, setEvents] = useState<Array<{id: number, text: string, cost: number, category: string}>>([]);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const remaining = 100 - totalAllocated;

  const updateAllocation = (category: string, value: number[]) => {
    setAllocations(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const startChallenge = () => {
    // Generate random events
    const randomEvents = [
      { id: 1, text: "Car breakdown - emergency repair needed!", cost: 800, category: 'transportation' },
      { id: 2, text: "Friend's wedding - need a gift and outfit", cost: 300, category: 'shopping' },
      { id: 3, text: "Groceries are 20% more expensive this month", cost: 200, category: 'food' },
      { id: 4, text: "New smartphone launched - very tempting!", cost: 1000, category: 'shopping' },
      { id: 5, text: "Concert tickets for your favorite band", cost: 150, category: 'entertainment' },
    ].sort(() => Math.random() - 0.5).slice(0, 3);
    
    setEvents(randomEvents);
    setGameStep('events');
    setCurrentEvent(0);
  };

  const handleEvent = (accept: boolean) => {
    if (accept) {
      const event = events[currentEvent];
      const categoryBudget = (allocations[event.category] / 100) * monthlyIncome;
      
      // Calculate score impact
      let impact = 0;
      if (event.cost <= categoryBudget) {
        impact = 10; // Good - within budget
      } else if (event.cost <= categoryBudget * 1.5) {
        impact = -5; // Slight overspend
      } else {
        impact = -15; // Major overspend
      }
      
      setFinalScore(prev => prev + impact);
    } else {
      setFinalScore(prev => prev + 5); // Bonus for saying no
    }

    if (currentEvent < events.length - 1) {
      setCurrentEvent(prev => prev + 1);
    } else {
      completeGame();
    }
  };

  const completeGame = () => {
    // Calculate final score based on budget balance
    let balanceScore = 0;
    
    // Ideal ranges
    const idealRanges = {
      housing: { min: 25, max: 35 },
      transportation: { min: 10, max: 20 },
      food: { min: 10, max: 15 },
      shopping: { min: 5, max: 15 },
      entertainment: { min: 5, max: 10 },
      savings: { min: 15, max: 30 },
    };

    Object.entries(allocations).forEach(([category, percentage]) => {
      const ideal = idealRanges[category as keyof typeof idealRanges];
      if (percentage >= ideal.min && percentage <= ideal.max) {
        balanceScore += 20;
      } else if (percentage >= ideal.min - 5 && percentage <= ideal.max + 5) {
        balanceScore += 10;
      }
    });

    const totalScore = Math.max(0, finalScore + balanceScore + (remaining === 0 ? 20 : 0));
    setFinalScore(totalScore);
    setGameStep('results');
    onGameComplete(totalScore);
  };

  const getBudgetAdvice = () => {
    const advice = [];
    if (allocations.housing > 35) advice.push("Housing costs are too high - consider downsizing");
    if (allocations.savings < 15) advice.push("Try to save at least 15% of your income");
    if (allocations.entertainment > 15) advice.push("Entertainment spending seems high");
    if (remaining !== 0) advice.push("Make sure to allocate your entire budget");
    return advice;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">← Back to Games</Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Budget Challenge</h1>
          <p className="text-muted-foreground">Can you create the perfect budget?</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Monthly Income</p>
          <p className="text-xl font-bold">${monthlyIncome.toLocaleString()}</p>
        </div>
      </div>

      {gameStep === 'planning' && (
        <div className="space-y-6">
          {/* Budget Summary */}
          <Card className={`${remaining === 0 ? 'border-green-500' : remaining < 0 ? 'border-red-500' : 'border-yellow-500'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Budget Allocation
              </CardTitle>
              <CardDescription>
                Allocated: {totalAllocated}% | Remaining: {remaining}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`text-center p-4 rounded-lg ${
                remaining === 0 ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' :
                remaining < 0 ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300' :
                'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300'
              }`}>
                {remaining === 0 ? "Perfect! All income allocated" :
                 remaining < 0 ? `Over budget by ${Math.abs(remaining)}%` :
                 `${remaining}% unallocated`}
              </div>
            </CardContent>
          </Card>

          {/* Category Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    {category.name}
                  </CardTitle>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${((allocations[category.id] / 100) * monthlyIncome).toFixed(0)}
                    </span>
                    <span className="font-bold">{allocations[category.id]}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Slider
                    value={[allocations[category.id]]}
                    onValueChange={(value) => updateAllocation(category.id, value)}
                    max={60}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>Recommended: {category.min}-{category.max}%</span>
                    <span>60%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advice */}
          {getBudgetAdvice().length > 0 && (
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">💡 Budget Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {getBudgetAdvice().map((tip, index) => (
                    <li key={index} className="text-blue-600 dark:text-blue-400">• {tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={startChallenge}
            disabled={remaining !== 0}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
          >
            Start Challenge
          </Button>
        </div>
      )}

      {gameStep === 'events' && currentEvent < events.length && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Unexpected Event #{currentEvent + 1}</CardTitle>
            <CardDescription>How will you handle this situation?</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">{events[currentEvent].text}</p>
            <p className="text-2xl font-bold text-red-600">Cost: ${events[currentEvent].cost}</p>
            <p className="text-sm text-muted-foreground">
              Your {events[currentEvent].category} budget: ${((allocations[events[currentEvent].category] / 100) * monthlyIncome).toFixed(0)}
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button 
                onClick={() => handleEvent(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Accept (-${events[currentEvent].cost})
              </Button>
              <Button 
                onClick={() => handleEvent(false)}
                variant="outline"
              >
                Decline (Save Money)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {gameStep === 'results' && (
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Challenge Complete!</CardTitle>
            <CardDescription>Here's how you did</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
              {finalScore}
            </div>
            <p className="text-xl">points earned</p>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Performance</p>
              {finalScore >= 80 ? (
                <p className="text-green-600 dark:text-green-400 font-semibold">Excellent budgeting skills! 🎉</p>
              ) : finalScore >= 60 ? (
                <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Good job! Room for improvement 👍</p>
              ) : (
                <p className="text-red-600 dark:text-red-400 font-semibold">Keep practicing! 💪</p>
              )}
            </div>
            <Button onClick={onBack} className="mt-4">
              Play Another Game
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BudgetChallengeGame;
