const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");

const formSubmit = (el) => {

    //stop refreshing and remove extra spaces
    el.preventDefault();
    let userMsg = promptInput.value.trim();

    // if input is empty do nothing
    if(userMsg===""){
        return;
    }
    // if input is not empty print on console
    console.log(userMsg);

    // clear input field after submitting
    promptInput.value = "";
}

promptForm.addEventListener("submit", formSubmit);