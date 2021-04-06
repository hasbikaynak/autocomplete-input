'use strict'

const input = document.querySelector('.autocomplete-input')
const list = document.querySelector('ul.list')

// Fetch Api Ajax
input.addEventListener('keyup', function(event) {
   
        
    switch(event.key) {
        case 'ArrowDown': pressKeyDown(); break;
        case 'Enter'    : pressEnter();   break;
        default         : pressClick();



    }
 
    // if(event.key === 'ArrowDown') {     
    //     pressKeyDown()        
    // } else if(event.key === 'Enter') {
    //     pressEnter()
    // }else {
    //      pressClick()
               
    // }
 
})





function capitalFirstLetter() {
    input.value.charAt(0).toUpperCase() + input.value.substring(1)    
}

function pressKeyDown() {        
    // console.log(list.querySelector('li:first-child'))
    for(let li of list.querySelectorAll('li')) {            
        if(li.classList.contains('active')) {
            li.classList.remove('active')      
            // li.nextSibling.className = 'active'
            // Bir sonraki element var mı kontrol edilir, varsa active class ı atanır               
            if(li.nextSibling) li.nextSibling.classList.add('active')                
            break;
        }
    }    
}

function pressEnter() {
    for(let li of list.querySelectorAll('li')) { 
        if(li.classList.contains('active')) {
            input.value = li.textContent
            emptyList()
            visibleList()                
        }
    }    
}

function visibleList(){
    list.classList.remove('d-block')
    list.classList.add('d-none')
}

function emptyList() {
    list.innerHTML = ''
}


function pressClick() {
    const value = input.value.charAt(0).toUpperCase() + input.value.substring(1) ; 
    // console.log(event)
    fetch('./categories.json') 
    .then((res) => res.json())
    .then(res => {
        
        let categorieArray = []
        for(let cat of res.categories) {
            categorieArray.push(cat.title)
        }

        list.classList.remove('d-block')
        list.classList.add('d-none')
        list.innerHTML = ''

        categorieArray.forEach((item) => {                     
            if(item.includes(value) && value !== '') {         
                // Yeni bir list element oluşturduk       
                let listElement = document.createElement('li');
                listElement.textContent = item
                // Oluşturulan list elementi listeye ekledik
                list.appendChild(listElement)
                // listeyi görünür kıldık
                list.classList.remove('d-block')
                list.classList.add('d-none')
                // list.style.display = 'block';// Fetch Api Ajax 
                console.log(categorieArray)               
                categorieArray.forEach((item) => {
                    if(item.includes(value) && value !== '') {         
                        // Yeni bir list element oluşturduk       
                        let listElement = document.createElement('li');
                        listElement.textContent = item    
                        // Oluşturulan list elementi listeye ekledik
                        list.appendChild(listElement)    
                        // listeyi görünür kıldık
                        list.classList.remove('d-block')
                        list.classList.add('d-none')
                        // list.style.display = 'block';
                        // Listenin ilk elemanını active getirdik
                        list.querySelector('li:first-child').classList.add('active');    
                        for(let li of list.querySelectorAll('li')) {
                            li.addEventListener('click', function() {
                                input.value = li.textContent                       
                                list.classList.remove('d-block')
                                list.classList.add('d-none')
                                 list.innerHTML = ''

                            })                
                        }
                    }    
                })               
            }
        })
    })     
}

// to do list 
/* 1-) enter basildiginda secilsin input valuesu degissin
2-) kategori json buyut
3-)arama yerinde ilk harfi buyult
4-)scrollbar ekle - styli duzelt ve gozden gecir. */



// function categories() {

// }

// const exampleFunc = () => {

// }

// const exampleFunc = function(param) {
//     console.log(param)
// }

// const exampleFunc = pram => console.log(param)