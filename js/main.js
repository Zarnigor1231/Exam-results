// const studentTemplate = document.querySelector('#student-template')
// const failPass = document.querySelector('.student-pass-status')

const addForm = document.querySelector('#add-form')
const addModal = document.querySelector('#add-student-modal')
const addElModal = new bootstrap.Modal(addModal)
const count = document.querySelector('.count')


const highScore = 150;
const percent = 100;
const lowScore =40


const addDate = function(number){
    return number < 10 ? '0'+ number : number
}


const showDate = function(dateString){
    const date = new Date(dateString)
    return `${addDate(date.getDate())}.${addDate(date.getMonth()+1)}.${addDate(date.getFullYear())} ${addDate(date.getHours()+1)}:${addDate(date.getMinutes()+1)}`
    
}

const renderStudent = function(student){

    const {id,name,lastname,MarkedDate,Mark} = student

    const studentTemplate = document.querySelector('#student-template')

    const studentsTable = studentTemplate.content.cloneNode(true);

    studentsTable.querySelector('.student-id').textContent = id;
    studentsTable.querySelector('.student-name').textContent = `${name} ${lastname}`;
    studentsTable.querySelector('.student-marked-date').textContent = showDate(MarkedDate);

    const everPercent = Math.floor((Mark*percent)/highScore);

    studentsTable.querySelector('.student-mark').textContent = everPercent + '%';

    const studentEdit = studentsTable.querySelector('.student-edit')
    const studentDelete = studentsTable.querySelector('.student-delete')

    const passStatus = studentsTable.querySelector('.student-pass-status')

    if(everPercent>=lowScore){
        passStatus.textContent="Pass"
        passStatus.classList.add('text-success')
    }else if(everPercent<lowScore){
        passStatus.textContent = 'Fail'
        passStatus.classList.add('text-danger')
    }

    return studentsTable
}

const studentsTableBody = document.querySelector('#students-table-body');

const renderStudents = function(){

    studentsTableBody.innerHTML = ''

    const statusFragment = document.createDocumentFragment();

       students.forEach(student => {
            const studentsTable = renderStudent(student)
            statusFragment.append(studentsTable)
        });
        studentsTableBody.append(statusFragment)
        
    
}

count.textContent = `Count: ${students.length}`


addForm.addEventListener('submit',(evt) =>{
    evt.preventDefault()

    const nameValue = evt.target[0].value
    const lastnameValue = evt.target[1].value
    const markValue = evt.target[2].value
    console.log(lastnameValue)

    if(nameValue && lastnameValue && markValue){
        const newStudent = {
            id:Math.floor(Math.random()*1000),
            name:nameValue,
            lastName:lastnameValue,
            MarkedDate:new Date(),
            Mark:markValue
        }
        
        students.push(newStudent)
        localStorage.setItem("students",JSON.stringify(students))
        console.log(nameValue);
    }
    console.log(1);
    evt.target.reset()
    addElModal.hide()
    renderStudents()

})

renderStudents()



