import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button, Input, Switch } from 'antd';
import { ENV } from '../../../utils/constants';
import './ProductsTable.css';
import authService from '../../../services/admisiones';
import { AuthContext } from '../../context/AuthContext';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newName, setNewName] = useState('');
    const [newActivo, setNewActivo] = useState(false);

    // Estado de error de registro
    const [registroError, setRegisterError] = useState(false);
    // Estado de carga 
    const [loading, setLoading] = useState(false);

    // Contexto de autenticación
    const { user, token } = useContext(AuthContext);

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (values) => {
        setLoading(true);
        try {
            await authService.addProduct(values.newName, values.newActivo, token);
            fetchProducts();
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const editProduct = async (id, values) => {
        setLoading(true);
        try {
            await authService.editProduct(id, values.newName, values.newActivo, token);
            fetchProducts();
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await authService.deleteProduct(id, token);
            fetchProducts();
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApiError = (error) => {
        if (error.response) {
            console.error('Error:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        setRegisterError(true);
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
        const values = {
            newName,
            newActivo,
        };

        if (modalMode === 'add') {
            addProduct(values);
        } else if (modalMode === 'edit' && currentProduct) {
            editProduct(currentProduct._id, values);
        }

        setIsModalVisible(false);
        setNewName('');
        setNewActivo(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNewName('');
        setNewActivo(false);
    };

    const confirmDeleteProduct = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            deleteProduct(id);
        }
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
            {user && <button className="add-button" onClick={() => showModal('add', null)}>Agregar</button>}
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
                                {user && (
                                    <>
                                        <button onClick={() => confirmDeleteProduct(product._id)}>Eliminar</button>
                                        <button onClick={() => showModal('edit', product)}>Editar</button>
                                    </>
                                )}
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
