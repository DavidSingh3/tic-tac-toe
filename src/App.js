import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.initialState(),
      winsX: 0,
      winsO: 0
    }
  }

  initialState = () => {
    return {
      board: (new Array(3)).fill(
        (new Array(3)).fill(null)
      ),
      player: (Math.random()) < 0.5 ? 'O' : 'X',
      winner: false
    }
  }

  handleClick = (y, x) => {
    const board = JSON.parse(JSON.stringify(this.state.board))
    if (board[y][x])
      return
    board[y][x] = this.state.player
    const winner = this.checkWinner(board)
    const winsO = winner && winner.player !== 'X' ? this.state.winsO + 1 : this.state.winsO
    const winsX = winner && winner.player !== 'O' ? this.state.winsX + 1 : this.state.winsX
    const player = this.state.player === 'X' ? 'O' : 'X'
    this.setState({board, player, winner, winsX, winsO})
  }

  checkWinner = board => {
    const isTied = !board.reduce((isNotTied, row) => {
      return isNotTied || row.reduce((isNotTied, cell) => {
        return isNotTied || cell === null
      }, false)
    }, false)

    return ['O', 'X'].reduce((winner, player) => {
      const winningRow = (
        () => {
          let row = null
          return (r) => {
            row = r || row
            return row
          }
        }
      )()
      return winner || ((
        (
          winningRow('A') &&
          board[0][0] === player &&
          board[0][1] === player &&
          board[0][2] === player
        ) ||
        (
          winningRow('B') &&
          board[1][0] === player &&
          board[1][1] === player &&
          board[1][2] === player
        ) ||
        (
          winningRow('C') &&
          board[2][0] === player &&
          board[2][1] === player &&
          board[2][2] === player

        ) ||
        (
          winningRow('D') &&
          board[0][0] === player &&
          board[1][0] === player &&
          board[2][0] === player
        ) ||
        (
          winningRow('E') &&
          board[0][1] === player &&
          board[1][1] === player &&
          board[2][1] === player
        ) ||
        (
          winningRow('F') &&
          board[0][2] === player &&
          board[1][2] === player &&
          board[2][2] === player
        ) ||
        (
          winningRow('G') &&
          board[0][0] === player &&
          board[1][1] === player &&
          board[2][2] === player
        ) ||
        (
          winningRow('H') &&
          board[0][2] === player &&
          board[1][1] === player &&
          board[2][0] === player
        )
      ) && {player, winningRow: winningRow()})
    }, false) || isTied
  }

  isWinningCell = (y, x) => {
    const {winningRow} = this.state.winner
    return (
      this.state.winner !== 'tied' && (
        (winningRow === 'A' && y === 0) ||
        (winningRow === 'B' && y === 1) ||
        (winningRow === 'C' && y === 2) ||
        (winningRow === 'D' && x === 0) ||
        (winningRow === 'E' && x === 1) ||
        (winningRow === 'F' && x === 2) ||
        (winningRow === 'G' && x === y) ||
        (winningRow === 'H' && y === 0 && x === 2) ||
        (winningRow === 'H' && y === 1 && x === 1) ||
        (winningRow === 'H' && y === 2 && x === 0)
      )
    ) || false
  }

  reset = () => {
    this.setState({...this.initialState()})
  }

  render () {
    return (
      <div className='App'>
        <div className='info player'>TIC-TAC-TOE</div>
        <div className={`grid${this.state.winner ? ' finished' : ''}`}>
          {
            this.state.board.map((row, y) => {
              return <div className='row' key={y}>
                {
                  row.map((cell, x) => {
                    return <div
                      className={`cell${(this.state.winner && this.isWinningCell(y, x)) ? ' winningCell' : ''}${cell ? ' notEmpty' : ''}`}
                      onClick={() => this.handleClick(y, x)} key={`${y}-${x}`}>
                      {
                        cell && <p className={`player ${cell}`}>{cell}</p>
                      }
                    </div>
                  })
                }
              </div>
            })
          }
        </div>
        <div className='info'>
          <div><span className="player X">X</span> {this.state.winsX}</div>
          <button onClick={this.reset}>Reset game</button>
          <div><span className="player O">O</span> {this.state.winsO}</div>
        </div>
        <div className='info'>
          {
            this.state.winner
              ? this.state.winner.player
              ? <div>
                WINNER: {<span className={`player ${this.state.winner.player}`}>{this.state.winner.player}</span>}
              </div>
              : <div>TIED</div>
              : <div>Player's turn:&nbsp;
                <span className={`player ${this.state.player}`}>{this.state.player}</span>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default App
