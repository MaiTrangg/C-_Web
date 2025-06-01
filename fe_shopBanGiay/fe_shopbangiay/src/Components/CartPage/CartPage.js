import React, {useContext} from 'react';
import HeaderShop from "../Header/HeaderShop";
import {useCart} from "../../contexts/CartContext";
import {Link} from "react-router-dom";

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    console.log("cart",cart)

    // Tính tổng tiền 1 sản phẩm (price * quantity)
    const calcTotalPrice = (price, quantity) => price * quantity;
    const subtotal = cart.reduce((sum, item) => sum + item.productVariant.price * item.quantity, 0);
    return (
        <div>
            <HeaderShop/>
            {/*Page Header Start -->*/}
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
                    <div className="d-inline-flex">
                        <p className="m-0"><a href="">Home</a></p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Shopping Cart</p>
                    </div>
                </div>
            </div>
             {/*Page Header End -->*/}


             {/*Cart Start -->*/}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                            <tr>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody className="align-middle">
                            {cart.length === 0 ? (
                                <tr>
                                    <td colSpan="5">Your cart is empty</td>
                                </tr>
                            ) : (
                                cart.map(item => (
                                    <tr key={item.id}>
                                        <td className="align-middle">
                                            <img src={item.productVariant.url} alt={item.productVariant.name} style={{width: "50px"}}/> {item.name}
                                        </td>
                                        <td className="align-middle">{item.productVariant.price}đ</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{width: "100px"}}>
                                                <div className="input-group-btn">
                                                    <button
                                                        className="btn btn-sm btn-primary btn-minus"
                                                        onClick={() => {
                                                            if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                                                        }}
                                                    >
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm bg-secondary text-center"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <div className="input-group-btn">
                                                    <button
                                                        className="btn btn-sm btn-primary btn-plus"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{calcTotalPrice(item.productVariant.price, item.quantity)}đ</td>
                                        <td className="align-middle">
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>

                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-5" action="">
                            <div className="input-group">
                                <input type="text" className="form-control p-4" placeholder="Coupon Code"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">{subtotal.toFixed(2)}đ</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">Miễn phí shipping</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">{subtotal.toFixed(2)}đ</h5>
                                </div>
                                <Link to={"/checkout"} className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*-- Cart End -->*/}
        </div>
    );
};

export default CartPage;