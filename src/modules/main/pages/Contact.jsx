import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiLocationMarker, HiPhone, HiMail, HiClock } from "react-icons/hi";

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section>
      <Navbar />
      <ContactMain />
      <Footer />
    </section>
  );
}

function ContactMain() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    reset();
    alert("Message sent successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-white to-red-100 min-h-screen py-12 px-6 md:px-10 text-gray-800">
      <div className="container mx-auto max-w-4xl" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-2">
            Contact <span className="text-red-500">Us</span>
          </h2>
          <p className="text-gray-600">
            Have questions or need assistance? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Contact Info */}
          <div className="flex flex-col space-y-10 p-9 bg-white rounded-2xl shadow-lg">
            {/* Logo */}
            <div className="text-center">
              <img
                src="/BLOODBANK.png"
                alt="Logo"
                className="mx-auto w-40 mb-11"
              />
            </div>
            {/* Info Items */}
            <InfoBlock
              icon={<HiLocationMarker className="text-red-600 w-6 h-6" />}
              title="Address"
              text={
                <>
                  123 LifeFlow Avenue <br />
                  City Name, Country
                </>
              }
            />
            <InfoBlock
              icon={<HiPhone className="text-red-600 w-6 h-6" />}
              title="Phone"
              text="+123 456 7890"
            />
            <InfoBlock
              icon={<HiMail className="text-red-600 w-6 h-6" />}
              title="Email"
              text="support@lifeflowbloodbank.com"
            />
            <InfoBlock
              icon={<HiClock className="text-red-600 w-6 h-6" />}
              title="Hours"
              text={
                <>
                  Mon–Sat: 8:00 AM – 6:00 PM <br />
                  Sunday: Closed
                </>
              }
            />
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                label="Name"
                type="text"
                placeholder="Your name"
                register={register("name", { required: "Name is required" })}
                error={errors.name}
              />
              {/* Email */}
              <FormField
                label="Email"
                type="email"
                placeholder="your@email.com"
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                error={errors.email}
              />
              {/* Subject */}
              <FormField
                label="Subject"
                type="text"
                placeholder="Subject of your message"
                register={register("subject", {
                  required: "Subject is required",
                })}
                error={errors.subject}
              />
              {/* Message */}
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                  })}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl h-32 resize-none focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Type your message here..."
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ icon, title, text }) {
  return (
    <div className="flex items-start space-x-3">
      <div>{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-red-600 mb-1">{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function FormField({ label, type, placeholder, register, error }) {
  return (
    <div>
      <label className="font-medium">{label}</label>
      <input
        type={type}
        {...register}
        className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
        placeholder={placeholder}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
