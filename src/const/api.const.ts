import type { Product } from "@/models/base.model";
import type { CartProduct } from "@/models/base.model";

export class ApiConst {
  public static endpoints = {
    getAllProducts: "/products",
    getProduct: "/products/:productId",
  };

  public static status = {
    ok: 200,
  };

  public static product: Product = {
    id: 1,
    image:
      "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-17-400x533.jpg",
    title: "Donna gold frame glasses",
    price: 48.0,
    deals: 40.0,
    star: 5,
    url: "",
  };

  public static products: Array<Product> = [
    {
      id: 1,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Allice gold necklace",
      price: 129.99,
      deals: 0,
      star: 5,
      url: "",
    },
    {
      id: 2,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Allure black watch",
      price: 129.99,
      deals: 0,
      star: 5,
      url: "",
    },
    {
      id: 3,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Alnich night dress navy",
      price: 199.99,
      deals: 0,
      star: 5,
      url: "",
    },
    {
      id: 4,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Benne long sleeve shirt black",
      price: 87.99,
      deals: 0,
      star: 5,
      url: "",
    },
    {
      id: 5,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Black high heels shoes",
      price: 69.99,
      deals: 0,
      star: 5,
      url: "",
    },
    {
      id: 6,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Chloe tortoise eyewear",
      price: 64.9,
      deals: 0,
      star: 5,
      url: "",
    },
    {
      id: 7,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Claire high heels shoes",
      price: 64.9,
      deals: 0,
      star: 5,
      url: "",
    },
    {
      id: 8,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-6-400x533.jpg",
      title: "Classic pant white",
      price: 89.99,
      deals: 80.0,
      star: 5,
      url: "",
    },
    {
      id: 9,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-17-400x533.jpg",
      title: "Donna gold frame glasses",
      price: 48.0,
      deals: 40.0,
      star: 5,
      url: "",
    },
    {
      id: 10,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Dora black gradient eyewear",
      price: 48.99,
      deals: 0,
      star: 5,
      url: "",
    },
  ];

  public static dealsProducts: Array<Product> = [
    {
      id: 1,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-17-400x533.jpg",
      title: "Donna gold frame glasses",
      price: 48.0,
      deals: 40.0,
      star: 5,
      url: "",
    },
    {
      id: 2,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-2-400x533.jpg",
      title: "Noorin gold ring watch",
      price: 199.99,
      deals: 99.99,
      star: 5,
      url: "",
    },
    {
      id: 3,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-6-400x533.jpg",
      title: "Classic pant white",
      price: 89.99,
      deals: 80.0,
      star: 5,
      url: "",
    },
    {
      id: 4,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Gold night party dress",
      price: 99.99,
      deals: 74.99,
      star: 5,
      url: "",
    },
  ];

  public static cartProducts: Array<CartProduct> = [
    {
      id: 1,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-17-400x533.jpg",
      title: "Donna gold frame glasses",
      price: 48.0,
      quantity: 2,
      url: "",
    },
    {
      id: 2,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-2-400x533.jpg",
      title: "Noorin gold ring watch",
      price: 199.99,
      quantity: 1,
      url: "",
    },
    {
      id: 3,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-6-400x533.jpg",
      title: "Classic pant white",
      price: 89.99,
      quantity: 1,
      url: "",
    },
    {
      id: 4,
      image:
        "https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-product-img-12-400x533.jpg",
      title: "Gold night party dress",
      price: 99.99,
      quantity: 1,
      url: "",
    },
  ];
}

export type GetApi = { uri: string };
