import { BaseModel } from "./base.model";

export class ProductModel extends BaseModel implements IProduct {
  public id: number;
  public category: string;
  public image: string;
  public title: string;
  public desc: string;
  public price: number;
  public deals: boolean;
  public star: number;
  public url: string;

  public constructor(data: any) {
    super();
    this.id = data.id || -1;
    this.category = data.category || "";
    this.image = data.image || "";
    this.title = data.title || "";
    this.desc = data.desc || "";
    this.price = data.price || 0;
    this.deals = data.deals || false;
    this.star = data.star || 5;
    this.url = data.url || "";
  }
}

export interface IProduct {
  id: number;
  category: string;
  image: string;
  title: string;
  desc: string;
  price: number;
  deals: boolean;
  star: number;
  url: string;
}
