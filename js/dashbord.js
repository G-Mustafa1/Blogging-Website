import { db, collection, addDoc } from "./firebase-config.js";
import { auth, signOut, onAuthStateChanged } from "./firebase-config.js";
const addBlog = document.getElementById('add-blog-btn');
console.log(db)

onAuthStateChanged(auth, (user) => {
   if (!user) {
       window.location.href = "./login.html"; 
   } 
});

addBlog.addEventListener('click', async () => {
   addBlog.disabled = true;
   const blogTitel = document.getElementById('blog-title');
   const blogContent = document.getElementById('blog-content');

   if (blogTitel.value.trim() === "" || blogContent.value.trim() === ""){
      Swal.fire({
         title: "error",
         text: "Please enter both title and content.",
         icon: "error"
      })
      // alert("Please enter both title and content.");
      addBlog.disabled = false;
   } else {
      try {
         const user = auth.currentUser; 
         if (!user) {
            window.location.href = "./login.html";
            return;
         }

         await addDoc(collection(db, "blogs"), {
           title: blogTitel.value,
           content: blogContent.value,
           author: user.email, 
           timestamp: new Date()
        });
        Swal.fire({
           title: "Blog Add",
           text: "✅ Blog Add Successfully!",
           icon: "success"
        })
        blogTitel.value = "";
        blogContent.value = "";
     } catch (e) {
        console.error("Error adding document: ", e);
     }
     addBlog.disabled = false;
   }


})

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
