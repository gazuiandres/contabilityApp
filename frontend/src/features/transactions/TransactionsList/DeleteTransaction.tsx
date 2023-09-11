import { useState } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useToast } from "@/components/ui/use-toast";
import useTransactionsApi from "@/services/transactions.service";

type IProps = {
  id: string;
};

const DeleteTransaction = ({ id }: IProps) => {
  const [open, setOpen] = useState(false);

  const { deleteTransaction } = useTransactionsApi({});
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await deleteTransaction(id);
      toast({
        title: "Transaction deleted",
        description:
          "We successfully delete your transaction. Now you'll be redirected to home page.",
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      toast({
        title: "Something goes wrong",
        description: "We could not delete your transaction :(",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className=" w-full border-redExpensive text-redExpensive lg:w-[50%] lg:mx-auto lg:block lg:hover:bg-redExpensive"
          variant="outline"
        >
          Delete transaction
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[70%] mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want delete?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction?. If yes, please
            click on delete button.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="mb-4 bg-redExpensive hover:bg-redExpensive text-white md:mb-0"
          >
            Delete transaction
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransaction;
