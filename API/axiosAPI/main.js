
const msgTeste = {
    id: "1ab04872-4c0f-433f-93ae-72326bf73529",
    nome: "Paulo",
    numero: "+5561987876564"
}


const url = 'http://localhost:3000/contacts'


function getContact() {
    axios.get(url)
        .then(response => {
            const data = response
            renderResults.textContent = JSON.stringify(data)
        }

        ).catch(error => console.log(error))
}
getContact()

function addContact() {
    axios.post(url, msgTeste).then(response => {
        alert(JSON.stringify(response.data))
    }).catch(error => console.log(error))
}
addContact()