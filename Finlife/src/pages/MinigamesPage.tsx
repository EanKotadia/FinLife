
import React, { useState } from 'react';
import MinigamesHub from '@/components/MinigamesHub';
import StockTraderGame from '@/components/StockTraderGame';
import BudgetChallengeGame from '@/components/BudgetChallengeGame';

const MinigamesPage = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);

  const handlePlayGame = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    // You could add logic here to update player stats, save scores, etc.
    console.log(`Game completed with score: ${score}`);
  };

  const handleBackToHub = () => {
    setCurrentGame(null);
  };

  const renderGame = () => {
    switch (currentGame) {
      case 'stock-trader':
        return (
          <StockTraderGame 
            onGameComplete={handleGameComplete}
            onBack={handleBackToHub}
          />
        );
      case 'budget-challenge':
        return (
          <BudgetChallengeGame 
            onGameComplete={handleGameComplete}
            onBack={handleBackToHub}
          />
        );
      case 'investment-quiz':
        // Placeholder for future implementation
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Investment Quiz</h2>
            <p className="text-muted-foreground mb-4">Coming soon!</p>
            <button 
              onClick={handleBackToHub}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Back to Games
            </button>
          </div>
        );
      default:
        return <MinigamesHub onPlayGame={handlePlayGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      {renderGame()}
    </div>
  );
};

export default MinigamesPage;
