import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';
import Button from './ui/Button';

// Initialize mathjs instance
const math = create(all);

interface HistoryItem {
  expression: string;
  result: string;
}

interface CalculatorProps {
    expression: string;
    setExpression: (value: string | ((prev: string) => string)) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ expression, setExpression }) => {
  const [result, setResult] = useState('');
  const [ans, setAns] = useState('');
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const [isShifted, setIsShifted] = useState(false);
  const [angleMode, setAngleMode] = useState<'rad' | 'deg'>('rad');

  const handleInput = (value: string) => {
    setExpression((prev) => prev + value);
    if (isShifted) setIsShifted(false);
  };

  const calculate = () => {
    try {
      if (!expression) return;
      let scope = {};
      
      if (angleMode === 'deg') {
        const degToRad = (deg: number) => deg * (Math.PI / 180);
        const radToDeg = (rad: number) => rad * (180 / Math.PI);

        scope = {
            sin: (x: number) => Math.sin(degToRad(x)),
            cos: (x: number) => Math.cos(degToRad(x)),
            tan: (x: number) => Math.tan(degToRad(x)),
            asin: (x: number) => radToDeg(Math.asin(x)),
            acos: (x: number) => radToDeg(Math.acos(x)),
            atan: (x: number) => radToDeg(Math.atan(x)),
        };
      }
      
      const evalResult = math.evaluate(expression, scope);
      const formattedResult = math.format(evalResult, { notation: 'auto', precision: 14 });
      setResult(formattedResult);
      setAns(formattedResult);
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
      if ((event.key >= '0' && event.key <= '9') || ['+','-','*','/','^','.','(',')', 'e', 'E', 'p', 'i'].includes(event.key)) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculate]);

  const buttons = [
    // display, value, type
    { display: 'Shift', value: 'shift', type: 'action' },
    { display: angleMode.toUpperCase(), value: 'angle', type: 'action' },
    { display: '(', value: '(', type: 'op' },
    { display: ')', value: ')', type: 'op' },
    { display: '⌫', value: 'backspace', type: 'action' },
    
    { display: isShifted ? 'x³' : 'x²', value: isShifted ? '^3' : '^2', type: 'func' },
    { display: isShifted ? '³√' : '√', value: isShifted ? 'cbrt(' : 'sqrt(', type: 'func' },
    { display: isShifted ? 'ʸ√x' : 'xʸ', value: isShifted ? 'nthRoot(' : '^', type: 'op' },
    { display: 'x!', value: '!', type: 'func' },
    { display: 'C', value: 'clear', type: 'action' },

    { display: isShifted ? 'asin' : 'sin', value: isShifted ? 'asin(' : 'sin(', type: 'func' },
    { display: isShifted ? 'acos' : 'cos', value: isShifted ? 'acos(' : 'cos(', type: 'func' },
    { display: isShifted ? 'atan' : 'tan', value: isShifted ? 'atan(' : 'tan(', type: 'func' },
    { display: isShifted ? '10ˣ' : 'log', value: isShifted ? '10^' : 'log10(', type: 'func' },
    { display: isShifted ? 'eˣ' : 'ln', value: isShifted ? 'exp(' : 'log(', type: 'func' },
    
    { display: '7', value: '7', type: 'num' },
    { display: '8', value: '8', type: 'num' },
    { display: '9', value: '9', type: 'num' },
    { display: '÷', value: '/', type: 'op' },
    { display: 'MC', value: 'mc', type: 'mem' },

    { display: '4', value: '4', type: 'num' },
    { display: '5', value: '5', type: 'num' },
    { display: '6', value: '6', type: 'num' },
    { display: '×', value: '*', type: 'op' },
    { display: 'MR', value: 'mr', type: 'mem' },

    { display: '1', value: '1', type: 'num' },
    { display: '2', value: '2', type: 'num' },
    { display: '3', value: '3', type: 'num' },
    { display: '-', value: '-', type: 'op' },
    { display: 'M+', value: 'm+', type: 'mem' },
    
    { display: '0', value: '0', type: 'num' },
    { display: '.', value: '.', type: 'num' },
    { display: 'ANS', value: 'ans', type: 'action' },
    { display: '+', value: '+', type: 'op' },
    { display: 'M-', value: 'm-', type: 'mem' },
    
    { display: 'π', value: 'pi', type: 'num' },
    { display: 'e', value: 'e', type: 'num' },
    { display: 'History', value: 'history', type: 'action', className: 'col-span-1 sm:col-span-2' },
    { display: '=', value: 'calc', type: 'action', className: 'col-span-2 sm:col-span-1' },
  ];

  const handleButtonClick = (btn: typeof buttons[0]) => {
    switch(btn.value) {
        case 'shift': setIsShifted(s => !s); break;
        case 'angle': setAngleMode(m => m === 'rad' ? 'deg' : 'rad'); break;
        case 'clear': clear(); break;
        case 'backspace': backspace(); break;
        case 'mc': memoryClear(); break;
        case 'mr': memoryRecall(); break;
        case 'm+': memoryAdd(); break;
        case 'm-': memorySubtract(); break;
        case 'ans': handleInput(ans); break;
        case 'history': setShowHistory(s => !s); break;
        case 'calc': calculate(); break;
        default: handleInput(btn.value);
    }
  }

  const getButtonVariant = (btn: typeof buttons[0]): 'primary' | 'secondary' | 'operator' | 'function' => {
    if (btn.value === 'calc') return 'primary';
    if (btn.type === 'op') return 'operator';
    if (btn.type === 'num' || btn.type === 'mem') return 'secondary';
    // for func and action
    if (btn.value === 'shift' && isShifted) return 'primary';
    return 'function';
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

      <div className="grid grid-cols-5 gap-2">
        {buttons.map((btn, index) => (
          <Button 
            key={index} 
            variant={getButtonVariant(btn)}
            onClick={() => handleButtonClick(btn)}
            className={`${btn.className || ''}`}
          >
            {btn.display}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;