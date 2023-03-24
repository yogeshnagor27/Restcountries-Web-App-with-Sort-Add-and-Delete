const countryCodes = ['AT', 'HU', 'HR', 'BA'];
const countryList = document.getElementById('country-list');
const sortSelect = document.getElementById('sort-select');

countryCodes.forEach(code => {
   fetch(`https://restcountries.com/v2/alpha/${code}`)
   .then(response => response.json())
     .then(data => {
       const flag = `<img src="${data.flags.svg}" alt="Flag of ${data.name}" width="50">`;
       const title = `<h2>${data.name}</h2>`;
       const population = `<p class="population">${data.population}</p>`;
       const maps = `<a href="https://www.google.com/maps/search/?api=1&query=${data.name}" target="_blank">View on Google Maps</a>` ;
       const delBtn = `<button type="button" onclick="deleteRow(this)">Delete</button>`;

       const row = `
         <tr>
           <td>${flag}</td>
           <td>${title}</td>
           <td>${population}</td>
           <td>${maps}</td>
           <td>${delBtn}</td>
         </tr>
       `;

       countryList.innerHTML += row;
     })
     .catch(error => console.error(error));
});

function addcountry(){
  const code = document.getElementById("cc").value;
  fetch(`https://restcountries.com/v2/alpha/${code}`)
  .then(response => response.json())
    .then(data => {
      const flag = `<img src="${data.flags.svg}" alt="Flag of ${data.name}" width="50">`;
      const title = `<h2>${data.name}</h2>`;
      const population = `<p class="population">${data.population}</p>`;
      const maps = `<a href="https://www.google.com/maps/search/?api=1&query=${data.name}" target="_blank">View on Google Maps</a>` ;
      const delBtn = `<button type="button" onclick="deleteRow(this)">Delete</button>`;

      const row = `
        <tr>
          <td>${flag}</td>
          <td>${title}</td>
          <td>${population}</td>
          <td>${maps}</td>
          <td>${delBtn}</td>
        </tr>
      `;

      countryList.innerHTML += row;
    })
    .catch(error => console.error(error));

}

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

sortSelect.addEventListener('change', () => {
  const rows = Array.from(countryList.children);
  rows.sort((row1, row2) => {
    const p1 =  parseInt(row1.querySelector('.population').textContent); 
    const p2 =  parseInt(row2.querySelector('.population').textContent);
    const n1 =  row1.querySelector('h2').textContent;
    const n2 =  row2.querySelector('h2').textContent;

    if (sortSelect.value === 'name') {
      return n1.localeCompare(n2);
    } else {
      return p1 - p2;
    }
  });
  countryList.innerHTML = '';
  rows.forEach(row => {
    countryList.appendChild(row);
  });
});