function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      Welcome to Homepage !<br/><br/>
      <figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-semibold">
              “Tailwind CSS is the only framework that I've seen scale
              on large teams. It’s easy to customize, adapts to any design,
              and the build size is tiny.”
            </p>
          </blockquote>
          <figcaption class="font-medium">
            <div class="text-indigo-600">
              Sarah Dayan
            </div>
            <div class="text-gray-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure>
    </div>
  )
}

export default Home