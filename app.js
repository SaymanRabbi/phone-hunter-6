// ------input----
const input = document.getElementById('input');
//show all data
const showAll = document.getElementById('show-all');
showAll.style.display = "none";
//Search Button
const search = document.getElementById('search-button');
// card parent
const cardParent = document.getElementById('card-parent'); 
//popup container
const popupContainer = document.getElementById('popup-container');
// error text
const errorText = document.getElementById('error-messages');
// Error img
const errorImg = document.getElementById('error-img');
errorText.style.display = "none";
errorImg.style.display = "none"
// -----Error Function-------
const error = (value) => {
    errorText.style.display = value;
    errorImg.style.display = value;
}
// ------spinner-----
const spinner = (value) => { 
  if (value) {
    search.innerHTML = `<div class="spinner-border me-1"style="height:23px;width:23px" role="status">
     <span class="visually-hidden">Loading...</span>
     </div><span class="fw-bolder">wait..</span>`
  }
}
// ----search button------
search.addEventListener('click', () => {
    // -------input value with text And Case Sensitive-----
     const inputText = input.value.toLowerCase();
     input.value = '';
  spinner(true);
  //show all 
  //popup container
  popupContainer.textContent = '';
  if (inputText === '' || isNaN(inputText) === false) {
        error('block');
       cardParent.textContent = '';
    // -----remove spinner loading---
       search.innerText = 'Search'
    }
    else {
        error('none')
        // ------add api url-------
     const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    // add fetch..
    fetch(url)
        .then(res => res.json())
      .then(data => loadData(data));
    }
})
// ------show all data -----
const loadData = (value) => {
  if (value.data.length>20) {
    showAll.style.display = "block";
    showAll.style.margin='0 auto'
  }
  showAll.addEventListener('click', () => {
    cardParent.textContent = '';
    showData(value.data);
   error('none')
  })
  showData(value.data.slice(0, 20));
}
// ------show data in display-----
const showData = (data) => {
  // clear card-parent content
  cardParent.textContent = '';
    // ------if array is zero-----
  if (data.length === 0) {
      // -----remove spinner loading---
       search.innerText = 'Search'
        error('block');
        return;
    }
    // -----forEach to got single data-------
    data.forEach(x => {
        // console.log();
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
        <div class="card h-100 shadow rounded-3">
          <img src="${x.image}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title fw-bold">Product Name: <span class="text-danger">${x.phone_name}</span></h5>
            <p class="card-text fw-bold">Brand: <span class ="text-danger">${x.brand}</span></p>
            <button class="btn btn-primary"onclick="showDetailsData('${x.slug}')">Show Details</button>
          </div>
        </div>
      </div>
        `
        cardParent.appendChild(div);
    })
  // -----remove spinner loading---
  search.innerText = 'Search'
}
// ------load Details data----
const showDetailsData = (details) => {
    // set new url---- 
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
    .then(data => showDetails(data.data))  
}
// ------show details----
const showDetails = (detailsData) => {
    popupContainer.innerHTML = `
    <div class="justify-content-center align-items-center d-flex w-100 h-100 custom" >
             <div class="card mb-3 w-50 shadow">
             <span id="close"> X </span>
             <div class="row g-0">
               <div class="col-md-12 col-lg-6 col-12  p-3">
                 <img src="${detailsData.image}" class="w-100 h-100  rounded-start" alt="">
               </div>
               <div class="col-md-12 col-lg-6 col-12 p-3">
                 <div class="card-body">
                 <button class ="btn btn-danger mb-3">HOT</button>
                   <h5 class="card-title text-danger fw-bold">Product Name: ${detailsData.name}</h5>
                   <h5 class="card-title">Product Release Date: ${detailsData.releaseDate? detailsData.releaseDate:"Date Is not Available"}</h5>
                   <p class="card-text mb-0"></p>
                   <p class="fw-bold text-capitalize text-dark mb-0">Main Feature:</p>
                   <p  class="mb-0">1.Storages: ${detailsData.mainFeatures.storage}</p>
                   <p  class="mb-0">2.ChipSet: ${detailsData.mainFeatures.chipSet} </p>
                   <p class="mb-0">2.DisplaySize: ${detailsData.mainFeatures.displaySize} </p>
                   <p class="fw-bold mb-0">Sensors:</p>
                    <small class="mb-0">1. ${detailsData.mainFeatures.sensors[0]} </small>
                    <small class="mb-0">2. ${detailsData.mainFeatures.sensors[1]} </small>
                    <small class="mb-0">3. ${detailsData.mainFeatures.sensors[2]} </small>
                    <small class="mb-0">4. ${detailsData.mainFeatures.sensors[3]} </small>
                    <small class="mb-0">5. ${detailsData.mainFeatures.sensors[4]} </small>
                    <p class="fw-bold mb-0">Others:</p>
                    <small class="mb-0">1. ${detailsData.others?detailsData.others.WLAN:"unavailable"} </small>
                    <small class="mb-0">2. ${detailsData.others?detailsData.others.Bluetooth:"unavailable"} </small>
                    <small class="mb-0">3. ${detailsData.others?detailsData.others.GPS:"unavailable"} </small>
                 </div>
               </div>
             </div>
           </div>
      </div>
    `  
  popupContainer.style.display = 'block';
  // -----close details----
  document.getElementById('close').addEventListener('click', () => {
    popupContainer.style.display = 'none';
  })
}