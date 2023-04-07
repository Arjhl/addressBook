const Address = [];
const contactName = document.querySelector(".contact_name");
const contactMobile = document.querySelector(".contact_mobile");

let idGen = 0;

const displayContacts = (arr, sorted) => {
  console.log(arr);
  document.querySelector(".contact_list").innerHTML = "";
  if (!sorted) {
    const conts = arr.sort((a, b) => {
      if (a.Name > b.Name) {
        return 1;
      } else {
        return -1;
      }
    });

    conts.map((a) => {
      const html = ` <div>
        <p class= 'name${a.id}' contenteditable="false">${a.Name}</p>
        <p class='mobile${a.id}'>${a.Mobile}</p>
        <button class='edit_btn${a.id}' >Edit</button>
        <button class='dlt_btn${a.id}' >Delete</button>
      </div>`;

      document
        .querySelector(".contact_list")
        .insertAdjacentHTML("beforeend", html);
    });
  } else {
    arr.map((a) => {
      const html = ` <div>
        <p class='${a.id + "name"}'>${a.Name}</p>
        <p class='${a.id + "mobile"}'>${a.Mobile}</p>
        <button class='edit_btn${a.id}' value='edit'>Edit</button>
        <button class='dlt_btn${a.id}' >Delete</button>
      </div>`;

      document
        .querySelector(".contact_list")
        .insertAdjacentHTML("beforeend", html);
    });
  }
  Address.forEach((a) => {
    document.querySelector(`.dlt_btn${a.id}`).addEventListener("click", () => {
      Address.forEach((b) => {
        console.log(a.id === b.id);
        if (a.id === b.id) {
          const i = Address.indexOf(b);
          Address.splice(i, 1);
          displayContacts(Address);
        }
      });
      console.log(Address);
    });

    document
      .querySelector(`.edit_btn${a.id}`)
      .addEventListener("click", (e) => {
        console.log(e.target.textContent);
        const name = document.querySelector(`.name${a.id}`);
        const mobile = document.querySelector(`.mobile${a.id}`);
        if (e.target.textContent === "Edit") {
          e.preventDefault();
          name.setAttribute("contenteditable", "true");
          mobile.setAttribute("contenteditable", "true");
          e.target.textContent = "Submit";
        } else {
          console.log(name);

          Address.forEach((b) => {
            if (a.id === b.id) {
              b.Name = name.textContent;
            }
          });

          Address.forEach((b) => {
            if (a.id === b.id) {
              b.Mobile = mobile.textContent;
            }
          });
          e.target.textContent === "Edit";
        }
      });
  });
};

document.querySelector(".contact_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let flag = 0;

  if (contactMobile.value === "" || contactName.value === "") {
    flag = 1;
  }
  if (isNaN(contactMobile.value)) {
    flag = 1;
  }

  Address.map((a) => {
    if (Number(a.Mobile) === Number(contactMobile.value)) {
      flag = 1;
      return;
    }
    flag = 0;
  });

  const n =
    contactName.value.slice(0, 1).toUpperCase() + contactName.value.slice(1);

  idGen++;
  const arr = {
    id: idGen,
    Name: n,
    Mobile: contactMobile.value,
  };

  console.log(Address);
  if (!flag) {
    Address.push(arr);
    displayContacts(Address);
  }

  contactMobile.value = "";
  contactName.value = "";
});

document.querySelector(".filter").addEventListener("change", (e) => {
  console.log(e.target.value);

  const filter_value = e.target.value;

  const arr = [];

  Address.forEach((a) => {
    if (a.Name?.includes(filter_value) || a.Mobile?.includes(filter_value)) {
      arr.push(a);
    }
  });

  console.log(arr);

  displayContacts(arr, true);
});
