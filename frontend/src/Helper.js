export function NewOffer (){
    const fname = JSON.parse(sessionStorage.getItem('user')).firstName;
    const lname = JSON.parse(sessionStorage.getItem('user')).lastName;
    const pickuplng = document.getElementById('pickuplng').value;
    const pickuplat = document.getElementById('pickuplat').value;
    const dropofflng = document.getElementById('destinationlng').value;
    const dropofflat = document.getElementById('destinationlat').value;
    const date = document.getElementById('pickupDate').value;
    const time = document.getElementById('pickupTime').value;
    const selectVehicle = document.getElementById('vehicle');
    const vehicle = selectVehicle.value;
    console.log(vehicle);

    let offer = {DriverFname: fname, DriverLname: lname, PickUpLng: pickuplng, PickUpLat:  pickuplat, DropOffLng:dropofflng, DropOffLat: dropofflat, RideDate: date, RideTime: time, Vehicle: vehicle}
    fetch("http://localhost:5000/offer",{
        method: 'POST',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(offer)
    }).then(response => console.log(response))
    .catch(err => console.log(err));
    
    //console.log( fname + ","+lname + "," + pickuplng + "," + " " + pickuplat + " " +  dropofflng + " " + dropofflat + ","  +date + "," + seats);
    
}
// find rides on a particular day
export function FindRoutes(){
    const pickuplng = document.getElementById('pickuplng').value;
    const pickuplat = document.getElementById('pickuplat').value;
    const dropofflng = document.getElementById('destinationlng').value;
    const dropofflat = document.getElementById('destinationlat').value;
    const date = document.getElementById('pickupDate').value;
    const param = new URLSearchParams({RideDate: date}).toString();
    let request = {PickUpLng: pickuplng, PickUpLat:  pickuplat, DropOffLng:dropofflng, DropOffLat: dropofflat, RideDate: date}
    fetch(`http://localhost:5000/request?${param}`,{
        method: 'GET',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include'
    })
    .then(response => response.json())
    .then((data)=>{
    // make result display area
    /************************************************************/
    /**/let container = document.getElementById('ridesResult');/**/
        let headerDiv = document.createElement('div');
        headerDiv.id= 'header';
        headerDiv.innerHTML= 'Available Rides';
        container.appendChild(headerDiv);
        const rideElements = data.map(ride => {
            const row = document.createElement('div');
            row.className = 'resultRow';
            const reserveBtn = document.createElement('button');
            reserveBtn.id = ride._id;
            reserveBtn.innerHTML="Reserve";
            reserveBtn.className = 'reserveBtnClass';
            const rowSpan = document.createElement('span');
            rowSpan.className = "rowSpan";
            rowSpan.innerHTML = `${ride.DriverFname + " "+ ride.RideDate + " " + ride.RideTime}`;
            row.appendChild(rowSpan);
            row.appendChild(reserveBtn);
            container.append(row);
            
        })
    }
)
}

//Authenticate user and redirect to homepage
 export function Login(){
    const user = document.getElementById('username').value;
    const pw= document.getElementById('password').value;

    let credential = {Username: user, Password:pw}
    fetch('http://localhost:5000/login',{
        method: 'POST',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(credential)
    }).then(response =>response.json())
    .then(data =>{ console.log(data)
        if(data.message){
            let container = document.getElementById('container');
            let div = document.createElement('div')
             div.innerHTML = data.message;
             div.classList.add('error');
            container.prepend(div)
        }
        if(data.redirectUrl){
            const profile = {
                firstName: data.User.Firstname,
                lastName: data.User.Lastname,
                id: data.User._id
            }
            sessionStorage.setItem('user', JSON.stringify(profile));
            window.location.href = data.redirectUrl;
        }
    })
    .catch(err => console.log(err));

 }
 //sign up new user
 export function SignUp(){
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const user = document.getElementById('username').value;
    const pw= document.getElementById('password').value;

    let info = {Firstname: fname, Lastname: lname, Username: user, Password:pw}
    fetch("http://localhost:5000/register",{
        method: 'POST',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(info)
    }).then(response =>response.json())
    .then(data =>{
        if(data.message){
            let container = document.getElementById('container');
            let div = document.createElement('div')
             div.innerHTML = data.message;
             div.classList.add('error');
            container.prepend(div)
        }
        if(data.success){
            let container = document.getElementById('container');
            let div = document.createElement('div')
             div.innerHTML = data.success;
             div.classList.add('success');
            container.prepend(div)
        }
        if(data.redirectUrl){
            setTimeout(()=>{window.location.href = data.redirectUrl},6000);
        }
    })
    .catch(err => console.log(err));

 }

