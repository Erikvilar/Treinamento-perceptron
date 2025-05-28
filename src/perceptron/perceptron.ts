import { Weights, TrainingSample, GridPattern } from '../types';
import { NUM_FEATURES, flattenGridWithBias } from "./paterns";

export const LEARNING_RATE = 0.1;
export const THRESHOLD = 0.0; 
export const MAX_EPOCHS = 200; 

// Função Somatório (entrada líquida)
export const calculateNetInput = (inputs: number[], weights: Weights): number => {
  let y_ent = 0;
  for (let i = 0; i < NUM_FEATURES; i++) {
    y_ent += (inputs[i] || 0) * (weights[i] || 0);
  }
  return y_ent;
};

// Função de Ativação
export const activationFunction = (y_ent: number, threshold: number): 1 | -1 | 0 => {
  if (y_ent > threshold) return 1;
  if (y_ent < -threshold) return -1;
  return 0;
};

// Atualização de Pesos
export const updateWeights = (
  currentWeights: Weights,
  inputs: number[],
  error: number,
  learningRate: number
): Weights => {
  const newWeights = [...currentWeights];
  for (let i = 0; i < NUM_FEATURES; i++) {
    newWeights[i] = (newWeights[i] || 0) + learningRate * error * (inputs[i] || 0);
  }
  return newWeights;
};

// Treinamento de um único Perceptron
export const trainSinglePerceptron = (
  trainingSet: TrainingSample[],
  initialWeights?: Weights
): { trainedWeights: Weights; epochs: number } => {
  let weights = initialWeights || Array(NUM_FEATURES).fill(0);
  let epochs = 0;
  let weightsChangedInEpoch;

  do {
    weightsChangedInEpoch = false;
    epochs++;

    for (const sample of trainingSet) {
      const y_ent = calculateNetInput(sample.inputVector, weights);
      const output = activationFunction(y_ent, THRESHOLD);
      const error = sample.target - output;

      if (error !== 0) {
        weights = updateWeights(weights, sample.inputVector, error, LEARNING_RATE);
        weightsChangedInEpoch = true;
      }
    }
  } while (weightsChangedInEpoch && epochs < MAX_EPOCHS);

  return { trainedWeights: weights, epochs };
};