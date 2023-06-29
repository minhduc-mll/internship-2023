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

    public product: Ref<ProductModel> = this.ref(new ProductModel({}));
    public products: Ref<Array<ProductModel>> = this.ref([]);
    public category: Ref<string> = this.ref("Shop");
    public categories: Ref<Array<CategoryModel>> = this.ref([]);
    public dealsProducts: Ref<Array<ProductModel>> = this.ref([]);

    public fetchAllProducts = async () => {
      try {
        const res = await api.get(ApiConst.endpoints.getAllProducts);
        if (res.status === ApiConst.status.ok) {
          const data: any[] = await res.json();
          const products = data.map((value) => {
            // const url = "/product/" + value.title.toLowerCase().split(" ").join("-");
            const url = "/product/" + value.id;
            const product = {
              ...value,
              price: parseFloat(value.price),
              image: value.image.replace("/640/480", "/300/400"),
              star: 5,
              url: url,
            };
            return new ProductModel(product);
          });
          this.products.value = products;
          this.getCategories(products);
          this.getDealsProducts(products);
          return products;
        }
        return [];
      } catch (error) {
        console.log(error);
      }
    };

    public getCategories = async (products: Array<any>) => {
      const productsCategories = products || [];
      const categories: Array<CategoryModel> = [];
      let id = 0;
      productsCategories.forEach((product) => {
        const existing = categories.filter((value) => {
          return value.name == product.category;
        });

        if (existing.length) {
          const existingIndex = categories.indexOf(existing[0]);
          categories[existingIndex].size++;
        } else {
          const categoryUrl = "/" + product.category.toLowerCase();
          categories.push({
            id: id,
            name: product.category,
            size: 1,
            url: categoryUrl,
          });
          id++;
        }
      });
      this.categories.value = categories.map((category) => {
        return new CategoryModel(category);
      });
    };

    public fetchProduct = async (id: string) => {
      try {
        const res = await api.get(ApiConst.endpoints.getProduct.replace(":productId", id));
        if (res.status === ApiConst.status.ok) {
          const data: any = await res.json();
          // const url = "/product/" + data.title.toLowerCase().split(" ").join("-");
          const url = "/product/" + data.id;
          const product = {
            ...data,
            price: parseFloat(data.price),
            image: data.image.replace("/640/480", "/300/400"),
            star: 5,
            url: url,
          };
          this.product.value = product;
          return new ProductModel(product);
        }
        return new ProductModel({});
      } catch (error) {
        console.log(error);
      }
    };

    public getProductByTitle(products: Array<ProductModel>, title: string) {
      if (products.length) {
        const productWithTitle = products.filter((value) => {
          return value.title === title;
        });
        return productWithTitle[0];
      }
      return new ProductModel({});
    }

    public getCategoryByName(categories: Array<CategoryModel>, name: string) {
      if (categories.length) {
        const categoryWithName = categories.filter((value) => {
          return value.name === name;
        });
        return categoryWithName[0];
      }
      return new CategoryModel({});
    }

    public setProduct(product: ProductModel) {
      this.product.value = product;
    }

    public getProductsByCategory = (products: Array<ProductModel>, category: string = "") => {
      if (products.length) {
        if (category !== "" && category.toLowerCase() !== "shop") {
          return products.filter((value) => {
            return value.category.toLowerCase() === category.toLowerCase();
          });
        }
        return products;
      }
      return [];
    };

    public getDealsProducts = async (products: Array<any>, start: number = 0, limit: number = 5) => {
      const productsDeals = products || [];
      const filterProducts = productsDeals
        .filter((value) => {
          return value.deals;
        })
        .filter((_, index) => {
          return index >= start && index < start + limit;
        });
      this.dealsProducts.value = filterProducts;
    };

    public getFilterProducts = (products: Array<ProductModel>, start: number = 0, limit: number = 18) => {
      if (products.length) {
        return products.filter((_, index) => {
          return index >= start && index < start + limit;
        });
      }
      return [];
    };

    public getSortedProducts = (products: Array<any>, key = "id" as keyof ProductModel, sortDir: string = "asc") => {
      if (products.length) {
        if (sortDir.toLowerCase() === "desc") {
          return products.sort((a, b) => {
            return b[key] - a[key];
          });
        } else {
          return products.sort((a, b) => {
            return a[key] - b[key];
          });
        }
      }
      return [];
    };
  },
);
