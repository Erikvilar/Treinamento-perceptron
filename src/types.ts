

export type PixelState = 0 | 1;
export type GridPattern = PixelState[][]; 
export type Weights = number[];


/**
 * @Autor Erik Vilar
 */

export interface PerceptronModel {
  digit: number; 
  weights: Weights;
  epochsToTrain: number;
}

export interface TrainingSample {
  inputVector: number[]; 
  target: 1 | -1;    
}