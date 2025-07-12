
let userName = document.getElementById("username");
let password = document.getElementById("password");
let form = document.querySelector(".container form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isRequiredValid = checkRequired([userName, password]);

    let isFormValid = isRequiredValid;

    if (isRequiredValid) {
        let isUserNameValid = checkLength(userName, 6, 15);
        let isPasswordValid = checkLength(password, 6, 20);

        isFormValid = isUserNameValid && isPasswordValid ;
    }
    console.log(isFormValid);
    if (isFormValid) {
        form.submit();

        document.querySelectorAll(".form-group").forEach((a) => {
            a.className = "form-group";
        });
    }
});

function checkLength(input, min, max) {
    if (input.value.trim().length < min) {
        showError(
            input,
            `${capitalize(input.id)} should be more than ${min} letter`
        );
        return false;
    } else if (input.value.trim().length > max) {
        showError(
            input,
            `${capitalize(input.id)} should be less than ${max} letter`
        );
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkConfirmPassword(input1, input2) {
    if (input1.value === input2.value) {
        showSuccess(input2);
        return true;
    } else {
        showError(input2, `Password dosen't match`);
        return false;
    }
}

function checkRequired(array) {
    let isValid = true;

    array.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, ` ${capitalize(input.id)} is required`);
            return (isValid = false);
        } else {
            showSuccess(input);
            return (isValid = true);
        }
    });

    return isValid;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showError(input, message) {
    let form = input.parentElement;
    form.className = "form-group error";

    form.querySelector("small").innerText = message;
}

function showSuccess(input) {
    let form = input.parentElement;
    form.className = "form-group success";
}
