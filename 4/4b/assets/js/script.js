console.log("Connected");

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    getData(event); // Pass the event object to the getData function
});

function getData(event) {

    // ======================
    
    // cek option biar tidak select option
    
    // Ambil Data
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    var subject = document.getElementById('subject').value;
    var number = document.getElementById('numberInput').value;
    var message = document.getElementById('message').value;
    
    if (subject === 'default') {
       alert('Please select a valid Subject.');
       return; // cancel form
   }

     // Link Mailto
     var mailtoLink = 'mailto:aliragenz@gmail.com' +
         '?subject=' + encodeURIComponent(subject) +
         '&body=' + encodeURIComponent('Name: ' + name + '\n' +
                                      'My Email: ' + email + '\n' +
                                      'Phone Number: ' + number + '\n' +
                                      'Message: ' + message);

     // buka linknya
     window.location.href = mailtoLink;

}