import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FilterForm from "./FilterForm";

type IProps = {
  setDates: (dates: Record<string, string>) => void;
};

const FilterComponent = ({ setDates }: IProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  function onSubmit(data: Record<string, string>) {
    setDates(data);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <button className="border-[1.4px] md:absolute md:top-[45%] md:translate-y-[-60%] right-0 text-sm border-white py-[0.2rem] px-5 rounded-full">
          Filters
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transactions filter</DialogTitle>
          <DialogDescription>
            Find specific transactions searching between two dates, by default
            the filter takes all the days of actual month.
          </DialogDescription>
        </DialogHeader>
        <FilterForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default FilterComponent;
