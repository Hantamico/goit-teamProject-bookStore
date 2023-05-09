 const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });





// Create user

function createUser(event) {
  event.preventDefault();
    const formElements = {
    username: event.currentTarget.elements.username.value,
    email: event.currentTarget.elements.email.value,
    password: event.currentTarget.elements.password.value,
    
  };
  // Створення користувача за поштою та емейлом
  createUserWithEmailAndPassword(
    auth,
    formElements.email,
    formElements.password,
    formElements.username
  )
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      alert(`Welcome to Bookshelf, ${formElements.username}!`);
      modal.classList.toggle('visually-hidden');
      return user;
    })
    .then(user => {
      set(ref(database, 'users/' + user.uid), {
        username: formElements.username,
        email: formElements.email,
        uid: user.uid,
      });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  event.currentTarget.reset();
}; //Функція виходу зі сторінки користувача
function logOutUser(event) {
  signOut(auth)
    .then(() => {
      document.location.href = 'index.html';

      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
<<<<<<< Updated upstream
}
=======
};

<<<<<<< Updated upstream
// firebase
>>>>>>> Stashed changes
=======
// Get the modal
var modalWrapper = document.getElementById("myWrapper");

// Get the button that opens the modal
var btnOpen = document.getElementById("openBtn");

var spanClose = document.getElementById("closeBtn")[0];

// When the user clicks on the button, open the modal
btnOpen.onclick = function() {
  modalWrapper.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanClose.onclick = function() {
  modalWrapper.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalWrapper) {
    modalWrapper.style.display = "none";
  }
}
>>>>>>> Stashed changes
