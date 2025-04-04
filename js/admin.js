import { db, addDoc, collection, getDocs, deleteDoc, updateDoc, doc } from "./firebase-config.js";
import { auth, onAuthStateChanged, signOut } from "./firebase-config.js";

const addBlog = document.getElementById('add-blog-btn');

onAuthStateChanged(auth, (user) => {
   if (!user || user.email !== "admin@example.com") {
      window.location.href = "./login.html";
   } else {
      fetchAllBlogs();
   }
});

addBlog.addEventListener('click', async () => {
   addBlog.disabled = true;
   const blogTitel = document.getElementById('blog-title');
   const blogContent = document.getElementById('blog-content');

   if (blogTitel.value.trim() === "" || blogContent.value.trim() === "") {
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
         setTimeout(() => {
            Swal.fire({
               title: "Blog Add",
               text: "✅ Blog Add Successfully!",
               icon: "success"
            })
         },2000)
         blogTitel.value = "";
         blogContent.value = "";
         fetchAllBlogs()
      } catch (e) {
         console.error("Error adding document: ", e);
      }
      addBlog.disabled = false;
   }


})


async function fetchAllBlogs() {
   const blog = document.getElementById('blogs-container');
   console.log(blog)
   blog.innerHTML = "<h1>⏳ Loading blogs...</h1>";

   try {
      if (querySnapshot.empty) {
         blog.innerHTML = "<h2>😔 No blogs found.</h2>";
         return;
     }
      const querySnapshot = await getDocs(collection(db, "blogs"));
      blog.innerHTML = "";

      querySnapshot.forEach((doc) => {
         const blogitem = doc.data();
         const blogId = doc.id;

         const blogCard = document.createElement("div");
         blogCard.classList.add("blog-card");
         blogCard.innerHTML = `
         <h3>${blogitem.title}</h3>
         <p>${blogitem.content}</p>
         <p>${blogitem.author}</p>
         <button onclick="editBlog('${blogId}', '${blogitem.title}', '${blogitem.content}')" class="btn btn-primary">✏️ Edit</button>
         <button onclick="deleteBlog('${blogId}')" class="btn btn-danger">🗑️ Delete</button>
         `;
         blog.appendChild(blogCard);
      });
   } catch (error) {
      console.log(error.message)
   }
}

window.editBlog = async function (blogId, blogTitel, blogContent) {
   console.log(blogId, blogTitel, blogContent)

   const newTitle = prompt("Enter new title:", blogTitel);
   const newContent = prompt("Enter new content:", blogContent);

   if (newTitle && newContent) {
      await updateDoc(doc(db, "blogs", blogId), {
         title: newTitle,
         content: newContent
      });
      Swal.fire({
         title: "Blog Updated",
         text: "✅ Blog Updated Successfully!",
         icon: "success"
      })
      // alert("✅ Blog Updated Successfully!");
      window.location.reload();
   }

}

window.deleteBlog = async function (blogId) {
   console.log('hy', blogId)
   await deleteDoc(doc(db, "blogs", blogId));
   Swal.fire({
      title: "Blog Deleted",
      text: "✅ Blog Deleted Successfully!",
      icon: "success"
   })
   //  alert("🗑️ Blog Deleted!");
   window.location.reload();
};

console.log('very good')



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
