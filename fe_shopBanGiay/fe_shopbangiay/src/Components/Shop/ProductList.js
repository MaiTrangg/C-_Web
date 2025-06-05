import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from "./ProductCard";

const ProductList = ({ categoryId, searchTerm, itemsPerPage ,selectedColors, selectedSizes,minPrice, maxPrice

                                }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);



    // const colors = selectedColors || [];
    if (selectedColors && selectedColors.length > 0) {
        console.log("Có màu được chọn:", selectedColors);
    } else {
        console.log("Chưa có màu nào được chọn");
    }
    if (selectedSizes && selectedSizes.length > 0) {
        console.log("Có size được chọn:", selectedSizes);
    } else {
        console.log("Chưa có size nào được chọn");
    }
    console.log("minPrice"+minPrice);
    console.log("maxPrice"+maxPrice);



    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let url;
                if (searchTerm && searchTerm.trim() !== "") {
                    url = `/api/products/search?name=${encodeURIComponent(searchTerm)}`;
                } else if (categoryId) {
                    url = `/api/products/categories/${categoryId}`;
                } else {
                    url = `/api/products`;
                }
                const response = await axios.get(url);
                // setProducts(response.data);
                // // Lọc theo màu, theo size
                let filtered = response.data;
                // if ((selectedColors && selectedColors.length > 0) || (selectedSizes && selectedSizes.length > 0)) {
                    const normalizedSizes = selectedSizes?.map(size => size.toString()) || [];
                    const min = parseFloat(minPrice) || 0;
                    const max = parseFloat(maxPrice) || Infinity;

                    filtered = filtered.filter(product =>
                        product.variants.some(variant => {
                            const matchColor = !selectedColors?.length || selectedColors.includes(variant.color);
                            const matchSize = !normalizedSizes.length || normalizedSizes.includes(variant.size?.toString());
                            const price = parseFloat(variant.price);
                            const matchPrice = price >= min && price <= max;

                            return matchColor && matchSize && matchPrice;
                        })

                    );
                // }

                console.log("filtered: ",filtered)
                setProducts(filtered);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryId, searchTerm, selectedColors, selectedSizes, minPrice, maxPrice]);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageClick = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };




    if (loading) return <div>Loading products...</div>;
    return (
        <div>

                    {/* Hiển thị sản phẩm */}
                    <div className="row">
                        {currentProducts.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    product={product}
                                />

                            );

                        }

                        )}
                    </div>


                    {/* Phân trang */}
                    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mb-3">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>
                                        &laquo;
                                    </button>
                                </li>

                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>
                                        &raquo;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

            {/*Shop Product End -->*/}

        </div>
    );
};

export default ProductList;