import React from 'react';
import ProductsTable from '../../Products/ProductsTable/ProductsTable';
//import ProductForm from '../components/Products/ProductForm';
import LayoutComponent from '../../layout/index';

const ProductsPage = () => {
    return (
        <LayoutComponent
            leftColSize={{ xs: 24, sm: 24, md: 8, lg: 6 }}
            rightColSize={{ xs: 24, sm: 24, md: 16, lg: 18 }}
            leftContent={<ProductForm />}
            rightContent={<ProductsTable />}
        />
    );
};

export default ProductsPage;
