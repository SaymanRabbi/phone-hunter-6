// ------input----
const input = document.getElementById('input');
// -----Error Function-------
const errorText = document.getElementById('error-messages');
errorText.style.display = "none";
const error = (value) => {
    errorText.style.display = value;
}
// ----search button------
document.getElementById('search-button').addEventListener('click', () => {
    // -------input value with text And Case Sensitive-----
    const inputText = input.value.toLowerCase();
    input.value = '';
    if (inputText === '') {
        error('block')
    }
    else {
        error('none')
        // ------add api url-------
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    // add fetch..
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
    }
})
