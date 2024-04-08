const containerBody = `
<div id="containerBody">
    <p>Enter your info below to register: </p>
    <form id="registrationForm" action="http://localhost:7000/register" method="post">
        <div>
            <label for="id">ID</label>
            <input type="text" id="idInput" name="id">
        </div>
        <div>
            <label for="name">Name</label>
            <input type="text" id="nameInput" name="name">
        </div>
        <div>
            <label for="address">Address</label>
            <input type="text" id="addressInput" name="address">
        </div>
        <div>
            <label for="status">Status</label>
            <input type="text" id="statusInput" name="status">
        </div>
        <button type="submit" id="registerBtn">Register</button>
    </form>
</div>
<div id="confirmationBody">

</div>    
`

$(document).ready(() => {
    $('#container').html(containerBody);

    $('#registrationForm').submit(function(event){
        event.preventDefault();

        $('#containerBody').hide();

        // post data in form
        // fetch('http://localhost:7000/register', {
        fetch('https://sport-club-event-registration-backend.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: $('#idInput').val(),
                name: $('#nameInput').val(),
                address: $('#addressInput').val(),
                status: $('#statusInput').val()
            })
        })
        .then(response => response.text())
        .then(() => {
            // get data after posting
            // fetch('http://localhost:7000/register', {
            fetch('https://sport-club-event-registration-backend.onrender.com/register', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data[0].id);
                showData(data);
            })
        } 
        )

        // function to fill confirmationBody div with data from get request
        const showData = (data) => {
            let index = data.length - 1; // add index because response data is an array
            let fee = 0;
            if(data[index].status === 'student')
            {
                fee = 10;
            }
            else if(data[index].status === 'staff')
            {
                fee = 50;
            }
            else if(data[index].status === 'volunteer')
            {
                fee = 0;
            }
            $('#confirmationBody').html(`
                <p>Confirmed!</p>
                <p>ID: ${data[index].id}</p>
                <p>Name: ${data[index].name}</p>
                <p>Address: ${data[index].address}</p>
                <p>Status: ${data[index].status}</p>
                <p>Fee: ${fee}</p>
            `);
            $('#container').append(confirmationDiv);
        }
    })
})