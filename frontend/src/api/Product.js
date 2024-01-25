import { makeApiCallAuthenticated } from './helpers';

export const CreateProduct = (payload) => makeApiCallAuthenticated('POST', 'product', payload);
export const UpdateProduct = (id, payload) => makeApiCallAuthenticated('PATCH',`product/${id}`, payload);
export const GetProducts = () => makeApiCallAuthenticated('GET', 'product', {});
export const DeleteProduct = (id) => makeApiCallAuthenticated('DELETE', `product/${id}`, {});

export const GetProductCategory = () => makeApiCallAuthenticated('GET', 'product/category', {});
export const CreateProductCategory = (payload) => makeApiCallAuthenticated('POST', 'product/category', payload);
export const DeleteProductCategory = (id) => makeApiCallAuthenticated('DELETE', `product/category/${id}`, {});
export const UpdateProductCategory = (id, payload) => makeApiCallAuthenticated('PATCH',`product/category/${id}`, payload);

export const CreateProductSubCategory = (payload) => makeApiCallAuthenticated('POST', 'product/subcategory', payload);
export const GetProductSubCategory = (query) => makeApiCallAuthenticated('GET', `product/subcategory/?${query}`, {});
export const DeleteProductSubCategory = (id) => makeApiCallAuthenticated('DELETE', `product/subcategory/${id}`, {});
export const UpdateProductSubCategory = (id, payload) => makeApiCallAuthenticated('PATCH',`product/subcategory/${id}`, payload);


export const CreateProductSell = (payload) => makeApiCallAuthenticated('POST', 'product/sell', payload);
export const GetProductSell = (query) => makeApiCallAuthenticated('GET', `product/sell/?${query}`, {});
export const DeleteProductSell = (id) => makeApiCallAuthenticated('DELETE', `product/sell/${id}`, {});
