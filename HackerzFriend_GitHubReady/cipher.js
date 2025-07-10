
let cipherChain = [];
function addCipher() {
  const cipher = document.getElementById("cipherSelect").value;
  if (cipherChain.length < 10) {
    cipherChain.push(cipher);
    updateChainDisplay();
  }
}
function updateChainDisplay() {
  const list = document.getElementById("cipherChainList");
  list.innerHTML = "";
  cipherChain.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    list.appendChild(li);
  });
}
function encrypt() {
  let text = document.getElementById("inputText").value;
  cipherChain.forEach(cipher => {
    text = applyCipher(text, cipher, true);
  });
  document.getElementById("outputBox").textContent = text;
}
function decrypt() {
  let text = document.getElementById("inputText").value;
  for (let i = cipherChain.length - 1; i >= 0; i--) {
    text = applyCipher(text, cipherChain[i], false);
  }
  document.getElementById("outputBox").textContent = text;
}
function applyCipher(text, cipher, encrypting) {
  switch (cipher) {
    case "caesar":
      return caesar(text, encrypting ? 3 : -3);
    case "vigenere":
      return vigenere(text, "KEY", encrypting);
    case "xor":
      return xor(text, "K");
    case "base64":
      return encrypting ? btoa(text) : atob(text);
    case "atbash":
      return atbash(text);
    case "rot13":
      return caesar(text, 13);
    case "reverse":
      return text.split("").reverse().join("");
    default:
      return text;
  }
}
function caesar(str, shift) {
  return str.replace(/[a-z]/gi, c => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + shift + 26) % 26 + base);
  });
}
function vigenere(text, key, encrypt = true) {
  key = key.toUpperCase();
  let out = "", j = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (/[a-zA-Z]/.test(c)) {
      const base = c === c.toUpperCase() ? 65 : 97;
      const keyChar = key[j % key.length].charCodeAt(0) - 65;
      const shift = encrypt ? keyChar : -keyChar;
      const newChar = String.fromCharCode((c.charCodeAt(0) - base + shift + 26) % 26 + base);
      out += newChar;
      j++;
    } else {
      out += c;
    }
  }
  return out;
}
function xor(str, key) {
  return str.split("").map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join("");
}
function atbash(str) {
  return str.replace(/[a-z]/gi, c => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(base + (25 - (c.charCodeAt(0) - base)));
  });
}
function clearAll() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputBox").textContent = "";
  cipherChain = [];
  updateChainDisplay();
}
