const phoneLoad =(searchText,dataLimit)=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then (data => displayData(data.data,dataLimit))
}

const displayData =(phones,dataLimit)=>{
    // console.log(phone)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent='';
    const showBtn = document.getElementById('show-btn');
    if(dataLimit && phones.length >10){
        phones =phones.slice(0,9);
        showBtn.classList.remove('d-none');
    }
    else{
        showBtn.classList.add('d-none');
    }
    // display phone not found 
    const noFound = document.getElementById('no-found');
    if(phones.length === 0){
        noFound.classList.remove('d-none');
    }
    else{
        noFound.classList.add('d-none');
    }
    // display all phone 
    phones.forEach(phone => {
        console.log(phone)
        const {phone_name,brand,image}=phone;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML=`
        <div style="background-color:#2C3333" class="card h-100 mt-2 p-4">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body text-white">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">${brand}</p>
            </div>
            <div class="card-footer">
                <button onclick="phoneDetails('${phone.slug}')" class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#phoneDetailsModal"> phone details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(cardDiv)
        // console.log(phone_name)

    });

    // stop spinner 
    toggleSpinner(false)

}

const processSearch = (dataLimit)=>{
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    // searchField.value='';
    // console.log(searchText)
    phoneLoad(searchText,dataLimit);
}

document.getElementById('search-btn').addEventListener('click',function(){
    processSearch(9);
    // start spinner 
    toggleSpinner(true)
    
})

// enter button click 
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      processSearch(9);
    }
});


const toggleSpinner = isLoading =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}
//  show all 
document.getElementById('btn-all').addEventListener('click',function(){
    processSearch();
    // 
})

// phoneLoad()

const phoneDetails=id=>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res =>res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText=`Brand : ${phone.brand}`;
    const modalBody = document.getElementById('modal-body');
    console.log(phone.releaseDate)
    modalBody.innerHTML=`
    <h2>Name : ${phone.name}</h2>
    <img style="height:270px; width :200px;" src="${phone.image}" class="card-img-top">
    <p>ReleaseDate : ${phone.releaseDate}</p>
    <p>MainFeatures: chipSet: ${phone.mainFeatures.chipSet}, Display: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    <p>Sensors: ${phone.mainFeatures.sensors}</p>
    
    `
   
}