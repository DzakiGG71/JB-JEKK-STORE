import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* =========================
   FIREBASE CONFIG
========================= */
const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI_AUTHDOMAIN",
  projectId: "ISI_PROJECT_ID",
  storageBucket: "ISI_STORAGE_BUCKET",
  messagingSenderId: "ISI_SENDER_ID",
  appId: "ISI_APP_ID"
};

/* =========================
   INIT FIREBASE
========================= */
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

/* =========================
   OPEN MODAL
========================= */
window.openLogin = function(){

  document.getElementById(
    "loginModal"
  ).style.display = "flex";
};

window.openAdminPanel = function(){

  document.getElementById(
    "adminPanel"
  ).style.display = "flex";
};

/* =========================
   LOGIN ADMIN
========================= */
window.loginAdmin = function(){

  const username =
  document.getElementById(
    "username"
  ).value;

  const password =
  document.getElementById(
    "password"
  ).value;

  if(
    username === "Dzaki" &&
    password === "Raffa"
  ){

    alert(
      "Login Admin Berhasil ✅"
    );

    document.getElementById(
      "loginModal"
    ).style.display = "none";

    document.getElementById(
      "loginBtn"
    ).classList.add(
      "hidden"
    );

    document.getElementById(
      "addProductBtn"
    ).classList.remove(
      "hidden"
    );

  }else{

    alert(
      "Username / Password Salah ❌"
    );
  }
};

/* =========================
   TAMBAH PRODUK
========================= */
window.addProduct =
async function(){

  const title =
  document.getElementById(
    "title"
  ).value;

  const desc =
  document.getElementById(
    "desc"
  ).value;

  const image =
  document.getElementById(
    "img"
  ).files[0];

  if(
    !title ||
    !desc ||
    !image
  ){
    alert(
      "Isi semua data!"
    );
    return;
  }

  try{

    alert(
      "Uploading gambar..."
    );

    const fileName =
    Date.now() +
    "_" +
    image.name;

    const storageRef =
    ref(
      storage,
      "products/" +
      fileName
    );

    await uploadBytes(
      storageRef,
      image
    );

    const imageUrl =
    await getDownloadURL(
      storageRef
    );

    await addDoc(
      collection(
        db,
        "products"
      ),
      {
        title,
        desc,
        img: imageUrl,
        createdAt:
        Date.now()
      }
    );

    alert(
      "Produk berhasil ditambahkan ✅"
    );

    document.getElementById(
      "title"
    ).value = "";

    document.getElementById(
      "desc"
    ).value = "";

    document.getElementById(
      "img"
    ).value = "";

    document.getElementById(
      "adminPanel"
    ).style.display =
    "none";

  }catch(error){

    console.error(error);

    alert(
      "Gagal upload produk ❌"
    );
  }
};

/* =========================
   REALTIME PRODUK
========================= */
const products =
document.getElementById(
  "products"
);

const q = query(
  collection(
    db,
    "products"
  ),
  orderBy(
    "createdAt",
    "desc"
  )
);

onSnapshot(
  q,
  (snapshot)=>{

    products.innerHTML =
    "";

    snapshot.forEach(
      (doc)=>{

        const data =
        doc.data();

        products.innerHTML += `
        <div class="product">

          <img
            src="${data.img}"
            alt="produk"
          >

          <div class="product-content">

            <h3>
              ${data.title}
            </h3>

            <p>
              ${data.desc}
            </p>

            <a
            href="https://wa.me/628131123927"
            target="_blank">

              <button
              class="buy-btn">
                Beli Sekarang
              </button>

            </a>

          </div>
        </div>
        `;
      }
    );
  }
);

/* =========================
   GANTI BACKGROUND
========================= */
let bg = 1;

window.changeBg =
function(){

  bg++;

  if(bg > 4){
    bg = 1;
  }

  document.body.className =
  "bg" + bg;
};

/* =========================
   SCROLL PRODUK
========================= */
window.scrollToProducts =
function(){

  window.scrollTo({
    top:
    document.body
    .scrollHeight,

    behavior:
    "smooth"
  });
};

/* =========================
   GROUP / DONASI
========================= */
window.openGroup =
function(){

  window.open(
    "https://chat.whatsapp.com/CXljCr65VfFL4m3Qp7LyiS",
    "_blank"
  );
};

window.openDonasi =
function(){

  window.open(
    "https://chat.whatsapp.com/CXljCr65VfFL4m3Qp7LyiS",
    "_blank"
  );
};

/* =========================
   CLOSE MODAL
========================= */
window.onclick =
function(e){

  const login =
  document.getElementById(
    "loginModal"
  );

  const admin =
  document.getElementById(
    "adminPanel"
  );

  if(
    e.target === login
  ){
    login.style.display =
    "none";
  }

  if(
    e.target === admin
  ){
    admin.style.display =
    "none";
  }
};