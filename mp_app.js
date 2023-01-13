const toggle = document.getElementById('themePress');
const body = document.querySelector('body');
toggle.onclick = function(){
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    console.log('hi');
}

const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));