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
} from "./fireBase-auth.js";
// ====================HANDLE AUTH=======================
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const createButton = document.getElementById("createButton");

    const authButtons = document.getElementById("authButtons");

    if (uid) {
      createButton.classList.add("block");
      authButtons.classList.add("hidden");
      authButtons.classList.remove("block");
    }
    const btnSignOut = document.getElementById("logOut");

    async function handleLogOut() {
      try {
        alert("Bạn có muốn đăng xuất tài khoản không ?");
        await signOut(auth);
      } catch (error) {
        console.log("🚀 ~ file: index.html:177 ~ handleLogOut ~ error:", error);
      }
    }
    btnSignOut.addEventListener("click", handleLogOut);
  } else {
    const createButton = document.getElementById("createButton");

    const authButtons = document.getElementById("authButtons");
    createButton.classList.add("hidden");
    authButtons.classList.add("block");
    authButtons.classList.remove("hidden");
  }
});

// ==========================RENDER POSTS===================

function createProductCard(productData) {
  const template = `
    <div class="p-2 bg-white rounded-lg shadow-lg ">
        <a href="#">
             <img class="rounded-t-lg object-fit" src="../apple watch.avif" alt="product image" />
        </a>
        <div class="pt-5">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${productData?.name}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
               
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">${productData?.brand}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">$${productData?.price}</span>
                <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Add to cart
  </span>
</button>
            </div>
             <div class="flex items-center justify-between">
             
            <a href="/crud/update.html?id=${productData.id}" class=" text-[#1C64F2] p-4 update-button cursor-pointer" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </a>

            <span class="text-[#E02424] p-4 cursor-pointer delete-button" data-product-id="${productData.id}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </div>
        </div>
    </div>
  `;

  return template;
}

const productsContainer = document.getElementById("products-container");
const querySnapshot = await getDocs(collection(db, "posts"));

querySnapshot.forEach((doc) => {
  const productData = doc.data();
  const productId = doc.id;

  // Combine doc.id and doc.data() into a single object
  const productInfo = { id: productId, ...productData };
  const productCard = createProductCard(productInfo);

  productsContainer.insertAdjacentHTML("beforeend", productCard);
});

const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = button.dataset.productId;
    try {
      alert("Bạn có chắc muốn xóa ?");

      await deleteDoc(doc(db, "posts", id));
      window.location.assign("./index.html");
    } catch (error) {
      console.log(
        "🚀 ~ file: index.html:276 ~ button.addEventListener ~ error:",
        error
      );
    }
    // await handleDelete(id);
  });
});
