import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import HeaderShop from '../Components/Header/HeaderShop';
import {CartContext, useCart} from '../contexts/CartContext';
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
    const { cart } = useCart();
    const location = useLocation();

    const navigate = useNavigate();

    const [receiverName, setReceiverName] = useState("");
    const [phone, setPhone] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const [selectedProvinceName, setSelectedProvinceName] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedWardName, setSelectedWardName] = useState("");

    const subtotal = cart.reduce((total, item) => total + item.productVariant.price * item.quantity, 0);
    const shippingAddress = `${addressDetail}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;
    const { setCart, setTotalQuantity, fetchCart } = useContext(CartContext);
    const discountedAmount = location.state?.discountedAmount || subtotal;


    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/?depth=1")
            .then(res => setProvinces(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        const selected = provinces.find(p => p.code === +provinceCode);
        setSelectedProvince(provinceCode);
        setSelectedProvinceName(selected?.name || "");
        setSelectedDistrict(null);
        setSelectedDistrictName("");
        setWards([]);
        axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then(res => setDistricts(res.data.districts))
            .catch(err => console.error(err));
    };

    const handlePlaceOrder = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để đặt hàng.");
            return;
        }

        const orderData = {
            receiverName,
            phone,
            shippingAddress,
            paymentMethod,
            discountedAmount: Math.round(discountedAmount)
        };

        if (paymentMethod === "COD") {
            // Đặt hàng với COD
            axios.post("/api/orders/checkout", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    Swal.fire({
                        icon: "success",
                        title: "Đặt hàng thành công!",
                        text: "Cảm ơn bạn đã mua hàng.",
                        timer: 3000,
                        showConfirmButton: false
                    }).then(() => {
                        fetchCart();
                        navigate("/shop");
                    });
                })
                .catch(err => {
                    console.error("Order failed:", err);
                    Swal.fire("Lỗi", "Đặt hàng thất bại!", "error");
                });
        } else if (paymentMethod === "VNPAY") {
            const data = {
                amount: Math.round(discountedAmount),  // số nguyên
                bankCode: "NCB",
                language: "vn",
                orderRequest: {
                    receiverName: receiverName,
                    phone: phone,
                    shippingAddress: shippingAddress,
                    paymentMethod: "VNPAY",
                    discountedAmount: Math.round(discountedAmount)
                }};
            // Tạo URL thanh toán VNPay từ backend
            axios.post("/api/payment/create_payment",
                data
            , {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                }

            })
                .then(res => {
                    const { url } = res.data;
                    if (url) {
                        window.location.href = url; // Redirect sang trang VNPAY
                    } else {
                        Swal.fire("Lỗi", "Không thể tạo liên kết thanh toán.", "error");
                    }
                })
                .catch(err => {
                    console.error("VNPay failed:", err);
                    console.log(token);
                    Swal.fire("Lỗi", "Không thể thanh toán qua VNPay!", "error");
                });
        }
    };



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để thanh toán");
            return;
        }

        const queryParams = new URLSearchParams(location.search);
        const paramsObj = {};
        for (const [key, value] of queryParams.entries()) {
            paramsObj[key] = value;
        }
        console.log("Params gửi về backend:", paramsObj);
        console.log("paramsObj[\"vnp_TxnRef\"]: ", paramsObj["vnp_TxnRef"]);
        if (paramsObj["vnp_TxnRef"]) {
            // Gửi dữ liệu sang server để xác thực
            axios
                .post("/api/payment/vnpay_return", paramsObj, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    // alert(res.data.message);
                    // Thông báo hoặc chuyển hướng tuỳ bạn
                    Swal.fire({
                        icon: "success",
                        title: "Đặt hàng thành công!",
                        text: "Cảm ơn bạn đã mua hàng.",
                        timer: 3000,
                        showConfirmButton: false
                    }).then(() => {
                        fetchCart();
                        navigate("/shop");
                    });
                })
                .catch((err) => {
                    console.error("Lỗi khi xác minh thanh toán:", err);
                    alert("Xác minh thanh toán thất bại");
                });
        }
    }, [location]);


    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        const selected = districts.find(d => d.code === +districtCode);
        setSelectedDistrict(districtCode);
        setSelectedDistrictName(selected?.name || "");
        axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            .then(res => setWards(res.data.wards))
            .catch(err => console.error(err));
    };

    const handleWardChange = (e) => {
        const wardCode = e.target.value;
        const selected = wards.find(w => w.code === +wardCode);
        setSelectedWardName(selected?.name || "");
    };

    // const handlePlaceOrder = () => {
    //     const token = localStorage.getItem("token"); // Lấy token từ localStorage (hoặc nơi bạn lưu)
    //     if (!token) {
    //         alert("Bạn cần đăng nhập để đặt hàng.");
    //         return;
    //     }
    //
    //     const orderData = {
    //         receiverName,
    //         phone,
    //         shippingAddress,
    //         paymentMethod
    //     };
    //
    //     axios.post("/api/orders/checkout", orderData, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(res => {
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Đặt hàng thành công!",
    //                 text: "Cảm ơn bạn đã mua hàng.",
    //                 timer: 3000,
    //                 showConfirmButton: false
    //             }).then(() => {
    //                 fetchCart();
    //                 navigate("/shop"); // chuyển về trang shop
    //             });
    //         })
    //         .catch(err => {
    //             console.error("Order failed:", err);
    //             Swal.fire("Lỗi", "Đặt hàng thất bại!", "error");
    //         });
    // };


    return (
        <div>
            <HeaderShop />
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Checkout</h1>
                </div>
            </div>

            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>Họ và tên người nhận</label>
                                <input className="form-control" type="text" value={receiverName} onChange={e => setReceiverName(e.target.value)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Số điện thoại người nhận</label>
                                <input className="form-control" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Tỉnh, Thành phố</label>
                                <select className="form-control" onChange={handleProvinceChange} defaultValue="">
                                    <option value="" disabled>-- Chọn tỉnh/thành --</option>
                                    {provinces.map(p => (
                                        <option key={p.code} value={p.code}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Quận, Huyện</label>
                                <select className="form-control" onChange={handleDistrictChange} value={selectedDistrict || ""}>
                                    <option value="" disabled>-- Chọn quận/huyện --</option>
                                    {districts.map(d => (
                                        <option key={d.code} value={d.code}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Xã, Phường</label>
                                <select className="form-control" onChange={handleWardChange}>
                                    <option value="" disabled>-- Chọn xã/phường --</option>
                                    {wards.map(w => (
                                        <option key={w.code} value={w.code}>{w.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Chi tiết địa chỉ</label>
                                <textarea className="form-control" rows={2} value={addressDetail} onChange={e => setAddressDetail(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                            </div>
                            <div className="card-body">
                                <h5 className="font-weight-medium mb-3">Products</h5>
                                {cart.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-between">
                                        <img src={item.productVariant.url} alt={item.productVariant.name} style={{ width: "30px", height: "30px" }} />
                                        <p>{item.productVariant.name} ({item.productVariant.color}, {item.productVariant.size}) x {item.quantity}</p>
                                        <p>{(item.productVariant.price * item.quantity).toFixed(2)}đ</p>
                                    </div>
                                ))}
                                <hr className="mt-0" />
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">{subtotal.toFixed(2)}đ</h6>
                                </div>

                                {discountedAmount < subtotal && (
                                    <div className="d-flex justify-content-between mb-3 pt-1">
                                        <h6 className="font-weight-medium">Discount</h6>
                                        <h6 className="font-weight-medium">- {(subtotal - discountedAmount).toFixed(2)}đ</h6>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">Miễn phí shipping</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">{discountedAmount.toFixed(2)}đ</h5>
                                </div>
                            </div>
                        </div>

                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Payment</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" value="COD" name="payment" id="cod"
                                               checked={paymentMethod === "COD"} onChange={e => setPaymentMethod(e.target.value)} />
                                        <label className="custom-control-label" htmlFor="cod">Thanh toán sau khi nhận hàng</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" value="VNPAY" id="vnpay"
                                               checked={paymentMethod === "VNPAY"} onChange={e => setPaymentMethod(e.target.value)} />
                                        <label className="custom-control-label" htmlFor="vnpay">VN Pay</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={handlePlaceOrder}>
                                    Đặt hàng
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
