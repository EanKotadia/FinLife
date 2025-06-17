
import React from 'react';
import { CheckCircle, TrendingUp, TrendingDown, DollarSign, Heart, Brain, Smile, Star } from 'lucide-react';
import { DecisionOption } from './DecisionCard';

interface OutcomeDisplayProps {
  option: DecisionOption;
  onContinue: () => void;
}

const OutcomeDisplay: React.FC<OutcomeDisplayProps> = ({ option, onContinue }) => {
  const formatEffect = (key: string, value: number) => {
    const isPositive = value > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    const color = isPositive ? 'text-financial-money' : 'text-financial-loss';
    const bgColor = isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    
    let label = '';
    let iconComponent = null;
    let statName = '';
    
    switch (key) {
      case 'money':
        label = new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          signDisplay: 'always'
        }).format(value);
        iconComponent = <DollarSign className="w-5 h-5" />;
        statName = 'Net Worth';
        break;
      case 'happiness':
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <Smile className="w-5 h-5" />;
        statName = 'Happiness';
        break;
      case 'health':
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <Heart className="w-5 h-5" />;
        statName = 'Health';
        break;
      case 'financialIQ':
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <Brain className="w-5 h-5" />;
        statName = 'Financial IQ';
        break;
      default:
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <TrendIcon className="w-5 h-5" />;
        statName = key;
        break;
    }
    
    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl border-2 ${bgColor} ${color} transition-all duration-300 hover:scale-105`}>
        <div className="flex items-center gap-2">
          {iconComponent}
          <TrendIcon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg">{label}</p>
          <p className="text-sm opacity-80">{statName}</p>
        </div>
      </div>
    );
  };

  const getRandomEmoji = () => {
    const emojis = ['🎉', '💫', '⭐', '🚀', '💎', '🏆', '🎯', '💪'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 animate-scale-in border border-gray-100">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-success">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-6 h-6 text-yellow-500" />
          <h3 className="text-2xl font-bold text-gray-800">Decision Complete!</h3>
          <Star className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-lg text-gray-600">Life moves forward {getRandomEmoji()}</p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-200">
        <div className="text-center mb-4">
          <h4 className="font-bold text-gray-800 text-lg mb-2">Your Choice:</h4>
          <p className="text-gray-700 font-medium text-lg mb-3">"{option.text}"</p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-3"></div>
          <p className="text-gray-600 italic leading-relaxed">"{option.consequence}"</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-bold text-gray-800 mb-4 text-center text-lg">Life Changes:</h4>
        <div className="space-y-3">
          {Object.entries(option.effects).map(([key, value]) => (
            <div key={key} className="animate-fade-in">
              {formatEffect(key, value)}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">Continue Your Journey</span>
          <span className="text-xl">→</span>
        </div>
      </button>
    </div>
  );
};

export default OutcomeDisplay;
