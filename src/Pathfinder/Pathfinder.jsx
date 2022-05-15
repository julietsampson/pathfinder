import React, {Component} from 'react';
import Node from './Node/Node';

import './Pathfinder.css';
import { render } from '@testing-library/react';

export default class Pathfinder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Foo
                <Node></Node>
            </div>
        );
    }
}