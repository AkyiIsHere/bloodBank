import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white sticky top-0 z-50 font-sans shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/main"
          className="flex items-center gap-2 text-softNeonRed font-semibold text-xl select-none"
        >
          <img src="./BLOODBANK.png" alt="logo" className="w-16 h-8" />
          BloodBank
        </a>

        {/* Burger button */}
        <button
          className="md:hidden text-softNeonRed focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-12 text-base font-medium items-center relative select-none">
          {["/main", "/about", "/contact", "/view"].map((link, i) => (
            <SoftNeonLink
              key={i}
              href={link}
              label={capitalize(link.slice(1))}
            />
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-black hover:softNeonGlow focus:softNeonGlow transition duration-250 ${
                moreOpen ? "softNeonGlow" : ""
              }`}
              aria-haspopup="true"
              aria-expanded={moreOpen}
            >
              More
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg border border-softNeonRed border-opacity-30 p-2 flex flex-col gap-1 animate-fadeIn">
                <SoftNeonDropdownLink href="/donor-form" label="Donate" />
                <SoftNeonDropdownLink href="/request-form" label="Request" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-3 bg-gray-900 text-softNeonRed font-medium select-none animate-slideIn">
          {["/main", "/about", "/contact", "/view"].map((link, i) => (
            <SoftNeonLink
              key={i}
              href={link}
              label={capitalize(link.slice(1))}
            />
          ))}
          <div className="mt-4 border-t border-softNeonRed border-opacity-30 pt-2">
            <p className="text-sm mb-1">More</p>
            <div className="flex flex-col gap-1 pl-2">
              <SoftNeonDropdownLink href="/donor-form" label="Donate" />
              <SoftNeonDropdownLink href="/request-form" label="Request" />
            </div>
          </div>
        </div>
      )}

      {/* Neon styles and animations */}
      <style>{`
        /* Neon color and glow */
        .text-softNeonRed {
          color: #ff4d6d;
          text-shadow: 0 0 6px #ff4d6d88;
        }
        .softNeonRed {
          color: #ff4d6d;
        }
        .softNeonGlow:hover,
        .softNeonGlow:focus {
          color: #ff6f87;
          text-shadow:
            0 0 8px #ff6f87aa,
            0 0 16px #ff6f87bb,
            0 0 32px #ff6f87cc;
        }
        .softNeonGlow {
          transition: all 0.25s ease;
          cursor: pointer;
          outline: none;
        }

        /* Subtle click ripple */
        .click-ripple:active {
          filter: drop-shadow(0 0 8px #ff6f87cc);
          transform: scale(0.96);
          transition: transform 0.1s ease;
          outline: none;
        }

        /* Dropdown fade-in */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease forwards;
        }

        /* Slide in for mobile nav */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </nav>
  );
}

function SoftNeonLink({ href, label }) {
  const isActive = window.location.pathname === href;

  return (
    <a
      href={href}
      className={`px-2 py-1 rounded-md select-none transition-colors duration-200 click-ripple ${
        isActive
          ? "text-softNeonRed softNeonGlow"
          : "text-gray-400 hover:text-softNeonRed hover:softNeonGlow"
      }`}
    >
      {label}
    </a>
  );
}

function SoftNeonDropdownLink({ href, label }) {
  return (
    <a
      href={href}
      className="px-3 py-2 rounded-md text-gray-300 hover:text-softNeonRed hover:bg-gray-700 hover:bg-opacity-40 transition duration-200 click-ripple"
    >
      {label}
    </a>
  );
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
