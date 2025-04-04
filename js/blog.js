import { db, collection, getDocs, deleteDoc, updateDoc, doc, query, where } from "./firebase-config.js";
import { auth, signOut, onAuthStateChanged } from "./firebase-config.js";

console.log(db)

onAuthStateChanged(auth, (user) => {
   if (!user) {
       window.location.href = "./login.html";
   } else {
      console.log('haji ok')
      fecthUserblog(user.email);
   }
});

async function fecthUserblog(userEmail) {
   const blog = document.getElementById('blogs-container');
   console.log(blog)
   blog.innerHTML = "<h1>⏳ Loading blogs...</h1>";

   const q = query(collection(db, "blogs"), where("author", "==", userEmail));
   const querySnapshot = await getDocs(q);

   blog.innerHTML = "";

   if (querySnapshot.empty) {
      blog.innerHTML = "<h2>😔 No blogs found.</h2>";
      return;
  }

   querySnapshot.forEach((doc) => {
      const blogitem = doc.data();
      const blogId = doc.id;
      console.log(blogitem)

      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");
      blogCard.innerHTML = `
            <h3>${blogitem.title}</h3>
            <p>${blogitem.content}</p>
            <button onclick="editBlog('${blogId}', '${blogitem.title}', '${blogitem.content}')" class="btn btn-primary">✏️ Edit</button>
            <button onclick="deleteBlog('${blogId}')" class="btn btn-danger">🗑️ Delete</button>
        `;
      blog.appendChild(blogCard);
   });

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
         text: "✅ Blog Deleted! Successfully!",
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
