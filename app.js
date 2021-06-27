const linkedIn = () => window.open("https://www.linkedin.com/in/christophe-kwizera-081123190/")
const gitHub = () => window.open("https://github.com/kabundege")
const stackOverFlow = () => window.open("https://stackoverflow.com/users/13124495/christopher?tab=profile")

let users,error,posts;
let overLayStatus = false;

window.onload = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(res => {
        users = res;
        const id = setTimeout(()=>{
            insertData()
            return ()=> clearTimeout(id)
        },2000)
    })
    .catch(err => error = err )
}

const toggleOverlay = () => {
    if(overLayStatus){
        document.querySelector('.overlay').style.display = 'none'
    }else{
        document.querySelector('.overlay').style.display = 'initial'
    }
    overLayStatus = !overLayStatus;
}

const setUser = (id) => {

    const user = users.find( one => one.id === id);
    toggleOverlay();

    document.querySelector('.userNames').innerHTML = user.name;
    document.querySelector('.userEmail').innerHTML = user.email;

    const header = document.createElement('header')
    header.setAttribute('class','userContent')

    setTimeout(()=>FetchPosts(user),2000)
}

const insertData = () => {
    document.querySelector('.loader-container').style.display = "none"
    for(const one of users ){
        const container = document.querySelector('.container')
        const user = document.createElement("div")
        user.setAttribute("class","user")
        //
        const section_one = document.createElement("section")
        const inputField_one = document.createElement('div')
        inputField_one.setAttribute('class','input-field')
        const icon_one =  document.createElement("i")
        icon_one.setAttribute("class","fas fa-user icon")
        const name = document.createElement("p")
        name.textContent = one.name;
        //
        inputField_one.append(icon_one)
        inputField_one.append(name)
        section_one.append(inputField_one)
        //
        const inputField_two = document.createElement('div')
        inputField_two.setAttribute('class','input-field')
        const icon_two =  document.createElement("i")
        icon_two.setAttribute("class","fas fa-envelope icon")
        const email = document.createElement("p")
        email.textContent = one.email;
        //
        inputField_two.append(icon_two)
        inputField_two.append(email)
        section_one.append(inputField_two)
        //
        const section_two = document.createElement("section")
        section_two.setAttribute('class','btn')
        section_two.setAttribute('onclick',`setUser(${one.id})`)
        //
        const span = document.createElement('span')
        span.textContent = 'posts'
        const icon_three =  document.createElement("i")
        icon_three.setAttribute("class","fas fa-arrow-right")
        //
        section_two.append(span)
        section_two.append(icon_three)
        //
        const design = document.createElement("div")
        design.setAttribute('class','design')
        //
        user.append(section_one)
        user.append(section_two)
        user.append(design)
        container.append(user)
    }
    
}

const FetchPosts = (user) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
    .then(res => res.json())
    .then(res => {
        document.querySelectorAll('.loader-container')[1].style.display = "none";
        const container = document.querySelectorAll('.container')[1]
        for(const one of res){
            //
            const post = document.createElement("div")
            post.setAttribute("class",'post')
            //
            const title = document.createElement('h4')
            title.textContent = one.title;
            const body = document.createElement('p')
            body.textContent = one.body
            //
            post.append(title)
            post.append(body)
            //
            container.append(post)
        } 
    })
}
