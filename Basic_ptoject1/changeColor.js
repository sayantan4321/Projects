const buttons = document.querySelectorAll('.button'); // select all buttons
//console.log(buttons); // we got nodelist
const body = document.querySelector('body'); // select body

buttons.forEach((button) => {
    // console.log(button); // we got each buttonattributes and all details
    button.addEventListener('click', function(e) {
        console.log(e);
        console.log(e.target);
        if(e.target.id ==='grey'){
            body.style.backgroundColor = e.target.id;
        }
        if(e.target.id ==='green'){
            body.style.backgroundColor = e.target.id;
        }
        if(e.target.id ==='blue'){
            body.style.backgroundColor = e.target.id;
        }
        if(e.target.id ==='yellow'){
            body.style.backgroundColor = e.target.id;
        }
          
    })
});
