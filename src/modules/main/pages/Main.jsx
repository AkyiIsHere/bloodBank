import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BloodCard = ({ type, donateTo, receiveFrom, population }) => (
  <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 transform transition duration-500 hover:scale-105 hover:shadow-xl hover:bg-red-400 cursor-pointer">
    <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
      {type}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{type} Blood</h3>
    <p className="text-gray-600 mb-2">Can donate to: {donateTo}</p>
    <p className="text-gray-600 mb-2">Can receive from: {receiveFrom}</p>
    <span className="text-sm bg-red-200 text-red-700 px-3 py-1 rounded-full">
      {population} of population
    </span>
  </div>
);

export default function Main() {
  const [showNegativeTypes, setShowNegativeTypes] = useState(false);

  const bloodData = [
    {
      type: "A+",
      donateTo: "A+, AB+",
      receiveFrom: "A+, A-, O+, O-",
      population: "36%",
    },
    {
      type: "A-",
      donateTo: "A+, A-, AB+, AB-",
      receiveFrom: "A-, O-",
      population: "6%",
    },
    {
      type: "B+",
      donateTo: "B+, AB+",
      receiveFrom: "B+, B-, O+, O-",
      population: "9%",
    },
    {
      type: "B-",
      donateTo: "B+, B-, AB+, AB-",
      receiveFrom: "B-, O-",
      population: "2%",
    },
    {
      type: "AB+",
      donateTo: "AB+",
      receiveFrom: "All blood types",
      population: "3%",
    },
    {
      type: "AB-",
      donateTo: "AB+, AB-",
      receiveFrom: "AB-, A-, B-, O-",
      population: "1%",
    },
    {
      type: "O+",
      donateTo: "O+, A+, B+, AB+",
      receiveFrom: "O+, O-",
      population: "37%",
    },
    {
      type: "O-",
      donateTo: "All blood types",
      receiveFrom: "O-",
      population: "7%",
    },
  ];

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "16px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "24px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "12px",
        },
      },
    ],
  };

  useEffect(() => {
    // Add animation to requirement items on scroll
    const requirementItems = document.querySelectorAll(".requirement-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    requirementItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      requirementItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  const toggleNegativeTypes = () => {
    setShowNegativeTypes(!showNegativeTypes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-700 mb-4 sm:mb-6 leading-tight">
            Save Lives. <br className="hidden md:inline" /> Be a Lifesaver Today
          </h1>
          <p className="max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-gray-800 mb-6">
            "We rise by lifting others — and through blood donation, you rise to
            become a silent hero to someone you may never meet."
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button href="/request-form" primary className="w-full sm:w-auto">
              {/* <i className="fas fa-hand-holding-medical mr-2"></i> */}
              Request Blood
            </Button>
            <Button href="/donor-form" className="w-full sm:w-auto">
              {/* <i className="fas fa-tint mr-2"></i> */}
              Book a Donation
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 bg-red-200 rounded-2xl blur-lg opacity-30"></div>
            <img
              src="HomeImage.jpg"
              alt="Blood Donation Illustration"
              className="relative w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Blood Type Compatibility Section */}
      <section id="bloodtype" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Blood Type <span className="text-red-600">Compatibility</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Learn about different blood types and who you can help
            </p>
          </div>

          {/* Mobile & Tablet Slider */}
          <div className="lg:hidden px-2 sm:px-0 mb-8">
            <Slider {...sliderSettings}>
              {bloodData.slice(0, 4).map((item, index) => (
                <div key={index} className="px-1.5 sm:px-2 py-2">
                  <BloodCard {...item} />
                </div>
              ))}
            </Slider>
          </div>

          {/* Desktop Grid - Positive Types */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {bloodData.slice(0, 4).map((item, index) => (
              <BloodCard key={index} {...item} />
            ))}
          </div>

          {/* Negative Blood Types (Conditionally rendered) */}
          {showNegativeTypes && (
            <>
              {/* Mobile & Tablet Slider */}
              <div className="lg:hidden px-2 sm:px-0">
                <Slider {...sliderSettings}>
                  {bloodData.slice(4).map((item, index) => (
                    <div key={index} className="px-1.5 sm:px-2 py-2">
                      <BloodCard {...item} />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Desktop Grid - Negative Types */}
              <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6 animate-slide-up">
                {bloodData.slice(4).map((item, index) => (
                  <BloodCard key={index} {...item} />
                ))}
              </div>

              {/* See Less Button - Only shown when negative types are visible */}
              <div className="text-center mt-8">
                <button
                  onClick={toggleNegativeTypes}
                  className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-50 transition duration-300"
                >
                  See Less Blood Types
                  <i className="fas fa-chevron-up ml-2"></i>
                </button>
              </div>
            </>
          )}

          {/* See More Button - Only shown when negative types are NOT visible */}
          {!showNegativeTypes && (
            <div className="text-center">
              <button
                onClick={toggleNegativeTypes}
                className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-50 transition duration-300"
              >
                See More Blood Types
                <i className="fas fa-chevron-down ml-2"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Donor Requirements Section */}
      <section
        id="requirements"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Donor <span className="text-red-600">Requirements</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              What you need to know before donating blood
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Requirements */}
            <div className="requirement-item bg-red-50 rounded-xl p-6 shadow-sm border border-red-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-user-check text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Basic Requirements
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>
                    Age between 18-65 years (16-17 with parental consent in some
                    areas)
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Weight at least 50 kg (110 lbs)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Good general health on the day of donation</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Valid ID with photo and proof of age</span>
                </li>
              </ul>
            </div>

            {/* Health Considerations */}
            <div className="requirement-item bg-red-50 rounded-xl p-6 shadow-sm border border-red-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-heartbeat text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Health Considerations
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>
                    Hemoglobin level at least 12.5 g/dL for women, 13.0 g/dL for
                    men
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>No active infections or illnesses</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>
                    Blood pressure between 90/50 mmHg and 180/100 mmHg
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Body temperature below 37.5°C (99.5°F)</span>
                </li>
              </ul>
            </div>

            {/* Temporary Deferrals */}
            <div className="requirement-item bg-red-50 rounded-xl p-6 shadow-sm border border-red-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-clock text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Temporary Deferrals
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Recent tattoos/piercings (wait 3-12 months)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Pregnancy (wait 6 weeks after delivery)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Recent travel to malaria-risk areas</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Certain medications (antibiotics, etc.)</span>
                </li>
              </ul>
            </div>

            {/* Permanent Deferrals */}
            <div className="requirement-item bg-red-50 rounded-xl p-6 shadow-sm border border-red-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-ban text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Permanent Deferrals
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>HIV/AIDS infection</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Hepatitis B or C infection</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Certain cancers</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Creutzfeldt-Jakob Disease (CJD) risk</span>
                </li>
              </ul>
            </div>

            {/* Before Donation */}
            <div className="requirement-item bg-red-50 rounded-xl p-6 shadow-sm border border-red-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-hand-holding-medical text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Before Donation
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Eat a healthy meal before donating</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Drink plenty of fluids (especially water)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Avoid fatty foods before donation</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Get a good night's sleep</span>
                </li>
              </ul>
            </div>

            {/* After Donation */}
            <div className="requirement-item bg-red-50 rounded-xl p-6 shadow-sm border border-red-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-heartbeat text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  After Donation
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Rest for 10-15 minutes after donation</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Drink extra fluids for 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Avoid strenuous activity for 5 hours</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-red-500 mt-1 mr-2"></i>
                  <span>Keep bandage on for 4-5 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Tailwind Config Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          tailwind.config = {
            theme: {
              extend: {
                animation: {
                  'fade-in': 'fadeIn 0.5s ease-in-out',
                  'slide-up': 'slideUp 0.5s ease-out',
                  'pulse-slow': 'pulse 3s infinite',
                },
                keyframes: {
                  fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                  },
                  slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                  }
                }
              }
            }
          }
        `,
        }}
      />

      {/* Custom Styles */}
      <style jsx>{`
        .blood-card {
          transition: all 0.3s ease;
        }
        .blood-card:hover {
          transform: translateY(-5px);
        }
        .requirement-item {
          transition: all 0.3s ease;
        }
        .requirement-item:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
