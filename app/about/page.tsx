function AboutPage() {
  return (
    <section>
      <h1 className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl'>
        We love
        <span className='bg-primary py-2 px-4 rounded-lg tracking-widest text-white'>
          store
        </span>
      </h1>
      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
        Born from a passion for quality and design, we carefully curate every item in our collection.
        Our mission is to bring you products that blend style, functionality, and durability.
        Whether you are looking for the latest trends or timeless classics, we are here to help you find exactly what you need.
      </p>
    </section>
  );
}
export default AboutPage;
