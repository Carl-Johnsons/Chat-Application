const individualMessages = [2, 1, 2, 2, 2, 1, 2];

const messageContainer = [];
let start = individualMessages[0];
let startIndex = 0;
for (let i = 1; i <= individualMessages.length; i++) {
  if (start === individualMessages[i] && i !== individualMessages.length) {
    continue;
  }
  const subArray = individualMessages.slice(startIndex, i);
  start = individualMessages[i];
  startIndex = i;
  messageContainer.push(subArray);
}

console.log(messageContainer);
