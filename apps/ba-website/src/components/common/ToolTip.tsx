"use client"
import React from 'react'
import { Tooltip, TooltipProps } from '@mui/material';

type Props = TooltipProps & { children: React.ReactNode | React.ReactNode[], className?: string; }

const ToolTip = ({ children, ...props }: Props) =>
(
    <Tooltip placement="top"{...props} ><div>{children}</div></Tooltip>
)


export default ToolTip