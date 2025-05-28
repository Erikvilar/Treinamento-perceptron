import { GridPattern } from '../types';

export const GRID_ROWS = 5;
export const GRID_COLS = 3;
export const NUM_FEATURES = GRID_ROWS * GRID_COLS + 1; 


export const digitPatterns: { digit: number, pattern: GridPattern }[] = [
    /**@types 0 a 9 padrões esperados */
  {
    digit: 0,
    pattern: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    digit: 1,
    pattern: [
      [0, 1, 0],
      [1, 1, 0], 
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0], 
    ],
  },
  {
    digit: 2,
    pattern: [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  {
    digit: 3,
    pattern: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    digit: 4,
    pattern: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
  },
  {
    digit: 5,
    pattern: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    digit: 6,
    pattern: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    digit: 7,
    pattern: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  },
  {
    digit: 8,
    pattern: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    digit: 9,
    pattern: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1], 
    ],
  },
];

export const flattenGridWithBias = (grid: GridPattern): number[] => {
  const flat: number[] = [1]; // Bias term
  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {
      flat.push(grid[i]?.[j] || 0); 
    }
  }
  return flat;
};