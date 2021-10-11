
let students = [
	{
		nim: '1000002201',name: 'Thomas Marchel',gender: 'Male',faculty: 'Fakultas Ilmu Komputer',program_study: 'Sistem informasi',
	},
	{
		nim: '1010003302',name: 'Refrent Thomas',gender: 'Male',faculty: 'Fakultas Ekonomi dan Bisnis',program_study: 'Akutansi',
	},
	{
		nim: '1309002233',name: 'Cantika Can',gender: 'Female',faculty: 'Fakultas Ilmu Komputer',program_study: 'Sistem Informasi',
	},
	{
		nim: '1050224523',name: 'Fren Achel',gender: 'Male',faculty: 'Fakultas keguruan dan Pendidikan',program_study: 'Pendidikan Agama',
	},
]
/*function faculties() {
    const formFilter = document.querySelector('#formFilter').listFaculty.value;
    if (formFilter == 'Pascasarjana') {
        document.querySelector('#listPrody').innerHTML = "<option value='Magister Manajemen'>Magister Manajemen</option>";
    }
    else if (formFilter == 'FFIL') {
        document.querySelector('#listPrody').innerHTML = "<option value='Filsafat Agama Kristen Advent'>Filsafat Agama Kristen Advent</option>";
    }
    else if (formFilter == 'FKIP') {
        document.querySelector('#listPrody').innerHTML = "<option value='Pendidikan Agama'>Pendidikan Agama</option><option value='Pendidikan Bahasa Inggris'>Pendidikan Bahasa Inggirs</option><option value='Ekonomi Koperasi'>Ekonomi Koperasi</option><option value='Pendidikan Guru Luar Sekolah'>Pendidikan Guru Luar Sekolah</option>";
    }
    else if (formFilter == 'FEB') {
        document.querySelector('#listPrody').innerHTML = "<option value='Akuntansi'>Akuntansi</option><option value='Manajemen'>Manajemen</option>";
    }
    else if (formFilter == 'FAPERTA') {
        document.querySelector('#listPrody').innerHTML = "<option value='Agronomi'>Agronomi</option>";
    }
    else if (formFilter == 'FIK') {
        document.querySelector('#listPrody').innerHTML = "<option value='Sistem Informasi'>Sistem Informasi</option><option value='Teknik Informatika'>Teknik Informatika</option>";
    }
    else if (formFilter == 'FKEP') {
        document.querySelector('#listPrody').innerHTML = "<option value='Keperawatan'>Keperawatan</option><option value='Profesi Ners'>Profesi Ners</option>";
    }
    else if (formFilter == 'ASMIK') {
        document.querySelector('#listPrody').innerHTML = "<option value='Sekretari'>Sekretari</option>";
    }
}
*/const faculties = [
	{
		name:"Fakultas Keguruan dan Ilmu Pendidikan",
		sub: [
			'Pendidikan Agama','Pendidikan Bahasa Inggris','Pendidikan Ekonomi','Pendidikan Luar Sekolah']
	},
	{
		name:"Fakultas Ekonomi dan Bisnis",
		sub: ['Akuntansi', 'Manejemen']
	},
	{
		name:"Fakultas Ilmu Komputer",
		sub: ['Informatika', 'Sistem Informasi']
	},
	{
		name:"Pascasarjana",
		sub: ['Magister Manajemen','Magister Teologi']
	},
	{
		name:"Fakultas Filsafat",
		sub: ['Ilmu Filsafat']
	},
	{
		name:"Fakultas Pertanian",
		sub: ['Agroteknologi']
	},
	{
		name:"Fakultas Keperawatan",
		sub: ['Profesi Ners', 'Keperawatan']
	},
	{
		name:"ASMI Klabat",
		sub: ['Sekretari D-III']
	},
]
// show hide form
const show_hide_form = document.querySelector("#show-hide-button");
const form = document.querySelector("form");
show_hide_form.addEventListener("click", function(){
	if(form.style.display === "none"){
		form.style.display = "block";
		show_hide_form.textContent = "Hide Form Add New Student";}
	else{
		form.style.display = "none";
		show_hide_form.textContent = "Show Form Add New Student";}
});
//end show hide form


//faculties and program study
const faculty_option = document.querySelector("#faculty-form");
for(faculty of faculties){
	let tag = document.createElement('option');
	let text = document.createTextNode(faculty.name);
	tag.appendChild(text);
	faculty_option.appendChild(tag);
}
let program_study = document.querySelector("#program-study-form");
faculty_option.addEventListener('change',function(e){
	let options = e.target.value;
	//check if selected faculty is valid
	if(faculties.map((faculty) => faculty.name).indexOf(options) != -1){
		faculties.filter((i) => {
			if(i.name == options){
				program_study.innerHTML = '';
				let tag = document.createElement('option');
				let text = document.createTextNode("-- SELECT PROGRAM OF STUDY --");
				tag.appendChild(text);
				program_study.appendChild(tag);
				for(j of i.sub){
					let tag = document.createElement('option');
					let text = document.createTextNode(j);
					tag.appendChild(text);
					program_study.appendChild(tag)
				}
			}
		});
	}
	else{
		program_study.innerHTML = '';
		let tag = document.createElement('option');
		let text = document.createTextNode("-- SELECT PROGRAM OF STUDY --");
		tag.appendChild(text);
		program_study.appendChild(tag);
	}
});
//end faculties and program study


