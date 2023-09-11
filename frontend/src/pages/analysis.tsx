import { useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";

import DoughnutChart from "@/components/charts/DoughnutChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TransactionsMenu from "@/features/transactions/TransactionMenu";
import FilterComponent from "@/features/transactions/TransactionMenu/FilterComponent";
import Chart from "@/features/transactions/TransactionChart/Chart";
import ChartLabels from "@/features/transactions/TransactionChart/ChartLabels";

import useTransactionsApi from "@/services/transactions.service";

import {
  backgroundColor,
  borderColor,
} from "@/features/transactions/TransactionChart/utils";
import formatDate from "@/utils/formatDate";
import Loader from "@/features/transactions/TransactionChart/Loader";

type AnalysisData = {
  categoryLabels: string[];
  data: number[];
};

const Analysis = () => {
  const [chartType, setChartType] = useState<string>("income");
  const [days, setDays] = useState<Record<string, string>>({
    startDay: dayjs(new Date()).startOf("month").format("MM/DD/YYYY"),
    endDay: dayjs(new Date()).endOf("month").format("MM/DD/YYYY"),
  });

  const { getAnalysis } = useTransactionsApi(days);

  const {
    isLoading: incomeChartLoading,
    data: incomeData,
    refetch: incomeRefetch,
  } = useQuery<AnalysisData>(
    "incomeChart",
    async () => await getAnalysis({ ...days, type: "income" }),
    {
      staleTime: Infinity,
    }
  );

  const {
    isLoading: expensiveChartLoading,
    data: expensiveData,
    refetch: expensivesRefetch,
  } = useQuery<AnalysisData>(
    "expensiveChart",
    async () => await getAnalysis({ ...days, type: "expenses" }),
    {
      staleTime: Infinity,
    }
  );

  const setDates = (dates: Record<string, string>) => {
    setDays(dates);
    setTimeout(() => {
      incomeRefetch();
      expensivesRefetch();
    }, 200);
  };

  let incomeChartData;
  let expensiveChartData;

  if (!incomeChartLoading && incomeData) {
    incomeChartData = {
      labels: [],
      datasets: [
        {
          label: " total",
          data: incomeData.data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  }

  if (!expensiveChartLoading && expensiveData) {
    expensiveChartData = {
      labels: [],
      datasets: [
        {
          label: " total",
          data: expensiveData.data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <main
      className={`min-h-screen text-white bg-mainBackground pt-28 pb-[3.25rem]`}
    >
      <h1 className="font-bold text-center text-3xl mb-10">Analysis</h1>

      <section>
        <TransactionsMenu>
          <h3 className=" text-2xl">
            {formatDate(days.startDay)} - {formatDate(days.endDay)}
          </h3>
          <FilterComponent setDates={setDates} />
        </TransactionsMenu>

        {!incomeChartLoading && !expensiveChartLoading && (
          <Select
            defaultValue={chartType}
            onValueChange={(value) => setChartType(value)}
          >
            <SelectTrigger className="w-[60%] mx-auto mb-6 xl:max-w-[300px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="income">Incomes</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {!incomeChartLoading && incomeChartData && chartType === "income" && (
          <>
            {incomeData?.data.length === 0 && (
              <h1 className="text-center">{`You don't have any income registered`}</h1>
            )}

            {!!incomeData?.data.length && (
              <Chart title="Incomes overview">
                <div className="w-[50%] mb-7 mx-auto md:mb-16 xl:w-[18%]">
                  <DoughnutChart data={incomeChartData} />
                </div>
                <ChartLabels
                  labels={incomeData?.categoryLabels}
                  backgrounds={backgroundColor}
                />
              </Chart>
            )}
          </>
        )}

        {!expensiveChartLoading &&
          expensiveChartData &&
          chartType === "expense" && (
            <>
              {expensiveData?.data.length === 0 && (
                <h1 className="text-center">{`You don't have any expense registered`}</h1>
              )}
              {!!expensiveData?.data.length && (
                <Chart title="Expenses overview">
                  <div className="w-[50%] mb-7 mx-auto md:mb-16 xl:w-[18%]">
                    <DoughnutChart data={expensiveChartData} />
                  </div>
                  <ChartLabels
                    labels={expensiveData?.categoryLabels}
                    backgrounds={backgroundColor}
                  />
                </Chart>
              )}
            </>
          )}

        {incomeChartLoading && expensiveChartLoading && <Loader />}
      </section>
    </main>
  );
};

export default Analysis;
