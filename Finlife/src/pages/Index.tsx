
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '@/components/ui/sidebar';
import GameSidebar from '@/components/GameSidebar';
import PlayerStats from '@/components/PlayerStats';
import DecisionCard from '@/components/DecisionCard';
import OutcomeDisplay from '@/components/OutcomeDisplay';
import { useGameData } from '@/hooks/useGameData';

const Index = () => {
  const {
    gameState,
    currentDecision,
    showOutcome,
    lastChoice,
    makeDecision,
    continueGame
  } = useGameData();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex w-full">
          <GameSidebar />
          
          <main className="flex-1 p-4 overflow-auto">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8 animate-fade-in">
                <div className="mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-4xl font-bold text-white">₿</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-2">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    FinLife
                  </span>
                </h1>
                <p className="text-muted-foreground text-xl font-medium mb-2">
                  Your Financial Story Unfolds
                </p>
                <p className="text-muted-foreground text-sm">
                  Make Smart Choices • Build Your Future • Live Your Best Life
                </p>
                
                {/* Game Status Bar */}
                <div className="mt-6 bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border shadow-lg">
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-muted-foreground font-medium">Game Active</span>
                    </div>
                    <div className="w-px h-4 bg-border"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Session:</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">23 min</span>
                    </div>
                    <div className="w-px h-4 bg-border"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Decisions:</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">{gameState.age - 16}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Stats */}
              <PlayerStats 
                age={gameState.age}
                money={gameState.money}
                happiness={gameState.happiness}
                health={gameState.health}
                financialIQ={gameState.financialIQ}
              />

              {/* Game Content */}
              <div className="mb-8">
                {showOutcome && lastChoice ? (
                  <OutcomeDisplay
                    option={lastChoice}
                    onContinue={continueGame}
                  />
                ) : currentDecision ? (
                  <DecisionCard
                    decision={currentDecision}
                    onChoose={makeDecision}
                  />
                ) : (
                  <div className="bg-gradient-to-br from-card to-muted/50 rounded-2xl shadow-xl p-8 text-center border border-border animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-foreground">Year Complete!</h3>
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                      Another year of your financial journey is behind you.<br/>
                      New opportunities and challenges await ahead!
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                      <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                        🎯 <strong>Pro Tip:</strong> Check the tutorials section for expert strategies!
                      </p>
                    </div>
                    <button
                      onClick={continueGame}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
                    >
                      Start Next Year →
                    </button>
                  </div>
                )}
              </div>

              {/* Progress indicator */}
              <div className="bg-gradient-to-r from-card to-muted/50 rounded-2xl shadow-lg p-6 border border-border">
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="font-medium">Life Progress: Age {gameState.age} of 65</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{Math.round(((gameState.age - 16) / (65 - 16)) * 100)}%</span>
                    <span>Complete</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500 ease-out" 
                    style={{ width: `${((gameState.age - 16) / (65 - 16)) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Teen Years</span>
                  <span>Retirement</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
