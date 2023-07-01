import type { Product } from "@/models/base.model";
import type { CartProduct } from "@/models/base.model";

export class ApiConst {
  public static endpoints = {
    getAllProducts: "/products",
    getProduct: "/products/:productId",
  };

  public static status = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalError: 500,
    serviceUnavailable: 503,
  };
}

export type GetApi = { uri: string };
