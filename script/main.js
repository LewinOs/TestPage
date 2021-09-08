import {JsonRequest} from "./JsonGet.js";
import {sorting} from "./Sort.js";
import {render} from "./render.js";
import {renderJson} from "./JsonRequest.js";


// <-- Рендер таблицы-->
render(JsonRequest)



const blockChoose = document.querySelector('#myDropdown')

const arrayMinus = document.querySelectorAll('.minus')

let popup_obj = {}
let tableLines = ''
arrayMinus.forEach((item,number)=>{
    item.addEventListener('click',plus=>{
        tableLines = document.querySelectorAll('tr')
        for (let i = 0;i<tableLines.length;i++){
            tableLines[i].children[number].style.display = "none"

        }

        blockChoose.insertAdjacentHTML('beforeend',`
            <a href = #>${tableLines[0].children[number].innerText.substring(0,tableLines[0].children[number].innerText.length-2)}</a>
            `)
        popup_obj[tableLines[0].children[number].innerText.substring(0,tableLines[0].children[number].innerText.length-2)] = number

    })
})


const arrayArrow = document.querySelectorAll('.arrow')
arrayArrow.forEach(item=>{

    const removeOldTable = ()=>{
        const tbody = document.querySelectorAll('tbody')
        for (let i = 1;i<tbody.length;i++){
            tbody[i].remove()
        }
    }

    let instruction = ''

    item.addEventListener('click',arrow=>{
        let currentArrow = item.innerText
        if(currentArrow == '⇓'){
            item.innerText = '⇑'
            instruction = 'up'
        }
        else {
            item.innerText = '⇓'
            instruction = 'down'
        }
        let array = sorting(renderJson(),instruction,item.offsetParent.className.split(' '))
        removeOldTable()
        render(array)
        const head_table = document.querySelectorAll('.head_table')
        head_table.forEach((item,number)=>{
            //console.log(item.innerText.substring(0,item.innerText.length-3))
            console.log(popup_obj)
            let temp_str = item.children[0].textContent
            if(popup_obj.hasOwnProperty(temp_str)){
                tableLines = document.querySelectorAll('tr')
                 for (let i = 0;i<tableLines.length;i++){
                tableLines[i].children[number].style.display = "none"

            }
            }


        })
    })
})


// Когда пользователь нажимает на кнопку, переключаться раскрывает содержимое
const showButton = document.querySelector('.dropbtn')
showButton.addEventListener('click',item=>{
    document.getElementById("myDropdown").classList.toggle("show");
    tableLines = document.querySelectorAll('tr')
    let tempbutton = blockChoose.querySelectorAll('a')
    if(tempbutton.length==0){
        blockChoose.insertAdjacentHTML('beforeend',`
            <a href = # class ="default_button_link">Все колонки показаны</a>
            `)
    }
    else{
        if(blockChoose.querySelectorAll('a')[0].classList.contains("default_button_link")){
            blockChoose.querySelectorAll('a')[0].remove()
        }
        tempbutton.forEach(but=>{
        but.addEventListener('click',but=>{
                for (let i = 0;i<tableLines.length;i++){
                    tableLines[i].children[popup_obj[but.target.innerText]].style.display = "table-cell"
                }
                console.log(but.target)
                delete popup_obj[but.target.textContent]
                but.target.remove()
                console.log(1)
        })
        })}
})

// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}







