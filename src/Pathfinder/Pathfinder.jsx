import React, {Component} from 'react';
import Node from './Node/Node';

import './Pathfinder.css';
import { render } from '@testing-library/react';
import dijkstra from '../algorithms/dijkstra.js'

const START_ROW = 10;
const END_ROW = 10;
const START_COL = 15;
const END_COL = 35;

export default class Pathfinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        const newGrid = createWall(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = createWall(this.state.grid, row, col);
        this.setState({grid:newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }
 
    animateDijkstra(visited) {
        for (let i = 0; i<visited.length; i++) {
            setTimeout(() => {
                const node = visited[i];
                const newGrid = this.state.grid.slice();
                const visitedNode = {
                    ...node,
                    visited: true,
                };
                newGrid[node.row][node.col] = visitedNode;            
                    this.setState({grid: newGrid})
            }, 20*i);
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
        let {mouseIsPressed} = grid.mouseIsPressed;
        
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
                                    isStartNode={isStartNode}
                                    isEndNode={isEndNode}
                                    isWall={isWall}
                                    mouseIsPressed = {mouseIsPressed}
                                    onMouseDown={(row,col) => this.handleMouseDown(row, col)}
                                    onMouseEnter={(row,col) =>
                                        this.handleMouseEnter(row,col)
                                    }
                                    onMouseUp={() => this.handleMouseUp()}
                                    row={row}></Node>
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
        visited: false,
        isWall: false,
        previousNode: null,
        distance: Infinity,
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