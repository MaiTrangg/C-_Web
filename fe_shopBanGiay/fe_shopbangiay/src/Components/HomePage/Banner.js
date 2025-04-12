import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Banner = () => {
    useEffect(() => {
        const fullscreen = document.querySelectorAll(".fullscreen");
        fullscreen.forEach(el => {
            el.style.height = `${window.innerHeight}px`;
        });
    }, []);

    const bannerOptions = {
        items: 1,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        nav: true,
        navText: ["<span class='lnr lnr-arrow-left'></span>", "<span class='lnr lnr-arrow-right'></span>"]
    };

    return (
        <section className="banner-area">
            <div className="container">
                <div className="row fullscreen align-items-center justify-content-start">
                    <div className="col-lg-12">
                        <OwlCarousel className="active-banner-slider owl-theme" {...bannerOptions}>
                            {/* Slide 1 */}
                            <div className="row single-slide align-items-center d-flex">
                                <div className="col-lg-5 col-md-6">
                                    <div className="banner-content">
                                        <h1>Nike New <br />Collection!</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                        <div className="add-bag d-flex align-items-center">
                                            <a className="add-btn" href="#"><span className="lnr lnr-cross"></span></a>
                                            <span className="add-text text-uppercase">Add to Bag</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="banner-img">
                                        <img className="img-fluid" src="/img/banner/banner-img.png" alt="Nike Banner" />
                                    </div>
                                </div>
                            </div>

                            {/* Slide 2 */}
                            <div className="row single-slide align-items-center d-flex">
                                <div className="col-lg-5 col-md-6">
                                    <div className="banner-content">
                                        <h1>Second <br />Slide Here!</h1>
                                        <p>This is the second banner slide with different text and maybe a different image.</p>
                                        <div className="add-bag d-flex align-items-center">
                                            <a className="add-btn" href="#"><span className="lnr lnr-cross"></span></a>
                                            <span className="add-text text-uppercase">Add to Bag</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="banner-img">
                                        <img className="img-fluid" src="/img/banner/banner-img.png" alt="Slide 2" />
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
