import type { Ref } from "vue";
import { BaseStore, defineClassStore } from "@/plugins/store.plugin";
import type { ProductModel } from "@/models/product.model";

export const useShoppingCartStore = defineClassStore(
  class Store extends BaseStore {
    public name: string = "shoppingCart";

    public isActive: Ref<boolean> = this.ref(false);
    public productsCart: Ref<Array<any>> = this.ref([]);
    public showMessage = this.reactive({ value: false, message: "" });

    public getShoppingCart = () => {
      const productsJson = localStorage.getItem(this.name);
      if (productsJson) {
        const productsCart = JSON.parse(productsJson);
        this.productsCart.value = productsCart;
      }
    };

    public getTotalProductsCart = () => {
      let total = 0;
      this.productsCart.value.forEach((value) => {
        total += value.quantity;
      });
      return total;
    };

    public getTotalCartAmount = () => {
      let total = 0;
      this.productsCart.value.map((product) => {
        if (product.deals) {
          total += product.quantity * (product.price * 0.8);
        } else {
          total += product.quantity * product.price;
        }
      });
      return total.toFixed(2);
    };

    public addShoppingCart = (product: ProductModel, quantity: number = 1) => {
      this.getShoppingCart();
      const products = this.productsCart.value;
      const existing = products.find((value) => {
        return value.id === product.id;
      });
      if (existing) {
        const existingIndex = products.indexOf(existing);
        products[existingIndex].quantity += quantity;
      } else {
        products.push({
          ...product,
          quantity: quantity,
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
      localStorage.setItem(this.name, JSON.stringify(this.productsCart.value));
      this.getShoppingCart();
    };

    public setActiveShoppingCart = (active: boolean) => {
      this.isActive.value = active;
    };
  },
);
