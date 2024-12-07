const messageInput = document.querySelector('.message-input');
const chatBody = document.querySelector('.chat-body');
const sendMessageButton = document.querySelector('#send-message');
const fileInput = document.querySelector('#file-input');
const fileUpload = document.querySelector('#file-upload');
const fileUploadWrapper = document.querySelector('.file-upload-wrapper');
const fileCancelButton = document.querySelector('#file-cancel');
const chatForm = document.querySelector('.chat-form');

const API_KEY = `AIzaSyDzHmtMgM4nM5MU4z1SUASXsDPs9oDPWmo`;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Obiect care stochează datele utilizatorului (mesaj text și fișier încărcat)
const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

// Creează un element de mesaj cu clase și conținut specific
const createMessageElement = (content, ...classes) => {
  const div = document.createElement('div');
  div.classList.add('message', ...classes);
  div.innerHTML = content;
  return div;
};

// Generează răspunsul bot-ului pe baza mesajului utilizatorului și a fișierului încărcat
const generateBotResponse = async incomingMessageDiv => {
  const messageElement = incomingMessageDiv.querySelector('.message-text');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: userData.message },
            ...(userData.file.data ? [{ inline_data: userData.file }] : []),
          ],
        },
      ],
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    const apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .trim();
    messageElement.innerHTML = apiResponseText;
  } catch (error) {
    console.log(error);
    messageElement.innerText = error.message;
    messageElement.style.color = '#ff0000';
  } finally {
    userData.file = {};
    incomingMessageDiv.classList.remove('thinking');
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
  }
};

// Gestionează trimiterea mesajelor utilizatorului
const handleOutgoingMessage = e => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = '';
  fileUploadWrapper.classList.remove('file-uploaded');
  document.body.classList.remove('show-emoji-picker');

  const messageContent = `<div class="message-text"></div>
  ${
    userData.file.data
      ? `<img src = "data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />`
      : ''
  }`;

  const outgoingMessageDiv = createMessageElement(
    messageContent,
    'user-message'
  );

  outgoingMessageDiv.querySelector('.message-text').innerText =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

  setTimeout(() => {
    const messageContent = `<svg xmlns="http://www.w3.org/2000/svg" ...></svg>
      <div class="message-text">
        <div class="thinking-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>`;
    const incomingMessageDiv = createMessageElement(
      messageContent,
      'bot-message',
      '.thinking'
    );

    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    generateBotResponse(incomingMessageDiv);
  }, 300);
};

// Adaugă eveniment de trimitere a mesajului la apăsarea tastei Enter
messageInput.addEventListener('keydown', e => {
  const userMessage = e.target.value.trim();
  if (e.key === 'Enter' && userMessage) {
    handleOutgoingMessage(e);
  }
});

// Gestionează încărcarea fișierelor de către utilizator
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    fileUploadWrapper.querySelector('img').src = e.target.result;
    fileUploadWrapper.classList.add('file-uploaded');
    const base64String = e.target.result.split(',')[1];
    userData.file = {
      data: base64String,
      mime_type: file.type,
    };
    fileInput.value = '';
  };
  reader.readAsDataURL(file);
});

// Resetează datele fișierului și UI-ul la anularea fișierului
fileCancelButton.addEventListener('click', () => {
  userData.file = {};
  fileUploadWrapper.classList.remove('file-uploaded');
});

// Creează un picker de emoji-uri și gestionează selectarea unui emoji
const picker = new EmojiMart.Picker({
  theme: 'light',
  skinTonePosition: 'none',
  previewPosition: 'none',
  onEmojiSelect: emoji => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, 'end');
    messageInput.focus();
  },

  onClickOutside: e => {
    if (e.target.id === 'emoji-picker') {
      document.body.classList.toggle('show-emoji-picker');
    } else {
      document.body.classList.remove('show-emoji-picker');
    }
  },
});

// Adaugă picker-ul de emoji-uri la formularul de chat
chatForm.appendChild(picker);

// Adaugă eveniment de trimitere a mesajului la click pe butonul de trimitere
sendMessageButton.addEventListener('click', e => handleOutgoingMessage(e));

// Deschide dialogul pentru încărcarea fișierelor
fileUpload.addEventListener('click', () => fileInput.click());


// window.addEventListener('resize', () => {
//   if (window.innerHeight < 500) {
//     // Când tastatura este deschisă, înălțimea scade considerabil (în funcție de dispozitiv)
//     document
//       .querySelector('.chat-footer')
//       .scrollIntoView({ behavior: 'smooth' });
//   }
// });

