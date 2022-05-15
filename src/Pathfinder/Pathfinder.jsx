import React, {Component} from 'react';
import Node from './Node/Node';

import './Pathfinder.css';
import { render } from '@testing-library/react';

export default class Pathfinder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 15; row++) {
            const currRow = [];
            for (let col = 0; col < 50; col++) {
                currRow.push([]);
            }
            nodes.push(currRow);
        }
        this.setState({nodes});
    }

    render() {
        const {nodes} = this.state;
        console.log(nodes)
        return (
            <div className="grid">
                {nodes.map((row, rowIndex) => {
                    return <div>
                    {row.map((node, nodeIndex) => <Node></Node>)}
                    </div>
                })}
            </div>
        );
    }
}