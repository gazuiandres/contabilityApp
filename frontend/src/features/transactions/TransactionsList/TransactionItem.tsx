import React from "react";
import Link from "next/link";
import Image from "next/image";

type IProps = {
  category: string;
  description: string;
  _id: string;
  amount: number;
  type: string;
  date: Date;
};

import { formatValue } from "@/utils/formatNumber";

const TransactionItem = (record: IProps) => {
  return (
    <section
      key={record._id}
      className="w-[85%] mx-auto mb-6 border-b pb-1 relative flex justify-between items-center"
    >
      <div>
        <p className="text-sm font-medium">{record.category}</p>
        <p className="text-xs font-thin">{record.description}</p>
      </div>
      <span
        className={`text-sm ${
          record.type === "income" ? "text-greenIncome" : "text-redExpensive"
        }`}
      >
        {record.type === "income" ? "+ " : "- "}${formatValue(record.amount)}
      </span>
      <Link
        className="absolute top-[-11px] right-0"
        href={`/transactions/${record._id}`}
      >
        <Image
          src="/icons/editIcon.svg"
          width={15}
          height={15}
          className=" object-cover"
          alt="Edit icon"
        />
      </Link>
    </section>
  );
};

export default TransactionItem;
