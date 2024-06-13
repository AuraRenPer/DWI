import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Input, Switch } from 'antd';
import { ENV } from '../../../utils/constants';
import './ProductsTable.css'; // Asegúrate de que la ruta sea correcta

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newName, setNewName] = useState('');
    const [newActivo, setNewActivo] = useState(false); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISION}`);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setError('La respuesta de la API no es un arreglo');
                }
            } catch (err) {
                setError('Error al obtener los datos de la API');
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${ENV.API_URL}/${ENV.ENDPOINTS.DELETE}/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (err) {
            setError('Error al eliminar el producto');
            console.error(err);
        }
    };

    const confirmDeleteProduct = (id) => {
        Modal.confirm({
            title: '¿Está seguro que desea eliminar este producto?',
            content: 'Esta acción no se puede deshacer.',
            onOk: () => deleteProduct(id),
            onCancel: () => console.log('Cancelado'),
        });
    };

    const addProduct = async () => {
        try {
            const response = await axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISION}`, {
                nombre: newName,
                activo: newActivo,
            });
            setProducts([...products, response.data]); // Agregar el nuevo producto a la lista
            setIsModalVisible(false);
            setNewName('');
            setNewActivo(false);
        } catch (err) {
            setError('Error al agregar el producto');
            console.error(err);
        }
    };

    const updateProduct = async () => {
        try {
            await axios.put(`${ENV.API_URL}/${ENV.ENDPOINTS.DELETE}/${currentProduct._id}`, {
                nombre: newName,
                activo: newActivo,
            });
            setProducts(products.map(product => product._id === currentProduct._id ? { ...product, nombre: newName, activo: newActivo } : product));
            setIsModalVisible(false);
            setNewName('');
            setNewActivo(false);
        } catch (err) {
            setError('Error al actualizar el producto');
            console.error(err);
        }
    };

    const showModal = (mode, product) => {
        if (mode === 'edit') {
            setCurrentProduct(product);
            setNewName(product.nombre);
            setNewActivo(product.activo);
        } else {
            setCurrentProduct(null);
            setNewName('');
            setNewActivo(false); 
        }
        setModalMode(mode);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (modalMode === 'add') {
            addProduct();
        } else if (modalMode === 'edit' && currentProduct) {
            updateProduct();
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNewName('');
        setNewActivo(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="table-container">
            <button className="add-button" onClick={() => showModal('add', null)}>Agregar</button>
            <table className="formato-tabla">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha de creación</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.nombre}</td>
                            <td>{formatDate(product.createdAt)}</td>
                            <td>{product.activo ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button onClick={() => confirmDeleteProduct(product._id)}>Eliminar</button>
                                <button onClick={() => showModal('edit', product)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                title={modalMode === 'add' ? 'Agregar Producto' : 'Editar Producto'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre del producto" />
                <br /><br />
                <label>Activo:</label>
                <Switch checked={newActivo} onChange={(checked) => setNewActivo(checked)} />
            </Modal>
        </div>
    );
};

export default ProductsTable;
