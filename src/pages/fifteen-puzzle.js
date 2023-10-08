import React, { Component } from 'react';
import '../css/game.css'



class FifteenPuzzle extends Component {
    constructor() {
        super();
        this.state = {
            tiles: this.shuffleTiles(),
            moves: 0,
            timer: 0,
            isRunning: false,
        };
        this.timerInterval = null;
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    shuffleTiles() {
        const tiles = Array.from({ length: 16 }, (_, index) => index + 1);
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        return tiles;
    }

    handleTileClick(tile) {
        if (!this.state.isRunning) return;

        const { tiles } = this.state;
        const emptyIndex = tiles.indexOf(16);
        const tileIndex = tiles.indexOf(tile);

        if (this.isValidMove(emptyIndex, tileIndex)) {
            const updatedTiles = [...tiles];
            [updatedTiles[emptyIndex], updatedTiles[tileIndex]] = [tile, 16];

            this.setState((prevState) => ({
                tiles: updatedTiles,
                moves: prevState.moves + 1,
            }));

            if (this.checkWin(updatedTiles)) {
                this.stopTimer();
                alert(`Победа! Затраченное время: ${this.state.timer} секунд`);
            }
        }
    }

    isValidMove(emptyIndex, tileIndex) {
        const rowDiff = Math.abs(Math.floor(emptyIndex / 4) - Math.floor(tileIndex / 4));
        const colDiff = Math.abs((emptyIndex % 4) - (tileIndex % 4));
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    checkWin(tiles) {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) {
                return false;
            }
        }
        return true;
    }

    startTimer() {
        this.setState({ isRunning: true });
        this.timerInterval = setInterval(() => {
            this.setState((prevState) => ({
                timer: prevState.timer + 1,
            }));
        }, 1000);
    }

    stopTimer() {
        this.setState({ isRunning: false });
        clearInterval(this.timerInterval);
    }

    resetGame() {
        this.setState({
            tiles: this.shuffleTiles(),
            moves: 0,
            timer: 0,
            isRunning: false,
        });
        clearInterval(this.timerInterval);
    }

    renderTiles() {
        return this.state.tiles.map((tile, index) => (
            <div
                key={tile}
                className={`tile ${tile === 16 ? 'empty' : ''}`}
                onClick={() => this.handleTileClick(tile)}
            >
                {tile !== 16 ? tile : ''}
            </div>
        ));
    }

    

    render() {
        return (
            <div className="App">
                <h1>Пятнашки</h1>
                <div className="board">{this.renderTiles()}</div>
                <div className="info">
                    <p>Ходы: {this.state.moves}</p>
                    <p>Время: {this.state.timer} сек</p>
                </div>
                <button onClick={() => this.resetGame()}>Новая игра</button>
            </div>
        );
    }
}

export default FifteenPuzzle;
