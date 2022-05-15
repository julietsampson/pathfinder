import React, {Component} from 'react';
import Node from './Node/Node';

import './Pathfinder.css';
import { render } from '@testing-library/react';

export default class Pathfinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 15; row++) {
            const currRow = [];
            for (let col = 0; col < 50; col++) {
                const currNode = {
                    col,
                    row,
                    isStartNode: row === 10 && col === 5,
                    isEndNode: row === 10 && col === 45,
                };
                currRow.push([]);
            }
            nodes.push(currRow);
        }
        this.setState({nodes})
    }

    render() {
        const {nodes} = this.state;
        console.log(nodes)
        return (
            <div className="grid">
                {nodes.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex}>
                        {row.map((node, nodeIndex) => {
                            const{isStartNode, isEndNode} = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    isStartNode={isStartNode}
                                    isEndNode={isEndNode}
                                    test={'foo'}
                                    test={'kappa'}></Node>
                            );
                        })}
                        </div>
                    );
                })}
            </div>
        );
    }
}