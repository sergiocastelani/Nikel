const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {
    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout);

document.getElementById("transactions-button").addEventListener("click", function(evt) {
    window.location.href = "transactions.html";
});

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

function fillTransactionList(transactionType) {
    const filteredTransactions = data.transactions.filter((item) => item.type === transactionType);

    if (filteredTransactions.length > 0) {
        let html = ``;
        let limit = Math.min( 5, filteredTransactions.length);

        for (let index = 0; index < limit; index++) {
            html += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${filteredTransactions[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${filteredTransactions[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${filteredTransactions[index].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        const tagId = transactionType === 1 ? "cash-in-list" : "cash-out-list";
        document.getElementById(tagId).innerHTML = html;
    }
}

function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === 1){
            total += item.value;
        }
        else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"
}

function refreshScreen() {
    fillTransactionList(1);
    fillTransactionList(2);
    getTotal();
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}