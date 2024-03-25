var i = 1;
var j = 0;
counter = 1;
function clearInput(){
    document.getElementById("nim").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("umur").value = "";
}

function simpanData() {
var nim = document.getElementById("nim").value;
var nama = document.getElementById("nama").value;
var alamat = document.getElementById("alamat").value;
var umur = document.getElementById("umur").value;
if (nim && nama && alamat && umur != "") {
    localStorage.setItem("nim"+i, nim);
    localStorage.setItem("nama"+i, nama);
    localStorage.setItem("alamat"+i, alamat);
    localStorage.setItem("umur"+i, umur);
    i++;
    counter++;
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil menambahkan " + nama,
        showConfirmButton: false,
        timer: 1500
      });
    tampilkanData();
} else {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: "isi yang lengkap!",
        iconColor: "#ffd453",
        showConfirmButton: false,
        timer: 1500
      });
}
}

function tampilkanData() {
var aacontainer = document.getElementById("dataTable");
aacontainer.innerHTML = "";

var nextContainer = document.getElementById("next");
nextContainer.innerHTML = "";

var list = document.getElementById("jumlah").value;
var limit = 0;
var curr = 0;
var numero = 0;
if (list == parseInt(5) || list == parseInt(10) || list == parseInt(15) || list == parseInt(20) || list == parseInt(25)) {
    limit = parseInt(list);
    curr = parseInt(limit);
    if (limit < i){
        next = document.createElement("button");
        next.textContent = "Next";
        next.id = "nextButton";
        next.classList.add("btn","btn-primary");
        next.style.display = "inline-block";
        nextContainer.appendChild(next);

        next.addEventListener("click", function(){
            numero = numero + limit;
            nextPage(numero,curr,i,limit);
        });
    }
    document.getElementById("listing").innerHTML = "Showing 1 to " + limit + " data of " + (counter-1) + " Entries";
} else {
    limit = i;
    document.getElementById("listing").innerHTML = "Showing " + (counter-1) + " data";
}

for (var j=1; j <= limit; j++) {
    var savedNIM = localStorage.getItem("nim" + j);
    var savedNAMA = localStorage.getItem("nama" + j);
    var savedALAMAT = localStorage.getItem("alamat" + j);
    var savedUMUR = localStorage.getItem("umur" + j);
    if (savedNIM && savedNAMA && savedALAMAT && savedUMUR) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + savedNIM + "</td>" + 
                        "<td>" + savedNAMA + "</td>" + 
                        "<td>" + savedALAMAT + "</td>" + 
                        "<td>" + savedUMUR + "</td>"+
                        "<td>" + 
                        "<button class='btn btn-warning' onclick='openEditModal(" + j + ")'>Edit</button>" + 
                        "&nbsp;" + 
                        "<button class='btn btn-danger' onclick='deleteData(" + j + ")'>Delete</button>" + 
                        "</td>";
        aacontainer.appendChild(row);
    }
    
}
}

function openEditModal(index) {
    var savedNIM = localStorage.getItem("nim" + index);
    var savedNAMA = localStorage.getItem("nama" + index);
    var savedALAMAT = localStorage.getItem("alamat" + index);
    var savedUMUR = localStorage.getItem("umur" + index);

    $('#exampleModal').modal('show');
    $('#exampleModal').find('#nimUpdate').val(savedNIM);
    $('#exampleModal').find('#namaUpdate').val(savedNAMA);
    $('#exampleModal').find('#umurUpdate').val(savedUMUR);
    $('#exampleModal').find('#alamatUpdate').val(savedALAMAT);
    $('#exampleModal').find('#hidden').val(index);
}

function updateData() {
    var nim = document.getElementById("nimUpdate").value;
    var nama = document.getElementById("namaUpdate").value;
    var alamat = document.getElementById("alamatUpdate").value;
    var umur = document.getElementById("umurUpdate").value;
    var index = document.getElementById("hidden").value;
    if (nim && nama && alamat && umur != "") {
        localStorage.setItem("nim"+index, nim);
        localStorage.setItem("nama"+index, nama);
        localStorage.setItem("alamat"+index, alamat);
        localStorage.setItem("umur"+index, umur);
        Swal.fire({
            position: "top-end",
            icon: "success",
            iconColor: "cyan",
            title: "Data berhasil diubah!",
            showConfirmButton: false,
            timer: 1500
          });
        tampilkanData();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            iconColor: '#ffd453',
            title: 'Isi yang lengkap!',
            showConfirmButton: false,
            timer: 1500
        });
        
    }
    }


