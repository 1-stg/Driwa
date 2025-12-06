const createChatModal = () => {
    const chatHTML = `
    <div class="chat d-none">
      <div class="chat__modal">
        <div class="modal__header">
          <div class="exit__background">
            <img class="exit__img" src="web/images/svg/x.svg" alt="Закрыть">
          </div>
          <div class="modal__header__name">
            <img src="web/images/svg/profile.svg" alt="Пользователь">
            <h3>Иван Иваныч</h3>
          </div>
        </div>

        <div class="modal__body">
          <div class="modal__body__left">
            <div class="body__left__cart__inner">
              <div class="body__left__cart">
                <div class="body__left__cart__img">
                  <img src="web/images/png/audi_r8_2.jpg" alt="Аватарка">
                </div>
                <div class="left__cart__text">
                  <h4>Иван Иваныч</h4>
                  <h5>Audi R8</h5>
                </div>
              </div>
              <hr>
              <div class="body__left__cart">
                <div class="body__left__cart__img">
                  <img src="web/images/png/audi_r8_2.jpg" alt="Аватарка">
                </div>
                <div class="left__cart__text">
                  <h4>Иван Иваныч</h4>
                  <h5>Audi R8</h5>
                </div>
              </div>
              <hr>
              <div class="body__left__cart">
                <div class="body__left__cart__img">
                  <img src="web/images/png/audi_r8_2.jpg" alt="Аватарка">
                </div>
                <div class="left__cart__text">
                  <h4>Иван Иваныч</h4>
                  <h5>Audi R8</h5>
                </div>
              </div>
              <hr>
            </div>
          </div>
          <div class="modal__body__right__container">
            <div class="modal__body__right">
              <div class="modal__body__right__message__left">
                <p class="chat__message__time">19:39</p>
                <h5 class="chat__message__text">Привет</h5>
              </div>
              <div class="modal__body__right__message__right">
                <p class="chat__message__time">19:40</p>
                <h5 class="chat__message__text">Привет Привет Привет Привет Привет Привет Привет Привет</h5>
              </div>
            </div>
            <div class="modal__body__right__input">
              <input type="text" name="chat_message" placeholder="Написать">
              <img id="sendMessageBtn" src="web/images/svg/send.svg" alt="Отправить">
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
};

let chatButton = document.querySelector('#chatButton');
let chatNode, exitButton, chatModalNode, sendButton, chatFrame, messageInput;

function initializeChat() {
    chatNode = document.querySelector('.chat');
    exitButton = document.querySelector('.exit__background');
    chatModalNode = document.querySelector('.chat__modal');
    sendButton = document.querySelector(`#sendMessageBtn`);
    chatFrame = document.querySelector(`.modal__body__right`);
    messageInput = document.querySelector(`.modal__body__right__input input`);
    
    if (!chatButton) {
        chatButton = document.createElement('button');
        chatButton.id = 'chatButton';
        chatButton.textContent = 'Открыть чат';
        chatButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; z-index: 999;';
        document.body.appendChild(chatButton);
    }
}

function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    minutes = minutes.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

function scrollToBottom() {
    if (chatFrame) {
        chatFrame.scrollTop = chatFrame.scrollHeight;
    }
}

const chat = () => {
    chatNode.classList.remove(`d-none`);
    
    setTimeout(() => {
        chatNode.classList.add('active');
        chatModalNode.classList.add('chat__modal__display');
        
        setTimeout(() => {
            if (messageInput) {
                messageInput.focus();
            }
            scrollToBottom();
        }, 300);
    }, 10);
}

const closeChat = () => {
    chatModalNode.classList.remove('chat__modal__display');
    
    setTimeout(() => {
        chatNode.classList.remove('active');
        
        setTimeout(() => {
            chatNode.classList.add(`d-none`);
        }, 300);
    }, 300);
}

const sendMessage = () => {
    if (!messageInput || !chatFrame) return;
    
    let text = messageInput.value.trim();
    
    if (text === '') return;
    
    messageInput.value = ``;
    
    chatFrame.innerHTML += `<div class="modal__body__right__message__right">
              <p class="chat__message__time">${formatTime()}</p>
              <h5 class="chat__message__text">${text}</h5>
            </div>`;
    
    setTimeout(scrollToBottom, 10);
}

function setupEventListeners() {
    if (chatButton) {
        chatButton.addEventListener('click', chat);
    }
    
    if (exitButton) {
        exitButton.addEventListener('click', closeChat);
    }
    
    if (sendButton) {
        sendButton.addEventListener(`click`, sendMessage);
    }
    
    if (chatNode) {
        chatNode.addEventListener('click', (event) => {
            if (event.target === chatNode) {
                closeChat();
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function initChat() {
    createChatModal();
    initializeChat();
    setupEventListeners();
}

document.addEventListener('DOMContentLoaded', initChat);