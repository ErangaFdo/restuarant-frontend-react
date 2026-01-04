import about01 from "../assets/about-01.png";
import about02 from "../assets/about-02.png";
import about03 from "../assets/about-03.png";
import about04 from "../assets/about-04.png";

const About = () => {
  return (
    <section className="bg-white py-30 px-6 md:px-20" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* LEFT SIDE - Image Grid */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={about01}
                alt="Our Chef"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={about02}
                alt="Dining Area"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={about03}
                alt="Delicious Food"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={about04}
                alt="Restaurant Interior"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Text Content */}
        <div className="md:w-1/2 text-left md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-orange-500">Golden Spoon </span>
          </h2>
          <p className="text-gray-700 text-xl leading-relaxed mb-6">
            Welcome to{" "}
            <span className="font-semibold text-orange-500">
              Golden Spoon Restaurant
            </span>{" "}
              , your luxurious escape where fine dining meets holistic relaxation.
                    Nestled in the heart of the city, we are proud to offer a unique fusion of world-class cuisine and rejuvenating
                    spa experiences. At Harmony Haven, our mission is simple to nourish the body and soul.
          </p>
          <p className="text-gray-700 text-xl leading-relaxed mb-6">
            Our restaurant features a carefully curated menu crafted by award-winning chefs, blending traditional flavors
                    with modern techniques. Just steps away, our tranquil spa offers an oasis of calm with massages, facials,
                    and wellness treatments. Whether celebrating or relaxing, Harmony Haven is your perfect destination.
                    Come indulge your senses because you deserve the best of both worlds.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default About;