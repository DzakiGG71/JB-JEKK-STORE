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

/* ===================================
   FIREBASE CONFIG
=================================== */

const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI_AUTHDOMAIN",
  projectId: "ISI_PROJECT_ID",
  storageBucket: "ISI_STORAGE_BUCKET",
  messagingSenderId: "ISI_SENDER_ID",
  appId: "ISI_APP_ID"
};

/* ===================================
   INISIALISASI FIREBASE
=================================== */

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const storage =
getStorage(app);

/* ===================================
   BUKA LOGIN
=================================== */

window.openLogin =
function(){

  document
    .getElementById(
      "loginModal"
    )
    .style.display =
    "flex";
};

/* ===================================
   LOGIN ADMIN
=================================== */

window.loginAdmin =
function(){

  const username =
  document
    .getElementById(
      "username"
    )
    .value;

  const password =
  document
    .getElementById(
      "password"
    )
    .value;

  if(
    username ===
    "Dzaki" &&

    password ===
    "Raffa"
  ){

    alert(
      "Login berhasil ✅"
    );

    /* tutup modal */
    document
      .getElementById(
        "loginModal"
      )
      .style.display =
      "none";

    /* sembunyikan tombol login */
    document
      .getElementById(
        "loginBtn"
      )
      .classList
      .add(
        "hidden"
      );

    /* munculkan tombol tambah produk */
    document
      .getElementById(
        "addProductBtn"
      )
      .classList
      .remove(
        "hidden"
      );

  }else{

    alert(
      "Username atau Password salah ❌"
    );
  }
};

/* ===================================
   BUKA PANEL TAMBAH PRODUK
=================================== */

window.openAdminPanel =
function(){

  document
    .getElementById(
      "adminPanel"
    )
    .classList
    .remove(
      "hidden"
    );

  window.scrollTo({
    top:
    document.body
    .scrollHeight,

    behavior:
    "smooth"
  });
};

/* ===================================
   TAMBAH PRODUK
=================================== */

window.addProduct =
async function(){

  const title =
  document
    .getElementById(
      "title"
    )
    .value;

  const desc =
  document
    .getElementById(
      "desc"
    )
    .value;

  const image =
  document
    .getElementById(
      "img"
    )
    .files[0];

  /* VALIDASI */
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

    /* nama file unik */
    const fileName =
    Date.now() +
    "_" +
    image.name;

    /* upload ke firebase storage */
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

    /* ambil url gambar */
    const imageUrl =
    await getDownloadURL(
      storageRef
    );

    /* simpan produk */
    await addDoc(
      collection(
        db,
        "products"
      ),
      {
        title:
        title,

        desc:
        desc,

        img:
        imageUrl,

        createdAt:
        Date.now()
      }
    );

    alert(
      "Produk berhasil ditambahkan ✅"
    );

    /* reset form */
    document
      .getElementById(
        "title"
      )
      .value =
      "";

    document
      .getElementById(
        "desc"
      )
      .value =
      "";

    document
      .getElementById(
        "img"
      )
      .value =
      "";

  }catch(error){

    console.error(
      error
    );

    alert(
      "Upload gagal ❌"
    );
  }
};

/* ===================================
   REALTIME PRODUK
=================================== */

const productsContainer =
document.getElementById(
  "products"
);

const q =
query(
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

    productsContainer
    .innerHTML = "";

    snapshot.forEach(
      (doc)=>{

        const data =
        doc.data();

        productsContainer
        .innerHTML +=

        `
        <div class="product">

          <img
            src="${data.img}"
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
              target="_blank"
            >

              <button
                class="buy-btn"
              >
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

/* ===================================
   SCROLL KE PRODUK
=================================== */

window.scrollToProducts =
function(){

  const products =
  document
    .getElementById(
      "products"
    );

  products
  .scrollIntoView({
    behavior:
    "smooth"
  });
};

/* ===================================
   OPEN GROUP
=================================== */

window.openGroup =
function(){

  window.open(
    "https://chat.whatsapp.com/CXljCr65VfFL4m3Qp7LyiS",
    "_blank"
  );
};

/* ===================================
   OPEN DONASI
=================================== */

window.openDonasi =
function(){

  window.open(
    "https://chat.whatsapp.com/CXljCr65VfFL4m3Qp7LyiS",
    "_blank"
  );
};

/* ===================================
   GANTI BACKGROUND
=================================== */

let bg = 1;

window.changeBg =
function(){

  bg++;

  if(
    bg > 4
  ){
    bg = 1;
  }

  document.body
  .className =
  "bg" + bg;
};

/* ===================================
   TUTUP MODAL LOGIN
=================================== */

window.onclick =
function(event){

  const loginModal =
  document
    .getElementById(
      "loginModal"
    );

  if(
    event.target ===
    loginModal
  ){

    loginModal
    .style.display =
    "none";
  }
};
