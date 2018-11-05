import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
    
  //   render() {
  //     return (
  //       <button className="square" onClick = {() => this.props.onClick()} >
  //         {this.props.value}
  //       </button>
  //     );
  //   }
  // }

  function Square(props) {
    return (
      <button className="square" onClick = {props.onClick} >
      {props.value}
      </button>
    );
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square value={this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}/>)
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  function GameButton(props) {
    // const checkIfNotNull = (element) => {
    //   console.log(element)
    //   return (element !== null);
    // }
    
    // if (props.history.squares.every(checkIfNotNull)){
    //   return (
    //     <button id="undoButtonOFF" onClick={props.onClick}>UNDO</button>
    //   );
    // }

    if (props.history === props.previousSquares) {
      return (
        <button id="undoButtonOFF" onClick={props.onClick}>UNDO</button>
      );}

    else {
      return (
        <button id="undoButtonON" onClick={props.onClick}>UNDO</button>
      );
    }
  }

  class Game extends React.Component {
    constructor (props){
      super(props);
      this.state = {
        history: [{squares: Array(9).fill(null)}, {squares: Array(9).fill(null)}], 
        xIsNext: true};
    }

    handleClick = (i) => {
      let history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();    // thanks to slice method we create new array instead of mutating the old one.
      const previousSquares = squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      if (this.state.xIsNext == true) {
        squares[i] = "X"
      }
      else if (this.state.xIsNext == false) {
        squares[i] = "O"
      }
      history[0] = {squares: previousSquares};
      history[1] = {squares: squares};

      this.setState({
        history : history,
        xIsNext: !this.state.xIsNext});
    }

    undoButton = () => {
      let history = this.state.history.slice();
      const firstBoard = history[0].squares;
      const secondBoard = history[1].squares;
      const previousSquares = history[0];

      for (let i=0; i < firstBoard.length; i++) {
        if (firstBoard[i] !== secondBoard[i]) {
          history[1] = previousSquares;
          this.setState({
            history: history,
            xIsNext: !this.state.xIsNext
          })
        }
      }
      

    };

    resetButton = () => {
      const history = [{squares: Array(9).fill(null)}, {squares: Array(9).fill(null)}];
      const xIsNext = true;

      this.setState({
        history: history,
        xIsNext: xIsNext
      })
    }
    
    render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
      let status

      if (winner) {
        status = "PLAYER " + (winner) + " WON!"
      }
      else {
        status = 'NEXT PLAYER: ' + (this.state.xIsNext ? "X" : "O");
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div id="statusInfo">{status}</div>
            <GameButton history={history[1]} previousSquares={history[0]} onClick={this.undoButton}>UNDO</GameButton>
            <button id="resetButton" onClick={this.resetButton}>RESET</button>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  