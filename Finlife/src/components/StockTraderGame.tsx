
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 305.15 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.60 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 125.30 },
];

interface StockTraderGameProps {
  onGameComplete: (score: number) => void;
  onBack: () => void;
}

const StockTraderGame = ({ onGameComplete, onBack }: StockTraderGameProps) => {
  const [gameState, setGameState] = useState({
    cash: 10000,
    portfolio: {} as Record<string, number>,
    timeLeft: 180, // 3 minutes
    gameActive: true,
    trades: 0
  });
  
  const [stockPrices, setStockPrices] = useState(stocks);
  const [priceHistory, setPriceHistory] = useState<Record<string, number[]>>({});

  useEffect(() => {
    // Initialize price history
    const initialHistory: Record<string, number[]> = {};
    stocks.forEach(stock => {
      initialHistory[stock.symbol] = [stock.price];
    });
    setPriceHistory(initialHistory);

    // Timer
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          const portfolioValue = calculatePortfolioValue();
          const finalScore = Math.round(prev.cash + portfolioValue - 10000);
          onGameComplete(finalScore);
          return { ...prev, timeLeft: 0, gameActive: false };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    // Price updates
    const priceTimer = setInterval(() => {
      setStockPrices(prev => prev.map(stock => {
        const change = (Math.random() - 0.5) * stock.price * 0.02; // ±2% change
        const newPrice = Math.max(stock.price + change, stock.price * 0.5);
        return { ...stock, price: Number(newPrice.toFixed(2)) };
      }));
      
      setPriceHistory(prev => {
        const newHistory = { ...prev };
        stockPrices.forEach(stock => {
          if (!newHistory[stock.symbol]) newHistory[stock.symbol] = [];
          newHistory[stock.symbol] = [...newHistory[stock.symbol].slice(-20), stock.price];
        });
        return newHistory;
      });
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(priceTimer);
    };
  }, []);

  const calculatePortfolioValue = () => {
    return Object.entries(gameState.portfolio).reduce((total, [symbol, shares]) => {
      const stock = stockPrices.find(s => s.symbol === symbol);
      return total + (stock ? stock.price * shares : 0);
    }, 0);
  };

  const buyStock = (symbol: string, price: number) => {
    if (gameState.cash >= price) {
      setGameState(prev => ({
        ...prev,
        cash: prev.cash - price,
        portfolio: {
          ...prev.portfolio,
          [symbol]: (prev.portfolio[symbol] || 0) + 1
        },
        trades: prev.trades + 1
      }));
    }
  };

  const sellStock = (symbol: string, price: number) => {
    if (gameState.portfolio[symbol] && gameState.portfolio[symbol] > 0) {
      setGameState(prev => ({
        ...prev,
        cash: prev.cash + price,
        portfolio: {
          ...prev.portfolio,
          [symbol]: prev.portfolio[symbol] - 1
        },
        trades: prev.trades + 1
      }));
    }
  };

  const getPriceChange = (symbol: string) => {
    const history = priceHistory[symbol];
    if (!history || history.length < 2) return 0;
    return history[history.length - 1] - history[history.length - 2];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const portfolioValue = calculatePortfolioValue();
  const totalValue = gameState.cash + portfolioValue;
  const profit = totalValue - 10000;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">← Back to Games</Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Stock Trader</h1>
          <p className="text-muted-foreground">Make smart trades to maximize profit!</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Clock className="w-5 h-5" />
            {formatTime(gameState.timeLeft)}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-muted-foreground">Cash</p>
            <p className="text-xl font-bold">${gameState.cash.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-muted-foreground">Portfolio</p>
            <p className="text-xl font-bold">${portfolioValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-xl font-bold">${totalValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            {profit >= 0 ? 
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" /> :
              <TrendingDown className="w-6 h-6 mx-auto mb-2 text-red-600" />
            }
            <p className="text-sm text-muted-foreground">P&L</p>
            <p className={`text-xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profit >= 0 ? '+' : ''}${profit.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Market */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stockPrices.map((stock) => {
          const change = getPriceChange(stock.symbol);
          const owned = gameState.portfolio[stock.symbol] || 0;
          
          return (
            <Card key={stock.symbol} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                    <CardDescription className="text-xs">{stock.name}</CardDescription>
                  </div>
                  {change !== 0 && (
                    <div className={`flex items-center gap-1 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(change).toFixed(2)}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
                    {owned > 0 && (
                      <p className="text-sm text-muted-foreground">Owned: {owned} shares</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => buyStock(stock.symbol, stock.price)}
                      disabled={!gameState.gameActive || gameState.cash < stock.price}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      Buy
                    </Button>
                    <Button
                      onClick={() => sellStock(stock.symbol, stock.price)}
                      disabled={!gameState.gameActive || owned === 0}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      size="sm"
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StockTraderGame;
