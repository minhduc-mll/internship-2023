import { BaseModel } from "./base.model";

export class CategoryModel extends BaseModel implements ICategory {
  public id: number;
  public name: string;
  public size: number;
  public url: string;

  public constructor(data: any) {
    super();
    this.id = data.id || -1;
    this.name = data.name || "";
    this.size = data.size || 0;
    this.url = data.url || "";
  }
}

export interface ICategory {
  id: number;
  name: string;
  size: number;
  url: string;
}
