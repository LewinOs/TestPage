import {JsonRequest} from "./JsonGet.js";
import {sorting} from "./Sort.js";
import {render} from "./render.js";
import {renderJson} from "./JsonRequest.js";


// <-- Рендер таблицы-->
render(JsonRequest);


// <-- Инициализация блока убранных столбцов таблицы -->
const blockChoose = document.querySelector('#myDropdown');

// <-- Инициализация минусов, отвечающих за скрытие столбцов таблицы -->
const arrayMinus = document.querySelectorAll('.minus');

// <-- Объект, который впоследствии будет содержать шапки всех убранных столбцов таблицы -->
let popup_obj = {};

// <-- Переменная для будущих взаимодействий со строками таблицы -->
let tableLines = '';

// <-- Перебор массива с минусами -->
arrayMinus.forEach((item,number)=>{

    // <-- Слушатель для минусов -->
    item.addEventListener('click',plus=>{
        tableLines = document.querySelectorAll('tr'); // <-- Инициализация каждой строки таблицы

        // <-- Присвоение свойства display: none для каждой ячейки выбранного столбца по их соответствию со столбцом нажатого минуса
        for (let i = 0;i<tableLines.length;i++){
            tableLines[i].children[number].style.display = "none";
        }


        const head_table = document.querySelectorAll('.head_table'); // <- Инициализаци элементов шапки таблицы

        // <-- Вставка имён убранных столбоцов в блок для них -->
        blockChoose.insertAdjacentHTML('beforeend',`
            <a href = #>${head_table[number].children[0].textContent}</a>
            `);
        popup_obj[head_table[number].children[0].textContent] = number; // <-- Внесение шапки убранной таблицы в объект для них

    });
});

// <-- Инициализация стрелок для сортировки -->
const arrayArrow = document.querySelectorAll('.arrow');

// <-- Перебор всех стрелок -->
arrayArrow.forEach(item=>{

    // <-- Функция для удаления старой таблицы -->
    const removeOldTable = ()=>{
        const tbody = document.querySelectorAll('tbody');
        for (let i = 1;i<tbody.length;i++){
            tbody[i].remove();
        }
    }

    // <-- Переменная, которая в будущем будет содержать информацию о том, в каком порядке нужно сортировать -->
    let instruction = '';

    // <-- Слушатель для стрелок сортировки -->
    item.addEventListener('click',arrow=>{

        // <-- Считывание текущего положения стрелы и последующего изменения направления этой стрелы -->
        let currentArrow = item.innerText;
        if(currentArrow == '⇓'){
            item.innerText = '⇑';
            instruction = 'up';
        }
        else {
            item.innerText = '⇓';
            instruction = 'down';
        }

        // <-- Вызов функции sorting для сортировки данных таблицы -->
        let array = sorting(renderJson(),instruction,item.offsetParent.className.split(' ')); // sorting(текущие данные таблицы, текующее положение стрелки сортировки, шапка сортируемого столбца)
        removeOldTable(); // <-- удаление старой таблицы
        render(array); // <-- рендер новой таблицы

        // <-- Повторная инициализация шапки таблицы -->
        const head_table = document.querySelectorAll('.head_table');

        // <-- Перебор элементов шапки таблицы для удаления элементов, убранных до перерендеринга(сортировки) -->
        head_table.forEach((item,number)=>{
            let temp_str = item.children[0].textContent; // <-- Считывание названия столбца
            if(popup_obj.hasOwnProperty(temp_str)){ // <-- Проверка столбца на нахождение в объекте убранных элементов
                tableLines = document.querySelectorAll('tr');
                for (let i = 0;i<tableLines.length;i++){
                tableLines[i].children[number].style.display = "none"; // <-- Скрытие элемента
                }
            }
        });
    });
});


// <-- Инициализация кнопки для показа убранных столбцов -->
const showButton = document.querySelector('.dropbtn');

// <-- Слушатель на кнопку для показа убранных столбцов -->
showButton.addEventListener('click',item=>{
    document.getElementById("myDropdown").classList.toggle("show"); // <-- Показ элементов в блоке для шапок скрытых столбцов

    // <-- Инициализация всех строк таблицы -->
    tableLines = document.querySelectorAll('tr');

    // <-- Инициализация всех строк в блоке для шапок скрытых объектов -->
    let tempbutton = blockChoose.querySelectorAll('a');

    // <-- Проверка на пустоту блока и последующему присвоение ему элемента по умолчанию
    if(tempbutton.length==0){
        blockChoose.insertAdjacentHTML('beforeend',`
            <a href = # class ="default_button_link">Все колонки показаны</a>
            `);
    }

    // <-- Если же блок не пустой, то совершаем действие с его элементами -->
    else{

        // <-- Удаление значения по умолчанию, если оно имеется -->
        if(blockChoose.querySelectorAll('a')[0].classList.contains("default_button_link")){
            blockChoose.querySelectorAll('a')[0].remove();
        }

        // <-- Перебор всех элементов блока -->
        tempbutton.forEach(but=>{

            // <-- Слушатели на элементы блока -->
            but.addEventListener('click',but=>{
                // <-- Если же было нажатие по элементу в блоке, то отобразить весь столбец с именем шапки, которое выбрали
                for (let i = 0;i<tableLines.length;i++){
                    tableLines[i].children[popup_obj[but.target.innerText]].style.display = "table-cell";
                }
                delete popup_obj[but.target.textContent]; // <-- Удалить выбранный элемент из объекта для убранных столбцов
                but.target.remove(); // <-- Удалить выбранный элемент из блока
            });
        });
    }
});

// <-- Закрыть раскрывающийся список, если пользователь щелкнет за его пределами -->
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







