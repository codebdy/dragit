import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  className: any;
}
export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    value === index?
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {children}
    </div>
    :
    <></>
  );
}
