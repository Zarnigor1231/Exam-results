// const studentTemplate = document.querySelector('#student-template')
// const failPass = document.querySelector('.student-pass-status')
// const inpnum = document.querySelector('.inpnum')

const addForm = document.querySelector('#add-form')
const addModal = document.querySelector('#add-student-modal')
const studentsTableBody = document.querySelector('#students-table-body');
const addElModal = new bootstrap.Modal(addModal)
const count = document.querySelector('.count')
const textEnd = document.querySelector('.text-end')
const filter = document.querySelector('.filter')
const search = document.querySelector('#search')
const formto = document.querySelector('.formto')
const from = document.querySelector('#from')
const to = document.querySelector('#to')
const formSelect = document.querySelector('.form-select')
const studentEdit = document.querySelector('.student-edit')
const edit = document.querySelector('.edit')



const highScore = 150;
const percent = 100;
const lowScore =40


const addDate = function(number){
    return number < 10 ? '0'+ number : number
};


const showDate = function(dateString){
    const date = new Date(dateString)
    return `${addDate(date.getDate())}.${addDate(date.getMonth()+1)}.${addDate(date.getFullYear())} ${addDate(date.getHours()+1)}:${addDate(date.getMinutes()+1)}`
    
};

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
    // console.log(everPercent);


    return studentsTable
};


const renderStudents = function(search){

    studentsTableBody.innerHTML = ''

     // COUNT
    count.textContent = `Count: ${students.length}`

    const statusFragment = document.createDocumentFragment();

        if(search && search.length){
            search.forEach(student => {
                const studentsTable = renderStudent(student)
                statusFragment.append(studentsTable)
            });
        }
        // else if(formSelect.value==1){
        //     search.sort()
        // }else if (formSelect==2){
        //     search.sort((a,b)=> a.Mark - b.Mark)
        // }
        // else if(formSelect==3){
        //     search.sort((a,b)=> b.Mark - a.Mark)
        // }
        // else if(formSelect==4){
        //     search.sort((a,b)=> a.MarkedDate - b.MarkedDate)
        // }
        else{
            students.forEach(student => {
                const studentsTable = renderStudent(student)
                statusFragment.append(studentsTable)
            });
        }
   
        

        studentsTableBody.append(statusFragment)
        
    
};


// textEnd

let textEndarr = [
       
]

const initialValue = 0;

textEnd.textContent = `Average mark: ${textEndarr.reduce((a,b)=> +a + +b,initialValue)/students.length} %`

// console.log(textEndarr);



// addForm add

addForm.addEventListener('submit',(evt) =>{
    evt.preventDefault()

    const nameValue = evt.target[0].value
    const lastnameValue = evt.target[1].value
    const markValue = evt.target[2].value
    // console.log(lastnameValue)

    if(nameValue && lastnameValue && markValue){
        const newStudent = {
            id:Math.floor(Math.random()*1000),
            name:nameValue,
            lastName:lastnameValue,
            MarkedDate:new Date(),
            Mark:markValue
     }

        
        students.push(newStudent)
        textEndarr.push(markValue*percent/highScore)
        localStorage.setItem("students",JSON.stringify(students))
        // console.log(nameValue);
    }



    console.log(markValue)

  
    evt.target.reset()
    addElModal.hide()
    renderStudents()

});

renderStudents()



filter.addEventListener('submit',function(e){
    e.preventDefault()


    let filterStudent = students.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()) &&
    ( ((item.Mark*percent/highScore >= from.value)|| (from.value=="")) && ((item.Mark*percent/highScore<=to.value) || (to.value=="")) ))
    // console.log(filterStudent)
    // console.log(from.value)
    // console.log(to.value)
    // console.log(students[3].Mark)
    renderStudents(filterStudent)
 });




 
