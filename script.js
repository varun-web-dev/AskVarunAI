const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const chatBox = document.querySelector(".chat"); 

// Function to create a message element

const createMsg = (content, className) => {
    const div = document.createElement("div"); //create a <div> tag
    div.classList.add("msg", className); //add class:msg

    const p = document.createElement("p"); //create a <p> tag
    p.classList.add("text"); //add class:text to the <p>
    p.textContent = content; //set the message text inside the <p>

    div.appendChild(p); //put <p> inside the <div>
    return div;
}

// 
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

    // Create a new message element and add it to the chat
    const userMsgDiv = createMsg(userMsg, "user-msg");
    chatBox.appendChild(userMsgDiv);

}
// connect the function to the form
promptForm.addEventListener("submit", formSubmit);