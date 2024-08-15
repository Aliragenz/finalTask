const testimonials = [
    {
      image:
        "https://images.pexels.com/photos/3807742/pexels-photo-3807742.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "I like the app because it's interface user friendly",
      author: "Capri",
      rating: 5,
    },
    {
      image:
        "https://images.pexels.com/photos/769730/pexels-photo-769730.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "It got features that i needed most",
      author: "Zach",
      rating: 5,
    },
    {
      image:
        "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "It's cool, i like it",
      author: "Hann",
      rating: 4,
    },
    {
      image:
        "https://images.pexels.com/photos/789315/pexels-photo-789315.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "It's not compatible with my device",
      author: "Cassandra",
      rating: 2,
    },
    {
      image:
        "https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "Still need some fixing",
      author: "Laura",
      rating: 3,
    },
  ];
  
  function allTestimonial() {
    const testimonialHTML = testimonials.map((testimonial) => {
      return `<div class="testimonial">
                  <img
                    src="${testimonial.image}"
                    class="profile-testimonial"
                  />
                  <p class="quote">${testimonial.content}</p>
                  <p class="author">- ${testimonial.author}</p>
                  <p class="user-rating">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
                </div>`;
    });
  
    document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
  }
  
  function filterTestimonial(rating) {
    const filteredTestimonialByRating = testimonials.filter((testimonial) => {
      return testimonial.rating == rating;
    });
  
    const testimonialHTML = filteredTestimonialByRating.map((testimonial) => {
      return `<div class="testimonial">
                      <img
                        src="${testimonial.image}"
                        class="profile-testimonial"
                      />
                      <p class="quote">${testimonial.content}</p>
                      <p class="author">- ${testimonial.author}</p>
                      <p class="user-rating">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
                    </div>`;
    });
  
    document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
  }
  
  allTestimonial();