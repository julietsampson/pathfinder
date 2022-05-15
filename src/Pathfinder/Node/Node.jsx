import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './Node.css'

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="node"></div>;
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};