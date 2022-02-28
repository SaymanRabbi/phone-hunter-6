// ------input----
const input = document.getElementById('input');
// ----search button------
document.getElementById('search-button').addEventListener('click', () => {
    // -------input value with text And Case Sensitive-----
    const inputText = input.value.toLowerCase();
    input.value = '';
    // ------add api url-------
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    // add fetch..
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
})
