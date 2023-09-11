import { createContext, useState, useContext } from "react";
import dayjs from "dayjs";

type IProp = {
  children: React.ReactElement;
};

type updateDates = (dates: Record<string, string>) => void;

type IContext = {
  dates?: Record<string, string>;
  updateDates?: updateDates;
};

const DatesContext = createContext<IContext>({});

const DatesProvider = ({ children }: IProp): JSX.Element => {
  const [dates, setDates] = useState<Record<string, string>>({
    startDay: dayjs(new Date()).startOf("month").format("MM/DD/YYYY"),
    endDay: dayjs(new Date()).endOf("month").format("MM/DD/YYYY"),
  });

  const updateDates: updateDates = (dates: Record<string, string>) => {
    setDates(dates);
  };

  const initialValue = {
    dates,
    updateDates,
  };

  return (
    <DatesContext.Provider value={initialValue}>
      {children}
    </DatesContext.Provider>
  );
};

const useDates = () => {
  const dates = useContext(DatesContext);
  return dates;
};

export { DatesProvider, useDates };
