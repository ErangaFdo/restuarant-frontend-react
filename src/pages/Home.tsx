import homeimage from "../assets/homeimage.png";


export default function AnjalFarmHero() {
  return (
    <div className="font-sans text-white">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              `url(${homeimage})`,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl px-6 text-center">

          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Welcome to our
            
          </h1>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Golden Spoon Restaurant
            
          </h1>


          <p className="mt-6 text-base md:text-lg text-sky-100/90">
           Where culinary excellence meets wellness. Dive into gourmet dining and rejuvenating spa treatments all under one roof. Let your senses unwind.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <a
              href="/fish"
              className="px-8 py-4 rounded-xl bg-orange-500 font-semibold shadow-xl hover:bg-orange-400 transition"
            >
              Explore Our Menu
            </a>

            <a
              href="/access"
              className="px-8 py-4 rounded-xl border border-white/40 bg-white/10 backdrop-blur-md font-semibold hover:bg-orange-500 transition"
            >
              Explore our Service
            </a>
          </div>

        </div>
      </section>

    </div>
  )
}