//get all from data
const submit_button = document.querySelector("#submit-button");

submit_button.addEventListener('click',() => {
	let student_nim = document.querySelector("#NIM").value;
	let student_name = document.querySelector("#full-name").value;
	let student_gender = document.querySelector('input[name="gender"]:checked').value;
	let student_faculty = document.querySelector("#faculty-form").options[document.querySelector("#faculty-form").selectedIndex].value;
	let student_program_study = document.querySelector("#program-study-form").options[document.querySelector("#program-study-form").selectedIndex].value;;

	
	//validating form data
	if(/^\d+$/.test(student_nim) != true){
		alert("Invalid Student NIM");
		return;
	}

	if(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(student_name) != true){
		alert("Invalid Student Name");
		return;
	}

	if(student_faculty == '-- SELECT FACULTY --'){
		alert("Invalid Faculty");
		return;
	}

	if(student_program_study == '-- SELECT PROGRAM OF STUDY --'){
		alert("Invalid Program Study");
		return;
	}

	if(students.map((s) => s.nim).includes(student_nim) == true){
		alert(`Duplicate NIM Detected!`);
		return;
	}

	//append valid form data to student list
	students.push({
		nim: 				student_nim,
		name:				student_name,
		gender:				student_gender,
		faculty:			student_faculty,
		program_study:		student_program_study,
	});

	//update student list and reset form data
	alert(`${student_name} added.`);
	update_student_list();
	document.querySelector("form").reset();


});
//end get all from data


//display all students
const student_list = document.querySelector("#student-list");

function update_student_list(){

	student_list.innerHTML = "";

	for(student of students){

		let tr = document.createElement("tr");

		for(key in student){

			let td = document.createElement("td");
			td.appendChild(document.createTextNode(student[key]));

			tr.appendChild(td);
		}

		//action, #delete, 
		let action = document.createElement("td");
		let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
		action.innerHTML = trash_icon;
		tr.appendChild(action);

		student_list.appendChild(tr);
	}
}
update_student_list();
//end display all students


//delete row
function delete_row(btn) {

	var row = btn.parentNode.parentNode;

	student_name = row.getElementsByTagName("td")[1].textContent;
	student_nim = (row.querySelector("tr td").textContent);

	const confirm_delete = confirm(`Are You Sure To Delete ${student_name}?`);
 
	if(confirm_delete == true){		
		students = students.filter((s) =>{
			return s.nim != student_nim;
		});

		update_student_list();

		//don't forget to reset input text
		document.querySelector("#search-student-form").reset();
	}


}
//end delete row

/*function searchStudent() {
    var input, filter, table, tr, td, i, textValue;
    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableStr");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            textValue = td.textContent || td.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}*/
//search students by name
let search_student = document.querySelector("#search-student");

search_student.addEventListener("input",() => {
	if(search_student.length == 0){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		//filter the student
		let filtered_students = students.filter((s) => {
			return s.name.toLowerCase().includes(search_student.value.toLowerCase());
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			
			//action #delete, 
			let action = document.createElement("td");
			let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}

	}
});

//disable "Enter"
search_student.addEventListener('keydown',(e) =>{
	if(e.keyCode == 13){
		e.preventDefault();
	}

	return false;
});
//end search student by name


//student filter
const filter_by_faculty = document.querySelector("#filter-by-faculty");

for(i of faculties){
	const parent = document.createElement("option");
	const child = document.createTextNode(i.name);
	parent.append(child);
	filter_by_faculty.appendChild(parent);
}

const filter_faculty_button = document.querySelector("#filter-faculty-button");

filter_faculty_button.addEventListener("click",() => {
	const selected_faculty = filter_by_faculty.options[filter_by_faculty.selectedIndex].value

	//update student list
	if(selected_faculty == "-- SELECT FACULTY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		//filter the student
		const filtered_students = students.filter((s) => {
			return s.faculty == selected_faculty;
			console.log(s.faculty)
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			/*function myDeleteRow(event){
    let validation = confirm("Are you sure want to delete this student?");
    if(validation){
        let moveRow = event.parentNode.parentNode.rowIndex;
        document.querySelector('#tableStr').deleteRow(moveRow);
    } else {
        false;
    }
}*/
			//action #delete, 
			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});

const filter_by_program_study = document.querySelector("#filter-by-program-study");

for(i of faculties){

	for(j of i.sub){
		const parent = document.createElement("option");
		const child = document.createTextNode(j);
		parent.append(child);
		filter_by_program_study.appendChild(parent);
	}
}

const filter_program_study_button = document.querySelector("#filter-program-study-button");

filter_program_study_button.addEventListener("click",() => {
	const selected_program_study = filter_by_program_study.options[filter_by_program_study.selectedIndex].value

	//update student list
	if(selected_program_study == "-- SELECT PROGRAM STUDY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		//filter the student
		const filtered_students = students.filter((s) => {
			return s.program_study == selected_program_study;
			console.log(s.faculty)
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}

			
			/*function myDeleteRow(event){
    let validation = confirm("Are you sure want to delete this student?");
    if(validation){
        let moveRow = event.parentNode.parentNode.rowIndex;
        document.querySelector('#tableStr').deleteRow(moveRow);
    } else {
        false;
    }
}*/
			//action #delete, 
			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});
