import useAxiosAuth from "@/lib/axios/hooks/useAxiosAuth";
import { TransactionType } from "@/types/transaction.type";
const BASE_URL: string = "/transactions";

const useTransactionsApi = (days: Record<string, string>) => {
  const axios = useAxiosAuth();

  const getTransactions = async () => {
    const params = new URLSearchParams(days).toString();
    const { data } = await axios.get(`${BASE_URL}?${params}`);
    return data;
  };

  const getTransaction = async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data;
  };

  const createTransaction = async (newTransaction: any) => {
    const { data } = await axios.post(`${BASE_URL}`, newTransaction);
    return data;
  };

  const getAnalysis = async (queries: any) => {
    const params = new URLSearchParams(queries).toString();
    const { data } = await axios.get(`${BASE_URL}/analytics?${params}`);
    return data;
  };

  const updateTransaction = async (id: string, changes: TransactionType) => {
    const { data } = await axios.put(`${BASE_URL}/${id}`, changes);
    return data;
  };

  const deleteTransaction = async (id: string) => {
    const { data } = await axios.delete(`${BASE_URL}/${id}`);
    return data;
  };

  return {
    getTransactions,
    createTransaction,
    getAnalysis,
    getTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

export default useTransactionsApi;
