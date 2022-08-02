let url = 'http://localhost:3001/users'
let staff = document.querySelector('.staff')
let form = document.forms.edit
let name = document.querySelector('.name')
let salary = document.querySelector('.salary')

let data = []

function react() {
    axios.get(url)
        .then(res => {
            if (res.status === 200 || res.status === 201)
                data = res.data
                reload(data)
        })
}
react()

function reload(arr) {
    staff.innerHTML = ""
    for (let item of arr) {
        staff.innerHTML += `
        <div class="staff_block" id="${item.id}">
                        <div class="left">
                            <span>${item.name}</span>
                        </div>
                        <div class="right">
                            <span>${item.salary}</span>
                            <img src="https://cdn-icons.flaticon.com/png/512/2016/premium/2016099.png?token=exp=1659429555~hmac=897b6eb777845ec092884ba5db43a2f4" alt="cake">
                            <img class="del_image" src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="del">
                        </div>
                    </div>
        `


        let del = document.querySelectorAll('.del_image')

        del.forEach(item => {
            item.onclick = (event) => {
                let id = event.target.parentNode.parentNode.id
                Del_item(id)
            }
        })

    }
}


let search = document.querySelector('.search')

search.onkeyup = () => {
    let find = data.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))
    reload(find)
}


form.onsubmit = (event) => {
    event.preventDefault()
    let edit = {
        id: Math.random(),
        name: name.value,
        salary: salary.value
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        edit[key] = value

    })
    postEdit(edit)
}


function postEdit(item) {
    axios.post(url, item)
        .then(res => {
            if (res.status === 200 || res.status === 200) {
                res.data
            }
        })
}

function Del_item(id) {
    axios.delete(`${url}/${id}`)
        .then(res => {
            if (res.status === 200 || res.status === 201)
                res.data
        })
}






// let cont = document.querySelector('.cont_todos')
// let form = document.forms.todos

// function react() {
//     axios.get(url)
//         .then(res => {
//             if (res.status === 200 || res.status === 201)
//                 reload(res.data)
//         })
// }

// react()

// function reload(arr) {
//     cont.innerHTML = ''
//     for (let item of arr) {
//         cont.innerHTML += `
//         <div class="box" id="${item.id}">
//                 <div class="line">
//                     <h2>${item.title}</h2>
//                     <h3 class="text">x</h3>
//                 </div>
//                 <span>${item.left}</span>
//             </div>
//         `

//         let h3 = document.querySelectorAll('.text')

//         h3.forEach(item => {
//             item.onclick = (event) => {
//                 let id = event.target.parentNode.parentNode.id
//                 del(id)
//             }
//         })

//     }
// }


// function del(id) {
//     axios.delete(`${url}/${id}`)
//         .then(res => {
//             if (res.status === 200 || res.status === 201) 
//                 res.data

//     })
// }



// form.onsubmit = (event) => {
//     event.preventDefault()
//     let todos = {
//         id: Math.random()
//     }

//     let fm = new FormData(form)

//     fm.forEach((value,key) => {
//         todos[key] = value

//     })
//     postTodos(todos)
// }

// function postTodos(item) {
//     axios.post(url,item) 
//         .then(res => {
//             if(res.status === 200 || res.status === 200){
//                 res.data
//             }
//         })
// }