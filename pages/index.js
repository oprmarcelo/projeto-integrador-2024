// Define as funções fora do callback onAuthStateChanged
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isAuthPage(pathname) {
  return pathname.includes("login.html") || pathname.includes("register.html");
}

function toggleEmailErrors() {
  const email = document.getElementById("email").value;
  const emailRequiredError = document.getElementById("email-required-error");
  const emailInvalidError = document.getElementById("email-invalid-error");

  if (!email) {
    emailRequiredError.style.display = "block";
    emailInvalidError.style.display = "none";
  } else if (!validateEmail(email)) {
    emailRequiredError.style.display = "none";
    emailInvalidError.style.display = "block";
  } else {
    emailRequiredError.style.display = "none";
    emailInvalidError.style.display = "none";
  }
}

function isPasswordValid() {
  const password = document.getElementById("password").value;
  return password !== "";
}

function toggleButtonsDisabled() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const recoverPasswordButton = document.getElementById("recover-password-button");
  const loginButton = document.getElementById("login-button");

  const emailIsValid = validateEmail(email);
  const passwordIsValid = isPasswordValid();

  recoverPasswordButton.disabled = !emailIsValid;
  loginButton.disabled = !emailIsValid || !passwordIsValid;
}

function togglePasswordErrors() {
  const password = document.getElementById("password").value;
  const passwordRequiredError = document.getElementById("password-required-error");

  if (!password) {
    passwordRequiredError.style.display = "block";
  } else {
    passwordRequiredError.style.display = "none";
  }
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "pages/transaction/transaction.html";
    })
    .catch(error => {
      alert(getErrorMessage(error));
    });
}

function logoutUser() {
  window.location.href = "index.html";
}

function register() {
  window.location.href = "pages/register/register.html";
}

function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
    return "Usuário não encontrado";
  }
  if (error.code == "auth/wrong-password") {
    return "Senha inválida";
  }
}

function recoverPassword() {
  const email = document.getElementById("email").value;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Email enviado com sucesso');
    })
    .catch(error => {
      alert(getErrorMessage(error));
    });
}

function isEmailValid() {
  const email = document.getElementById("email").value;
  return validateEmail(email);
}

function onChangeEmail() {
  toggleButtonsDisabled();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisabled();
  togglePasswordErrors();
}

// Agora, dentro do callback onAuthStateChanged, você pode chamar as funções necessárias
firebase.auth().onAuthStateChanged(user => {
  if (user && isAuthPage(window.location.pathname)) {
    window.location.href = "pages/transaction/transaction.html";
  }
}) 
