export const sorting = (array,instuction, property) =>{
    console.log(array)
    let ar = array[0]
    let prop = property[0]
    if(property[0] == 'name'){
        let prop2 = property[1]
        if(instuction=='down'){
            array.sort(function (a, b) {
                if (a[prop][prop2]> b[prop][prop2] ) {
                    return 1;
                }
                if (a[prop][prop2]  < b[prop][prop2] ) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            });
        }
        else{
            array.sort(function (a, b) {
                if (a[prop][prop2] > b[prop][prop2] ) {
                    return -1;
                }
                if (a[prop][prop2]  < b[prop][prop2] ) {
                    return 1;
                }
                // a должно быть равным b
                return 0;
            })}
    }
    else{
    if(instuction=='down'){
    array.sort(function (a, b) {
        if (a[prop] > b[prop] ) {
            return 1;
        }
        if (a[prop]  < b[prop] ) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    });
    }
    else{
        array.sort(function (a, b) {
            if (a[prop] > b[prop] ) {
                return -1;
            }
            if (a[prop]  < b[prop] ) {
                return 1;
            }
            // a должно быть равным b
            return 0;
    })}}
    return array
}
