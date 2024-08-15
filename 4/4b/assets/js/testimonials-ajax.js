function fetchUrl(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open("GET", url, true);
  
      xhr.onerror = () => {
        reject("Network error!");
      };
  
      xhr.onload = () => {
        resolve(JSON.parse(xhr.responseText));
      };
  
      xhr.send();
    });
  }
  
  async function allTestimonial() {
    try {
      const testimonials = await fetchUrl(
        "https://api.npoint.io/1bc51af4545ac197cc01"
      );
  
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
  
      document.getElementById("testimonials").innerHTML =
        testimonialHTML.join(" ");
    } catch (error) {
      alert(error);
    }
  }
  
  async function filterTestimonial(rating) {
    try {
      const testimonials = await fetchUrl(
        "https://api.npoint.io/1bc51af4545ac197cc01"
      );
    
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
    } catch(error) {
      alert(error)
    }
  }
  
  allTestimonial();