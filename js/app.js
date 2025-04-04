import { auth, signOut , onAuthStateChanged } from "./firebase-config.js";

console.log(auth)
onAuthStateChanged(auth, (user) => {
   if (!user) {
       window.location.href = "./pages/login.html";
   } 
});

const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListener("click", () => {
   signOut(auth)
   Swal.fire({
      title: "Log Out",
      text: "Logout successfully!",
      icon: "success"
   })
      .then(() => {
         console.log("User logged out");
         window.location.href = "./login.html";
      })
      .catch((error) => {
         console.error("Logout error:", error);
      });
});


