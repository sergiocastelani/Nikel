const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(evt) {
    evt.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const sessionCheck = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (account === null || password !== account.password) {
        alert("Oops! Verifique o usuário ou a senha.");
        return;
    }

    saveSession(email, sessionCheck);

    window.location.href = "home.html";
});


//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(evt) {
    evt.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
        alert("Preencha o campo com um email válido");
        return;
    }
    else if (password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso");
});

function saveAccount( data ) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount( key ) {
    const account = localStorage.getItem( key );

    if ( account ) {
        return JSON.parse(account);
    }

    return null;
}

function saveSession( email, sessionCheck ) {
    if (sessionCheck) {
        localStorage.setItem( "session", email );
    }

    sessionStorage.setItem("logged", email);
}

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}
