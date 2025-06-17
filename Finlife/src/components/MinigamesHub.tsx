
import React from 'react';
import { Gamepad2, TrendingUp, Calculator, Brain, Trophy, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const minigames = [
  {
    id: 'stock-trader',
    title: 'Stock Trader',
    description: 'Test your trading skills in this fast-paced stock market simulator',
    icon: TrendingUp,
    difficulty: 'Medium',
    reward: '+50 Financial IQ',
    color: 'from-green-500 to-emerald-600',
    playTime: '3-5 min'
  },
  {
    id: 'budget-challenge',
    title: 'Budget Challenge',
    description: 'Can you balance your monthly budget and save money?',
    icon: Calculator,
    difficulty: 'Easy',
    reward: '+25 Financial IQ',
    color: 'from-blue-500 to-cyan-600',
    playTime: '2-4 min'
  },
  {
    id: 'investment-quiz',
    title: 'Investment Quiz',
    description: 'Answer financial questions to boost your knowledge',
    icon: Brain,
    difficulty: 'Hard',
    reward: '+75 Financial IQ',
    color: 'from-purple-500 to-violet-600',
    playTime: '5-7 min'
  }
];

interface MinigamesHubProps {
  onPlayGame: (gameId: string) => void;
}

const MinigamesHub = ({ onPlayGame }: MinigamesHubProps) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce">
          <Gamepad2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Financial Minigames
        </h1>
        <p className="text-muted-foreground text-lg">
          Boost your Financial IQ while having fun!
        </p>
      </div>

      {/* Daily Challenge */}
      <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <div>
              <CardTitle className="text-yellow-800 dark:text-yellow-200">Daily Challenge</CardTitle>
              <CardDescription className="text-yellow-700 dark:text-yellow-300">
                Complete today's challenge for bonus rewards!
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">2x Rewards</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Master Trader Challenge</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Make 5 profitable trades in Stock Trader</p>
            </div>
            <Button 
              onClick={() => onPlayGame('stock-trader')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Start Challenge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Minigames Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {minigames.map((game) => (
          <Card key={game.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <CardHeader className="pb-3">
              <div className={`w-16 h-16 bg-gradient-to-br ${game.color} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow`}>
                <game.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-center text-xl">{game.title}</CardTitle>
              <CardDescription className="text-center text-sm">
                {game.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className={`font-semibold ${
                    game.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400' :
                    game.difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Play Time:</span>
                  <span className="font-semibold">{game.playTime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Reward:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{game.reward}</span>
                </div>
                <Button 
                  onClick={() => onPlayGame(game.id)}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Play Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            Top Players This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Alex Johnson', score: '2,450 pts', avatar: '👑' },
              { rank: 2, name: 'Sarah Chen', score: '2,180 pts', avatar: '🥈' },
              { rank: 3, name: 'Mike Rodriguez', score: '1,920 pts', avatar: '🥉' },
              { rank: 4, name: 'You', score: '1,680 pts', avatar: '🎯' },
            ].map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{player.avatar}</span>
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-sm text-muted-foreground">Rank #{player.rank}</p>
                  </div>
                </div>
                <span className="font-bold text-blue-600 dark:text-blue-400">{player.score}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinigamesHub;
