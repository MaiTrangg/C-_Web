import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from "./ProductCard";

const ProductList = ({ categoryId, searchTerm, itemsPerPage ,selectedColors}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    // const colors = selectedColors || [];
    if (selectedColors && selectedColors.length > 0) {
        console.log("Có màu được chọn:", selectedColors);
    } else {
        console.log("Chưa có màu nào được chọn");
    }


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
                // Lọc theo màu ở đây
                let filtered = response.data;
                if (selectedColors && selectedColors.length > 0) {
                    filtered = filtered.filter(product =>
                        product.colorImages.some(ci =>
                            selectedColors.includes(ci.color)
                        )
                    );
                }
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
    }, [categoryId, searchTerm, selectedColors]);

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
                            const mainImage = product.colorImages.find((img) => img.isMain);
                            return (
                                <ProductCard
                                    key={index}
                                    productId={product.id}
                                    image={mainImage ? mainImage.url : "default-image.jpg"}
                                    name={product.name}
                                    price={product.price}
                                    oldPrice={product.oldPrice || product.price}
                                />
                            );
                        })}
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