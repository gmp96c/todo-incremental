import React, { Component, useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Count } from './components/Count';
import { Task } from './components/Task';

const pointReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return Math.floor(state + action.payload.incr * action.payload.mod);
        default:
            throw new Error();
    }
};

const testData = [
    {
        title: 'Brush teeth',
        goal: 2,
        freq: 1,
        count: 1,
        dif: 2,
        sig: 4,
        chain: 0,
    },
    {
        title: 'Exercise',
        goal: 1,
        freq: 3,
        count: 1,
        dif: 4,
        sig: 3,
        chain: 1,
    },
    {
        title: 'Read',
        goal: 1,
        freq: 1,
        count: 1,
        dif: 3,
        sig: 3,
        chain: 0,
    },
];

const App = () => {
    const [points, dispatchPoints] = useReducer(pointReducer, 0);
    const [loop, setLoop] = useState(undefined);
    const [incr, setIncr] = useState(1);
    const [mod, setMod] = useState(1.2);

    const getCurrentIncrFromTasks = tasks =>
        tasks.reduce(
            (acc, cur) =>
                Math.floor(
                    acc +
                        cur.count *
                            (cur.dif / 2 + cur.sig / 2) *
                            (1 + cur.chain)
                ),
            0
        );

    useEffect(() => {
        clearInterval(loop);
        const int = setInterval(() => {
            dispatchPoints({
                type: 'increment',
                payload: {
                    incr,
                    mod,
                },
            });
        }, 1000);
        setLoop(int);
        return () => {
            clearInterval(loop);
        };
    }, [incr, mod]);

    useEffect(() => {
        setIncr(getCurrentIncrFromTasks(testData));
    }, [testData]);

    return (
        <MainWrapper>
            <CssBaseline />
            <Count points={points} />
            {testData.map(el => (
                <Task key={el.title} task={el} />
            ))}
        </MainWrapper>
    );
};

const MainWrapper = styled.main`
    grid-area: main;
    background: grey;
    padding: 25px;
`;

ReactDOM.render(<App />, document.getElementById('root'));
