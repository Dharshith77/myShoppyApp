import api from "./api";
import { Product } from "../types/product";
import { categories } from "../data/categories";
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products?limit=194");
  return response.data.products;
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products;
};
export const getCategoryThumbnails = async () => {
  const updatedCategories = await Promise.all(
    categories.map(async (category) => {
      try {
        const response = await api.get(
          `/products/category/${category.slug}?limit=1`,
        );

        return {
          ...category,
          thumbnail: response.data.products[0].thumbnail,
        };
      } catch {
        return category;
      }
    }),
  );

  return updatedCategories;
};
export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data.products;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
