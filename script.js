const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const chatBox = document.querySelector(".chat");

//Genrating API key from the google ai studio
const API_KEY = "AIzaSyAMvUzQlvslKsVnGb6MZX3Cy_yzACOZNvs";
// Add API url of the gemini-2.0-flash
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userMsg = "";
const chatHistory = [];

// Function to create a message element
const createMsg = (content, className) => {
    const div = document.createElement("div"); //create a <div> tag
    div.classList.add("msg", className); //add class:msg

    //Add bot reply logo
    if (className === "bot-msg") {
        const img = document.createElement("img");
        img.src = "logo.png";
        img.alt = "Bot";
        img.classList.add("logo");
        div.appendChild(img);
    }

    const p = document.createElement("p"); //create a <p> tag
    p.classList.add("text"); //add class:text to the <p>
    p.textContent = content; //set the message text inside the <p>

    div.appendChild(p); //put <p> inside the <div>
    return div;
}

//Making API calls(for generating bot reply)
const genrateresponse = async (botMsgDiv,userMsg) => {


    //create element of botreply in text on chatbox  
    const botreply = botMsgDiv.querySelector(".text");
    
    //Add useMsg to the chat History
    chatHistory.push({
        role: "user",
        parts: [{ text: userMsg}]
    })
    try {
        const response = await fetch(API_URL,{
            method: "POST",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({contents : chatHistory})
        });

        const data = await response.json();
        if(!response) throw new Error (data.error.message)

            //process the response text and displayed it
            const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
            botreply.textContent = responseText;
            
    } 
    catch (error) {
        console.log(error);
    }
}

//Handle the form submission task
const formSubmit = (el) => {

    //stop refreshing and remove extra spaces
    el.preventDefault();
    let userMsg = promptInput.value.trim();

    // if input is empty do nothing
    if (userMsg === "") {
        return;
    }
    // if input is not empty print on console
    console.log(userMsg);

    // clear input field after submitting
    promptInput.value = "";

    // (user message)Create a new message element and add it to the chat
    const userMsgDiv = createMsg(userMsg, "user-msg");
    chatBox.appendChild(userMsgDiv);

    //(bot reply)Create a new message element and add it to the chat after 600 ms
    setTimeout(() => {
        const botMsgDiv = createMsg("Just a sec....", "bot-msg");
        chatBox.appendChild(botMsgDiv);
        genrateresponse(botMsgDiv,userMsg)
    }, 600);
}
// connect the function to the form
promptForm.addEventListener("submit", formSubmit);