const form = document.getElementById("form");

const searchElement = document.getElementById("search-data")

const tableBody = document.getElementById("table-body");
let id = 0;

let students = [];


function search(event) {
    if (event.keyCode === 13) {
        const value = event.target.value;



        if (value != null && value != "") {
            tableBody.innerHTML = ``;
            for (let i = 0; i < students.length; i++) {
                let student = students[i];

                if (student != null && (student.name == value || student.email == value) || student.degree == value) {

                    addToTable(student);
                }

            }
        }
        else {
            tableBody.innerHTML = ``;

            for (let i = 0; i < students.length; i++) {
                let student = students[i];
                addToTable(student);
            }

        }

    }
}


function editData(id) {
    let element = document.getElementById("table-row" + id);
    let obj = findObj(id);

    const formContainer = document.getElementById("form-container");
    const addForm = document.getElementById("form");
    addForm.style.display = "none";
    const editForm = document.createElement("form")
    editForm.innerHTML = `<form action="" id="editForm">
                            <input placeholder="Name" required value="${obj.name}" type="text" id="name" name="name">
                            <input placeholder="Email" value="${obj.email}"  type="email" name="email">
                            <input placeholder="grade" value="${obj.grade}"  type="text" name="grade">
                            <input placeholder="Age" value="${obj.age}"  type="text" name="age">
                            <input placeholder="Degree" value="${obj.degree}"  type="text" name="degree">
                            <br>
                            <button >Edit Student</button>
                        </form>`;

    editForm.addEventListener("submit", editElement);
    formContainer.appendChild(editForm);

    function editElement(event) {


        event.preventDefault();
        let formElements = event.target;
        let name = formElements["name"].value;
        let email = formElements["email"].value;
        let grade = formElements["grade"].value;
        let age = formElements["age"].value;
        let degree = formElements["degree"].value;
        let obj = {
            id: id,
            name: name,
            email: email,
            grade: grade,
            age: age,
            degree: degree
        }

        tableBody.innerHTML = ``;

        for (let i = 0; i < students.length; i++) {
            if (students[i] != null) {
                let student = students[i];
                if (student.id == id) {
                    student = obj;
                }
                const tableRow = document.createElement("tr");
                tableRow.id = "table-row" + student.id;


                tableRow.innerHTML = `<td class="id">
                                <span>${student.id}</span>
                            </td>
                            <td class="name">
                                <span>${student.name}</span>
                            </td>
                            <td class="email">
                                <span>${student.email}</span>
                            </td>
                            <td class="grade">
                                <span>${student.grade}</span>
                            </td>
                            <td class="age">
                                <span>${student.age}</span>
                            </td>
                            <td class="options">
    
                                <span>${student.degree}</span>
                                <div class="edit-delete">
                                    <img onclick="editData(${id})" src="./resources/edit 1.png" alt="edit" id="edit">
                                    <img onclick="deleteData(${id})" src="./resources/trash-2 1.png" alt="delete" id="delete">
                                </div>
    
                            </td>`

                tableBody.appendChild(tableRow)
                // console.log(tableRow);
            }

        }



        formContainer.removeChild(editForm);
        addForm.style.display = "block";

    }


}
function deleteData(id) {
    let element = document.getElementById("table-row" + id);
    element.innerHTML = ``;

    for (let i = 0; i < students.length; i++) {
        if (students[i] != null && students[i].id == id) delete students[i];
    }
}

function findObj(id) {
    for (let i = 0; i < students.length; i++) {
        if (students[i] != null && students[i].id == id) return students[i];
    }
}

function addToTable(obj) {
    let { id, name, email, grade, age, degree } = obj;
    let tableRow = document.createElement("tr");
    tableRow.id = "table-row" + id;
    tableRow.innerHTML = `<td class="id">
                            <span>${id}</span>
                        </td>
                        <td class="name">
                            <span>${name}</span>
                        </td>
                        <td class="email">
                            <span>${email}</span>
                        </td>
                        <td class="grade">
                            <span>${grade}</span>
                        </td>
                        <td class="age">
                            <span>${age}</span>
                        </td>
                        <td class="options">

                            <span>${degree}</span>
                            <div class="edit-delete">
                                <img onclick="editData(${id})" src="./resources/edit 1.png" alt="edit" id="edit">
                                <img onclick="deleteData(${id})" src="./resources/trash-2 1.png" alt="delete" id="delete">
                            </div>

                        </td>`

    tableBody.appendChild(tableRow);
}

function addStudent(event) {

    id += 1;
    event.preventDefault();
    let formElements = event.target;
    let name = formElements["name"].value;
    let email = formElements["email"].value;
    let grade = formElements["grade"].value;
    let age = formElements["age"].value;
    let degree = formElements["degree"].value;
    let obj = {
        id: id,
        name: name,
        email: email,
        grade: grade,
        age: age,
        degree: degree
    }
    name = "";
    students.push(obj);
    form.reset();
    addToTable(obj);

}




searchElement.addEventListener("keydown", search);

form.addEventListener("submit", addStudent);
form.removeEventListener("click", addStudent);
// console.log(form);