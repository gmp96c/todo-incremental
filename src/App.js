import React, { Component, useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Count } from './components/Count';
import Task from './components/Task';

const TASK_QUERY = gql`
    query taskQuery {
        tasks {
            title
            importance
            goal
            id
            frequency
            chain
            count
        }
    }
`;

const pointReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return Math.floor(state + action.payload.incr * action.payload.mod);
        default:
            throw new Error();
    }
};

// const dataReducer = (state, action) => {
//     console.log(state);
//     console.log(action);
//     switch (action.type) {
//         case 'initialize':
//             return action.payload;
//         case 'updateVal':
//             return [
//                 ...state.filter(el => el.title != action.payload.title),
//                 action.payload,
//             ];
//         default:
//             throw new Error();
//     }
// };

export const App = () => {
    const { isAuthenticated, loginWithRedirect, isLoading, error } = useAuth0();
    const [points, dispatchPoints] = useReducer(
        pointReducer,
        165161651165131516999999999999991651651
    );
    const [loop, setLoop] = useState(undefined);
    const [incr, setIncr] = useState(1);
    const [mod, setMod] = useState(1.2);
    // const [data, dispatchData] = useReducer(dataReducer, []);
    const { loading, taskError, data } = useQuery(TASK_QUERY);
    const getCurrentIncrFromTasks = tasks =>
        tasks.reduce(
            (acc, cur) =>
                Math.floor(acc + cur.count * cur.importance * (1 + cur.chain)),
            0
        );

    // useEffect(() => {
    //     clearInterval(loop);
    //     const int = setInterval(() => {
    //         dispatchPoints({
    //             type: 'increment',
    //             payload: {
    //                 incr,
    //                 mod,
    //             },
    //         });
    //     }, 1000);
    //     setLoop(int);
    //     return () => {
    //         clearInterval(loop);
    //     };
    // }, [incr, loop, mod]);
    // useEffect(() => {
    //     if (loading == false) {
    //         dispatchData({
    //             type: 'initialize',
    //             payload: taskData.data.tasks,
    //         });
    //     }
    // }, [loading]);
    useEffect(() => {
        if (loading == false && data?.tasks != undefined) {
            console.log(data);
            setIncr(getCurrentIncrFromTasks(data?.tasks));
        }
    }, [data, getCurrentIncrFromTasks, loading]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }
    return isAuthenticated ? (
        <MainWrapper>
            <CssBaseline />
            <Count points={parseFloat(points.toPrecision(4))} />
            <div className="taskList">
                {data?.tasks != undefined &&
                    [...data.tasks]
                        .sort((a, b) => (a.title > b.title ? 1 : -1))
                        .map(item => (
                            <Task
                                key={item.id}
                                task={item}
                                // finishTask={() => {
                                //     dispatchData({
                                //         type: 'updateVal',
                                //         payload: {
                                //             ...item,
                                //             count: item.count + 1,
                                //         },
                                //     });
                                // }}
                                // updateImportance={val => {
                                //     console.log(item);
                                //     dispatchData({
                                //         type: 'updateVal',
                                //         payload: {
                                //             ...item,
                                //             importance: val,
                                //         },
                                //     });
                                // }}
                            />
                        ))}
            </div>
        </MainWrapper>
    ) : (
        <button type="button" onClick={loginWithRedirect}>
            Log in
        </button>
    );
};

const MainWrapper = styled.main`
    grid-area: main;
    background: grey;
    padding: 25px;
    .taskList {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        gap: 10px;
    }
`;
