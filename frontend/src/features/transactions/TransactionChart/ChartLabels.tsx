import React from "react";

type ChartLabelsProps = {
  labels: string[] | [] | undefined;
  backgrounds: string[];
};

const ChartLabels = ({ labels, backgrounds }: ChartLabelsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-[75%] mx-auto md:gap-y-6 md:w-[80%] pb-[4rem]">
      {labels?.map((label, index) => (
        <div
          key={`labels-${label}-${index}`}
          className="flex gap-2 items-center md:justify-center"
        >
          <div
            className={`w-[10px] h-[10px] md:w-[20px] md:h-[20px]`}
            style={{
              backgroundColor: backgrounds[index],
            }}
          ></div>
          <p className="text-sm md:text-lg" key={index}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChartLabels;
