interface Record {
  category: string;
  description: string;
  _id: string;
  amount: number;
  type: string;
  date: Date
}

type RecordsProps = {
  date: string;
  records: Record[];
};

import TransactionItem from "./TransactionItem";

const TransictionsRecord = ({ date, records }: RecordsProps) => {
  return (
    <>
      <article className="w-[79%] mx-auto mb-10">
        <h3 className="text-medium text-xl border-b pb-1 px-[0.2rem] mb-6">
          {date}
        </h3>

        {records.map((record) => (
          <TransactionItem key={record._id} {...record} />
        ))}
      </article>
    </>
  );
};

export default TransictionsRecord;
