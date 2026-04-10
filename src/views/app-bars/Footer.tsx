import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[var(--primary-color)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--secondary-color-light)]">
              BanglaBriz
            </h3>
            <p className="!text-gray-light mb-4">
              Career Development and Education Consultancy
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--secondary-color-light)]">
              Services
            </h4>
            <ul className="space-y-2 text-[var(--gray-color)]">
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--secondary-color-light)] transition-colors"
                >
                  Career Guidance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--secondary-color-light)] transition-colors"
                >
                  Student Visa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--secondary-color-light)] transition-colors"
                >
                  Work Permit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--secondary-color-light)] transition-colors"
                >
                  Tours and Travels
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--secondary-color-light)]">
              Contact Us
            </h4>
            <div className="space-y-3 text-[var(--gray-color)]">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>14, Flat: 5/1, Chittagong, Bangladesh</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+880 1957-414962</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>info@banglabrize.bd.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--secondary-color-light)]">
              Subscribe to our newsletter
            </h4>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-body-color focus:outline-none focus:ring-2 focus:!ring-[var(--secondary-color)]"
              />
              <button className="bg-[var(--secondary-color)] hover:bg-secondary-color-light px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
            <p className="!text-gray-light text-sm">
              Subscribe to our newsletter to get the latest news and updates.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className=" !text-gray-light">
            &copy; 2024 BanglaBriz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
