import {
  auth,
  onAuthStateChanged,
  signOut,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  db,
  doc,
  deleteDoc,
} from "../fireBase-auth.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var postID = urlParams.get("id");

async function getData(postId) {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      // Get form input values

      const name = document.getElementById("name");
      const brand = document.getElementById("brand");
      const price = document.getElementById("price");
      const itemWeight = document.getElementById("item-weight");
      const description = document.getElementById("description");

      // Set values

      name.value = docData.name;
      brand.value = docData.brand;
      price.value = parseInt(docData.price);
      itemWeight.value = docData.itemWeight;
      description.value = docData.description;
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: index.html:276 ~ button.addEventListener ~ error:",
      error
    );
  }
}
getData(postID);
// ==================== HANDEL UPDATE ====================

// == submit form edit
document.addEventListener("DOMContentLoaded", function () {
  const formUpdate = document.getElementById("formUpdate");

  formUpdate.addEventListener("submit", handleUpdate);

  async function handleUpdate(e) {
    e.preventDefault();

    // Get form input values

    const name = document.getElementById("name").value;
    console.log("🚀 ~ file: app.js:220 ~ handleUpdate ~ name:", name);
    const brand = document.getElementById("brand").value;
    const price = document.getElementById("price").value;
    const itemWeight = document.getElementById("item-weight").value;
    const description = document.getElementById("description").value;
    try {
      const washingtonRef = doc(db, "posts", postID);
      await updateDoc(washingtonRef, {
        name,
        brand,
        price,
        itemWeight,
        description,
      });
      alert("Cập nhật thành công");
    } catch (error) {
      console.log("🚀 ~ file: app.js:174 ~ handleEdit ~ error:", error);
    }
  }
});
