var Skills = [];

/*----------------accordion-------------------------*/
{
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
      this.classList.toggle("active");

      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

/*----------------Adding and Removing user controls on form for section : work-experience-------------------------*/
function addWorkExpControlSet() {
  var currIndex = document.getElementsByClassName("gridPanel2").length;
  var nextIndex = currIndex + 1;
  var currElement = `workexp-${currIndex}`;
  var prepHTML = `<div id="workexp-${nextIndex}"  class="gridPanel2 newAddition">
    <input type="text" class="txtbox item1" name="Organization-${nextIndex}" placeholder="Organization Name">
    <input type="text" class="txtbox item2" name="Location-${nextIndex}" placeholder="Location">
    <input type="text" class="txtbox item3" name="Designation-${nextIndex}" placeholder="Your Designation">
    <div class="item4">
    <label for="Start">Worked from</label>
    <input type="month" class="txtbox"  name="Start-${nextIndex}" placeholder="Start">
    </div>
    <div class="item5">
        <label for="Start">Worked until</label>
    <input type="month" class="txtbox" name="End-${nextIndex}" placeholder="End">
    </div>
    <textarea rows="5" class="txtbox item6" name="Keypoints-${nextIndex}" placeholder="Roles and Responsiblities"></textarea>
   </div>`;
  document.getElementById(currElement).insertAdjacentHTML("afterend", prepHTML);

  /*document.getElementById(currElement).style.backgroundColor = "rgba(255, 0, 0, 0.050)";*/
}

function removeWorkExpControlSet() {
  var currIndex = document.getElementsByClassName("gridPanel2").length;
  if (currIndex > 1) {
    var currElement = `workexp-${currIndex}`;
    document.getElementById(currElement).remove();
  }
}

/*--------------------------------Adding and Removing user controls on form for section : Organisation section----------------------*/
function addOrgControlSet() {
  var currIndex = document.getElementsByClassName("gridPanel4").length;
  var nextIndex = currIndex + 1;
  var currElement = `Org-${currIndex}`;
  var prepHTML = `<div id="Orgs-${nextIndex}" class="gridPanel4 newAddition">
  <input type="text" class="txtbox item1" name="Org-${nextIndex}" placeholder="Previous Employer Company name">
  <div class="datecontrol item2">
      <label for="from-year">From</label>
      <input type="month" class="txtbox"  name="from-year-${nextIndex}" >
      </div>
      <div class="datecontrol item3">
          <label for="to-year">Until</label>
      <input type="month" class="txtbox" name="to-year-${nextIndex}" >
      </div>
</div>`;
  document.getElementById(currElement).insertAdjacentHTML("afterend", prepHTML);
}

function removeOrgControlSet() {
  var currIndex = document.getElementsByClassName("gridPanel4").length;
  if (currIndex > 1) {
    var currElement = `Org-${currIndex}`;
    document.getElementById(currElement).remove();
  }
}
/*---------------------------------Organisation section----------end----------------------------------------------------*/

/*---------------------------------Honours section----------begin----------------------------------------------------*/
function addHonoursControlSet() {
  var currIndex = document.getElementsByClassName("gridPanel5").length;
  var nextIndex = currIndex + 1;
  var currElement = `Honours-${currIndex}`;
  var prepHTML = `  <div id="Honours-${nextIndex}" class="gridPanel5 newAddition">
  <input type="text" class="txtbox item1" name="Honour-${nextIndex}" placeholder="Honours / Awards">
  <input type="text" class="txtbox item2" name="Award-${nextIndex}" placeholder="Authorising Organisation/Institute name">
</div>`;
  document.getElementById(currElement).insertAdjacentHTML("afterend", prepHTML);
}

function removeHonoursControlSet() {
  var currIndex = document.getElementsByClassName("gridPanel5").length;
  if (currIndex > 1) {
    var currElement = `Honours-${currIndex}`;
    document.getElementById(currElement).remove();
  }
}
/*---------------------------------Honours section----------end----------------------------------------------------*/

/*---------------------------------Conference section----------begin----------------------------------------------------*/
function addCourseControlSet() {
  var currIndex = document.querySelectorAll("div.panel6 div[id^='Conf']:not(.hiddenElement)").length
  if(currIndex < 5){
    var nextIndex = currIndex + 1;
    document.getElementById(`Conferences-${nextIndex}`).classList.remove("hiddenElement")
  }
/*  var nextIndex = currIndex + 1;
  var currElement = `Conferences-${currIndex}`;
  var prepHTML = ` <div id="Conferences-${nextIndex}" class="gridPanel6 newAddition">
  <input type="text" class="txtbox item1" name="Course-${nextIndex}" placeholder="Conferences/Course Name">
  <input type="text" class="txtbox item2" name="Subtitle-${nextIndex}" placeholder="Authorising Organisation/Institute name">
</div>`;
  document.getElementById(currElement).insertAdjacentHTML("afterend", prepHTML);
  */
}



function removeCourseControlSet() {
  var visibleElements = document.querySelectorAll("div.panel6 div[id^='Conf']:not(.hiddenElement)");
  var visibleElementsCount = visibleElements.length
  var lastElement = visibleElements[visibleElementsCount-1];
  lastElement.classList.add("hiddenElement")
}

/*---------------------------------Conference section----------end----------------------------------------------------*/

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

var myForm = document.querySelector("form");
myForm.addEventListener("submit", submitfrom);

/************************validation functions********************************/
function setRequiredFieldCss(element) {
  var flag = true;
  if (element.value == "") {
    element.classList.add("requiredField");
    flag = false;
  } else {
    element.classList.remove("requiredField");
  }
  return flag;
}

function validateSection(validation, BaseElement, parentTag, ...Otherfields) {
  var loopCount = document.getElementsByClassName(parentTag).length;
  for (i = 0; i < loopCount; i++) {
    var baseElem = document.getElementsByName(BaseElement + "-" + (i + 1))[i];
    if (baseElem.value != "") {
      Otherfields.forEach((element) => {
        var tempFlag = setRequiredFieldCss(document.getElementsByName(element + "-" + (i + 1))[i] );
        if(!tempFlag){
          validation.flag = false;
        }
      });
    }
  }
}

function validateSKills(validation) {
  var SkillsElement = document.getElementById("Skills");
  if (Skills.length == 0) {
    document.getElementById("skillpool").classList.add("requiredField");
    validation.flag = false;
  } else {
    SkillsElement.value = Skills;
    document.getElementById("skillpool").classList.remove("requiredField");
  }
}

function submitfrom(e) {
  try {
    var validation = { flag: true };
    validateSKills(validation);
    validateSection(validation,"Degree","gridPanel3","University","DegreeStart","DegreeEnd");
    validateSection(validation,"Organization","gridPanel2","Location","Designation","Start","End","Keypoints");
    validateSection(validation, "Org", "gridPanel4", "from-year", "to-year");
    validateSection(validation, "Honour", "gridPanel5", "Award");
    validateSection(validation, "Course", "gridPanel6", "Subtitle");

/*   Facing some validaiton issues, so commented

   if (!validation.flag) {
      e.preventDefault();
      return false;
    }
    
    */

  } catch (err) {
    console.log(err);
    //Facing some validaiton issues, so commented
    //e.preventDefault();
    //return false;
  }
}

function resetfrom() {
  scrollToTop();
  const form = document.getElementById("resumeForm");

  // to reset the validation css
  const boxes = document.querySelectorAll(".requiredField");
  boxes.forEach((box) => {
    box.classList.remove("requiredField");
  });

  form.reset();
}

/*------------------------skills-----------------------------*/
var input = document.getElementById("skill");
var btn = document.getElementById("btnSkill");
var skillpool = document.getElementById("skillpool");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!Skills.includes(event.target.value)) {
      var skillarr = event.target.value.split(",");
      Skills.push(...skillarr);

      for (i in skillarr) {
        let elem = `<span class="txtbox"><label>${skillarr[i]}</label><i class="fa-solid fa-xl fa-circle-xmark theme-color iskill"></i></span>`;
        skillpool.insertAdjacentHTML("beforeend", elem);
      }
    }
    event.target.value = null;
  }
});

btn.addEventListener("click", function (event) {
  if (event.type === "click") {
    event.preventDefault();
    if (!Skills.includes(input.value)) {
      var skillarr = input.value.split(",");
      Skills.push(...skillarr);

      for (i in skillarr) {
        let elem = `<span class="txtbox"><label>${skillarr[i]}</label><i class="fa-solid fa-xl fa-circle-xmark theme-color iskill"></i></span>`;
        skillpool.insertAdjacentHTML("beforeend", elem);
      }
    }
    input.value = null;
  }
});

skillpool.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "i") {
    Skills = removeSkill(Skills, e.target.parentElement.innerText);
    var target = e.target;
    var parent = target.parentElement;
    parent.remove();
  }
});

function removeSkill(skills, element) {
  var s = skills.filter((e) => e !== element);
  return s;
}

/*------------------------skills--------end---------------------*/
