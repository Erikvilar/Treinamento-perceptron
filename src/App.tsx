import React, { useState, useEffect, useCallback } from 'react';
import { GridPattern, PixelState, PerceptronModel, TrainingSample, Weights } from './types';
import GridInput from './components/GridInput';
import {
  digitPatterns,
  GRID_ROWS,
  GRID_COLS,
  flattenGridWithBias,
  NUM_FEATURES
} from "./perceptron/paterns";
import {
  trainSinglePerceptron,
  calculateNetInput,
  activationFunction,
  THRESHOLD,
} from './perceptron/perceptron';
import './App.css'; 

const initialGrid = (): GridPattern =>
  Array(GRID_ROWS)
    .fill(null)
    .map(() => Array(GRID_COLS).fill(0 as PixelState));

const App: React.FC = () => {
  const [userGrid, setUserGrid] = useState<GridPattern>(initialGrid());
  const [trainedModels, setTrainedModels] = useState<PerceptronModel[]>([]);
  const [prediction, setPrediction] = useState<string>('Nenhuma predição ainda.');
  const [trainingStatus, setTrainingStatus] = useState<string>('Modelos não treinados.');
  const [isTraining, setIsTraining] = useState<boolean>(false);

  const handleCellClick = (row: number, col: number) => {
    setUserGrid((prevGrid) => {
      const newGrid = prevGrid.map((r, rIndex) =>
        rIndex === row ? r.map((c, cIndex) => (cIndex === col ? (c === 0 ? 1 : 0) : c)) : r
      );
      return newGrid;
    });
  };

  const handleTrainModels = useCallback(async () => {
    setIsTraining(true);
    setTrainingStatus('Treinando modelos...');
    setPrediction('Aguardando novos dados após o treinamento...');

    // Simula um delay para UX, o treinamento é rápido aqui
    await new Promise(resolve => setTimeout(resolve, 100));

    const models: PerceptronModel[] = [];
    let totalEpochsAllModels = 0;

    for (const modelPattern of digitPatterns) {
      const digitToTrain = modelPattern.digit;
      setTrainingStatus(`Treinando Perceptron para o dígito ${digitToTrain}...`);
      
      // Prepara o conjunto de treinamento para este perceptron (One-vs-Rest)
      const trainingSetForCurrentDigit: TrainingSample[] = digitPatterns.map(dp => ({
        inputVector: flattenGridWithBias(dp.pattern),
        target: dp.digit === digitToTrain ? 1 : -1,
      }));

      const { trainedWeights, epochs } = trainSinglePerceptron(trainingSetForCurrentDigit);
      models.push({ digit: digitToTrain, weights: trainedWeights, epochsToTrain: epochs });
      totalEpochsAllModels += epochs;
      console.log(`Perceptron para dígito ${digitToTrain} treinado em ${epochs} épocas.`);
    }

    setTrainedModels(models);
    setIsTraining(false);
    setTrainingStatus(`Padrões em patterns.ts treinados (Total de épocas agregadas: ${totalEpochsAllModels})`);
  }, []);

  const handlePredict = () => {
    if (trainedModels.length === 0) {
      setPrediction('Por favor, treine os modelos primeiro.');
      return;
    }

    const inputVector = flattenGridWithBias(userGrid);
    let bestMatchDigit: number | null = null;
    let maxActivationScore = -Infinity; // Usaremos o y_ent bruto para desempate

    console.log("Input vector para predição:", inputVector);

    trainedModels.forEach(model => {
      const y_ent = calculateNetInput(inputVector, model.weights);
      const output_f = activationFunction(y_ent, THRESHOLD); // Usamos para checar se é um candidato
      
      console.log(`Modelo ${model.digit}: y_ent = ${y_ent.toFixed(2)}, f(y_ent) = ${output_f}`);

      // Na estratégia One-vs-Rest, o "vencedor" é aquele com a maior pontuação de ativação (y_ent)
      // E que idealmente resultaria em uma saída '1' pela função de ativação.
      if (y_ent > maxActivationScore) {
        maxActivationScore = y_ent;
        bestMatchDigit = model.digit;
      }
    });
    
    // Verificamos se o "melhor" realmente teve uma ativação positiva forte
    if (bestMatchDigit !== null && activationFunction(maxActivationScore, THRESHOLD) === 1) {
        setPrediction(`Predição: ${bestMatchDigit} (Score: ${maxActivationScore.toFixed(2)})`);
    } else if (bestMatchDigit !== null && activationFunction(maxActivationScore, THRESHOLD) === 0) {
        setPrediction(`Predição: ? (Incerto, mais próximo de ${bestMatchDigit}, mas na zona neutra. Score: ${maxActivationScore.toFixed(2)})`);
    }
     else {
        setPrediction(`Predição: ? (Nenhum dígito reconhecido com clareza. Mais próximo de ${bestMatchDigit}, score: ${maxActivationScore.toFixed(2)})`);
    }
  };

  const handleClearGrid = () => {
    setUserGrid(initialGrid());
    setPrediction('Grade limpa.');
  };

  return (
    <div className="App">
      <h1>Reconhecedor de Dígitos com Perceptron</h1>
      <div className="controls">
        <button onClick={handleTrainModels} disabled={isTraining}>
          {isTraining ? 'Iniciando...' : 'Iniciar '} 
        </button>
        <p>{trainingStatus}</p>
      </div>

      <div className="main-content">
        <div className="grid-container">
          <h2>Desenhe um dígito (5x3):</h2>
          <GridInput grid={userGrid} onCellClick={handleCellClick} />
          <div className="grid-actions">
            <button onClick={handlePredict} disabled={trainedModels.length === 0 || isTraining}>
              Analisar Desenho
            </button>
            <button onClick={handleClearGrid}>Limpar Grade</button>
          </div>
          <h3>{prediction}</h3>
        </div>

        <div className="trained-patterns-display">
          <h2>Padrões de Treinamento:</h2>
          <div className="patterns-grid">
            {digitPatterns.map(dp => (
              <div key={dp.digit} className="pattern-item">
                <span>Dígito: {dp.digit}</span>
                <GridInput grid={dp.pattern} onCellClick={() => {}} readOnly={true} />
                {trainedModels.find(m => m.digit === dp.digit) && (
                   <small>Treinado em {trainedModels.find(m => m.digit === dp.digit)?.epochsToTrain} épocas</small>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;