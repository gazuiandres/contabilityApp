type TransactionsMenuProps = {
  children: React.ReactElement[];
};

const TransactionsMenu = ({
  children,
}: TransactionsMenuProps): JSX.Element => {
  return (
    <div className=" w-[79%] border-b-[1.4px] max-w-[700px] mx-auto flex justify-around pb-2 relative mb-12">
      {children}
    </div>
  );
};

export default TransactionsMenu;
