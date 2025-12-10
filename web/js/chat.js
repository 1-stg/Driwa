const createChatModal = () => {
  const chatHTML = `
    <div class="chat d-none">
      <div class="chat__modal">
        <div class="contacts__mode active">
          <div class="modal__header">
            <div class="exit__background close-chat-btn">
              <img class="exit__img" src="web/images/svg/x.svg" alt="Закрыть">
            </div>
            <div class="modal__header__name">
              <img src="web/images/svg/profile.svg" alt="Пользователь">
              <h3>Контакты</h3>
            </div>
          </div>

          <div class="contacts__list">
            <div class="contact__item" data-user-id="1">
              <div class="contact__avatar">
                <img src="web/images/png/audi_r8_2.jpg" alt="Аватарка">
              </div>
              <div class="contact__info">
                <h4 class="contact__name">Иван Иваныч</h4>
                <p class="contact__last-message">Audi R8</p>
              </div>
            </div>
            <div class="contact__item" data-user-id="2">
              <div class="contact__avatar">
                <img src="web/images/png/audi_r8_2.jpg" alt="Аватарка">
              </div>
              <div class="contact__info">
                <h4 class="contact__name">Алексей Петров</h4>
                <p class="contact__last-message">BMW M5</p>
              </div>
            </div>
            <div class="contact__item" data-user-id="3">
              <div class="contact__avatar">
                <img src="web/images/png/audi_r8_2.jpg" alt="Аватарка">
              </div>
              <div class="contact__info">
                <h4 class="contact__name">Мария Сидорова</h4>
                <p class="contact__last-message">Mercedes S-Class</p>
              </div>
            </div>
          </div>
        </div>

        <div class="chat__mode">
          <div class="modal__header">
            <div class="back__background back-to-contacts-btn">
              <img class="back__img" src="web/images/svg/arrow-left.svg" alt="Назад">
            </div>
            <div class="modal__header__name chat__header__info">
              <img src="web/images/png/audi_r8_2.jpg" alt="Пользователь">
              <div>
                <h3 class="chat__user__name">Иван Иваныч</h3>
              </div>
            </div>
          </div>

          <div class="modal__body">
            <div class="modal__body__right__container">
              <div class="modal__body__right chat__messages"></div>
              <div class="modal__body__right__input">
                <input type="text" name="chat_message" placeholder="Написать сообщение...">
                <img id="sendMessageBtn" src="web/images/svg/send.svg" alt="Отправить">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);
};

const chatMessages = {
  1: [
    { type: 'left', time: '19:39', text: 'Привет! Как дела?' },
    { type: 'right', time: '19:40', text: 'Привет! Всё отлично, спасибо!' },
    { type: 'left', time: '19:41', text: 'Как там твоя Audi R8?' },
    { type: 'right', time: '19:42', text: 'Работает как часы!' }
  ],
  2: [
    { type: 'left', time: '14:20', text: 'Привет, насчёт BMW M5' },
    { type: 'right', time: '14:22', text: 'Да, слушаю' },
    { type: 'left', time: '14:25', text: 'Когда сможем встретиться?' },
    { type: 'right', time: '14:30', text: 'Завтра в 15:00' }
  ],
  3: [
    { type: 'left', time: '11:15', text: 'Добрый день!' },
    { type: 'right', time: '11:16', text: 'Здравствуйте' },
    { type: 'left', time: '11:17', text: 'Интересует Mercedes S-Class' },
    { type: 'right', time: '11:20', text: 'Могу показать в четверг' }
  ]
};

let chatButton = document.querySelector('#chatButton');
let chatNode, exitButton, backButton, chatModalNode, sendButton, chatFrame, messageInput;
let contactsMode, chatMode, contactItems, chatUserInfo, chatUserName;

let isContactsMode = true;
let currentChatUser = null;

function initializeChat() {
  chatNode = document.querySelector('.chat');
  exitButton = document.querySelector('.close-chat-btn');
  backButton = document.querySelector('.back-to-contacts-btn');
  chatModalNode = document.querySelector('.chat__modal');
  sendButton = document.querySelector(`#sendMessageBtn`);
  chatFrame = document.querySelector(`.chat__messages`);
  messageInput = document.querySelector(`.modal__body__right__input input`);
  contactsMode = document.querySelector('.contacts__mode');
  chatMode = document.querySelector('.chat__mode');
  contactItems = document.querySelectorAll('.contact__item');
  chatUserInfo = document.querySelector('.chat__header__info');
  chatUserName = document.querySelector('.chat__user__name');
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

function renderMessages(userId) {
  if (!chatFrame || !chatMessages[userId]) return;

  chatFrame.innerHTML = '';

  chatMessages[userId].forEach(msg => {
    if (msg.type === 'left') {
      chatFrame.innerHTML += `<div class="modal__body__right__message__left">
        <p class="chat__message__time">${msg.time}</p>
        <h5 class="chat__message__text">${msg.text}</h5>
      </div>`;
    } else {
      chatFrame.innerHTML += `<div class="modal__body__right__message__right">
        <p class="chat__message__time">${msg.time}</p>
        <h5 class="chat__message__text">${msg.text}</h5>
      </div>`;
    }
  });
}

const openChatWithUser = (userName, userId) => {
  isContactsMode = false;
  currentChatUser = { name: userName, id: userId };

  chatUserName.textContent = userName;

  contactsMode.classList.remove('active');
  chatMode.classList.add('active');

  renderMessages(userId);

  if (messageInput) {
    messageInput.focus();
  }
  scrollToBottom();
}

const backToContacts = () => {
  isContactsMode = true;
  currentChatUser = null;

  chatMode.classList.remove('active');
  contactsMode.classList.add('active');
}

const chat = () => {
  chatNode.classList.remove(`d-none`);
  bodyNode.classList.add(`body__modal`);


  requestAnimationFrame(() => {
    chatNode.classList.add('active');
    chatModalNode.classList.add('chat__modal__display');

    if (!isContactsMode) {
      backToContacts();
    }
  });
}

const closeChat = () => {
  if (!isContactsMode) {
    backToContacts();
    return;
  }

  chatModalNode.classList.remove('chat__modal__display');
  chatNode.classList.remove('active');

  const onTransitionEnd = () => {
    chatNode.classList.add(`d-none`);
    chatNode.removeEventListener('transitionend', onTransitionEnd);
    bodyNode.classList.remove(`body__modal`);
  };

  chatNode.addEventListener('transitionend', onTransitionEnd);
}

const sendMessage = () => {
  if (!messageInput || !chatFrame || !currentChatUser) return;

  let text = messageInput.value.trim();

  if (text === '') return;

  const userId = currentChatUser.id;

  if (!chatMessages[userId]) {
    chatMessages[userId] = [];
  }

  chatMessages[userId].push({
    type: 'right',
    time: formatTime(),
    text: text
  });

  messageInput.value = '';

  renderMessages(userId);

  scrollToBottom();
}

function setupEventListeners() {
  if (chatButton) {
    chatButton.addEventListener('click', chat);
  }

  if (exitButton) {
    exitButton.addEventListener('click', closeChat);
  }

  if (backButton) {
    backButton.addEventListener('click', backToContacts);
  }

  if (sendButton) {
    sendButton.addEventListener(`click`, sendMessage);
  }

  if (contactItems) {
    contactItems.forEach(contact => {
      contact.addEventListener('click', () => {
        const userName = contact.querySelector('.contact__name').textContent;
        const userId = contact.getAttribute('data-user-id');
        openChatWithUser(userName, userId);
      });
    });
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