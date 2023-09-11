import React, { useState } from "react";
import { useQuery } from "react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import useCategoriesApi from "@/services/categories.service";
import { CategoryType } from "@/types/categories.type";

type Iprops = {
  onSubmit: (data: any) => void;
};

const AddRecordComponent = ({ onSubmit }: Iprops) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("income");

  const { toast } = useToast();
  const { getCategories } = useCategoriesApi();

  const { data: incomeCategories } = useQuery<CategoryType[], Error>(
    "categories-income",
    async () => await getCategories({ type: "income" }),
    {
      staleTime: Infinity,
    }
  );

  const { data: expensiveCategories } = useQuery<CategoryType[], Error>(
    "categories-expensive",
    async () => await getCategories({ type: "expensive" }),
    {
      staleTime: Infinity,
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amounString = data.get("amount") as string;
    onSubmit({
      category: data.get("category"),
      amount: parseFloat(amounString),
      description: data.get("description"),
      type: data.get("type"),
      date: data.get("date"),
    });
    setOpen(false);
    toast({
      title: "Transaction created",
      description: "We add your transaction successfully.",
    });
    event.currentTarget.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border-2 border-white rounded-full fixed right-3 flex justify-center items-center bottom-20 w-10 h-10 md:right-6 md:bottom-28 md:w-16 md:h-16 xl:w-14 xl:h-14 xl:right-10 xl:bottom-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="icons/addIcon.svg"
            className="w-[50%] object-cover"
            alt="Add Icon"
          />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
          <DialogDescription>
            {/* This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. */}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="type" className="mb-3 block">
              Type
            </Label>
            <Select
              onValueChange={(value) => setType(value)}
              required
              defaultValue={type}
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
              Category
            </Label>
            {type === "income" && incomeCategories && (
              <Select required name="category">
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
              <Select required name="category">
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
            <Input required step={0.01} min={1} name="amount" type="number" />
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
              maxLength={100}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="date" className="mb-3 block">
              Date
            </Label>
            <Input required name="date" type="date" />
          </div>
          <Button type="submit" className="w-full">
            Save transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordComponent;
