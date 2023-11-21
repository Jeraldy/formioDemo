import { makeApiCallAuthenticated } from './helpers';

export const CreateProduct = (token, payload) => makeApiCallAuthenticated('POST', 'product', payload, token);
export const GetProducts = (token) => makeApiCallAuthenticated('GET', 'product', {}, token);
export const DeleteProduct = (token, id) => makeApiCallAuthenticated('DELETE', `product/${id}`, {}, token);

export const GetProductCategory = (token) => makeApiCallAuthenticated('GET', 'product/category', {}, token);
export const CreateProductCategory = (token, payload) => makeApiCallAuthenticated('POST', 'product/category', payload, token);
export const DeleteProductCategory = (token, id) => makeApiCallAuthenticated('DELETE', `product/category/${id}`, {}, token);

export const CreateProductSubCategory = (token, payload) => makeApiCallAuthenticated('POST', 'product/subcategory', payload, token);
export const GetProductSubCategory = (token, query) => makeApiCallAuthenticated('GET', `product/subcategory/?${query}`, {}, token);
export const DeleteProductSubCategory = (token, id) => makeApiCallAuthenticated('DELETE', `product/subcategory/${id}`, {}, token);
