import React, { useEffect, useState } from 'react';
import {FaTrash, FaEdit, FaSave,FaEye ,FaTimes,FaUpload} from 'react-icons/fa';
import Swal from 'sweetalert2';
import './ProductPage.css'

const API_URL = '/api/admin';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const indexOfLastProduct = currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / pageSize);
    const [editId, setEditId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    const [categories, setCategories] = useState([]);
    const [viewVariantsProduct, setViewVariantsProduct] = useState(null);

    const [editVariantId, setEditVariantId] = useState(null);
    const [editedVariant, setEditedVariant] = useState({});

    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        shortDescription: "",
        description: "",
        categoryId: "",
        price: "",
        discount: 0,
        isActive: true
    });

    const [newVariant, setNewVariant] = useState({
        size: '',
        color: '',
        price: '',
        stock: '',
        sku: '',
        image: null
    });
    const [showAddFormVariant, setShowAddFormVariant] = useState(false);








    useEffect(() => {
        fetchProducts();
        fetchCategories()
    }, []);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/admin/products`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleAddProduct = async () => {
        const token = localStorage.getItem('token');
        const payload = {
            name: newProduct.name,
            shortDescription: newProduct.shortDescription,
            description: newProduct.description,
            categoryId: newProduct.categoryId,
            price: newProduct.price,
            discount: newProduct.discount,
            isActive: newProduct.isActive
        };

        try {
            const res = await fetch(`/api/admin/products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const created = await res.json();
                setProducts(prev => [created, ...prev]); // hoặc gọi fetchProducts()
                setNewProduct({
                    name: "",
                    shortDescription: "",
                    description: "",
                    categoryId: "",
                    price: "",
                    discount: 0,
                    isActive: true
                });
                setShowAddForm(false);
                Swal.fire({
                    title: 'Thành công',
                    text: 'Đã thêm sản phẩm mới.',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false
                });
                fetchProducts()
            } else {
                Swal.fire('Lỗi', 'Không thể thêm sản phẩm', 'error');
            }
        } catch (err) {
            console.error('Error creating product:', err);
            Swal.fire('Lỗi', 'Có lỗi xảy ra khi thêm sản phẩm', 'error');
        }
    };


    const handleEditClick = (product) => {
        setEditId(product.id);
        setEditedProduct({ ...product }); // clone để sửa
    };
    const handleSave = async (id) => {
        const token = localStorage.getItem('token');
        const payload = {
            name: editedProduct.name,
            price: editedProduct.price,
            isActive: editedProduct.isActive,
            categoryId: editedProduct.categoryId || null  // gửi ID thay vì object
        };
        console.log('Payload:', JSON.stringify(payload));
        try {
            const res = await fetch(`/api/admin/products/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const updated = await res.json();
                setProducts((prev) =>
                    prev.map((p) => (p.id === id ? updated : p))
                );
                setEditId(null);
                fetchProducts()
                // Swal.fire('Đã lưu', 'Sản phẩm đã được cập nhật.', 'success');
                Swal.fire({
                    title: 'Đã lưu',
                    text: 'Sản phẩm đã được cập nhật.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                Swal.fire('Lỗi', 'Không thể cập nhật sản phẩm', 'error');
            }
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/admin/categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Xác nhận xoá',
            text: 'Bạn có chắc muốn xoá sản phẩm này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Huỷ',
            confirmButtonColor: '#d33'
        });
        if (confirm.isConfirmed) {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`/api/admin/products/delete/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setProducts(products.filter(p => p.id !== id));
                    Swal.fire({
                        title: 'Đã xoá',
                        text: 'Sản phẩm đã được xoá.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (err) {
                console.error('Error deleting product:', err);
            }
        }
    };


    // xu li them sua xoa cho variant
    const handleEditVariantClick = (variant) => {
        setEditVariantId(variant.id);
        setEditedVariant({ ...variant }); // clone dữ liệu để sửa
    };

    const handleSaveVariant = async (variantId) => {
        const token = localStorage.getItem("token");

        try {
            let imageUrl = editedVariant.url; // giữ ảnh cũ nếu không đổi

            // Nếu có ảnh mới => upload trước lên Cloudinary
            if (editedVariant.newImage) {
                const formData = new FormData();
                formData.append("file", editedVariant.newImage);

                const uploadRes = await fetch("/api/upload/image", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) {
                    throw new Error("Upload ảnh thất bại");
                }

                imageUrl = await uploadRes.text(); // hoặc await uploadRes.json() nếu bạn trả về JSON
            }

            // Tạo payload JSON
            const payload = {
                size: editedVariant.size,
                color: editedVariant.color,
                price: editedVariant.price,
                stock: editedVariant.stock,
                sku: editedVariant.sku,
                url: imageUrl, // ảnh mới hoặc giữ ảnh cũ
            };

            // Gửi PUT request cập nhật variant
            const res = await fetch(`/api/admin/variants/update/${variantId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Cập nhật biến thể thất bại");
            }

            const updatedVariant = await res.json();

            // Cập nhật vào danh sách biến thể trong viewVariantsProduct
            setViewVariantsProduct((prev) => ({
                ...prev,
                variants: prev.variants.map((v) =>
                    v.id === variantId ? updatedVariant : v
                ),
            }));

            // Reset edit state
            setEditVariantId(null);
            setEditedVariant({});
            fetchProducts()

            Swal.fire({

                icon: "success",
                title: "Đã lưu biến thể!",
                showConfirmButton: false,
                timer: 1200,
            });
        } catch (err) {
            console.error("Lỗi khi lưu biến thể:", err);
            Swal.fire("Lỗi", err.message || "Không thể lưu biến thể", "error");
        }
    };


    const handleDeleteVariant = async (id) => {
        const confirm = await Swal.fire({
            title: 'Xác nhận xoá',
            text: 'Bạn có chắc muốn xoá biến thể này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Huỷ',
            confirmButtonColor: '#d33'
        });
        if (confirm.isConfirmed) {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`/api/admin/variants/delete/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    Swal.fire({ title: 'Đã xoá', icon: 'success', timer: 1000, showConfirmButton: false });
                    // fetchProducts();
                    // Cập nhật lại danh sách biến thể sau khi xóa
                    setViewVariantsProduct(prev => ({
                        ...prev,
                        variants: prev.variants.filter(v => v.id !== id)
                    }));
                }
            } catch (err) {
                console.error('Error deleting variant:', err);
            }
        }
    };


    const handleAddVariant = async () => {
        const token = localStorage.getItem("token");

        try {
            let imageUrl = ""; // mặc định rỗng

            // Nếu có ảnh mới thì upload ảnh trước
            if (newVariant.image) {
                const formData = new FormData();
                formData.append("file", newVariant.image);

                const uploadRes = await fetch("/api/upload/image", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) {
                    throw new Error("Upload ảnh thất bại");
                }

                imageUrl = await uploadRes.text(); // hoặc .json() tùy backend
            }

            // Payload gửi lên để tạo biến thể mới
            const payload = {
                size: newVariant.size,
                color: newVariant.color,
                price: newVariant.price,
                stock: newVariant.stock,
                sku: newVariant.sku,
                url: imageUrl,
            };

            const res = await fetch(`/api/admin/variants/add/${viewVariantsProduct.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Thêm biến thể thất bại");
            }

            const createdVariant = await res.json();

            // Thêm biến thể mới vào danh sách
            setViewVariantsProduct((prev) => ({
                ...prev,
                variants: [...prev.variants, createdVariant],
            }));

            // Reset form
            setNewVariant({ size: "", color: "", price: "", stock: "", sku: "", image: null });
            setShowAddFormVariant(false);
            fetchProducts()

            Swal.fire({
                icon: "success",
                title: "Đã thêm biến thể!",
                showConfirmButton: false,
                timer: 1200,
            });

        } catch (err) {
            console.error("Lỗi khi thêm biến thể:", err);
            Swal.fire("Lỗi", err.message || "Không thể thêm biến thể", "error");
        }
    };



    return (
        <>
        <div className="products-page">
            <div className="breadcrumbs">Page 1 › Products</div>
            <h1>Products</h1>

            {showAddForm && (
                <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
                    <div className="modal-content-addProduct" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowAddForm(false)}>
                            &times;
                        </button>
                        <h2>Thêm sản phẩm mới</h2>
                        <form className="add-form" onSubmit={(e) => {
                            e.preventDefault();
                            handleAddProduct();
                        }}>
                            <input
                                type="text"
                                placeholder="Tên sản phẩm"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct(p => ({...p, name: e.target.value}))}
                                required
                            />
                            <textarea
                                placeholder="Mô tả ngắn"
                                value={newProduct.shortDescription}
                                onChange={(e) => setNewProduct(p => ({...p, shortDescription: e.target.value}))}
                            />
                            <textarea
                                placeholder="Mô tả chi tiết"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct(p => ({...p, description: e.target.value}))}
                            />
                            <select
                                value={newProduct.categoryId}
                                onChange={(e) => setNewProduct(p => ({...p, categoryId: e.target.value}))}
                                required
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {categories.filter(cat => cat.parentCategory !== null).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Giá"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct(p => ({...p, price: e.target.value}))}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Giảm giá"
                                value={newProduct.discount}
                                onChange={(e) => setNewProduct(p => ({...p, discount: e.target.value}))}
                            />
                            <select
                                value={newProduct.isActive ? "true" : "false"}
                                onChange={(e) => setNewProduct(p => ({...p, isActive: e.target.value === 'true'}))}
                            >
                                <option value="true">Hoạt động</option>
                                <option value="false">Ẩn</option>
                            </select>
                            <button type="submit">Lưu sản phẩm</button>
                        </form>
                    </div>
                </div>

            )}


            <div className="actions-bar">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search customers"/>
                </div>
                <div className="spacer"></div>
                <button className="action-button add-customer-button" onClick={() => setShowAddForm(prev => !prev)}>
                    {showAddForm ? '✕ Hủy thêm' : '+ Add Product'}
                </button>


            </div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Active</th>
                        <th>Createdate</th>

                        {/*<th>Ngày tạo</th>*/}
                        <th>Actions</th>
                        <th>Show Variant</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentProducts.map((product) => (
                        <React.Fragment key={product.id}>
                            <tr onClick={() => toggleExpand(product.id)}>
                                <td>{product.id}</td>
                                {/* Tên sản phẩm */}
                                <td>
                                    {editId === product.id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.name || ''}
                                            onChange={(e) =>
                                                setEditedProduct((prev) => ({...prev, name: e.target.value}))
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>

                                {/* Danh mục (Category) */}
                                <td>
                                    {editId === product.id ? (
                                        <select
                                            value={editedProduct.category?.id || ''}
                                            onChange={(e) => {
                                                const selectedId = parseInt(e.target.value);
                                                // const selectedCategory = categories.find(cat => cat.id === selectedId);
                                                setEditedProduct(prev => ({
                                                    ...prev,
                                                    categoryId: selectedId
                                                }));
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value="">-- Chọn danh mục --</option>

                                            {categories.filter(cat => cat.parentCategory !== null) // chỉ lấy danh mục con
                                                .map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        product.category?.name
                                    )}
                                </td>


                                {/* Giá */}
                                <td>
                                    {editId === product.id ? (
                                        <input
                                            type="number"
                                            value={editedProduct.price || ''}
                                            onChange={(e) =>
                                                setEditedProduct((prev) => ({...prev, price: e.target.value}))
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    ) : (
                                        `${product.price}₫`
                                    )}

                                </td>

                                {/* Trạng thái hoạt động */}
                                <td>
                                    {editId === product.id ? (
                                        <select
                                            value={editedProduct.isActive ? 'true' : 'false'}
                                            onChange={(e) =>
                                                setEditedProduct((prev) => ({
                                                    ...prev,
                                                    isActive: e.target.value === 'true'
                                                }))
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value="true">Hoạt động</option>
                                            <option value="false">Ẩn</option>
                                        </select>
                                    ) : (
                                        product.isActive ? 'Hoạt động' : 'Ẩn'
                                    )}
                                </td>
                                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td>

                                    <div className="actions-cell">
                                        {editId === product.id ? (
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                handleSave(product.id);
                                            }} className="icon-btn"

                                            >
                                                <FaSave/>
                                            </button>
                                        ) : (
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(product);
                                            }}
                                                    className="icon-btn">
                                                <FaEdit/>
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(product.id)} className="icon-btn delete">
                                            <FaTrash/>
                                        </button>


                                    </div>
                                </td>

                                <td>
                                    <button
                                        onClick={(e) => { e.stopPropagation();  console.log("View product:", product);  setViewVariantsProduct(product);}}
                                        className="icon-btn"
                                    >
                                        <FaEye/>
                                    </button>
                                </td>
                            </tr>

                        </React.Fragment>
                    ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({length: totalPages}, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

            </div>
            {/* Modal hiển thị biến thể */}
            {viewVariantsProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Biến thể của: {viewVariantsProduct.name}
                            <button className="add-btn" onClick={() => setShowAddFormVariant(true)}>+ Add Variant</button>
                        </h3>

                        <table className="variants-table">
                            <thead>
                            <tr>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Inventory</th>
                                <th>SKU</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {showAddFormVariant && (
                                <div className="overlay">
                                    <div className="add-variant-modal">
                                        <h3>Thêm biến thể mới</h3>
                                        <div className="form-row">
                                            <input placeholder="Size" value={newVariant.size} onChange={e => setNewVariant({ ...newVariant, size: e.target.value })} />
                                            <input placeholder="Color" value={newVariant.color} onChange={e => setNewVariant({ ...newVariant, color: e.target.value })} />
                                            <input type="number" placeholder="Price" value={newVariant.price} onChange={e => setNewVariant({ ...newVariant, price: e.target.value })} />
                                            <input type="number" placeholder="Stock" value={newVariant.stock} onChange={e => setNewVariant({ ...newVariant, stock: e.target.value })} />
                                            <input placeholder="SKU" value={newVariant.sku} onChange={e => setNewVariant({ ...newVariant, sku: e.target.value })} />
                                            <label>
                                                <FaUpload />
                                                <input type="file" style={{ display: 'none' }} onChange={e => setNewVariant({ ...newVariant, image: e.target.files[0] })} />
                                            </label>
                                        </div>
                                        <div className="form-buttons">
                                            <button className="form-buttons-save" onClick={handleAddVariant}><FaSave /> Lưu</button>
                                            <button className="form-buttons-cancel" onClick={() => setShowAddFormVariant(false)}><FaTimes /> Hủy</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {viewVariantsProduct.variants?.length >= 0 ? (
                                viewVariantsProduct.variants.map((variant) => (
                                    <tr key={variant.id}>
                                        {editVariantId === variant.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        value={editedVariant.size}
                                                        onChange={(e) =>
                                                            setEditedVariant({...editedVariant, size: e.target.value})
                                                        }
                                                        className="input-cell"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        value={editedVariant.color}
                                                        onChange={(e) =>
                                                            setEditedVariant({...editedVariant, color: e.target.value})
                                                        }
                                                        className="input-cell"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={editedVariant.price}
                                                        onChange={(e) =>
                                                            setEditedVariant({...editedVariant, price: e.target.value})
                                                        }
                                                        className="input-cell"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={editedVariant.stock}
                                                        onChange={(e) =>
                                                            setEditedVariant({...editedVariant, stock: e.target.value})
                                                        }
                                                        className="input-cell"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        value={editedVariant.sku}
                                                        onChange={(e) =>
                                                            setEditedVariant({...editedVariant, sku: e.target.value})
                                                        }
                                                        className="input-cell"
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                                        {editedVariant.url && (
                                                            <img src={editedVariant.url} alt="preview" width="60"/>
                                                        )}
                                                        <label style={{cursor: 'pointer'}}>
                                                            <FaUpload/>
                                                            <input
                                                                type="file"
                                                                style={{display: 'none'}}
                                                                onChange={(e) =>
                                                                    setEditedVariant({
                                                                        ...editedVariant,
                                                                        newImage: e.target.files[0],
                                                                    })
                                                                }
                                                            />
                                                        </label>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="actions-cell">
                                                        <button
                                                            onClick={() => handleSaveVariant(variant.id)}
                                                            className="icon-btn"
                                                        >
                                                            <FaSave/>
                                                        </button>
                                                        <button
                                                            onClick={() => setEditVariantId(null)}
                                                            className="icon-btn"
                                                        >
                                                            <FaTimes/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{variant.size}</td>
                                                <td>{variant.color}</td>
                                                <td>{variant.price}₫</td>
                                                <td>{variant.stock}</td>
                                                <td>{variant.sku}</td>
                                                <td>
                                                    <img src={variant.url} alt="variant" width="60" />
                                                </td>
                                                <td>
                                                    <div className="actions-cell">
                                                        <button
                                                            onClick={() => handleEditVariantClick(variant)}
                                                            className="icon-btn"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteVariant(variant.id)}
                                                            className="icon-btn delete"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Không có biến thể</td>
                                </tr>
                            )}


                            </tbody>
                        </table>
                        <button className="close-btn" onClick={() => setViewVariantsProduct(null)}>×</button>

                    </div>
                </div>
            )}
        </div>

        </>
    );
};

export default ProductsPage;
