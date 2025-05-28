# Treinamento de Perceptron
## Digitos de (0-9) React & TypeScript


[![Perceptron Training](https://img.shields.io/badge/Perceptron%20Training-Active-informational)](URL_PARA_SEU_PROJETO_OU_EXPLICAÇÃO)
[![Machine Learning](https://img.shields.io/badge/Machine%20Learning-%F0%9F%A4%96-orange)](URL_PARA_SEU_PROJETO_OU_EXPLICAÇÃO)
[![Open Source](https://img.shields.io/badge/Open%20Source-%F0%9F%90%B3-brightgreen)](URL_DO_SEU_REPOSITORIO_OU_LICENCA)
[![AI Training](https://img.shields.io/badge/AI%20Training-%F0%9F%A7%A0-blueviolet)](URL_PARA_SEU_PROJETO_OU_EXPLICAÇÃO)
# --------------------------------------------
Este projeto é uma aplicação web interativa construída com React e TypeScript que demonstra o treinamento e a utilização de Perceptrons para reconhecer dígitos desenhados manualmente em uma grade 5x3. Ele utiliza a estratégia "One-vs-Rest" (OvR) para lidar com a classificação multiclasse (10 dígitos).

## Funcionalidades

*   **Interface de Desenho Interativa:** Uma grade 5x3 onde o usuário pode clicar nas células para desenhar um dígito.
*   **Treinamento de Perceptrons:**
    *   Um botão "Treinar Modelos" inicia o processo de treinamento.
    *   Dez Perceptrons são treinados, um para cada dígito (0 a 9).
    *   Cada Perceptron é treinado para distinguir seu dígito alvo de todos os outros (estratégia One-vs-Rest).
    *   Padrões de treinamento pré-definidos para cada dígito são usados.
    *   O status do treinamento e o número de épocas por Perceptron são exibidos.
*   **Predição de Dígitos:**
    *   Após o treinamento, o usuário pode desenhar um dígito na grade.
    *   Um botão "Analisar Desenho" passa o padrão desenhado por todos os Perceptrons treinados.
    *   O sistema prediz qual dígito o padrão desenhado mais se assemelha, com base na maior saída de ativação dos Perceptrons.
*   **Visualização dos Padrões de Treinamento:** Os padrões usados para treinar cada dígito são exibidos na interface.
*   **Controles Adicionais:** Botão para limpar a grade de desenho.

## Como Funciona o Perceptron Aqui

1.  **Representação da Entrada:**
    *   Cada dígito (desenhado ou de treinamento) é uma matriz 5x3 de pixels (0 para vazio, 1 para preenchido).
    *   Essa matriz é achatada em um vetor de 15 elementos.
    *   Um **termo de bias** (valor constante 1) é adicionado no início do vetor, resultando em 16 entradas para cada Perceptron. O peso associado ao bias aprende o limiar efetivo do neurônio.

2.  **Treinamento (One-vs-Rest):**
    *   Para cada dígito `D` (de 0 a 9), um Perceptron `P_D` é treinado.
    *   Ao treinar `P_D`:
        *   O padrão de treinamento para o dígito `D` tem um alvo de `+1`.
        *   Os padrões de treinamento para todos os outros dígitos (não-`D`) têm um alvo de `-1`.
    *   O algoritmo de aprendizado do Perceptron ajusta os pesos sinápticos iterativamente até que todos os padrões de treinamento para aquele Perceptron específico sejam classificados corretamente ou um número máximo de épocas seja atingido.
    *   A regra de atualização de pesos é: `novo_peso = peso_antigo + taxa_aprendizado * erro * entrada_correspondente`.
    *   A função de ativação utilizada é uma função degrau bipolar com uma zona neutra:
        *   `+1` se a entrada líquida > limiar
        *   `-1` se a entrada líquida < -limiar
        *   `0` caso contrário

3.  **Predição:**
    *   Quando o usuário desenha um padrão e clica em "Analisar":
        *   O padrão desenhado é convertido no formato de vetor de entrada (com bias).
        *   Este vetor é alimentado em cada um dos 10 Perceptrons treinados.
        *   Para cada Perceptron, a entrada líquida (`y_ent = Σ (entrada_i * peso_i)`) é calculada.
        *   O dígito correspondente ao Perceptron que produz a **maior entrada líquida `y_ent`** (e idealmente uma saída da função de ativação de `+1`) é escolhido como a predição. Se a maior ativação estiver na zona neutra ou for negativa, o sistema indicará incerteza.

## Estrutura do Projeto


src/
|-- components/
| |-- GridInput.tsx # Componente React para a grade de desenho interativa
|-- perceptron/
| |-- patterns.ts # Define os padrões de treinamento 5x3 para os dígitos 0-9 e funções utilitárias
| |-- perceptron.ts # Lógica principal do Perceptron: somatório, ativação, atualização de pesos, treinamento
|-- App.tsx # Componente principal da aplicação React, gerencia estado e orquestra a UI
|-- index.tsx # Ponto de entrada da aplicação React
|-- types.ts # Definições de tipos TypeScript usadas no projeto
|-- App.css # Estilos CSS básicos para a aplicação


## Como Executar Localmente

1.  **Pré-requisitos:**
    *   Node.js (versão 12 ou superior recomendada)
    *   npm ou yarn

2.  **Clonar o Repositório (se aplicável):**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    ```

3.  **Instalar Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Iniciar a Aplicação:**
    ```bash
    npm start
    # ou
    yarn start
    ```
    A aplicação estará disponível em `http://localhost:3000` (ou outra porta, se a 3000 estiver ocupada).

## Tecnologias Utilizadas

*   **React:** Biblioteca JavaScript para construir interfaces de usuário.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **HTML/CSS:** Para estrutura e estilização.
*   **Algoritmo Perceptron:** Implementado do zero em TypeScript.

## Possíveis Melhorias e Limitações

*   **Robustez dos Padrões:** A performance depende muito da qualidade e da distinguibilidade linear dos padrões de treinamento 5x3. Variações no desenho do usuário podem não ser bem reconhecidas se diferirem muito dos padrões de treinamento.
*   **Ajuste de Hiperparâmetros:** A taxa de aprendizado, o limiar da função de ativação e o número máximo de épocas podem ser ajustados para tentar otimizar o treinamento.
*   **Convergência:** O algoritmo Perceptron só garante convergência se os dados forem linearmente separáveis. Para a estratégia OvR, cada par (dígito `i` vs. "não-`i`) precisa ser linearmente separável.
*   **Interface de Usuário:** A UI é funcional, mas pode ser aprimorada para melhor experiência do usuário.
*   **Modelos Mais Avançados:** Para reconhecimento de dígitos mais robusto e preciso, modelos como Redes Neurais Convolucionais (CNNs) são tipicamente superiores, mas o Perceptron serve como uma excelente introdução aos conceitos de aprendizado de máquina.
*   **Persistência dos Modelos:** Os modelos treinados são perdidos ao recarregar a página. Poderia ser implementada uma forma de salvar/carregar os pesos treinados (ex: LocalStorage).

