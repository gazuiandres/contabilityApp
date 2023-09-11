import useAxiosAuth from "@/lib/axios/hooks/useAxiosAuth";
import { CategoryType } from "@/types/categories.type";
const BASE_URL: string = "/categories";


const useCategoriesApi = () => {
  const axios = useAxiosAuth();

  const getCategories = async (type: Record<string, string>): Promise<CategoryType[]> => {
    const params = new URLSearchParams(type).toString();
    const { data } = await axios.get(`${BASE_URL}?${params}`);
    return data;
  };

  return { getCategories };
};

export default useCategoriesApi;
