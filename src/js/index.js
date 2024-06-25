// Get elements
const loadDataBtn = document.querySelector(".transactions__loading");
const root = document.querySelector(".transactions");
const tBody = document.querySelector(".tBody");
const priceIcon = document.querySelector(".price");
const dateIcon = document.querySelector(".date");
const searchInput = document.querySelector(".search-input");

let keyWord = "";
let keySort = "";

// Events
loadDataBtn.addEventListener("click", getData);

priceIcon.addEventListener("click", (e) => {
  e.preventDefault();
  if (priceIcon.classList.contains("inc-data")) {
    priceDesc();
    priceIcon.classList.remove("inc-data");
  } else {
    priceAsc();
    priceIcon.classList.add("inc-data");
  }
});

dateIcon.addEventListener("click", (e) => {
  e.preventDefault();
  if (dateIcon.classList.contains("inc-data")) {
    dateDesc();
    dateIcon.classList.remove("inc-data");
  } else {
    dateAsc();
    dateIcon.classList.add("inc-data");
  }
});

searchInput.addEventListener("input", searchData);

// Functions
async function getData() {
  try {
    root.classList.add("showData");
    const { data } = await axios.get("http://localhost:3000/transactions");
    loadData(data);
  } catch (err) {
    console.log(err.message);
  }
}

function loadData(data) {
  tBody.innerHTML = "";

  data.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString("fa-IR");
    const time = new Date(item.date).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tr = document.createElement("tr");
    tr.classList.add("table-body");
    tr.innerHTML = `
              <td>${item.id}</th>
              <td class="color-text" data-id=${item.id}>${item.type}</th>
              <td>${item.price}</th>
              <td>${item.refId}</th>
              <td>${date} ساعت ${time}</th>
            `;
    tBody.appendChild(tr);
  });

  const dataType = document.querySelectorAll(".color-text");
  dataType.forEach((item) => {
    if (item.innerHTML.includes("افزایش")) {
      item.classList.add("green");
    } else {
      item.classList.add("red");
    }
  });
}

async function priceDesc() {
  try {
    if (keyWord) {
      const { data } = await axios.get(
        `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=price&_order=desc`
      );
      loadData(data);
    } else {
      const { data } = await axios.get(
        "http://localhost:3000/transactions?_sort=price&_order=desc"
      );
      loadData(data);
      keySort = "priceDesc";
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function priceAsc() {
  try {
    if (keyWord) {
      const { data } = await axios.get(
        `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=price&_order=asc`
      );
      loadData(data);
    } else {
      const { data } = await axios.get(
        "http://localhost:3000/transactions?_sort=price&_order=asc"
      );
      loadData(data);
      keySort = "priceAsc";
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function dateDesc() {
  try {
    if (keyWord) {
      const { data } = await axios.get(
        `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=date&_order=desc`
      );
      loadData(data);
    } else {
      const { data } = await axios.get(
        "http://localhost:3000/transactions?_sort=date&_order=desc"
      );
      loadData(data);
      keySort = "dataDesc";
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function dateAsc() {
  try {
    if (keyWord) {
      const { data } = await axios.get(
        `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=date&_order=asc`
      );
      loadData(data);
    } else {
      const { data } = await axios.get(
        "http://localhost:3000/transactions?_sort=date&_order=asc"
      );
      loadData(data);
      keySort = "dataAsc";
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function searchData(e) {
  try {
    keyWord = e.target.value;

    if (keySort) {
      switch (keySort) {
        case "priceDesc": {
          const { data } = await axios.get(
            `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=price&_order=desc`
          );
          loadData(data);
          break;
        }
        case "priceAsc": {
          const { data } = await axios.get(
            `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=price&_order=asc`
          );
          loadData(data);
          break;
        }
        case "dataDesc": {
          const { data } = await axios.get(
            `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=date&_order=desc`
          );
          loadData(data);
          break;
        }
        case "dataAsc": {
          const { data } = await axios.get(
            `http://localhost:3000/transactions?refId_like=${keyWord}&_sort=date&_order=asc`
          );
          loadData(data);
          break;
        }
      }
    } else {
      const { data } = await axios.get(
        `http://localhost:3000/transactions?refId_like=${keyWord}`
      );
      loadData(data);
    }
  } catch (err) {
    console.log(err.message);
  }
}
