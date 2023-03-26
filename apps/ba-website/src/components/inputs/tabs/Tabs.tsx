"use client"

import React, { ReactNode } from 'react'
import Box from '@mui/material/Box';
import { clsx } from 'clsx';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    activeTab: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, activeTab, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={activeTab !== index}
            id={`tab-tabpanel-${index}`}
            aria-labelledby={`tab-tab-${index}`}
            {...other}
        >
            {activeTab === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}


export type TabProps = {
    tabs: {
        title: string,
        content: ReactNode
    }[]
    activeTab: number;
    onChange: (num: number) => void;
}


const Tabs = ({ tabs, activeTab, onChange }: TabProps) => {



    return (
        <Box className="w-full grid gap-6">
            <Box className="flex rounded-lg  justify-center w-full snap-x overflow-auto bg-gray-200/70 sm:bg-transparent">
                <div
                    className=' py-2 px-2 flex snap-x sm:bg-gray-200/70  rounded-lg '
                >
                    {tabs.map((tab, index, arr) => <button onClick={() => onChange(index)} className={clsx(["normal-case text-gray-600 whitespace-nowrap px-4 py-3 font-bold transition-colors duration-150", activeTab === index ? "bg-gray-50 rounded-lg text" : 'bg-transparent', index === arr.length - 1 ? 'snap-end' : 'snap-start'])} key={index} > {tab.title}</button>)}

                </div>
            </Box>
            {tabs.map((tab, index) => <TabPanel key={index} activeTab={activeTab} index={index}>
                {tab.content}
            </TabPanel>)}</Box>
    )
}

export default Tabs