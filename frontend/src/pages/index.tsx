/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dayjs from "dayjs";

import MainLayout from "@/components/layout/MainLayout";
import TransactionsMenu from "@/features/transactions/TransactionMenu";
import FilterComponent from "@/features/transactions/TransactionMenu/FilterComponent";
import TransactionsList from "@/features/transactions/TransactionsList";
import AddRecordComponent from "@/features/transactions/TransactionsList/AddRecordComponent";

import useTransactionsApi from "@/services/transactions.service";
import formatDate from "@/utils/formatDate";
import Loader from "@/features/transactions/TransactionsList/Loader";

export default function Home() {
  const [days, setDays] = useState<Record<string, string>>({
    startDay: dayjs(new Date()).startOf("month").format("MM/DD/YYYY"),
    endDay: dayjs(new Date()).endOf("month").format("MM/DD/YYYY"),
  });

  const queryClient = useQueryClient();

  const { getTransactions, createTransaction } = useTransactionsApi(days);
  const { isLoading, data, isError, refetch } = useQuery(
    "transactions",
    getTransactions,
    {
      staleTime: Infinity,
    }
  );

  const mutation = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  const onCreateTransaction = (data: any) => {
    mutation.mutate(data);
  };

  const setDates = (dates: Record<string, string>) => {
    setDays(dates);
    setTimeout(() => {
      refetch();
    }, 200);
  };

  return (
    <MainLayout>
      <div
        className={`min-h-screen text-white bg-mainBackground pt-28 pb-[3.25rem] xl:max-w-[1100px] mx-auto`}
      >
        <h1 className="font-bold text-center text-3xl mb-14">
          My transactions
        </h1>
        <TransactionsMenu>
          <h3 className="text-2xl">
            {formatDate(days.startDay)} - {formatDate(days.endDay)}
          </h3>
          <FilterComponent setDates={setDates} />
        </TransactionsMenu>

        {!isLoading &&
          data?.map((transaction: any) => (
            <TransactionsList
              key={transaction.date}
              date={transaction.date}
              records={transaction.records}
            />
          ))}

        {!isLoading && data?.length === 0 && (
          <div className="w-[63%] h-[30vh] text-center mx-auto">
            <div className="w-full h-[70%] mb-2 relative">
              <Image src="icons/emptyIcon.svg" fill alt="Empty Icon" />
            </div>
            <h4 className=" text-lg md:text-xl">
              You don't have any transaction
            </h4>
          </div>
        )}

        {isLoading && <Loader />}

        <AddRecordComponent onSubmit={onCreateTransaction} />
      </div>
    </MainLayout>
  );
}
