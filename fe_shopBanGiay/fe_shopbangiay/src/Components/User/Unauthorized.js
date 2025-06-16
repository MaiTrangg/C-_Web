import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.icon}>🚫</div>
                <h1 style={styles.title}>403</h1>
                <h2 style={styles.subtitle}>Không có quyền truy cập</h2>
                <p style={styles.text}>
                    Trang này yêu cầu quyền truy cập đặc biệt. Vui lòng quay lại trang chính hoặc đăng nhập bằng tài khoản có quyền phù hợp.
                </p>
                <Link to="/home" style={styles.button}>⬅ Về trang chủ</Link>
            </div>
        </div>
    );
};

const styles = {
    page: {
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #dceefb, #fef9f4)", // pastel xanh + trắng kem
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
        background: "rgba(255, 255, 255, 0.85)",
        borderRadius: "16px",
        padding: "40px",
        maxWidth: "500px",
        width: "90%",
        textAlign: "center",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        color: "#333"
    },
    icon: {
        fontSize: "64px",
        marginBottom: "20px"
    },
    title: {
        fontSize: "64px",
        fontWeight: "bold",
        color: "#ff6b6b",
        marginBottom: "10px"
    },
    subtitle: {
        fontSize: "22px",
        fontWeight: "500",
        color: "#444",
        marginBottom: "16px"
    },
    text: {
        fontSize: "16px",
        color: "#555",
        marginBottom: "32px",
        lineHeight: "1.5"
    },
    button: {
        display: "inline-block",
        padding: "12px 24px",
        backgroundColor: "#38bdf8", // pastel xanh nhẹ
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
        transition: "background 0.3s ease",
    }
};

export default Unauthorized;
