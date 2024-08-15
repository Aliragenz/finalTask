console.log("Connected");

// =========== //

// let dataBlog=[];

// function addBlog(event) {
//     event.preventDefault();
    
//     let title = document.getElementById("input-blog-title").value;
//     let content = document.getElementById("input-blog-content").value;
    

//     let blog={
//         title,
//         content: content,

//     };

//     dataBlog.push(blog); //dataBlog = [blog,blog]
    
//     // console.log(dataBlog);
    
//     renderBlog();
// }

// function renderBlog() {
    
//     let name = "Evan";
//     document.getElementById("content").innerHTML = "";
    
//     for (let i = 0; i < dataBlog.length; i++) {
//         document.getElementById("content").innerHTML = "";
        
//     }
// }


// =========== //


let dataBlog = []; //parkiran

function addBlog(event) {
  event.preventDefault();

  const checkboxes = document.querySelectorAll('#form input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        console.log(`Checked: ${checkbox.value}`);
    }
    });

  let title = document.getElementById("input-blog-title").value;
  let startDate = document.getElementById("input-date-start").value;
  let endDate = document.getElementById("input-date-end").value;
  let content = document.getElementById("input-blog-content").value;
  
  
      

  //mobil
  let blog = {
    title,
    startDate,
    endDate,
    content: content,

  };

  dataBlog.push(blog); // dataBlog = [blog,blog]

  console.log(dataBlog);

  // renderBlog();
}

// const start = new Date();
// console.log(start);
// console.log("Tanggal : ", start.Date());
// console.log("Bulan : ", start.getMonth());
// console.log("Tahun : ", start.getFullYear());

// =================

// ${getFullDate(dataBlog[i].postAt)}

function getFullDate(time) {
  let nameOfMonth = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let date = time.getDate();
  let month = nameOfMonth[time.getMonth()];
  let year = time.getFullYear();

  let hour = time.getHours();
  let minute = time.getMinutes();

  return `${date} ${month} ${year} - ${hour}:${minute} WIB`;
}

function getDistanceTime(time) {
  let postTime = time;
  let currentTime = new Date();

  let distanceTime = currentTime - postTime; //4000

  let miliSecond = 1000;
  let secondInHour = 3600;
  let hourInDay = 24;

  let distanceTimeInSecond = Math.floor(distanceTime / miliSecond);
  let distanceTimeInMinute = Math.floor(distanceTime / (miliSecond * 60));
  let distanceTimeInHour = Math.floor(
    distanceTime / (miliSecond * secondInHour)
  );
  let distanceTimeInDay = Math.floor(
    distanceTime / (miliSecond * secondInHour * hourInDay)
  );

  if (distanceTimeInDay > 0) {
    return `${distanceTimeInDay} days ago`;
  } else if (distanceTimeInHour > 0) {
    return `${distanceTimeInHour} hours ago`;
  } else if (distanceTimeInMinute > 0) {
    return `${distanceTimeInMinute} minutes ago`;
  } else {
    return `${distanceTimeInSecond} seconds ago`;
  }
}

//  function renderBlog() {
//      document.getElementById("contents").innerHTML = "";
 
//      for (let i = 0; i < dataBlog.length; i++) {
//        document.getElementById("contents").innerHTML += `
//       <div class="project-card">
//         <a href="detail-blog.html">
//           <img src="assets/image/Icon.ico" alt="Project Image">
//         </a>
//         <h3>${dataBlog[i].title}</h3>
//         <p class="duration">Duration : 6 Months</p>
//         <p>${dataBlog[i].content}</p>
//         <div class="project-icons">
//           <i class="fa-brands fa-google-play"></i>
//             <i class="fa-solid fa-mobile-screen-button"></i>
//             <i class="fa-brands fa-java"></i>                  
//         </div>
//         <div class="project-actions">
//           <button class="edit">Edit</button>
//           <button class="delete">Delete</button>
//         </div>
//       </div>
//       `
//      }
//    }