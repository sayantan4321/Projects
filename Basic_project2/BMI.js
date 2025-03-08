const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const height =parseInt(document.querySelector('#height').value);
    const weight =parseInt(document.querySelector('#weight').value);

    const result = document.querySelector('#result');
    const validation = document.querySelector('#weight_validation');
    if(height === '' || height < 0 || isNaN(height)) {
       // result.textContent = 'Please enter valid values';
        result.innerHTML = `Please give a valid height ${height}`;
    }
    else if(weight === '' || weight < 0 || isNaN(weight)) {
       // result.textContent = 'Please enter valid values';
       result.innerHTML = `Please give a valid height ${weight}`;
    }
    else{
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        result.innerHTML = `<span>Your BMI is ${bmi}</span>`;

        if(bmi < 18.5) {
            validation.innerHTML += '<span class="underweight">Underweight</span>';
        }
        else if(bmi >= 18.5 && bmi <= 24.9) {
            validation.innerHTML += '<span class="normal">Normal</span>';
        }
        else if(bmi >= 25 && bmi <= 29.9) {
            validation.innerHTML += '<span class="overweight">Overweight</span>';
        }
        else {
            validation.innerHTML += '<span class="obese">Obese</span>';
        }
    }

});