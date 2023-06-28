import type { Ref } from "vue";
import { BaseStore, defineClassStore } from "@/plugins/store.plugin";
import { Api } from "@/plugins/api.plugin";
import { ApiConst } from "@/const/api.const";
import { ProductModel } from "@/models/product.model";
import { CategoryModel } from "@/models/category.model";

export const api = new Api();

export const useProductsStore = defineClassStore(
  class Store extends BaseStore {
    public name: string = "products";

    public products: Ref<Array<ProductModel>> = this.ref([]);
    public categories: Ref<Array<CategoryModel>> = this.ref([]);

    public getAllProducts = async () => {
      try {
        const res = await api.get(ApiConst.endpoints.getProducts);
        if (res.status === ApiConst.status.ok) {
          const data: any[] = await res.json();
          const products = data.map((value) => {
            const product = {
              ...value,
              price: parseFloat(value.price),
              image: value.image.replace("/640/480", "/300/400"),
              star: 5,
              url: "",
            };
            return new ProductModel(product);
          });
          return products;
        }
        return [];
      } catch (error) {
        console.log(error);
      }
    };

    public getProducts = async () => {
      try {
        const products = (await this.getAllProducts()) || [];
        this.products.value = products;
      } catch (error) {
        console.log(error);
      }
    };

    public getProductsCategory = async (category: string) => {
      try {
        const products = (await this.getAllProducts()) || [];
        const filterProducts = products.filter((value) => {
          return value.category === category;
        });
        this.products.value = filterProducts;
      } catch (error) {
        console.log(error);
      }
    };

    public getCategories = async () => {
      try {
        const products = (await this.getAllProducts()) || [];
        const categories: Array<CategoryModel> = [];
        let id = 0;
        products.forEach((product) => {
          const existing = categories.filter((value) => {
            return value.name == product.category;
          });

          if (existing.length) {
            const existingIndex = categories.indexOf(existing[0]);
            categories[existingIndex].size++;
          } else {
            categories.push({
              id: id,
              name: product.category,
              size: 1,
              url: "",
            });
            id++;
          }
        });
        this.categories.value = categories.map((category) => {
          return new CategoryModel(category);
        });
      } catch (error) {
        console.log(error);
      }
    };
  },
);
