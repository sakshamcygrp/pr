function CheckLogin(){
    if(localStorage.getItem("result-token")==null)
    {
        location.replace("./index.html");
    }
}
function LoginUser()
{
    

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "EmailAddress":form1.email.value,
      "Password": form1.password.value
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://localhost:44365/api/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.token=='')
        {
            alert("OOPS! Wrong Email Or Password!")
        }  
        else
        {
            localStorage.setItem("result-token",result.token);
            location.replace("./first.html")

        }
        })
      .catch(error => alert("Some Error Occured!"));
}
function logout(){
    localStorage.removeItem("result-token");
    location.replace("./index.html");
}
function FetchData(){
    var newHeaders=new Headers();
    newHeaders.append("Authorization", "Bearer "+localStorage.getItem("result-token"));
    newHeaders.append("Content-Type", "application/json");
    fetch("https://localhost:44365/api/student",{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: newHeaders,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    }
    ).
    then(res => res.json())
     .then(data => { 
        let li=``;
    data.forEach(user => {
        li+=`<button type="button" class="btn btn-success" data-toggle="collapse" data-target="#${user.id}">${user.name}</button>
        <div id="${user.id}" class="collapse">
        <table>
        <th><td class="a">English</td><td class="a">Hindi</td><td class="a">Spanish</td><td class="a">Mathematics</td><td class="a">Science</td><td style="background-color:aqua;">Percentage</td></th>
        <tr><td></td><td class="a">${user.english}</td><td class="a">${user.hindi}</td><td class="a">${user.spanish}</td><td class="a">${user.mathematics}</td><td class="a">${user.science}</td><td style="background-color:aqua;">${eval((user.english+user.hindi+user.spanish+user.mathematics+user.science)/5)}%</td><td><button type="button" data-toggle="modal" data-target="#Modal2" class="btn btn-dark" onclick="edit(${user.id})">Edit</button>&nbsp;&nbsp;<button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td></tr>
        </table>
        </div><br/><br/>`;
     });
     document.getElementById("div1").innerHTML=li;
    });
}
function add(){
    var newHeaders=new Headers();
    newHeaders.append("Authorization", "Bearer "+localStorage.getItem("result-token"));
    newHeaders.append("Content-Type", "application/json");
    var name=document.getElementById("name");
    var eng=document.getElementById("eng");
    var hin=document.getElementById("hin");
    var spa=document.getElementById("spa");
    var mat=document.getElementById("mat");
    var sci=document.getElementById("sci");
    var User={
        "Name":name.value,
        "English":eng.value,
        "Hindi":hin.value,
        "Spanish":spa.value,
        "Mathematics":mat.value,
        "Science":sci.value
    }
    console.log(User);
fetch("https://localhost:44365/api/student", {
method: "POST",
mode: 'cors', // no-cors, *cors, same-origin
cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
credentials: 'same-origin', // include, *same-origin, omit
headers: newHeaders,
redirect: 'follow', // manual, *follow, error
referrerPolicy: 'no-referrer',
body: JSON.stringify(User)
})
.then(result =>{
    fetch("https://localhost:44365/api/student",{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    }
    ).
    then(res => res.json())
     .then(data => { 
        let li=``;
    data.forEach(user => {
        li+=`<button type="button" class="btn btn-success" data-toggle="collapse" data-target="#${user.id}">${user.name}</button>
        <div id="${user.id}" class="collapse">
        <table>
        <th><td class="a">English</td><td class="a">Hindi</td><td class="a">Spanish</td><td class="a">Mathematics</td><td class="a">Science</td><td style="background-color:aqua;">Percentage</td></th>
        <tr><td></td><td class="a">${user.english}</td><td class="a">${user.hindi}</td><td class="a">${user.spanish}</td><td class="a">${user.mathematics}</td><td class="a">${user.science}</td><td style="background-color:aqua;">${eval((user.english+user.hindi+user.spanish+user.mathematics+user.science)/5)}%</td><td><button type="button" data-toggle="modal" data-target="#Modal2" class="btn btn-dark" onclick="edit(${user.id})">Edit</button>&nbsp;&nbsp;<button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td></tr>
        </table>
        </div><br/><br/>`;
     });
     document.getElementById("div1").innerHTML=li;
    });
}
    );
}
function edit(id){
    var newHeaders=new Headers();
    newHeaders.append("Authorization", "Bearer "+localStorage.getItem("result-token"));
    newHeaders.append("Content-Type", "application/json");
    fetch("https://localhost:44365/api/student/"+id.toString(),{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: newHeaders,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    }
    ).then(res=> res.json())
    .then(data =>{
        data.forEach(user =>
            {
                document.getElementById("hide").innerHTML=user.id;
                document.getElementById("name2").value=user.name;
                document.getElementById("eng2").value=user.english;
                document.getElementById("hin2").value=user.hindi;
                document.getElementById("spa2").value=user.spanish;
                document.getElementById("mat2").value=user.mathematics;
                document.getElementById("sci2").value=user.science;
            });
    });
 }
 function updateUser(){
    var newHeaders=new Headers();
    newHeaders.append("Authorization", "Bearer "+localStorage.getItem("result-token"));
    newHeaders.append("Content-Type", "application/json");
    var name=document.getElementById("name2");
    var eng=document.getElementById("eng2");
    var hin=document.getElementById("hin2");
    var spa=document.getElementById("spa2");
    var mat=document.getElementById("mat2");
    var sci=document.getElementById("sci2");
    var id=document.getElementById("hide").innerHTML;
    var user={
       Name: name.value,
       English: eng.value,
       Hindi: hin.value,
       Spanish: spa.value,
       Mathematics: mat.value,
       Science: sci.value
    }
    fetch("https://localhost:44365/api/student/"+id.toString(), {
       method: "PUT",
       mode: "cors", // no-cors, *cors, same-origin
       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       credentials: "same-origin", // include, *same-origin, omit
       headers:newHeaders,
       redirect: "follow", // manual, *follow, error
       referrerPolicy: "no-referrer",
       body: JSON.stringify(user),
     })
     .then(result =>{
        fetch("https://localhost:44365/api/student",{
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer'
        }
        ).
        then(res => res.json())
         .then(data => { 
            let li=``;
        data.forEach(user => {
            li+=`<button type="button" class="btn btn-success" data-toggle="collapse" data-target="#${user.id}">${user.name}</button>
            <div id="${user.id}" class="collapse">
            <table>
            <th><td class="a">English</td><td class="a">Hindi</td><td class="a">Spanish</td><td class="a">Mathematics</td><td class="a">Science</td><td style="background-color:aqua;">Percentage</td></th>
            <tr><td></td><td class="a">${user.english}</td><td class="a">${user.hindi}</td><td class="a">${user.spanish}</td><td class="a">${user.mathematics}</td><td class="a">${user.science}</td><td style="background-color:aqua;">${eval((user.english+user.hindi+user.spanish+user.mathematics+user.science)/5)}%</td><td><button type="button" data-toggle="modal" data-target="#Modal2" class="btn btn-dark" onclick="edit(${user.id})">Edit</button>&nbsp;&nbsp;<button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td></tr>
            </table>
            </div><br/><br/>`;
         });
         document.getElementById("div1").innerHTML=li;
        });
    }
    );
}
function deleteUser(id){
    var newHeaders=new Headers();
    newHeaders.append("Authorization", "Bearer "+localStorage.getItem("result-token"));
    newHeaders.append("Content-Type", "application/json");
    console.log(id);
    fetch("https://localhost:44365/api/student/"+id.toString(), {
        method: "DELETE",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: newHeaders,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        })
        .then(result =>{
            fetch("https://localhost:44365/api/student",{
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'
            }
            ).
            then(res => res.json())
             .then(data => { 
                let li=``;
            data.forEach(user => {
                li+=`<button type="button" class="btn btn-success" data-toggle="collapse" data-target="#${user.id}">${user.name}</button>
                <div id="${user.id}" class="collapse">
                <table>
                <th><td class="a">English</td><td class="a">Hindi</td><td class="a">Spanish</td><td class="a">Mathematics</td><td class="a">Science</td><td style="background-color:aqua;">Percentage</td></th>
                <tr><td></td><td class="a">${user.english}</td><td class="a">${user.hindi}</td><td class="a">${user.spanish}</td><td class="a">${user.mathematics}</td><td class="a">${user.science}</td><td style="background-color:aqua;">${eval((user.english+user.hindi+user.spanish+user.mathematics+user.science)/5)}%</td><td><button type="button" data-toggle="modal" data-target="#Modal2" class="btn btn-dark" onclick="edit(${user.id})">Edit</button>&nbsp;&nbsp;<button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td></tr>
                </table>
                </div><br/><br/>`;
             });
             document.getElementById("div1").innerHTML=li;
            });
        }
            );
}