function deleteData(index){
    counter--;
    var temp = localStorage.getItem("nama"+index);
    var a = localStorage.removeItem("nim"+index);
    var b = localStorage.removeItem("nama"+index);
    var c = localStorage.removeItem("alamat"+index);
    var d = localStorage.removeItem("umur"+index);
    
    if (a !== null && b !== null && c !== null && d !== null) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            iconColor: "red",
            title: "Berhasil menghapus " + temp,
            showConfirmButton: false,
            timer: 1500
          });
    tampilkanData();
} else {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Gagal menghapus data",
        showConfirmButton: false,
        timer: 1500
      });
}

}

function prevPage(numero,curr,i,nextCurr,limit){
var aacontainer = document.getElementById("dataTable");
aacontainer.innerHTML = "";

var prevCurr = nextCurr;
var numero = parseInt(prevCurr) - parseInt(limit);
console.log(parseInt(numero));
console.log(parseInt(prevCurr));
for (var j = (parseInt(numero) + 1); j <= prevCurr; j++) {
    var savedNIM = localStorage.getItem("nim" + j);
    var savedNAMA = localStorage.getItem("nama" + j);
    var savedALAMAT = localStorage.getItem("alamat" + j);
    var savedUMUR = localStorage.getItem("umur" + j);
    if (savedNIM && savedNAMA && savedALAMAT && savedUMUR) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + savedNIM + "</td>" + 
                        "<td>" + savedNAMA + "</td>" + 
                        "<td>" + savedALAMAT + "</td>" + 
                        "<td>" + savedUMUR + "</td>"+
                        "<td>" + 
                        "<button class='btn btn-warning' onclick='openEditModal(" + j + ")'>Edit</button>" + 
                        "&nbsp;" + 
                        "<button class='btn btn-danger' onclick='deleteData(" + j + ")'>Delete</button>" + 
                        "</td>";
        aacontainer.appendChild(row);
    }
}
}

function nextPage(numero,curr,i,limit){
var aacontainer = document.getElementById("dataTable");
aacontainer.innerHTML = "";

var prevContainer = document.getElementById("prev");
prevContainer.innerHTML = "";

var nextCurr = parseInt(numero) + curr;
console.log("nextCurr:", parseInt(nextCurr));
console.log("numero:", parseInt(numero));
for (var j = (parseInt(numero) + 1); j <= nextCurr; j++) {
    var savedNIM = localStorage.getItem("nim" + j);
    var savedNAMA = localStorage.getItem("nama" + j);
    var savedALAMAT = localStorage.getItem("alamat" + j);
    var savedUMUR = localStorage.getItem("umur" + j);
    if (savedNIM && savedNAMA && savedALAMAT && savedUMUR) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + savedNIM + "</td>" + 
                        "<td>" + savedNAMA + "</td>" + 
                        "<td>" + savedALAMAT + "</td>" + 
                        "<td>" + savedUMUR + "</td>"+
                        "<td>" + 
                        "<button class='btn btn-warning' onclick='openEditModal(" + j + ")'>Edit</button>" + 
                        "&nbsp;" + 
                        "<button class='btn btn-danger' onclick='deleteData(" + j + ")'>Delete</button>" + 
                        "</td>";
        aacontainer.appendChild(row);
    }
}
prev = document.createElement("button");
        prev.textContent = "Back";
        prev.id = "prevButton";
        prev.classList.add("btn","btn-primary");
        prev.style.display = "inline";
        prevContainer.appendChild(prev);

        prev.addEventListener("click", function(){
            numero = nextCurr - limit;
            nextCurr = numero;
            prevPage(numero,curr,i,nextCurr,limit);
        });
if(i <= j) {
    document.getElementById("nextButton").removeEventListener("click",nextPage);
    document.getElementById("nextButton").style.display = "none";
}
}

window.onload = function() {
localStorage.clear();
tampilkanData();
};