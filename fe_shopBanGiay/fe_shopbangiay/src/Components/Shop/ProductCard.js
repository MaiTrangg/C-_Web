import React, { useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "../Login & Register/Components";
import {useCart} from "../../contexts/CartContext";
import AddToCartModal from "../CartPage/AddToCartModal";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false);

    const mainImage = product.colorImages.find((img) => img.isMain);

    // const handleAddToCart = () => {
    //     addToCart({
    //         id: {product.id},
    //         name,
    //         image,
    //         price
    //     });
    // };



    return (
<>
        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
            <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img className="img-fluid w-100" src={mainImage ? mainImage.url : "default-image.jpg"} alt={product.name} />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{product.name}</h6>
                    <div className="d-flex justify-content-center">
                        <h6> {product.price}đ</h6>
                        <h6 className="text-muted ml-2">
                            <del>{product.oldPrice || product.price}đ</del>
                        </h6>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link to={`/productDetail/${product.id}`} className="btn btn-sm text-dark p-0">
                        <i className="fas fa-eye text-primary mr-1"></i>View Detail
                    </Link>
                    <a  onClick={() => setShowModal(true)} className="btn btn-sm text-dark p-0">
                        <i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                    </a>
                </div>
            </div>
        </div>
    {/* Hiển thị Modal */}
    {showModal && (
        <AddToCartModal
            show={showModal}
            onHide={() => setShowModal(false)}
            product={product}
            onAddToCart={(item) => {
                // TODO: gọi addToCart ở đây nếu bạn dùng context
                console.log("Thêm vào giỏ:", item);
            }}
        />
    )}
</>
    );
};

export default ProductCard;
