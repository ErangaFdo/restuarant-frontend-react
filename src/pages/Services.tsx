import services01 from '../assets/services-01.png'
import services02 from '../assets/services-02.png'
import services03 from '../assets/services-03.png'


function Service() {
  return (
    <section id="accessories" className="py-16 bg-white mt-5">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-orange-500 text-center mb-10">
           Our Services
          </h1>

          

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {/* Accessory Card 1 */}
            <div className="bg-gray-50 border-b border-orange-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={services01} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-orange-500 text-center">Live Cooking Station</h4>
                <p className="text-gray-600 mt-2 text-center">Experience the excitement of our live cooking station, where chefs prepare dishes right before your eyes. Watch the artistry unfold and savor meals fresh off the grill.</p>
              </div>
            </div>


            <div className="bg-gray-50 border-b border-orange-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={services02} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-orange-500 text-center">Gourmet Buffet</h4>
                <p className="text-gray-600 mt-2 text-center">Explore an indulgent spread of international and local cuisines in our gourmet buffet. From appetizers to desserts, enjoy an all-you-can-eat experience in style.</p>
              </div>
            </div>


            <div className="bg-gray-50 border-b border-orange-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={services03} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-orange-500 text-center">Catering Service</h4>
                <p className="text-gray-600 mt-2 text-center">Delight your guests with our top-notch catering service, offering customized menus and professional hospitality for every occasion.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
  )
}

export default Service