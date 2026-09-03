const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>Foodie App</h3>
                <p>© 2026 Foodie App. All rights reserved.</p>
            </div>

            <div className="footer-section">
                <h3>Links</h3>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
            </div>

            <div className="footer-section">
                <h3>Address</h3>
                <p>123 Khau Gaali</p>
                <p>Mumbai, India</p>
            </div>

            <div className="footer-section">
                <h3>Contact</h3>
                <p>📞 +91 98765 43210</p>
                <p>✉️ support@foodieapp.com</p>
            </div>
        </footer>
    );
};

export default Footer;