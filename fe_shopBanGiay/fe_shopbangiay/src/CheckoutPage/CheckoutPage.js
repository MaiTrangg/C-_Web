import React, {useEffect, useState} from 'react';
import HomePage from "../Components/HomePage/HomePage";
import HeaderShop from "../Components/Header/HeaderShop";
import axios from "axios";
import {useCart} from "../contexts/CartContext";

const CheckoutPage = () => {
    const { cart } = useCart();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/?depth=1")
            .then(res => setProvinces(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setSelectedDistrict(null);
        setWards([]);
        axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then(res => setDistricts(res.data.districts))
            .catch(err => console.error(err));
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            .then(res => setWards(res.data.wards))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <HeaderShop/>
            {/* Page Header Start */}
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Checkout</h1>
                    <div className="d-inline-flex">
                        <p className="m-0"><a href="">Home</a></p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Checkout</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Checkout Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>Họ và tên người nhận</label>
                                    <input className="form-control" type="text" placeholder=""/>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Số điện thoại người nhận</label>
                                    <input className="form-control" type="text" placeholder="+84 123 456 789"/>
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
                                    <select className="form-control" onChange={handleDistrictChange}
                                            value={selectedDistrict || ""}>
                                        <option value="" disabled>-- Chọn quận/huyện --</option>
                                        {districts.map(d => (
                                            <option key={d.code} value={d.code}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label>Xã, Phường</label>
                                    <select className="form-control">
                                        <option value="" disabled>-- Chọn xã/phường --</option>
                                        {wards.map(w => (
                                            <option key={w.code} value={w.code}>{w.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label>Chi tiết địa chỉ</label>
                                    <textarea className="form-control" type="text" placeholder="so nha/Hem" rows={2 | 0}/>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label>ghi chú(cho người bán)</label>
                                    <textarea className="form-control" type="text" placeholder="" rows={5 | 0}/>
                                </div>

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
                                        <img src={item.image} alt={item.name} style={{width: "30px", height: "30px"} }/>
                                        <p>{item.name} ({item.color}, {item.size}) x {item.quantity}</p>
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}

                                <hr className="mt-0" />
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">{subtotal.toFixed(2)}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">Miễn phí shipping</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">{subtotal.toFixed(2)}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Payment</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="custom-control custom-radio" >
                                        <input type="radio" className="custom-control-input" name="payment" id="paypal" defaultChecked />
                                        <label className="custom-control-label" htmlFor="paypal">Thanh toán sau khi nhận hàng</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="directcheck" />
                                        <label className="custom-control-label" htmlFor="directcheck">VN Pay</label>
                                    </div>
                                </div>
                                {/*<div className="">*/}
                                {/*    <div className="custom-control custom-radio">*/}
                                {/*        <input type="radio" className="custom-control-input" name="payment" id="banktransfer" />*/}
                                {/*        <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Checkout End */}
        </div>
    );
};

export default CheckoutPage;
