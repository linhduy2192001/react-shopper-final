import { productService } from "@/services/product";
import { useQuery } from "./useQuery";

export const useCategories = () => {
  return useQuery({
    queryKey: [""],
    queryFn: () => productService.getCategories(),
  });
};

export const useCategory = (id) => {
  const categories = useCategories();

  return categories?.data?.data?.find((e) => e.id == id);
};
