// ------input----
const input = document.getElementById('input');
// card parent
const cardParent = document.getElementById('card-parent'); 
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
// ----search button------
document.getElementById('search-button').addEventListener('click', () => {
    // -------input value with text And Case Sensitive-----
    const inputText = input.value.toLowerCase();
    input.value = '';
    if (inputText === '' || typeof( parseInt(inputText))=== 'Number') {
        error('block');
        cardParent.textContent = '';
    }
    else {
        // clear card-parent content
        cardParent.textContent = '';
        error('none')
        // ------add api url-------
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    // add fetch..
    fetch(url)
        .then(res => res.json())
            .then(data => showData(data.data.slice(0, 20)));
    }
})
// ------show data in display-----
const showData = (data) => {
    // ------if array is zero-----
    if (data.length === 0) {
        error('block');
        return;
    }
    // -----forEach to got single data-------
    data.forEach(x => {
        // console.log();
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
        <div class="col">
        <div class="card h-100">
          <img src="${x.image}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${x.phone_name}</h5>
            <p class="card-text">${x.brand}</p>
            <button class="btn btn-primary"onclick="showDetailsData('${x.slug}')">Show Details</button>
          </div>
        </div>
      </div>
        `
        cardParent.appendChild(div);
    })
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
    console.log(detailsData);
    const popupContainer = document.getElementById('popup-container');
    popupContainer.innerHTML = `
    <div class="justify-content-center align-items-center d-flex w-100 h-100" >
             <div class="card mb-3 w-50">
             <div class="row g-0">
               <div class="col-md-12 col-lg-6 col-12  p-3">
                 <img src="${detailsData.image}" class="w-100  rounded-start" alt="">
               </div>
               <div class="col-md-12 col-lg-6 col-12 p-3">
                 <div class="card-body">
                 <button class ="btn btn-danger mb-3">HOT</button>
                   <h5 class="card-title text-danger fw-bold">Phone Name: ${detailsData.name}</h5>
                   <h5 class="card-title">Phone Release Date: ${detailsData.releaseDate? detailsData.releaseDate:"Date Is not Available"}</h5>
                   <p class="card-text"></p>
                   <p class="fw-bold text-capitalize text-dark">Main Feature:</p>
                   <p>1.Storages: ${detailsData.mainFeatures.storage}</p>
                   <p>2.ChipSet: ${detailsData.mainFeatures.chipSet} </p>
                   <p>2.DisplaySize: ${detailsData.mainFeatures.displaySize} </p>
                 </div>
               </div>
             </div>
           </div>
      </div>
    `  
    popupContainer.style.display = 'block';
}