export const render = (array)=> {

    // <-- Функция для проверки количества символов, и последующим превращением лишних символов в ... -->
    const checkCountOfSymbol=(node)=>{
        let str = node.innerText
        let begin_str = str.substring(0,87)
        let end_str = str.substring(87,str.length)
        //console.log(node)
        node.children[0].innerText = begin_str +'...'
        node.insertAdjacentHTML('beforeend',`
            <span style = "display: none">${end_str}</span>
        `)


    }

    // <-- Инициализвация таблицы -->
    const table = document.querySelector('table')
    array.forEach((item,number) => {

        // let about = checkCountOfSymbol(item.about)
        // let tempArrOfText = item.about
        // <-- Вставка в таблицу новых данных -->
        table.insertAdjacentHTML('beforeend', `<tr id=${item.id}>
        <td class = 'name'>${item.name.firstName} </td>
        <td class = 'lastname'>${item.name.lastName}</td>
        <td>${item.phone}</td> 
        <td class = "table_about"><span>${item.about}</span></td>
        <td style = "background-color: ${item.eyeColor}"><span style="display: none">${item.eyeColor}</span></td>
        <td class="pencil">&#9998;</td>
        </tr>`)

        let about = document.querySelectorAll('tr')
        checkCountOfSymbol(about[number+1].children[3])

        // <-- Инициализация иконки для изменения строки -->
        let pencil = document.querySelectorAll('.pencil')
        pencil = pencil[pencil.length - 1]

        // <-- Слушатель для иконки по изменению строки -->
        pencil.addEventListener('click', item => {
            //console.log(item.path[1].children[3].children[0])
            if (item.path[1].hasAttribute('contenteditable')) {
                item.path[1].children[3].children[0].innerText = item.path[1].children[3].children[0].innerText+'...'
                item.path[1].children[3].children[1].style.display = "none"
                item.path[1].removeAttribute('contenteditable')
            } else {
                console.log(item.path[1].children[3])
                item.path[1].children[3].children[0].innerText = item.path[1].children[3].innerText.substring(0,item.path[1].children[3].innerText.length-3)
                console.log(item.path[1].children[3])
                item.path[1].children[3].children[1].style.display = "inline"
                item.path[1].setAttribute('contenteditable', true)
                item.path[1].style.outline = 'none'
            }
        })
    })
}