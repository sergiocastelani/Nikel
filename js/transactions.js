const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {
    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(evt) {
    evt.preventDefault();

    const transactionData = {
        value : parseFloat(document.getElementById("value-input").value),
        description : document.getElementById("description-input").value,
        date : document.getElementById("date-input").value,
        type : parseInt(document.querySelector("input[name='type-input']:checked").value)
    };

    data.transactions.unshift(transactionData);

    saveData(data);

    evt.target.reset();
    myModal.hide();
    refreshScreen();

    alert("Lançamento adicionado com sucesso.");
});

checkLogged();

//FUNCTIONS

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    refreshScreen();
}

function fillTransactionsList() {
    const transactions = data.transactions;

    if (transactions.length > 0) {
        transactions.sort((a, b) => {
            const d1 = new Date(a.date);
            const d2 = new Date(b.date);

            if (d1 < d2)
                return -1;
            else if (d1 > d2)
                return 1;
            else
                return 0;
        });

        let html = ``;

        transactions.forEach((item) => {
            const type = item.type === 1 ? "Entrada" : "Saída";

            html += `
                <tr>
                <th scope="row">${item.date}</th>
                <td>R$ ${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
                </tr>
            `;
        });

        document.getElementById("transactions-list").innerHTML = html;
    }
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"
}

function refreshScreen() {
    fillTransactionsList();
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}