import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENV } from '../../../utils/constants';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`${ENV.CRUD_API_URL}/${ENV.CRUD_ENDPOINTS.GET_DATA}`);
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        await axios.delete(`${ENV.CRUD_API_URL}/${ENV.CRUD_ENDPOINTS.DELETE_DATA}/${id}`);
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>
                            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                            {/* Aquí puedes agregar otros botones de acción como Editar */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
