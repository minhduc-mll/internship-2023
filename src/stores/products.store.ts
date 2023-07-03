import type { Ref } from "vue";
import { BaseStore, defineClassStore } from "@/plugins/store.plugin";
import { Api } from "@/plugins/api.plugin";
import { ApiConst } from "@/const/api.const";
import { ProductModel } from "@/models/product.model";
import { CategoryModel } from "@/models/category.model";
import { PrimitiveHelper } from "@/helpers/primitive.helper";
import { indexOf } from "lodash";

export const api = new Api();

export const useProductsStore = defineClassStore(
  class Store extends BaseStore {
    public name: string = "products";

    public shoppingCartKey = "productsCart";

    public product: Ref<ProductModel> = this.ref(new ProductModel({}));
    public products: Ref<Array<ProductModel>> = this.ref([]);
    public category: Ref<CategoryModel> = this.ref(new CategoryModel({}));
    public categories: Ref<Array<CategoryModel>> = this.ref([]);
    public dealsProducts: Ref<Array<ProductModel>> = this.ref([]);
    public productsCart: Ref<Array<any>> = this.ref([]);

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
              star: PrimitiveHelper.getRandomInRange(1, 5.49, 0),
              url: url,
            };
            return new ProductModel(product);
          });
          this.products.value = products;
          this.getCategories();
          this.getDealsProducts();
          return products;
        }
        return [];
      } catch (error) {
        console.log(error);
      }
    };

    public getCategories = () => {
      const products = this.products.value;
      const categories: Array<CategoryModel> = [];
      let id = 1;
      products.forEach((product) => {
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

    public getProductByTitle = (title: string) => {
      const products = this.products.value;
      const productWithTitle = products.filter((value) => {
        return value.title === title;
      });
      if (productWithTitle.length) {
        return productWithTitle[0];
      }
      return new ProductModel({});
    };

    public setProductByTitle = (title: string) => {
      const products = this.products.value;
      let product = new ProductModel({});
      const productWithTitle = products.filter((value) => {
        return value.title === title;
      });
      if (productWithTitle.length) {
        product = productWithTitle[0];
      }
      this.product.value = product;
    };

    public getCategoryByName = (name: string) => {
      const categories = this.categories.value;
      const categoryWithName = categories.filter((value) => {
        return value.name.toLowerCase() === name.toLowerCase();
      });
      if (categoryWithName.length) {
        return categoryWithName[0];
      }
      return new CategoryModel({});
    };

    public setCategoryByName = (name: string) => {
      const categories = this.categories.value;
      let category = new CategoryModel({});
      const categoryWithName = categories.filter((value) => {
        return value.name.toLowerCase() === name.toLowerCase();
      });
      if (categoryWithName.length) {
        category = categoryWithName[0];
      }
      this.category.value = category;
    };

    public getProductsByCategory = (category?: string) => {
      const filterCategory = category || this.category.value.name;
      const products = this.products.value;
      if (filterCategory !== "" && filterCategory.toLowerCase() !== "shop") {
        return products.filter((value) => {
          return value.category.toLowerCase() === filterCategory.toLowerCase();
        });
      }
      return products;
    };

    public getDealsProducts = (start: number = 0, limit: number = 5) => {
      const products = this.products.value;
      const filterProducts = products
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
      if (exceptProduct) {
        return products.filter((value, index) => {
          return index >= start && index < start + limit && value !== exceptProduct;
        });
      }
      return products.filter((_, index) => {
        return index >= start && index < start + limit;
      });
    };

    public getSortedProducts = (products: Array<any>, key = "id" as keyof ProductModel, sortDir: string = "asc") => {
      if (sortDir.toLowerCase() === "desc") {
        return products.sort((a, b) => {
          return b[key] - a[key];
        });
      }
      return products.sort((a, b) => {
        return a[key] - b[key];
      });
    };

    public getShoppingCart = () => {
      const productsJson = localStorage.getItem(this.shoppingCartKey);
      if (productsJson) {
        const productsCart = JSON.parse(productsJson);
        this.productsCart.value = productsCart;
      }
    };

    public addShoppingCart = (product: ProductModel) => {
      this.getShoppingCart();
      const products = this.productsCart.value;
      const existing = products.filter((value) => {
        return value.id === product.id;
      });
      if (existing.length) {
        const existingIndex = products.indexOf(existing[0]);
        products[existingIndex].quantity++;
      } else {
        products.push({
          ...product,
          quantity: 1,
        });
      }
      this.saveLocalStorage();
    };

    public editShoppingCart = () => {
      this.getShoppingCart();
      this.saveLocalStorage();
    };

    public removeShoppingCart = (product: ProductModel) => {
      this.getShoppingCart();
      this.productsCart.value = this.productsCart.value.filter((value) => {
        return value.id !== product.id;
      });
      this.saveLocalStorage();
    };

    public saveLocalStorage = () => {
      localStorage.setItem(this.shoppingCartKey, JSON.stringify(this.productsCart.value));
    };
  },
);
