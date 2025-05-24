import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../Footer/Footer";
import HeaderShop from "../Header/HeaderShop";
import ProductList from "./ProductList";

const ShopPage = () => {
    const { categoryId } = useParams();
    const itemsPerPage = 6;
    //search
    const [searchTerm, setSearchTerm] = useState("");


    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Ngăn reload trang
        // Không cần gì thêm nếu searchTerm đang được lắng nghe bởi useEffect
    };

    // if (loading) {
    //     return <div>Loading...</div>; // Hiển thị thông báo khi đang tải dữ liệu
    // }

    return (
        <div>
            <HeaderShop/>
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
                    <div className="d-inline-flex">
                        <p className="m-0"><a href="">Home</a></p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Shop</p>
                    </div>
                </div>
            </div>
             {/*Page Header End -->*/}


             {/*Shop Start -->*/}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                     {/*Shop Sidebar Start -->*/}
                    <div className="col-lg-3 col-md-12">
                         {/*Price Start -->*/}
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
                            <form>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" defaultChecked={true} id="price-all"/>
                                    <label className="custom-control-label" htmlFor="price-all">All Price</label>
                                    <span className="badge border font-weight-normal">1000</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-1"/>
                                    <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                                    <span className="badge border font-weight-normal">150</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-2"/>
                                    <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                                    <span className="badge border font-weight-normal">295</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-3"/>
                                    <label className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                                    <span className="badge border font-weight-normal">246</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-4"/>
                                    <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                                    <span className="badge border font-weight-normal">145</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    <input type="checkbox" className="custom-control-input" id="price-5"/>
                                    <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                                    <span className="badge border font-weight-normal">168</span>
                                </div>
                            </form>
                        </div>
                         {/*Price End -->*/}

                         {/*Color Start -->*/}
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
                            <form>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" defaultChecked={true} id="color-all"/>
                                    <label className="custom-control-label" htmlFor="price-all">All Color</label>
                                    <span className="badge border font-weight-normal">1000</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-1"/>
                                    <label className="custom-control-label" htmlFor="color-1">Đen</label>
                                    <span className="badge border font-weight-normal">150</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-2"/>
                                    <label className="custom-control-label" htmlFor="color-2">Trắng</label>
                                    <span className="badge border font-weight-normal">295</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-3"/>
                                    <label className="custom-control-label" htmlFor="color-3">Xám</label>
                                    <span className="badge border font-weight-normal">246</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-4"/>
                                    <label className="custom-control-label" htmlFor="color-4">Nâu</label>
                                    <span className="badge border font-weight-normal">145</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    <input type="checkbox" className="custom-control-input" id="color-5"/>
                                    <label className="custom-control-label" htmlFor="color-5">Be</label>
                                    <span className="badge border font-weight-normal">168</span>
                                </div>
                            </form>
                        </div>
                         {/*Color End -->*/}

                         {/*Size Start -->*/}
                        <div className="mb-5">
                            <h5 className="font-weight-semi-bold mb-4">Filter by size</h5>
                            <form>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" defaultChecked={true}
                                           id="size-all"/>
                                    <label className="custom-control-label" htmlFor="size-all">All Size</label>
                                    <span className="badge border font-weight-normal">1000</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-1"/>
                                    <label className="custom-control-label" htmlFor="size-1">36</label>
                                    <span className="badge border font-weight-normal">150</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-2"/>
                                    <label className="custom-control-label" htmlFor="size-2">37</label>
                                    <span className="badge border font-weight-normal">295</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-3"/>
                                    <label className="custom-control-label" htmlFor="size-3">38</label>
                                    <span className="badge border font-weight-normal">246</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-4"/>
                                    <label className="custom-control-label" htmlFor="size-4">39</label>
                                    <span className="badge border font-weight-normal">145</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-5"/>
                                    <label className="custom-control-label" htmlFor="size-5">40</label>
                                    <span className="badge border font-weight-normal">168</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    <input type="checkbox" className="custom-control-input" id="size-6"/>
                                    <label className="custom-control-label" htmlFor="size-6">41</label>
                                    <span className="badge border font-weight-normal">191</span>
                                </div>
                            </form>
                        </div>
                        {/*Size End -->*/}
                    </div>
                    {/*Shop Sidebar End -->*/}


                    {/*Shop Product Start -->*/}

                    <div className="col-lg-9 col-md-12">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <form onSubmit={handleSearchSubmit}>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by name"
                                                value={searchTerm}
                                                onChange={e => {
                                                    console.log("Typed:", e.target.value);
                                                    setSearchTerm(e.target.value);
                                                }}
                                                // onChange={e => setSearchTerm(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <button className="input-group-text bg-transparent text-primary"
                                                        type="submit">
                                                    <i className="fa fa-search"></i>
                                                </button>

                                            </div>
                                        </div>
                                    </form>

                                    <div className="dropdown ml-4">
                                        <button className="btn border dropdown-toggle" type="button" id="triggerId"
                                                data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            Sort by
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                            <a className="dropdown-item" href="#" >Latest</a>
                                            <a className="dropdown-item" href="#">Popularity</a>
                                            <a className="dropdown-item" href="#">Best Rating</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    {/*        /!* Hiển thị sản phẩm *!/*/}
                    <ProductList categoryId={categoryId} searchTerm={searchTerm} itemsPerPage={itemsPerPage} />

                        </div>
                    </div>
                    {/*/!*Shop Product End -->*!/*/}
                </div>
            </div>
            {/*Shop End */}
            <Footer/>
        </div>
    );
};

export default ShopPage;