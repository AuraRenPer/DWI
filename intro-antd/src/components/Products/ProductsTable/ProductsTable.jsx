import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button, Input, Switch } from 'antd';
import { ENV } from '../../../utils/constants';
import './ProductsTable.css'; // Asegúrate de que la ruta sea correcta
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
    const { token } = useContext(AuthContext);

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

    const addProduct = async (values) => {
        setLoading(true);

        try {
            if (token) {
                console.log('Token:', token);
                console.log('Datos del formulario:', values);
                // Aquí deberías implementar el POST a tu API, incluyendo el token en los headers
                await authService.addProduct(values.newName, values.newActivo, token);
            } else {
                console.error('Token no encontrado');
                setRegisterError(true);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error en el registro:', error.response.data);
            } else {
                console.error('Error en el registro:', error.message);
            }
            setRegisterError(true);
        } finally {
            setLoading(false); // Establece el estado de carga a false después de recibir cualquier respuesta
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
        const values = {
            newName,
            newActivo,
        };

        if (modalMode === 'add') {
            addProduct(values);
        } else if (modalMode === 'edit' && currentProduct) {
            // updateProduct(values); // Asegúrate de implementar updateProduct si no lo tienes
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
