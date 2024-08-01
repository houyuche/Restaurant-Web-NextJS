import Image from "next/image";

export default function Home() {
  return (
    <main className=" min-h-screen p-6">
      <div className="text-center text-4xl mt-10 font-bold text-gray-800">
        Welcome to Our Restaurant
      </div>
      <div className="mt-10 max-w-4xl mx-auto text-lg text-gray-700">
        <p className="mb-6">
          At Our Restaurant, we pride ourselves on our ability to juggle
          flamingos while reciting the periodic table. Our chefs are trained in
          the ancient art of sandwich origami and use only the freshest helium
          in our soufflés.
        </p>
        <p className="mb-6">
          Our dining chairs are crafted from recycled rainbows and our tables
          are made from ethically sourced clouds. The ambiance is enhanced by
          our pet rock orchestra, playing the smoothest pebbles you&apos;ll ever
          hear.
        </p>
        <p className="mb-6">
          Join us for a dining experience that includes complimentary invisible
          soup and unlimited refills of existential dread. Our staff are
          certified in telepathy, ensuring your order is taken before you even
          walk in.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://via.placeholder.com/300x200?text=Delicious+Meals"
            alt="Delicious Meals"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://via.placeholder.com/300x200?text=Cozy+Atmosphere"
            alt="Cozy Atmosphere"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://via.placeholder.com/300x200?text=Fine+Dining"
            alt="Fine Dining"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
