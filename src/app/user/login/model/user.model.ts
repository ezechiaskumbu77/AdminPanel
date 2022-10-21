export interface User {
  _id?; string,
  name?: string,
  email?: string,
  role: RoleEnum,
  isShopmanager: boolean,
  isDeliverCorp: boolean,
  createdAt: string,
  phone: string,
  photo_url: string,
  address: string,
  sexe: SexEnum,
  place: string,
  isAdmin: boolean,
  hasShop: string,
  geoLoc: string,
}

export enum RoleEnum {
  SHOPMANAGER = 'shopmanager',
  SHOPOWNER = 'shopowner',
  USER = 'user',
  DELIVERBOY = 'deliverboy',
  DELIVERMANAGER = 'delivermanager',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin'
}

export enum SexEnum {
  MALE = 'M',
  FEMALE = 'F'
}
