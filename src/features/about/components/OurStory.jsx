const OurStory = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-12 my-1">
      <div className="md:w-1/2 text-left">
        <h2 className="text-3xl font-bold mb-4 text-left">Our Story</h2>
        <p className="text-gray-700 mb-10 leading-relaxed text-left mt-25">
          Launched in 2015, Exclusive is South Asia’s premier online shopping
          marketplace with an active presence in Bangladesh. Supported by a wide
          range of tailored marketing, data, and service solutions, Exclusive
          has 10,500 sellers and 300 brands and serves 3 million customers
          across the region.
        </p>
        <p className="text-gray-700 leading-relaxed text-left mb-10 mt-2">
          Exclusive has more than 1 million products to offer, growing very
          fast. Exclusive offers a diverse assortment in categories ranging from
          consumer goods to lifestyle products.
        </p>
      </div>

      <div className="md:w-1/2 bd-2 p-0 m-0 right-0">
        <img
          src="/src/assets/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1 (1).png"
          alt="Our Story"
          className="w-full rounded-lg object-cover"
        />
      </div>
    </section>
  );
};

export default OurStory;
