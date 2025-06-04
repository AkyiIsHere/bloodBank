import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; //npm install aos swiper lucide-react
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Autoplay, EffectFade } from "swiper/modules";

import { Heart, Users, Hospital } from "lucide-react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-linear-to-br/oklab from-white to-red-200 min-h-screen py-12 px-6 md:px-10 text-gray-800 overflow-hidden">
        {/* Hero Section with Gradient Text */}
        <section className="relative bg-white-100 py-24 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-4" data-aos="fade-right">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent animate-text-glow">
                About BloodBank
              </h1>
              <p className="text-lg text-gray-700">
                We're saving lives by connecting donors and patients using smart
                tools and compassion.
              </p>
            </div>
            <div className="md:w-1/2" data-aos="zoom-in">
              <Swiper
                effect="fade"
                loop
                autoplay={{ delay: 3000 }}
                modules={[Autoplay, EffectFade]}
                className="rounded-xl shadow-2xl w-full h-[300px]"
              >
                {["AboutUs.jpg", "HomeImage.jpg", "Image1.jpg"].map(
                  (src, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={src}
                        alt={`Slide ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          className="bg-gradient-to-br from-red-100 to-white py-16"
          data-aos="fade-up"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
              <Users className="mx-auto text-red-500" size={36} />
              <h2 className="text-3xl font-bold mt-4 text-red-600">5,000+</h2>
              <p className="text-gray-700">Donors Registered</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
              <Heart className="mx-auto text-pink-500" size={36} />
              <h2 className="text-3xl font-bold mt-4 text-red-600">12,000+</h2>
              <p className="text-gray-700">Units of Blood Delivered</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
              <Hospital className="mx-auto text-red-400" size={36} />
              <h2 className="text-3xl font-bold mt-4 text-red-600">100+</h2>
              <p className="text-gray-700">Partner Hospitals</p>
            </div>
          </div>
        </section>

        {/* About Sections */}
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          <div
            className="grid md:grid-cols-2 items-center gap-10"
            data-aos="fade-right"
          >
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">
                🌟 Our Services
              </h2>
              <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                <li>Real-time donor-patient matching</li>
                <li>Secure appointment scheduling</li>
                <li>Live blood inventory monitoring</li>
                <li>Data privacy and transparency</li>
              </ul>
            </div>
            <img
              src="Service.jpg"
              alt="Services"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <div
            className="grid md:grid-cols-2 items-center gap-10"
            data-aos="fade-left"
          >
            <img
              src="Vision.jpg"
              alt="Vision"
              className="rounded-xl shadow-lg w-full"
            />
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">
                ❤️ Our Vision
              </h2>
              <p className="text-lg text-gray-700">
                We envision a future where blood is always available when
                needed. Faster donations, increased transparency, and
                life-saving technology.
              </p>
            </div>
          </div>

          <div
            className="grid md:grid-cols-2 items-center gap-10"
            data-aos="fade-up"
          >
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">
                🤝 Join the Mission
              </h2>
              <p className="text-lg text-gray-700">
                Your kindness saves lives. Become a donor, spread awareness, or
                partner with us today.
              </p>
            </div>
            <img
              src="Join.jpg"
              alt="Join Mission"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative bg-gradient-to-r from-red-600 to-pink-500 py-20 text-white text-center overflow-hidden rounded-xl"
          data-aos="zoom-in"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 animate-pulse">
              Become a Life Saver
            </h2>
            <p className="text-lg mb-6">
              Register now and save lives with a single donation.
            </p>
            <a
              href="./donor-form"
              className="inline-block bg-white text-red-600 px-6 py-3 font-semibold rounded-full shadow hover:scale-110 transition-transform"
            >
              Donate Now
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
