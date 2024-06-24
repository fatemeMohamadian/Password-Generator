const inplen = document.querySelector('#inplen')
const spanmove = document.querySelectorAll('.sp2')
const result = document.querySelector('#pass')
const spicon = document.querySelectorAll('.icon')
const btn = document.querySelector('#btn')
const text = document.querySelector('.txt')
let mylength = ''
////////////////////////////////////////////////
const lowerchar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const upperchar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ['#', '%', '&', '*', '@', '!', '$', '/']
const password = [lowerchar, number, upperchar, symbols]
const mainarr = [[], [], [], []]

inplen.addEventListener('input', (e) => {
    mylength = e.target.value
    randpasword()
})
////////////// click option ///////////////////
spanmove.forEach((val, i) => {
    let sp = 1
    val.addEventListener('click', () => {
        if (inplen.value != '') {
            if (sp % 2) {
                mainarr[i].push(password[i])
                val.style.left = '50%'
            }
            else {
                mainarr[i].pop(password[i])
                val.style.left = '0%'
                result.value = ''
                let save = sp
                save = 0
            }
        }
        sp++
        randpasword()
        statuspass()
    })
})
////////////// click option ///////////////////
//////////////// main section /////////////////
function randpasword() {
    const key = []
    let pass = ''
    mainarr.forEach((val) => {
        if (val.length != 0) {
            key.push(val)
        }
    })
    for (let i = 0; i < mylength; i++) {
        let x = key[Math.floor(Math.random() * key.length)]
        pass += x[0][Math.floor(Math.random() * x[0].length)]
    }
    result.value = pass
    statuspass()
}
spicon[0].addEventListener('click', () => {
    if (result.value != '') {
        spicon[0].style.display = 'none'
        spicon[1].style.display = 'flex'
        result.setAttribute('type', 'password')
    }
})
spicon[1].addEventListener('click', () => {
    if (result.value != '') {
        spicon[0].style.display = 'flex'
        spicon[1].style.display = 'none'
        result.setAttribute('type', 'text')
    }
})
btn.addEventListener('click', () => {
    if (result.value == '') {
        alert('You not yet Set The Password!!!')
    }
    else {
        navigator.clipboard.writeText(result.value)
        alert('The Password Is Saved!')
    }
})
//////////////// main section ///////////////////////
///////////////// status password ////////////////////
function statuspass() {
    let flag = 0
    let txt = ''
    let mycolor = ''
    let inpoutline = ''
    let myvalue = result.value
    if ((myvalue.length) > 32) flag++
    if ((myvalue.search(/[0-9]/)) >= 0) flag++
    if ((myvalue.search(/[a-z]/)) >= 0) flag++
    if ((myvalue.search(/[A-Z]/)) >= 0) flag++
    if ((myvalue.search(/[@!#/$%&*]/)) >= 0) flag++
    switch (flag) {
        case 0: txt = 'Very Weak'; mycolor = 'red'; break;
        case 1: txt = 'Weak'; mycolor = 'red'; break;
        case 2: txt = 'Normal'; mycolor = 'orange'; break;
        case 3: txt = 'Good'; mycolor = 'rgb(38, 232, 83)'; break;
        case 4: txt = 'Strong'; mycolor = 'green'; break;
    }
    text.innerHTML = txt
    text.style.color = mycolor
    text.style.backgroundColor = 'white'
    result.style.border = '4px solid ' + mycolor + ''
}
///////////////// status password ////////////////////