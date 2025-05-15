import React from 'react'

export default function About() {
  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      {/* Headings */}
      <div className="grid md:grid-cols-2 gap-8 text-center md:text-left mb-12 font-semibold">
        <div>
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600">
            At Unikorns Realty, we’re passionate about helping people find not just a house, but a place they can truly call home. With a focus on trust, professionalism, and personalized service, we make the process of buying, selling, or renting property simple and seamless. Our team of dedicated real estate experts is here to guide you every step of the way.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            We believe that every home has a story, and our mission is to help you write yours. Whether you're looking for your first home, expanding for a growing family, or investing in property, we’re committed to finding the perfect match for your needs. At Unikorns Realty, your satisfaction is our top priority—because your future deserves the right foundation.
          </p>
        </div>
      </div>

      {/* Images */}
      <div className="grid md:grid-cols-3 gap-6">
        <img
          src="https://www.rismedia.com/wp-content/uploads/2018/02/real_estate_team_908692612.jpg"
          alt="team-working-1"
          className="w-full h-72 object-cover rounded-lg shadow"
        />
        <img
          src="https://alttitle.com/wp-content/uploads/2014/03/54956317_m.jpg"
          alt="team-working-2"
          className="w-full h-72 object-cover rounded-lg shadow"
        />
        <img
          src="https://www.mckissock.com/wp-content/uploads/2019/10/leading-her-team-to-the-top-picture-id1146087658-1024x512.jpg"
          alt="person"
          className="w-full h-72 object-cover rounded-lg shadow"
        />
      </div>
    </div>

  )
}
