import { makeApiCallAuthenticated } from './helpers';

export const CreateProduct = (payload) => makeApiCallAuthenticated('POST', 'product', payload);
export const GetProducts = () => makeApiCallAuthenticated('GET', 'product', {});
export const DeleteProduct = (id) => makeApiCallAuthenticated('DELETE', `product/${id}`, {});

export const GetProductCategory = () => makeApiCallAuthenticated('GET', 'product/category', {});
export const CreateProductCategory = (payload) => makeApiCallAuthenticated('POST', 'product/category', payload);
export const DeleteProductCategory = (id) => makeApiCallAuthenticated('DELETE', `product/category/${id}`, {});

export const CreateProductSubCategory = (payload) => makeApiCallAuthenticated('POST', 'product/subcategory', payload);
export const GetProductSubCategory = (query) => makeApiCallAuthenticated('GET', `product/subcategory/?${query}`, {});
export const DeleteProductSubCategory = (id) => makeApiCallAuthenticated('DELETE', `product/subcategory/${id}`, {});
