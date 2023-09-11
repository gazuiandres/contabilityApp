import { useState } from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { useQuery } from "react-query";
import { useRouter } from "next/router";


dayjs.extend(utc);

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

import DeleteTransaction from "@/features/transactions/TransactionsList/DeleteTransaction";

import { CategoryType } from "@/types/categories.type";

import useCategoriesApi from "@/services/categories.service";
import useTransactionsApi from "@/services/transactions.service";

const UpdateTransaction = () => {
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const { query } = useRouter();
  const { getTransaction, updateTransaction } = useTransactionsApi({});
  const { toast } = useToast();
  const { getCategories } = useCategoriesApi();

  const {
    data: transaction,
    isLoading,
    refetch,
  } = useQuery(
    `get-transaction-${query.id}`,
    async () => await getTransaction(query.id as string),
    {
      staleTime: Infinity,
      onSuccess: (value) => {
        setType(value.type);
        const actualDate = `${dayjs(value.date).utc().format("YYYY")}-${dayjs(
          value.date
        ).utc().format("MM")}-${dayjs(value.date).utc().format("DD")}`;
        setDate(actualDate);
      },
    }
  );

  const { data: incomeCategories, isLoading: incomesLoading } = useQuery<
    CategoryType[],
    Error
  >("categories-income", async () => await getCategories({ type: "income" }), {
    staleTime: Infinity,
  });

  const { data: expensiveCategories, isLoading: expensesLoading } = useQuery<
    CategoryType[],
    Error
  >(
    "categories-expensive",
    async () => await getCategories({ type: "expensive" }),
    {
      staleTime: Infinity,
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const amounString = data.get("amount") as string;
      let date = "";

      if (data.get("date")) {
        date = `${data.get("date")}`;
        date = dayjs(date).format("MM/DD/YYYY");
      }
      const newData = {
        category: `${data.get("category")}`,
        amount: parseFloat(amounString),
        description: `${data.get("description")}`,
        type: `${data.get("type")}`,
        date,
      };
      await updateTransaction(query.id as string, newData);
      refetch();
      toast({
        title: "Transaction updated",
        description: "We successfully added your changes",
      });
    } catch (error) {
      toast({
        title: "Something goes wrong",
        description: "We could not update your transaction :(",
      });
    }
  };
  return (
    <section className=" w-[68%] mx-auto  pt-24 mb-20">
      <h1 className="font-bold text-center text-2xl mb-12">
        Update your record
      </h1>
      {!isLoading && !incomesLoading && !expensesLoading && (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="type" className="mb-3 block">
              Type
            </Label>
            <Select
              onValueChange={(value) => setType(value)}
              required
              defaultValue={transaction.type}
              name="type"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <Label htmlFor="category" className="mb-3 block">
              Record category
            </Label>
            {type === "income" && incomeCategories && (
              <Select
                required
                name="category"
                defaultValue={transaction.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="w-full h-40">
                    <SelectGroup>
                      <SelectLabel>Incomes Categories</SelectLabel>
                      {incomeCategories?.map((category) => (
                        <SelectItem
                          key={category.name + category.type}
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            )}

            {type === "expenses" && expensiveCategories && (
              <Select
                required
                name="category"
                defaultValue={transaction.category}
              >
                <SelectTrigger className="w-full overflow-y-auto ">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea>
                    <SelectGroup className=" h-40">
                      <SelectLabel>Expenses Categories</SelectLabel>
                      {expensiveCategories?.map((category) => (
                        <SelectItem
                          key={category.name + category.type}
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="mb-6">
            <Label htmlFor="value" className="mb-3 block">
              Amount
            </Label>
            <Input
              required
              step={0.01}
              defaultValue={transaction.amount}
              name="amount"
              type="number"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="description" className="mb-3 block">
              Description
            </Label>
            <Input
              required
              name="description"
              placeholder="write a little description"
              type="text"
              defaultValue={transaction.description}
              maxLength={100}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="date" className="mb-3 block">
              Date
            </Label>
            <Input required defaultValue={date} name="date" type="date" />
          </div>
          <Button
            type="submit"
            className="w-full mb-4 lg:w-[50%] lg:mx-auto lg:block lg:mb-7"
          >
            Update transaction
          </Button>
          <DeleteTransaction id={query.id as string} />
        </form>
      )}
    </section>
  );
};

export default UpdateTransaction;
