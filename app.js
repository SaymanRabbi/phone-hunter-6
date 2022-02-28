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
            <button class="btn btn-primary"onclick="showDetails('${x.slug}')">Show Details</button>
          </div>
        </div>
      </div>
        `
        cardParent.appendChild(div);
    })
}
// ------Show Details----
const showDetails = (details) => {
    console.log(details);
}
