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
    //tao mang de luu nhung mau duoc chon
    const [selectedColors, setSelectedColors] = useState([]);
    //tao mang de luu nhung kich thuoc duoc chon
    const [selectedSizes, setSelectedSizes] = useState([]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    //bien dung de luu khoang giá
    const [inputMinPrice, setInputMinPrice] = useState('');
    const [inputMaxPrice, setInputMaxPrice] = useState('');



//loc theo mau
    const handleColorChange = (e) => {
        const color = e.target.value;
        const checked = e.target.checked;



        setSelectedColors(prev =>
            checked
                ? [...prev, color]
                : prev.filter(c => c !== color)
        );
    };

    //loc theo kich thuoc
    const handleSizeChange = (e) => {
        const size = e.target.value;
        const checked = e.target.checked;

        setSelectedSizes(prev =>
            checked
                ? [...prev, size] // thêm vào nếu được chọn
                : prev.filter(s => s !== size) // loại ra nếu bỏ chọn
        );
    };

    //loc theo gia
    const handlePriceSubmit = (e) => {
        e.preventDefault();
        setMinPrice(inputMinPrice);
        setMaxPrice(inputMaxPrice);
    };









    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Ngăn reload trang
        // Không cần gì thêm nếu searchTerm đang được lắng nghe bởi useEffect
    };



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
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
                            <form onSubmit={handlePriceSubmit} >
                                <div className="d-flex gap-3">
                                    <div className="form-group flex-grow-1">
                                        <label htmlFor="minPrice">Min Price ($)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="minPrice"
                                            placeholder="e.g. 0"
                                            min="0"
                                            value={inputMinPrice}
                                            onChange={(e) => setInputMinPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group flex-grow-1">
                                        <label htmlFor="maxPrice">Max Price ($)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="maxPrice"
                                            placeholder="e.g. 500"
                                            min="0"
                                            value={inputMaxPrice}
                                            onChange={(e) => setInputMaxPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-sm mt-2">
                                    Apply Filter
                                </button>
                            </form>

                        </div>

                        {/*Price End -->*/}

                        {/*Color Start -->*/}
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
                            <form>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    {/*<input type="checkbox" className="custom-control-input" id="color-1"/>*/}
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="color-1"
                                        value="Đen"
                                        onChange={handleColorChange}
                                    />
                                    <label className="custom-control-label" htmlFor="color-1">Đen</label>
                                    <span className="badge border font-weight-normal">150</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    {/*<input type="checkbox" className="custom-control-input" id="color-2"/>*/}
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="color-2"
                                        value="Trắng"
                                        onChange={handleColorChange}
                                    />
                                    <label className="custom-control-label" htmlFor="color-2">Trắng</label>
                                    <span className="badge border font-weight-normal">295</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    {/*<input type="checkbox" className="custom-control-input" id="color-3"/>*/}
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="color-3"
                                        value="Xám"
                                        onChange={handleColorChange}
                                    />
                                    <label className="custom-control-label" htmlFor="color-3">Xám</label>
                                    <span className="badge border font-weight-normal">246</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    {/*<input type="checkbox" className="custom-control-input" id="color-4"/>*/}
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="color-4"
                                        value="Nâu"
                                        onChange={handleColorChange}
                                    />
                                    <label className="custom-control-label" htmlFor="color-4">Nâu</label>
                                    <span className="badge border font-weight-normal">145</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    {/*<input type="checkbox" className="custom-control-input" id="color-5"/>*/}
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="color-5"
                                        value="Be"
                                        onChange={handleColorChange}
                                    />
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
                                    <input type="checkbox" className="custom-control-input" id="size-1"
                                           value={"36"} onChange={handleSizeChange}
                                    />
                                    <label className="custom-control-label" htmlFor="size-1">36</label>
                                    <span className="badge border font-weight-normal">150</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-2"
                                           value={"37"} onChange={handleSizeChange}/>
                                    <label className="custom-control-label" htmlFor="size-2">37</label>
                                    <span className="badge border font-weight-normal">295</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-3"
                                           value={"38"} onChange={handleSizeChange}/>
                                    <label className="custom-control-label" htmlFor="size-3">38</label>
                                    <span className="badge border font-weight-normal">246</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-4"
                                           value={"39"} onChange={handleSizeChange}/>
                                    <label className="custom-control-label" htmlFor="size-4">39</label>
                                    <span className="badge border font-weight-normal">145</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="size-5"
                                           value={"40"} onChange={handleSizeChange}/>
                                    <label className="custom-control-label" htmlFor="size-5">40</label>
                                    <span className="badge border font-weight-normal">168</span>
                                </div>
                                <div
                                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    <input type="checkbox" className="custom-control-input" id="size-6"
                                           value={"41"} onChange={handleSizeChange}/>
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
                    <ProductList
                        categoryId={categoryId}
                        searchTerm={searchTerm}
                        itemsPerPage={itemsPerPage}
                        selectedColors={selectedColors}
                        selectedSizes={selectedSizes}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />

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