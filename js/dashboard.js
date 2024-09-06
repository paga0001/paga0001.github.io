// Data of the table
const data = {
    quartile: [
      1,
      1,
      1,
      1,
      1,
      2,
      3,
      3,
      4,
      4,
      4,
      4],
    exam: [
      "Program- & career Orientation",
      "Computer Science Basics",
      "Programming Basics",
      "Portfolio",
      "Portfolio",
      "Presentation<br>Case study exam",
      "Case study exam",
      "Criterium based interview<br>Assignment<br>Case study exam",
      "Final delivery<br>Report of acceptance tests and optional assessments<br>IT Development portfolio",
      "Portfolio",
      "Portfolio",
      "English Test<br>Criterium focused interview"],
    course: [
      "PCO",
      "CBA",
      "PBA",
      "PPW1",
      "ITP1",
      "OOP",
      "FDE1",
      "FDR1",
      "FPR2",
      "PIW",
      "ITP2",
      "PPD-E"],
    credit: [
      2.5,
      5,
      5,
      1.25,
      1.25,
      10,
      5,
      7.5,
      10,
      1.25,
      1.25,
      12.5],
    grade: [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",],
    currentQuartile: 1,
  }
  // Global variables
  let firstQuartile = true;
  let secondQuartile = true;
  let thirdQuartile = true;
  let fourthQuartile = true;
  /*
   * Creates the rows to the table by given parameters
   * @param {*} quartile 
   * @param {*} exam 
   * @param {*} course 
   * @param {*} credit 
   * @param {*} grade 
   * @param {*} isEven Checks if the current row is even or odd 
   */
  function createRow(quartile, exam, course, credit, grade, isEven) {
    // id=table
    const tableRow = document.createElement("tr");
    const quartileTd = document.createElement("td");
    const examTd = document.createElement("td"); 
    const courseTd = document.createElement("td");
    const creditTd = document.createElement("td");
    const gradeTd = document.createElement("td");
    const table = document.getElementById('dashboard'); 
    if (isEven) tableRow.className = "Even"
    if (firstQuartile && quartile == 1) {
      quartileTd.className = "Quartile"
      quartileTd.rowSpan = "5";
      quartileTd.innerHTML = quartile; 
      tableRow.appendChild(quartileTd);
      firstQuartile = false;
    }
    if (secondQuartile && quartile == 2) {
      quartileTd.className = "Quartile"
      quartileTd.innerHTML = quartile;
      tableRow.appendChild(quartileTd);
      secondQuartile = false;
    }
    if (thirdQuartile && quartile == 3) {
      quartileTd.className = "Quartile"
      quartileTd.rowSpan = "2";
      quartileTd.innerHTML = quartile; 
      tableRow.appendChild(quartileTd);
      thirdQuartile = false;
    }
    if (fourthQuartile && quartile == 4) {
      quartileTd.className = "Quartile"
      quartileTd.rowSpan = "5";
      quartileTd.innerHTML = quartile;
      tableRow.appendChild(quartileTd);
      fourthQuartile = false; 
    }
    examTd.innerHTML = exam;
    courseTd.innerHTML = course;
    creditTd.innerHTML = credit;
    gradeTd.innerHTML = grade;
    if (grade == "-") gradeTd.className = "status-NotTaken";
    if (grade >= 5.5) gradeTd.className = "status-Passed";
    if (grade < 5.5) gradeTd.className = "status-Failed";
    const content = [
      examTd,
      courseTd,
      creditTd,
      gradeTd
    ];
    for (let i = 0; i < content.length; i++) {
      tableRow.appendChild(content[i]);
    }
    table.appendChild(tableRow);
  }
  /*
   * Sets up the table and renders the tableheads as well
   */
  function renderTable() {
    const div = document.getElementById('Table');
    const table = document.createElement("table");
    table.id = "dashboard";
    const tableHeadRow = document.createElement("tr");
    tableHeadRow.className = "TableHead";
    const quartileHead = document.createElement("th");
    const examHead = document.createElement("th");
    const courseHead = document.createElement("th");
    const creditHead = document.createElement("th");
    const gradeHead = document.createElement("th");
    quartileHead.innerHTML = "Quartile";
    examHead.innerHTML = "Exam";
    courseHead.innerHTML = "Course";
    creditHead.innerHTML = "Credit";
    gradeHead.innerHTML = "Grade";
    array = [
      quartileHead,
      examHead,
      courseHead,
      creditHead,
      gradeHead
    ];
    array.forEach(element => {
      tableHeadRow.appendChild(element);
    });
    table.appendChild(tableHeadRow);
    div.appendChild(table);
  }
  /*
   * Calculates the credits earned with the passed exams
   * @returns the credits earned so far 
   */
  function sumOfEcs() {
    let sum = 0;
    for (let i = 0; i < data.grade.length; i++) {
      if (!isNaN(data.grade[i]) && data.grade[i] >= 5.5) {
        sum += data.credit[i];
      }
    }
    return sum;
  }
  function progressBarOfEcs() {
    const maxEcs = (data.currentQuartile - 1) * 15;
    const percantage = (sumOfEcs() / maxEcs) * 100;
    const progressBar = document.getElementById("progress");
    if (sumOfEcs() >= maxEcs) progressBar.style.backgroundColor = "#22d43d";
    if (sumOfEcs() < maxEcs && percantage >= 90) progressBar.style.backgroundColor = "#4cf1fc";
    if (percantage < 90 && percantage >= 75) progressBar.style.backgroundColor = "#fcf94c";
    if (percantage < 75) progressBar.style.backgroundColor = "#d70c0c";
    progressBar.innerHTML = sumOfEcs();
    progressBar.style.width = `${(sumOfEcs() * 10)}px`;
  }
  
  window.addEventListener('load', function () {
    renderTable();
    for (let i = 0; i < data.quartile.length; i++) {
      const quartile = data.quartile[i];
      const exam = data.exam[i];
      const course = data.course[i];
      const credit = data.credit[i];
      const grade = data.grade[i];
      let isEven = false;
      if ((i + 1) % 2 == 0) {
        isEven = true;
      }
      createRow(quartile, exam, course, credit, grade, isEven);
    }
    progressBarOfEcs();
  });