import React from 'react';
import { PixelState, GridPattern } from '../types';
import { GRID_ROWS, GRID_COLS } from '../perceptron/paterns';

interface GridInputProps {
  grid: GridPattern;
  onCellClick: (row: number, col: number) => void;
  readOnly?: boolean;
}

const GridInput: React.FC<GridInputProps> = ({ grid, onCellClick, readOnly = false }) => {
  const cellStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    border: '1px solid #ccc',
    display: 'inline-block',
    margin: '2px',
    cursor: readOnly ? 'default' : 'pointer',
    textAlign: 'center',
    lineHeight: '30px',
    userSelect: 'none',
  };

  const getCellStyle = (pixel: PixelState): React.CSSProperties => ({
    ...cellStyle,
    backgroundColor: pixel === 1 ? '#129990' : '#eee',
    color: pixel === 1 ? '#fff' : '#333',
  });

  return (
    <div style={{ display: 'inline-block', border: '1px solid black', padding: '5px' }}>
      {Array.from({ length: GRID_ROWS }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {Array.from({ length: GRID_COLS }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={getCellStyle(grid[rowIndex]?.[colIndex] || 0)}
              onClick={() => !readOnly && onCellClick(rowIndex, colIndex)}
            >
              {/* Opicional: {grid[rowIndex]?.[colIndex] || 0} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridInput;