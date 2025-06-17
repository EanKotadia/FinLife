
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Heart, Brain, Smile } from 'lucide-react';

export interface Decision {
  id: string;
  title: string;
  description: string;
  options: DecisionOption[];
}

export interface DecisionOption {
  id: string;
  text: string;
  effects: {
    money?: number;
    happiness?: number;
    health?: number;
    financialIQ?: number;
  };
  consequence: string;
}

interface DecisionCardProps {
  decision: Decision;
  onChoose: (option: DecisionOption) => void;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision, onChoose }) => {
  const formatEffect = (key: string, value: number) => {
    const isPositive = value > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const color = isPositive ? 'text-financial-money' : 'text-financial-loss';
    
    let label = '';
    let iconComponent = null;
    
    switch (key) {
      case 'money':
        label = new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          signDisplay: 'always'
        }).format(value);
        iconComponent = <DollarSign className="w-3 h-3" />;
        break;
      case 'happiness':
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <Smile className="w-3 h-3" />;
        break;
      case 'health':
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <Heart className="w-3 h-3" />;
        break;
      case 'financialIQ':
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <Brain className="w-3 h-3" />;
        break;
      default:
        label = `${value > 0 ? '+' : ''}${value}%`;
        iconComponent = <Icon className="w-3 h-3" />;
        break;
    }
    
    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color} ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
        {iconComponent}
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 animate-fade-in border border-gray-100">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">🤔</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800">{decision.title}</h3>
        <p className="text-gray-600 leading-relaxed">{decision.description}</p>
      </div>
      
      <div className="space-y-4">
        {decision.options.map((option, index) => (
          <div
            key={option.id}
            className="group relative bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => onChoose(option)}
          >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{String.fromCharCode(65 + index)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-lg mb-2">
                {option.text}
              </p>
              <p className="text-sm text-gray-600 italic leading-relaxed">{option.consequence}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(option.effects).map(([key, value]) => (
                <div key={key}>
                  {formatEffect(key, value)}
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-200 font-medium"
            >
              Choose This Path
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionCard;
