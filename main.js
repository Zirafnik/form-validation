const form = document.getElementsByTagName('form')[0];

const inputs= Array.from(document.querySelectorAll('input'));



inputs.forEach(input => input.addEventListener('change', function() {
    let inputError= document.querySelector(`#${input.id} + span.error`);
    console.log(inputError);

    if (input.checkValidity()) {
        console.log(input.checkValidity());
        inputError.textContent= '';
        inputError.className= '';
    } else {
        showError(input, inputError);
        console.log(input.checkValidity());
    }
}))

function showError(input, inputError) {
    if(input.validity.valueMissing) {
        inputError.textContent = `You need to enter ${input.id}.`;      
    } else if(input.validity.typeMismatch) {
        inputError.textContent = `Entered value needs to be ${input.type}.`;
    } else if(input.validity.patternMismatch) {
        inputError.textContent= `Entered value uses wrong characters.`;
    } else {
        inputError.textContent= `${input.validationMessage}`;
    }

    inputError.className= 'error active';
}

form.addEventListener('submit', function (event) {  
    if(!inputs.every(input => input.validity.valid)) {
        inputs.forEach(input => {
            if(!input.validity.valid) {
                let inputError= document.querySelector(`#${input.id} + span.error`);
                showError(input, inputError);
            }
        })

        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();
    } else {
        alert('Congrats!');
    }
});
