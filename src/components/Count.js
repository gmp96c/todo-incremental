import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Count = ({ points = 21312312 }) => (
    <Typography variant="h3" align="center">
        {points}
    </Typography>
);

// const PointStyle = styled.h1`
//     color: white;
// `;