//add new driver
export function NewDriver(){
    const fname = document.getElementById('fname').innerHTML;
    const lname = document.getElementById('lname').innerHTML;
    const userID = JSON.parse(sessionStorage.getItem('user')).id;
    let info = {Firstname: fname, Lastname: lname, UserID: userID}
    fetch('http://localhost:5000/driver',{
        method: 'POST',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(info)
    }).then(response =>response.json())
    .then(data =>{
        if(data.message){
            let container = document.getElementById('container');
            let div = document.createElement('div')
            div.innerHTML = data.message;
            div.classList.add('error');
            container.prepend(div)
        }
        if(data.success){
            let container = document.getElementById('container');
            let div = document.createElement('div')
             div.innerHTML = fname + " " +data.success;
             div.classList.add('success');
            container.prepend(div)
        }

       setTimeout(()=>{window.location.href = data.redirectUrl}, 6000);
    })
    .catch(err => console.log(err));

 }

 //delete driver

 export function DeleteDriver(){
    const fname = document.getElementById('fname').innerHTML;
    const lname = document.getElementById('lname').innerHTML;
    const userID = JSON.parse(sessionStorage.getItem('user')).id;
    let info = {Firstname: fname, Lastname: lname, UserID: userID}
    fetch('http://localhost:5000/driver',{
        method: 'DELETE',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(info)
    }).then(response =>response.json())
    .then(data =>{
        if(data.message){
            let container = document.getElementById('container');
            let div = document.createElement('div')
            div.innerHTML = data.message;
            div.classList.add('error');
            container.prepend(div)
        }
        if(data.success){
            let container = document.getElementById('container');
            let div = document.createElement('div')
             div.innerHTML = fname + " " +data.success;
             div.classList.add('success');
            container.prepend(div)
        }

       setTimeout(()=>{window.location.href = data.redirectUrl}, 6000);
    })
    .catch(err => console.log(err));

 }

 //check if already a driver 
 export function DriverCheck(){
    const userID = JSON.parse(sessionStorage.getItem('user')).id;
    const param = new URLSearchParams({UserID: userID}).toString();
    fetch(`http://localhost:5000/driver/verification?${param}`,{
        method: 'GET',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include',
    }).then(response =>response.json())
    .then(data =>{
        if(data.message){
            let container = document.getElementById('container');
            let div = document.createElement('div')
            div.innerHTML = data.message;
            div.classList.add('error');
            container.prepend(div)
        }
        if(data.success){
        if(document.getElementById('carDiv')){
            document.getElementById('carDiv').remove();
        }
           let container = document.getElementById('container');
           let carDiv = document.createElement('div')
           carDiv.id = 'carDiv';
           let make = document.createElement('input')
           make.placeholder="Make";
           make.id ='make'
           make.className="newForm";
           let model = document.createElement('input');
            model.placeholder="Model";
            model.id ='model'
           model.className="newForm";
           let color = document.createElement('input');
            color.placeholder="color";
            color.id ='color'
           color.className="newForm";
           let year = document.createElement('input');
            year.placeholder="year - 2016 or newer";
            year.id ='year';
            year.type ='number';
            year.min = 2016;
            year.max = 2026
           year.className="newForm";
           let seats = document.createElement('input');
           seats.id = 'seats';
           seats.type = 'number';
           seats.min = 2;
           seats.placeholder= 'number of seats'
           seats.className="newForm";
           let save = document.createElement('button');
           save.className="carSaveBtn";
           save.textContent = 'Save Car';
           save.addEventListener('click', ()=>SaveCar())
           carDiv.appendChild(make);
           carDiv.appendChild(model);
           carDiv.appendChild(color);
           carDiv.appendChild(year);
           carDiv.appendChild(seats);
           carDiv.appendChild(save);
           container.appendChild(carDiv);

        }
    })
    .catch(err => console.log(err));

 }

//Save Car
export function SaveCar(){
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const color= document.getElementById('color').value;
    const year = document.getElementById('year').value;
    const seats= document.getElementById('seats').value;
    const userID = JSON.parse(sessionStorage.getItem('user')).id;
    let info = {Make: make, Model: model, Color: color, Year: year, Seats: seats, UserID: userID}
    fetch('http://localhost:5000/vehicle',{
        method: 'POST',
        headers:
        {'Accept':'application/json', 'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(info)
    }).then(response =>response.json())
    .then(data =>{
        if(data.message){
            let container = document.getElementById('container');
            let div = document.createElement('div')
            div.innerHTML = data.message;
            div.classList.add('error');
            container.prepend(div)
        }
        if(data.success){
            let container = document.getElementById('container');
            let div = document.createElement('div')
             div.innerHTML = year + " " + model + " " + make + " " +data.success;
             div.classList.add('success');
            container.prepend(div)
        }
    })
    .catch(err => console.log(err));

 }
 //return list of vehicles
 export function ListVehicles(){
     const userID = JSON.parse(sessionStorage.getItem('user')).id;
     const param = new URLSearchParams({UserID: userID}).toString();
     fetch(`http://localhost:5000/vehicle/list?${param}`,{
         method: 'GET',
         headers:
         {'Accept':'application/json', 'Content-Type':'application/json'},
         credentials: 'include',
        }).then(response =>response.json())
        .then(data =>{
            if(data.success){
                window.redirectUrl= '/offer';
                const vehArr = data.Vehicles;
                const selectElement= document.getElementById('vehicle');
                const options = vehArr.map(veh => (
                {vehicle: veh.Year + " " + veh.Make + " " + veh.Model}
            ))
            sessionStorage.removeItem('vehicles');
            sessionStorage.setItem('vehicles', JSON.stringify(options));
           const vehOptions = JSON.parse(sessionStorage.getItem('vehicles') || "[]"); 
           const names = vehOptions.map(v => v.vehicle);
           names.forEach(v=>{
            let optionElement = document.createElement('option');
            optionElement.textContent = v;
            optionElement.value= v;
          selectElement.appendChild(optionElement)
        })
    }
    if(data.message){
        let container = document.getElementById('container');
        let div = document.createElement('div')
        div.innerHTML = data.message;
        div.classList.add('error');
        container.prepend(div)
    }
})
.catch(err => console.log(err));
}

//retrieve currentUSer
