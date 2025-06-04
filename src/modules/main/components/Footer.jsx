import { Link } from "react-router";
import { FaPaperPlane } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-red-900 text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Intro */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-20 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/BLOODBANK.png"
                  alt="BloodConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="ml-3 text-xl font-semibold">BloodBank</span>
            </div>
            <p className="text-gray-400">
              Connecting donors with those in need to save lives through blood
              donation.
            </p>

            <div className="flex space-x-5 space-y-12">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>

          {/* Quick Links  Nav to update */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center text-white">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 gap-y-4 text-sm text-center">
              <li>
                <Link
                  to="/main"
                  className="text-gray-300 hover:text-red-400 hover:underline transition duration-300 ease-in-out"
                >
                  Main
                </Link>
              </li>
              {/* <li>
      <Link
        to="/about"
        className="text-gray-300 hover:text-red-400 hover:underline transition duration-300 ease-in-out"
      >
        About
      </Link>
    </li>
    <li>
      <Link
        to="/contact"
        className="text-gray-300 hover:text-red-400 hover:underline transition duration-300 ease-in-out"
      >
        Contact
      </Link>
    </li> */}
              <li>
                <Link
                  to="/view"
                  className="text-gray-300 hover:text-red-400 hover:underline transition duration-300 ease-in-out"
                >
                  View
                </Link>
              </li>
              <li>
                <Link
                  to="/donor-form"
                  className="text-gray-300 hover:text-red-400 hover:underline transition duration-300 ease-in-out"
                >
                  Donor
                </Link>
              </li>
              <li>
                <Link
                  to="/request-form"
                  className="text-gray-300 hover:text-red-400 hover:underline transition duration-300 ease-in-out"
                >
                  Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and blood donation
              campaigns.
            </p>
            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 rounded-l-md focus:outline-none w-full text-gray-900 bg-white placeholder-gray-500 shadow-sm"
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-r-md text-white shadow-sm transition duration-300"
              >
                <FaPaperPlane className="text-white text-xl" />
              </button>
            </form>
          </div>
        </div>
        <p className="text-gray-400 mb-4 md:mb-0 text-left">
          © 2025 BloodBank. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
