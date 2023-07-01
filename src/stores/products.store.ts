import type { Ref } from "vue";
import { BaseStore, defineClassStore } from "@/plugins/store.plugin";
import { Api } from "@/plugins/api.plugin";
import { ApiConst } from "@/const/api.const";
import { ProductModel } from "@/models/product.model";
import { CategoryModel } from "@/models/category.model";
import { PrimitiveHelper } from "@/helpers/primitive.helper";

export const api = new Api();

export const useProductsStore = defineClassStore(
  class Store extends BaseStore {
    public name: string = "products";

    public product: Ref<ProductModel> = this.ref(new ProductModel({}));
    public products: Ref<Array<ProductModel>> = this.ref([]);
    public category: Ref<CategoryModel> = this.ref(new CategoryModel({}));
    public categories: Ref<Array<CategoryModel>> = this.ref([]);
    public dealsProducts: Ref<Array<ProductModel>> = this.ref([]);

    public fetchAllProducts = async () => {
      try {
        const res = await api.get(ApiConst.endpoints.getAllProducts);
        if (res.status === ApiConst.status.ok) {
          const data: any[] = await res.json();
          const products = data.map((data) => {
            const url = "/shop/" + data.category.toLowerCase() + "/" + data.title.toLowerCase().split(" ").join("-");
            const product = {
              ...data,
              price: parseFloat(data.price),
              image: data.image.replace("/640/480", "/300/400"),
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
      let id = 1;
      productsCategories.forEach((product) => {
        const existing = categories.filter((value) => {
          return value.name == product.category;
        });

        if (existing.length) {
          const existingIndex = categories.indexOf(existing[0]);
          categories[existingIndex].size++;
        } else {
          const categoryUrl = "/shop/" + product.category.toLowerCase();
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
          const url = "/shop/" + data.category.toLowerCase() + "/" + data.title.toLowerCase().split(" ").join("-");
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

    public getProductByTitle = (products: Array<ProductModel>, title: string) => {
      if (products.length) {
        const productWithTitle = products.filter((value) => {
          return value.title === title;
        });
        if (productWithTitle.length) {
          return productWithTitle[0];
        }
      }
      return new ProductModel({});
    };

    public setProductByTitle = (products: Array<ProductModel>, title: string) => {
      let product = new ProductModel({});
      if (products.length) {
        const productWithTitle = products.filter((value) => {
          return value.title === title;
        });
        if (productWithTitle.length) {
          product = productWithTitle[0];
        }
      }
      this.product.value = product;
    };

    public getCategoryByName = (categories: Array<CategoryModel>, name: string) => {
      if (categories.length) {
        const categoryWithName = categories.filter((value) => {
          return value.name.toLowerCase() === name.toLowerCase();
        });
        if (categoryWithName.length) {
          return categoryWithName[0];
        }
      }
      return new CategoryModel({});
    };

    public setCategoryByName = (categories: Array<CategoryModel>, name: string) => {
      let category = new CategoryModel({});
      if (categories.length) {
        const categoryWithName = categories.filter((value) => {
          return value.name.toLowerCase() === name.toLowerCase();
        });
        if (categoryWithName.length) {
          category = categoryWithName[0];
        }
      }
      this.category.value = category;
    };

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

    public getFilterProducts = (
      products: Array<ProductModel>,
      start: number = 0,
      limit: number = 18,
      exceptProduct?: ProductModel,
    ) => {
      if (products.length) {
        if (exceptProduct) {
          return products.filter((value, index) => {
            return index >= start && index < start + limit && value !== exceptProduct;
          });
        }
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