import React, { useState } from 'react';

const Categories = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(prev => prev === dropdown ? null : dropdown);
    };

    return (
        <div className="col-lg-3 d-none d-lg-block">
            <a
                className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                data-toggle="collapse" href="#navbar-vertical"
                style={{height: "65px", marginTop: "-1px", padding: "0 30px"}}
            >
                <h6 className="m-0">Categories</h6>
                <i className="fa fa-angle-down text-dark"></i>
            </a>

            <nav
                className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
                id="navbar-vertical"
                style={{width: "calc(100% - 30px)", zIndex: "1"}}
            >
                <div className="navbar-nav w-100 overflow-hidden" style={{height: "210px"}}>

                    {/* Giày nam */}
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link d-flex justify-content-between align-items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown('men');
                            }}
                        >
                            Giày nam
                            <i className={`fa fa-angle-${openDropdown === 'men' ? 'up' : 'down'} float-right mt-1`}></i>
                        </a>
                        {openDropdown === 'men' && (
                            <div
                                className="dropdown-menu bg-secondary position-absolute border-0 rounded-0 w-100 m-0 show">
                                <a href="#" className="dropdown-item">Sneakers</a>
                                <a href="#" className="dropdown-item">Boots</a>
                                <a href="#" className="dropdown-item">Sandals</a>
                            </div>
                        )}
                    </div>

                    {/* Giày nữ */}
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link d-flex justify-content-between align-items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown('women');
                            }}
                        >
                            Giày nữ
                            <i className={`fa fa-angle-${openDropdown === 'women' ? 'up' : 'down'} float-right mt-1`}></i>
                        </a>
                        {openDropdown === 'women' && (
                            <div
                                className="dropdown-menu bg-secondary position-absolute border-0 rounded-0 w-100 m-0 show">
                                <a href="#" className="dropdown-item">Flats</a>
                                <a href="#" className="dropdown-item">Heels</a>
                                <a href="#" className="dropdown-item">Boots</a>
                            </div>
                        )}
                    </div>

                </div>
            </nav>
            <style>
                {`
  .dropdown-menu .dropdown-item {
    border-bottom: 1px solid #fff;
  }

  .dropdown-menu .dropdown-item:last-child {
    border-bottom: none;
  }
`}
            </style>

        </div>

    );
};

export default Categories;
