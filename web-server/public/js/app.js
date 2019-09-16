// const webForm = document.querySelector('form')
// const search = document.querySelector('input')
// webForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const location = search.value
//     console.log(location);
    
// })


const button = document.querySelector('#searchLocation')
const input = document.querySelector('#inputLocation')
const answer = document.querySelector('#forecast')
const loading = 'Loading...';
button.onclick = (event) => {
    event.preventDefault()
    if (input.value) {
        const address = input.value
        const url = `http://localhost:3000/weather?address=${address}`;
        const img = document.createElement('img')
        img.src = "../img/loagind.gif";
        answer.appendChild(img)
        fetch(url).then((response) => {
            response.json().then((data) => {
            if (data.error) {
                answer.innerHTML = ""
                answer.innerHTML = data.error
            }else {
                const {location, probality, summary,temperature} = data

                answer.innerHTML = ""
                answer.innerHTML = `<br>Location: ${location}<br>
                                    Probality to rain: ${probality}%<br>
                                    Summary: ${summary}<br>
                                    Temperature: ${temperature}`
            }

        })
    })
    }else{
        answer.innerHTML = ""
        answer.innerHTML = "Put a location"
    }
}







//calling a fetch 
// const address = 'brasil'
// const url = `http://localhost:3000/weather?address=${address}`;
// fetch(url).then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         }else {
//             console.log(data);
//         }

//     })
// })