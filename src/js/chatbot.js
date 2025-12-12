document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Stylesheet for Material Symbols if not present
    if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
        document.head.appendChild(link);
    }
    
    // 2. Inject Chatbot HTML
    const chatbotHTML = `
    <button class="chatbot-toggler">
      <span class="material-symbols-outlined">mode_comment</span>
      <span class="material-symbols-outlined">close</span>
    </button>
    <div class="chatbot">
      <header>
        <h2>Branz</h2>
        <span class="close-btn material-symbols-outlined">close</span>
      </header>
      <ul class="chatbox">
        <li class="chat incoming">
          <span class="material-symbols-outlined">smart_toy</span>
          <p>Hi there 👋<br>I'm Branz. Ask me anything about our website!</p>
        </li>
      </ul>
      <div class="chat-input">
        <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
        <span id="send-btn" class="material-symbols-outlined">send</span>
      </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // 3. Logic
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    // Select SPECIFIC close button in header to be safe, though class is unique in this block
    const closeBtn = document.querySelector(".chatbot header .close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; 
    // Updated to the NEW KEY provided by user
    const API_KEY = "AIzaSyCKBKsDR2cG0MZavXa3-jDh_ncita6-TUk"; 
    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }

    const generateResponse = (chatElement) => {
        // Switch to v1 endpoint and gemini-1.5-flash
        const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        const messageElement = chatElement.querySelector("p");

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are Branz, the intelligent AI assistant for 'DevelopersHub E-commerce'. 
                        
                        ABOUT US:
                        We are a leading global online store connecting customers with premium suppliers. 
                        We serve thousands of customers worldwide.
                        Our scope is to provide high-quality Electronics, Fashion, and Home Goods at competitive prices with fast shipping.
                        
                        PRODUCTS & PRICES:
                        - iPhone 15 Pro Max: $1099
                        - Samsung Galaxy Book Pro: $998 (Sale)
                        - Premium T-Shirts: $29.99
                        - Modern Armchairs: $299
                        - Go Pro Hero 12: $599
                        - Headphones & Accessories: starting from $20
                        
                        SERVICES:
                        - Worldwide shipping (3-7 days)
                        - 30-day money-back guarantee
                        - 24/7 Customer Support
                        - Secure Payments (Visa, Mastercard, PayPal)

                        Your Tone: Helpful, professional, short and concise.
                        
                        Answer this query from a user: ${userMessage}`
                    }]
                }]
            })
        }

        fetch(API_URL, requestOptions)
            .then(async res => {
                if (!res.ok) {
                   const errData = await res.json().catch(() => ({}));
                   throw new Error(errData.error?.message || `HTTP Error ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    messageElement.textContent = data.candidates[0].content.parts[0].text.trim();
                } else {
                    console.error("Gemini API Error - Unexpected format:", data);
                    throw new Error("Invalid response format from AI");
                }
            }).catch((error) => {
                console.error("Chatbot Request Failed:", error);
                messageElement.classList.add("error");
                // SHOW EXACT ERROR TO USER
                messageElement.textContent = `Error: ${error.message}. Please try again later.`;
            }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if(!userMessage) return;

        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    if (sendChatBtn) sendChatBtn.addEventListener("click", handleChat);
    
    // IMPROVED CLOSE HANDLER
    if (closeBtn) {
        closeBtn.addEventListener("click", function(e) {
            e.stopPropagation(); // Prevent bubbling issues
            document.body.classList.remove("show-chatbot");
        });
    } else {
        console.error("Close button not found!");
    }

    if (chatbotToggler) {
        chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
    }
});
