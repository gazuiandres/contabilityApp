import React from "react";

type ChartProps = {
  children: React.ReactElement[] | React.ReactElement;
  title: string;
};

const Chart = ({ children, title }: ChartProps) => {
  return (
    <>
      <h3 className="mb-2 text-center text-xl">{title}</h3>
      {children}
    </>
  );
};

export default Chart;
