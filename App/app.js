const baseURL = "https://tarmeezacademy.com/api/v1";

axios.get(`${baseURL}/posts`).then((res) => {
  const posts = res.data.data;
  posts.slice(0, 5).map((post) => {
    // console.log(post);
    let content = `
        <div class="card shadow">
        <div class="card-header">
          <img class="rounded-circle border border-2" src=${
            post.author.profile_image
          } alt="NON" style="width: 40px; height: 40px">
          <b>${post.author.name}</b>
        </div>

         <div class="card-body">

         <img class="w-100" style="max-height: 500px;" src=${
           post.image
         } alt="NON">


          <h6 style="color: rgb(193, 193, 193);" class="mt-1">
          ${post.created_at}
          </h6>

          <h5>
          ${post.title === null ? "" : post.title}
          </h5>

          <p>
          ${post.body}
          </p>

          <hr>

          <div>
            <i class="me-1 fa-regular fa-comment"></i>
            <span>
              (${post.comments_count}) Comments
            </span>
          </div>
        </div>
      </div>
        `;
    document.getElementById("posts").innerHTML += content;
  });
});

function logout() {
  localStorage.clear();
  setupUI();
}

async function loginBtnClicked() {
  const password = document.getElementById("password-input").value;
  const username = document.getElementById("username-input").value;
  const loginModal = document.getElementById("login-modal");

  try {
    const res = await axios.post(`${baseURL}/login`, { password, username });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    const modalInstance = bootstrap.Modal.getInstance(loginModal);
    modalInstance.hide();
    setupUI();
  } catch (err) {
    console.log(err);
  }
}

setupUI();

function setupUI() {
  const token = localStorage.getItem("token");

  const loginDiv = document.getElementById("login-div-btn");
  const logoutDiv = document.getElementById("logout-div");

  // add btn
  // const addBtn = document.getElementById("add-btn");

  if (token == null) {
    // user is guest (not logged in)
    // if (addBtn != null) {
    //   addBtn.style.setProperty("display", "none", "important");
    // }

    loginDiv.style.setProperty("display", "flex", "important");
    logoutDiv.style.setProperty("display", "none", "important");
  } else {
    // for logged in user

    // if (addBtn != null) {
    //   addBtn.style.setProperty("display", "block", "important");
    // }

    loginDiv.style.setProperty("display", "none", "important");
    logoutDiv.style.setProperty("display", "flex", "important");

    // const user = getCurrentUser();
    // document.getElementById("nav-username").innerHTML = user.username;
    // document.getElementById("nav-user-image").src = user.profile_image;
  }
}

// function showAlert(customMessage, type = "success") {
//   const alertPlaceholder = document.getElementById("success-alert");

//   const alert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");

//     alertPlaceholder.append(wrapper);
//   };

//   alert(customMessage, type);

//   // todo: hide the alert
//   setTimeout(() => {
//     // const alertToHide = bootstrap.Alert.getOrCreateInstance('#success-alert')
//     // document.getElementById("success-alert").hide();
//     // const alert = document.getElementById("success-alert")
//     // const modalAlert = bootstrap.Alert.getInstance(alert)
//     // modalAlert.hide()
//   }, 2000);
// }
