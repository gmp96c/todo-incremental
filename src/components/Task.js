import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@material-ui/core';

export const Task = ({ task: { title, sig, dif, freq, count, chain } }) => (
    <TaskStyle>
        <CardContent className="content">
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1">
                {Math.floor(count * (dif / 2 + sig / 2) * (1 + chain))}/s
            </Typography>
        </CardContent>
    </TaskStyle>
);

const TaskStyle = styled(Card)`
    margin-top: 1.5rem;
`;
