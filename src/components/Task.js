import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import LinearWithValueLabel from './Progress';

const Task = ({
    task,
    task: { title, importance, dif, freq, count, chain, goal },
    finishTask,
    updateImportance,
}) => {
    console.log(title);
    return (
        <Card>
            <TaskStyle className="content">
                <Typography className="title" variant="h6">
                    {title}
                </Typography>
                <div className="controls">
                    {/* <Typography className="rate" variant="subtitle1">
                    {Math.floor(count * (dif / 2 + importance / 2) * (1 + chain))}/s
                </Typography> */}
                    <Tooltip title="Set importance of task.">
                        <Rating
                            name="importance"
                            value={importance}
                            onChange={(e, newValue) => {
                                console.log(newValue);
                                console.log(task);
                                updateImportance(parseInt(newValue));
                            }}
                            precision={1}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                    </Tooltip>
                    <div className="input">
                        {' '}
                        {count < goal ? (
                            <Tooltip title="Add finished task">
                                <IconButton
                                    color="primary"
                                    onClick={finishTask}
                                    aria-label={`Mark another ${title} as done`}
                                >
                                    <AddCircleIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <IconButton
                                color="secondary"
                                disabled
                                aria-label={`${title} is done for the day.`}
                            >
                                <CheckCircleIcon />
                            </IconButton>
                        )}
                    </div>
                </div>
                <div className="progress">
                    <LinearWithValueLabel goal={goal} count={count} />
                </div>
            </TaskStyle>
        </Card>
    );
};
export default React.memo(Task, (prev, next) => {
    const keys = Object.keys(prev.task);
    return keys.reduce((acc, val) => {
        if (prev[val] != next[val] || !acc) {
            return false;
        }
        return acc;
    }, true);
});

const TaskStyle = styled(CardContent)`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
        'title controls'
        'progress progress';
    grid-gap: 10px;
    align-items: center;
    .title {
        grid-area: title;
    }
    .controls {
        grid-area: controls;
        display: flex;
        align-items: center;
    }
    .progress {
        grid-area: progress;
    }
`;
