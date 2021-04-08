'use strict'

const input = document.querySelector('.autocomplete-input')
const list = document.querySelector('ul.list')


const pressKeyDown = () => {
    let activeContains = false
    // Tüm elementleri kontrol edip active class olan var ise değişkeni true yaptık
    for(let li of list.querySelectorAll('li')) { 
        if(li.classList.contains('active')) {
            activeContains = true
            break
        }
    }
    // Değişken hala false ise ve ilk element mevcutsa active class ı ilk elemente atadık
    if(activeContains === false && list.querySelector('li:first-child')) {       
        list.querySelector('li:first-child').classList.add('active')
        return
    } 
    // Değişken true ise bir sonraki elementi active yaptık 
    // Yukarıda return kullandığımızdan else kullanmamıza gerek kalmadı
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

const pressKeyUp = () => { 
    let activeContains = false
    // Tüm elementleri kontrol edip active class olan var ise değişkeni true yaptık
    for(let li of list.querySelectorAll('li')) { 
        if(li.classList.contains('active')) {
            activeContains = true
            break
        }
    }
    // Değişken hala false ise ve ilk element mevcutsa active class ı ilk elemente atadık
    if(activeContains === false && list.querySelector('li:last-child')) {       
        list.querySelector('li:last-child').classList.add('active')
        return
    } 
    // Değişken true ise bir sonraki elementi active yaptık 
    // Yukarıda return kullandığımızdan else kullanmamıza gerek kalmadı
    for(let li of list.querySelectorAll('li')) {            
        if(li.classList.contains('active')) {
            li.classList.remove('active')             
            if(li.previousSibling) li.previousSibling.classList.add('active')                
            break;

        }
    }  
      
}

const emptyList = () => {
    list.classList.remove('d-block')
    list.classList.add('d-none')
    list.innerHTML = '' 
}

const pressEnter = () => {
    for(let li of list.querySelectorAll('li')) { 
        if(li.classList.contains('active')) {
            input.value = li.textContent
             emptyList()         
        }
    }      
}

const fetchCategories = async () => {
    const response = await fetch('categories.json')
    return await response.json()
}

const capitalFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.substring(1)
}

const showList = () => {
    list.classList.remove('d-none')
    list.classList.add('d-block')     
}

const clickListElement = event => {
    // Tıklanan elementin textContent değeri inputun value suna atandı
    input.value = event.target.textContent
    emptyList()
}

const createList = categorieName => {       
    let listElement = document.createElement('li');
    listElement.textContent = categorieName
    // Oluşturulan list elementi listeye ekledik
    list.appendChild(listElement)

    list.querySelectorAll('li').forEach(liElement => {
        liElement.addEventListener('click', clickListElement)
    })
    // listeyi görünür kıldık
    showList()
}

const typeWords = () => {
    fetchCategories()
        .then(response => {    
            // İlk harf büyütüldü                 
            const valueWithUpperCase = capitalFirstLetter(input.value)
            // Liste temizlendi
            emptyList()

            response.categories.forEach(categorie => {               
                if(valueWithUpperCase !== '' && categorie.title.includes(valueWithUpperCase)) {
                    // Liste tekrar oluşturuldu
                    createList(categorie.title)
                }
            });

        })

}

const autocomplete = (event) => {
    switch(event.key) {
        case 'ArrowDown'   : pressKeyDown(); break;
        case 'ArrowUp'     : pressKeyUp();   break;
        case 'Enter'       : pressEnter();   break;
        default            : typeWords();
    }
}

input.addEventListener('keyup', autocomplete)