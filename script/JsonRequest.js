export const renderJson=()=>{
    let obj = []

    const arrayNodes = document.querySelectorAll('tr')
    const table_about = document.querySelectorAll('.table_about')
    table_about.forEach(item=>{
        item.children[1].style.display="inline"
        item.children[0].innerText =  item.children[0].innerText.substring(0,item.children[0].innerText.length-3)
        console.log(item.c)
    })
    for(let i = 1; i<arrayNodes.length;i++) {
        let item = arrayNodes[i]
        let ar = item.children
        let tempObj = {
                id: "5c2286fb23e87be312d55d9a",
                name: {
                    firstName: ar[0].innerText,
                    lastName: ar[1].innerText
                },
                phone: ar[2].innerText,
                about: ar[3].innerText,
                eyeColor: ar[4].lastChild.innerText
            };
        obj.push(tempObj);
    }
    //console.log(obj)
    return obj
}