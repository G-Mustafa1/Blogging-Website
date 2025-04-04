import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase-config.js";

const singupBtn = document.querySelector('.singup-btn');
const loginBtn = document.querySelector('.login-btn');
const passwordShow = document.querySelectorAll('.password');
const showButtons = document.querySelectorAll('#show');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const contanir = document.querySelector('.contanir');

console.log(auth);
console.log('hy')
singupBtn.addEventListener('click', () => {
   contanir.classList.add('active');
});
loginBtn.addEventListener('click', () => {
   contanir.classList.remove('active');
});

showButtons.forEach((click) => {
   click.addEventListener('click', () => {
      passwordShow.forEach((pas) => {
         if (pas.type === "password") {
            pas.type = "text";
            click.classList.remove('fa-eye');
            click.classList.add('fa-eye-slash');
         } else {
            pas.type = "password";
            click.classList.add('fa-eye');
            click.classList.remove('fa-eye-slash');
         }
      });
   });
});

signupForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   const name = document.getElementById('name').value;
   const email = document.getElementById('email_sig').value;
   const password = document.getElementById('password_sig').value;

   try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Swal.fire({
         title: "Success",
         text: "Signed up successfully!",
         icon: "success"
      }).then(() => {
         window.location.reload();
      });

   } catch (error) {
      Swal.fire({
         title: "Error",
         text: error.message,
         icon: "error"
      });
   }
});


loginForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   const email = document.getElementById('email_log').value;
   const password = document.getElementById('password_log').value;

   try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (email === "admin@example.com") {
         window.location.href = "/pages/admin.html";
      } else {
         window.location.href = "../index.html";
      }
      Swal.fire({
         title: "Success",
         text: "Loged in successfully!",
         icon: "success"
      })
   } catch (error) {
      Swal.fire({
         title: "Error",
         text: error.message,
         icon: "error"
      });
   }
   loginForm.reset();
});