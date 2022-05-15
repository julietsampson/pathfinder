import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './Node.css'

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {isEndNode, isStartNode} = this.props;
        const extraClassName = isEndNode ? '-end' : isStartNode ? '-start' : '';
        return <div className={`node${extraClassName}`}></div>;
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};