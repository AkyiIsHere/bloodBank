import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPhoneAlt,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa"; //npm install react-icons
import Footer from "../components/Footer";

const bloodBanksData = [
  {
    id: 1,
    name: "LifeSave Blood Center",
    location: "New York, NY",
    phone: "+1 (212) 555-1001",
    email: "info@lifesave.org",
    bloodTypes: ["A+", "A-", "B+", "O+", "O-"],
    description: "24/7 blood donation center with emergency services",
    image: "./BB1.jpg",
  },
  {
    id: 2,
    name: "Red Cross Blood Bank",
    location: "Chicago, IL",
    phone: "+1 (312) 555-2002",
    email: "chicago@redcross.org",
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    description: "National blood bank with comprehensive services",
    image: "./BB2.png",
  },
  {
    id: 3,
    name: "Hope Blood Services",
    location: "Los Angeles, CA",
    phone: "+1 (213) 555-3003",
    email: "contact@hopeblood.org",
    bloodTypes: ["A+", "B+", "AB+", "O+"],
    description: "Specialized in pediatric blood donations",
    image: "./BB3.jpg",
  },
  {
    id: 4,
    name: "United Blood Network",
    location: "Houston, TX",
    phone: "+1 (713) 555-4004",
    email: "info@ubn.org",
    bloodTypes: ["A-", "B-", "AB-", "O-"],
    description: "Focus on rare blood types and plasma donations",
    image: "./BB4.jpg",
  },
  {
    id: 5,
    name: "Vital Blood Center",
    location: "Miami, FL",
    phone: "+1 (305) 555-5005",
    email: "vital@vitalblood.org",
    bloodTypes: ["A+", "B+", "O+"],
    description: "Community blood center with mobile units",
    image: "./BB5.jpg",
  },
  {
    id: 6,
    name: "Community Blood Bank",
    location: "Seattle, WA",
    phone: "+1 (206) 555-6006",
    email: "donate@communityblood.org",
    bloodTypes: ["A-", "B-", "O-"],
    description: "Non-profit organization serving local hospitals",
    image: "./BB6.jpg",
  },
  {
    id: 7,
    name: "Metro Blood Services",
    location: "Boston, MA",
    phone: "+1 (617) 555-7007",
    email: "metro@metroblood.org",
    bloodTypes: ["A+", "A-", "AB+", "AB-"],
    description: "Serving the greater Boston area since 1995",
    image: "./BB7.jpg",
  },
  {
    id: 8,
    name: "National Blood Center",
    location: "Washington, DC",
    phone: "+1 (202) 555-8008",
    email: "national@nbc.org",
    bloodTypes: ["B+", "B-", "O+", "O-"],
    description: "Federal blood bank with research facilities",
    image: "./BB8.jpg",
  },
];

export default function Main() {
  const [selectedType, setSelectedType] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(filteredBanks.length / itemsPerSlide);

  useEffect(() => {
    const filtered = selectedType
      ? bloodBanksData.filter((bank) => bank.bloodTypes.includes(selectedType))
      : bloodBanksData;
    setFilteredBanks(filtered);
    setCurrentSlide(0);
  }, [selectedType]);

  const handleTypeClick = (type) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const showSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const showPrevSlide = () => showSlide(currentSlide - 1);
  const showNextSlide = () => showSlide(currentSlide + 1);

  const Bs = [
    { id: 1, src: "./b1.png" },
    { id: 2, src: "./b2.png" },
    { id: 3, src: "./b3.png" },
    { id: 4, src: "./b4.png" },
    { id: 5, src: "./b5.png" },
    { id: 6, src: "./b6.png" },
    { id: 7, src: "./b7.png" },
    { id: 7, src: "./b8.png" },
  ];
  const duplicatedBs = [...Bs, ...Bs];

  return (
    <>
      <Navbar />

      <section className="py-16 md:py-24 bg-gradient-to-br from-red-100 via-red-50 to-red-100">
        {/* slides */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Animation styles */}
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-250px * 7));
              }
            }

            .animate-scroll {
              animation: scroll 40s linear infinite;
              width: calc(250px * 14);
            }
          `}</style>

          <div className="relative h-28 overflow-hidden rounded-lg">
            {/* Slider track */}
            <div className="flex h-full animate-scroll">
              {duplicatedBs.map((Bs, index) => (
                <div
                  key={`${Bs.id}-${index}`}
                  className="flex-shrink-0 w-70 h-full flex items-center justify-center"
                >
                  <img
                    src={Bs.src}
                    alt={`Logo ${Bs.id}`}
                    className="max-h-35 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-24 pb-16 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Find Blood Banks by{" "}
                <span className="text-red-600">Blood Type</span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select a blood type below to view blood banks that have that
                type available
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-full font-medium border transition ${
                      selectedType === type
                        ? "bg-red-600 text-white border-red-600"
                        : "border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                    }`}
                    onClick={() => handleTypeClick(type)}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            {selectedType
              ? `Showing blood banks for type: ${selectedType}`
              : "Select a blood type to view available banks"}
          </h2>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIdx = slideIndex * itemsPerSlide;
                const endIdx = startIdx + itemsPerSlide;
                const slideBanks = filteredBanks.slice(startIdx, endIdx);

                return (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {slideBanks.map((bank) => (
                        <div
                          key={bank.id}
                          className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                        >
                          <div className="h-50  bg-red-200 overflow-hidden rounded-lg mb-4">
                            <img
                              src={bank.image}
                              alt={bank.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            {bank.name}
                          </h3>
                          <p className="text-gray-500 mb-2">{bank.location}</p>
                          <p className="text-gray-600 text-sm mb-4">
                            {bank.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {bank.bloodTypes.map((type) => (
                              <span
                                key={type}
                                className="text-xs bg-red-200 text-red-600 px-2 py-1 rounded-full"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                          <div className="space-y-2 mb-4">
                            <p className="text-gray-700 flex items-center">
                              <FaPhoneAlt className="mr-2 text-primary-500" />{" "}
                              {bank.phone}
                            </p>
                            <p className="text-gray-700 flex items-center">
                              <FaEnvelope className="mr-2 text-primary-500" />{" "}
                              {bank.email}
                            </p>
                          </div>

                          <div className="flex justify-center mt-8">
                            <a
                              href="./request-form"
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-red-500 text-white font-medium rounded-full transition duration-300 hover:bg-white hover:text-red-600 hover:shadow border border-red-500"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Request Blood
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={showPrevSlide}
                disabled={currentSlide === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white shadow-lg text-primary-500 hover:text-white hover:bg-red-500 w-12 h-12 rounded-full flex items-center justify-center"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={showNextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white shadow-lg text-primary-500 hover:text-white hover:bg-red-500 w-12 h-12 rounded-full flex items-center justify-center"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => showSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-primary-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
