import React, {Component} from 'react';
import Node from './Node/Node';

import './Pathfinder.css';
import { render } from '@testing-library/react';

const START_ROW, END_ROW = 10;
const START_COL = 5;
const END_COL = 45;

export default class Pathfinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    animateDijkstra(visited) {
        for (const node of visited) {
            const newGrid = this.state.grid.slice();
            const visitedNode = {
                ...node,
                visited: true,
            };
            newGrid[node.row][node.col] = visitedNode;
            setTimeout(() => {
                this.setState({grid: newGrid})
            });
        }
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const start = grid[START_ROW][START_COL];
        const end = grid[END_ROW][END_COL];
        const visited = dijkstra(grid, start, end);
        this.animateDijkstra(visited);
    }

    render() {
        const {grid} = this.state;

        return (
            <>
            <button onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {grid.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex}>
                        {row.map((node, nodeIndex) => {
                            const{row, col, isStartNode, isEndNode, isWall} = node;
                            return (
                                <Node
                                    key={nodeIndex}
                                    col={col}
                                    row={row}
                                    isStartNode={isStartNode}
                                    isEndNode={isEndNode}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row,col) => this.handleMouseDown(row,col)}
                                    onMouseEnter={(row,col) => this.handleMouseEnter(row, col)}
                                    onMouseUp={() => this.handleMouseUp()}></Node>
                            );
                        })}
                        </div>
                    );
                })}
            </div>
            </>
        );
    }
};

const getInitialGrid = () => {
    const grid = [];
    for (let row=0;row<20;row++) {
        const currRow = [];
        for (let col = 0;col<50;col++) {
            currRow.push(createNode(col,row));
        }
        grid.push(currRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStartNode: row === START_ROW && col === START_COL,
        isEndNode: row === END_ROW && col === END_COL,
        isWall: false,
        previousNode: null,
    };
};

const createWall = (grid,row,col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const wall = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = wall;
    return newGrid;
}