"use client"

import React, { ReactNode } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { default as MuiTabs } from '@mui/material/Tabs';
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
            <Box className="flex justify-center w-full">
                <MuiTabs
                    value={activeTab}
                    onChange={(_, num) => onChange(num)}
                    // variant="scrollable"
                    // scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    className='rounded-lg bg-gray-200/80 py-2 px-2'
                >
                    {tabs.map((tab, index) => <Tab disableRipple label={tab.title} className={clsx(["normal-case text-gray-600 px-4 font-bold transition-colors duration-150", activeTab === index ? "bg-gray-50 rounded-lg text" : 'bg-transparent'])} key={index} />)}

                </MuiTabs>
            </Box>
            {tabs.map((tab, index) => <TabPanel key={index} activeTab={activeTab} index={index}>
                {tab.content}
            </TabPanel>)}</Box>
    )
}

export default Tabs