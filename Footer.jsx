import React from "react";


const Footer = () => {
  return (
    <footer className="bg-luxury-ink text-white py-12 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">VerifyCareers</h3>
          <p className="text-luxury-body text-sm">
            Helping students and job seekers detect job scams through intelligent analysis of offers and communications.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul>
            <li><a href="#about" className="hover:text-luxury-accent transition">About</a></li>
            <li><a href="#login-section" className="hover:text-luxury-accent transition">Login</a></li>
            <li><a href="#about" className="hover:text-luxury-accent transition">Features</a></li>
            <li><a href="#contact" className="hover:text-luxury-accent transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#"><img className="w-6 h-6" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google"/></a>
            <a href="#"><img className="w-6 h-6" src="https://www.svgrepo.com/show/475650/apple.svg" alt="Apple"/></a>
            <a href="#"><img className="w-6 h-6" src="https://www.svgrepo.com/show/452243/linkedin.svg" alt="LinkedIn"/></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-luxury-border pt-4 text-luxury-caption text-sm">
        &copy; 2025 VerifyCareers. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

