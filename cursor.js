let mouseCursor = document.querySelector('.cursor');
let divs = document.querySelectorAll('p');

let whiteSpans = document.querySelectorAll('.white')
let orangeSpans = document.querySelectorAll(".orange")

window.addEventListener('mousemove',cursor)

function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}

whiteSpans.forEach((div)=>{
    div.addEventListener('mouseover',()=>{
        mouseCursor.classList.add('opaqued-white')
    })
    div.addEventListener('mouseleave',()=>{
        mouseCursor.classList.remove('opaqued-white')
    })
})

orangeSpans.forEach((div)=>{
    div.addEventListener('mouseover',()=>{
        mouseCursor.classList.add('opaqued-orange')
    })
    div.addEventListener('mouseleave',()=>{
        mouseCursor.classList.remove('opaqued-orange')
    })
})

divs.forEach((div)=>{
    div.addEventListener('mouseover',()=>{
        mouseCursor.classList.add('link-grow')
        div.classList.add('hovered-link')
    })

    div.addEventListener('mouseleave',()=>{
        mouseCursor.classList.remove('link-grow')
        div.classList.remove('hovered-link')
    })

    
})
