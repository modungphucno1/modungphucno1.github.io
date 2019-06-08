let selectedRow = null;

let tblCategory = [
    {id: 1, category : "LIFESTYLE", description : "Something about life",createAt:"",updateAt:""},
{id: 2, category : "TECHNOLOGY", description : "Something about technology",createAt:"",updateAt:""},
{id: 3, category : "FASHION", description : "Something about fashion",createAt:"",updateAt:""}
];



function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();
        if (selectedRow == null){
           addToCategory(formData);

        }
        else{
            updateRecord(formData);
            alert("Hi");
            resetForm();
        }

    }
}


function readFormData() {
	let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    let formData = {};
    let len = tblCategory.length;
	formData["id"] = len + 1;
    formData["category"] = document.getElementById("category").value;
    formData["description"] = document.getElementById("description").value;
	formData["creatAt"] = dateTime ;
	formData["updateAt"] = "";
	return formData;
}

function addToCategory(data){
    let data_selialized = JSON.stringify(data);
    localStorage.setItem("category",data_selialized);

}

function displayCategory(){
    let table = document.getElementById("tblCategory").getElementsByTagName('tbody')[0];
    for(let i = 0; i < tblCategory.length; i++){
        let newRow = table.insertRow(table.length);
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = tblCategory[i].id;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = tblCategory[i].category;
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = tblCategory[i].description;
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = tblCategory[i].creatAt;
        let cell5 = newRow.insertCell(4);
        cell5.innerHTML = tblCategory[i].updateAt;
        let cell6 = newRow.insertCell(5);
        cell6.innerHTML = `<a href="#"><i class="fa fa-pencil" style="color: #29b6f6;"  onclick="onEdit(this)"></i></a>
                       &nbsp;<a href="#" > <i class="fa fa-trash-o" style="color: #f05050" onclick="onDelete(this)"></i></a>`;
    }
}
function insertNewRecord(data) {
    var table = document.getElementById("tblCategory").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = tblCategory.id
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = tblCategory.category;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = tblCategory.description;
	cell4 = newRow.insertCell(3);
	cell4.innerHTML = tblCategory.creatAt;
	cell5 = newRow.insertCell(4);
	cell5.innerHTML = tblCategory.updateAt;
	cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("category").value = selectedRow.cells[1].innerHTML;
    document.getElementById("description").value = selectedRow.cells[2].innerHTML;
	
}
function updateRecord(formData) {
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
    selectedRow.cells[1].innerHTML = formData.category;
    selectedRow.cells[2].innerHTML = formData.description;
    selectedRow.cells[4].innerHTML = document.write(dateTime);
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tblCategory").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    
    return isValid;
}