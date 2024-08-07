import React, { Component } from 'react';
import { connect } from 'react-redux'

import Board from './Board';
import Score from './Score';

import {
  startGame,
  togglePlaying,
} from './Reducers/game';

import {
  addBlock,
  dropBlock,
  moveBlock,
  rotateBlock,
} from './Reducers/board';

import KeyHandler, { KEYDOWN } from 'react-key-handler';

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '18px',
  borderRadius: '5px',
  backgroundColor: '#4CAF50', /* Green */
  border: 'none',
  color: 'white',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  transitionDuration: '0.4s',
  cursor: 'pointer'
};

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '50%',
  marginTop: '20px',
};


class App extends Component {
  constructor(props) {
    super(props);

    this.rows = 10;
    this.columns = 5;

    this.props.startGame();

    this.addBlock = this.props.addBlock.bind(this);
    this.rotateBlock = this.props.rotateBlock.bind(this);
    this.dropBlock = this.props.dropBlock.bind(this);
    this.togglePlaying = this.props.togglePlaying.bind(this);
    this.moveRight = this.props.moveBlock.bind(this, 'right');
    this.moveLeft = this.props.moveBlock.bind(this, 'left');
    this.moveDown = this.props.moveBlock.bind(this, 'down');
  }
  toggleMenu(event) {
    event.preventDefault();
    alert(event);
  }


  componentDidMount() {
    // Disable scrolling on the body when the game component is mounted
    document.body.style.overflow = 'hidden';
  }
  render() {
    return (
      <div className="App" style={appStyle}>
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowDown" onKeyHandle={this.moveDown} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowLeft" onKeyHandle={this.moveLeft} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowRight" onKeyHandle={this.moveRight} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowUp" onKeyHandle={this.rotateBlock} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="r" onKeyHandle={this.rotateBlock} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="p" onKeyHandle={this.togglePlaying} />
        <KeyHandler keyEventName={KEYDOWN} keyValue=" " onKeyHandle={this.dropBlock} />
        <Board />
        <div className="side">
          <Score />
          <div className="instructions">
            <kbd>&larr;</kbd><kbd>&rarr;</kbd><kbd>&darr;</kbd> move block<br />
            <kbd>&uarr;</kbd> <kbd>R</kbd> rotate block<br />
            <kbd>Space Bar</kbd> drop block<br />
            <kbd>P</kbd> pause/resume game<br />
          </div>
          <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={this.moveLeft}>←</button>
          <button style={buttonStyle} onClick={this.moveRight}>→</button>
          <button style={buttonStyle} onClick={this.rotateBlock}>Rotate</button>
          <button style={buttonStyle} onClick={this.dropBlock}>Drop</button>
            <button style={buttonStyle} onClick={this.moveDown}>↓</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addBlock: (rows, cols) => dispatch(addBlock(rows, cols)),
    dropBlock: () => dispatch(dropBlock()),
    moveBlock: direction => dispatch(moveBlock(direction)),
    rotateBlock: () => dispatch(rotateBlock()),
    startGame: () => dispatch(startGame()),
    togglePlaying: () => dispatch(togglePlaying()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
