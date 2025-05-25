import React, { useState } from "react";
import "./AddToCartModal.css";
import { useCart } from "../../contexts/CartContext";


const AddToCartModal = ({ show, onHide, product, onAddToCart }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart } = useCart();


    if (!show || !product) return null;

    const colors = [...new Set(product.variants.map(v => v.color))];

    const sizesForSelectedColor = selectedColor
        ? product.variants.filter(v => v.color === selectedColor).map(v => v.size)
        : [];

    const handleSubmit = () => {
        if (!selectedColor || !selectedSize) {
            alert("Vui lòng chọn màu và size.");
            return;
        }

        const selectedVariant = product.variants.find(
            v => v.color === selectedColor && v.size === selectedSize
        );

        if (!selectedVariant) {
            alert("Không tìm thấy biến thể sản phẩm.");
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            image: product.colorImages.find(img => img.color === selectedColor)?.url,
            price: selectedVariant.price,
            color: selectedColor,
            size: selectedSize,
            sku: selectedVariant.sku
        });
        onHide();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="modal-close" onClick={onHide}>&times;</button>
                <h3>Chọn màu và size</h3>

                <div className="modal-group">
                    <label>Màu sắc</label>
                    <select value={selectedColor} onChange={e => {
                        setSelectedColor(e.target.value);
                        setSelectedSize('');
                    }}>
                        <option value="">-- Chọn màu --</option>
                        {colors.map((color, i) => (
                            <option key={i} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                <div className="modal-group">
                    <label>Size</label>
                    <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} disabled={!selectedColor}>
                        <option value="">-- Chọn size --</option>
                        {sizesForSelectedColor.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onHide}>Đóng</button>
                    <button className="btn-primary" onClick={handleSubmit}>Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
