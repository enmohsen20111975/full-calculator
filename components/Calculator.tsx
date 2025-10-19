import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import Button from './ui/Button';

interface HistoryItem {
  expression: string;
  result: string;
}

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [ans, setAns] = useState('');
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleInput = (value: string) => {
    setExpression((prev) => prev + value);
  };

  const calculate = () => {
    try {
      if (!expression) return;
      const evalResult = math.evaluate(expression);
      const formattedResult = math.format(evalResult, { notation: 'auto', precision: 14 });
      setResult(formattedResult);
      setAns(formattedResult);
      // Add to history, keeping the list to a reasonable size (e.g., 20)
      setHistory(prev => [{ expression, result: formattedResult }, ...prev].slice(0, 20));
    } catch (error) {
      setResult('Error');
    }
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const memoryClear = () => setMemory(0);
  const memoryRecall = () => setExpression((prev) => prev + memory.toString());
  const memoryAdd = () => {
    try {
      const currentVal = math.evaluate(expression || '0');
      setMemory((prev) => prev + currentVal);
    } catch (e) {
      setResult('Error');
    }
  };
  const memorySubtract = () => {
     try {
      const currentVal = math.evaluate(expression || '0');
      setMemory((prev) => prev - currentVal);
    } catch (e) {
      setResult('Error');
    }
  };

  const restoreFromHistory = (item: HistoryItem) => {
    setExpression(item.expression);
    setResult(item.result);
    setShowHistory(false);
  }

  const clearHistory = () => {
      setHistory([]);
  }
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.key >= '0' && event.key <= '9') || ['+','-','*','/','^','.','(',')', 'e', 'E'].includes(event.key)) {
        handleInput(event.key);
      } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
      } else if (event.key === 'Backspace') {
        backspace();
      } else if (event.key === 'Escape') {
        clear();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [calculate]);


  const buttons = [
    '(', ')', '^', 'e',
    'sin(', 'cos(', 'tan(', 'log(',
    'MC', 'MR', 'M+', 'M-',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'ANS', '+',
  ];

  const handleButtonClick = (btn: string) => {
    switch(btn) {
        case 'MC': memoryClear(); break;
        case 'MR': memoryRecall(); break;
        case 'M+': memoryAdd(); break;
        case 'M-': memorySubtract(); break;
        case 'ANS': handleInput(ans); break;
        default: handleInput(btn);
    }
  }

  const getButtonVariant = (btn: string): 'primary' | 'secondary' | 'operator' | 'function' => {
      if (['/', '*', '-', '+', '^', '(', ')'].includes(btn)) return 'operator';
      if (isNaN(parseInt(btn)) && btn !== '.') return 'function';
      return 'secondary';
  }

  return (
    <div className="space-y-4 relative">
      <div className="bg-slate-900/50 p-4 rounded-md text-right border border-slate-600">
        <div className="text-slate-400 h-6 truncate">{expression || '0'}</div>
        <div className="text-white text-3xl font-bold h-10">{result}</div>
      </div>
      
      {showHistory && (
        <div className="absolute top-0 left-0 right-0 bg-slate-800 p-3 rounded-md shadow-lg z-10 border border-slate-600 space-y-2 max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-white">Calculation History</h4>
                <Button variant="secondary" onClick={clearHistory} className="py-1 px-2 text-xs">Clear</Button>
            </div>
            <ul className="space-y-1">
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <li 
                            key={index} 
                            onClick={() => restoreFromHistory(item)}
                            className="p-2 rounded-md hover:bg-slate-700 cursor-pointer text-sm transition-colors"
                        >
                            <div className="text-slate-400 truncate text-right">{item.expression} =</div>
                            <div className="text-white font-semibold text-right text-lg">{item.result}</div>
                        </li>
                    ))
                ) : (
                    <p className="text-slate-500 text-center py-4">No history yet.</p>
                )}
            </ul>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        <Button variant="secondary" onClick={clear}>C</Button>
        <Button variant="secondary" onClick={backspace}>⌫</Button>
        <Button variant="secondary" className="col-span-2" onClick={() => setShowHistory(s => !s)}>
            History 🕒
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button 
            key={btn} 
            variant={getButtonVariant(btn)}
            onClick={() => handleButtonClick(btn)}>
            {btn}
          </Button>
        ))}
        <Button variant="primary" className="col-span-4 text-2xl" onClick={calculate}>=</Button>
      </div>
    </div>
  );
};

export default Calculator;