
let url = new URL(document.URL);
let params = new URLSearchParams(url.search); //to get query string in key-value pairs

function setParamById(key){
    if(params.has(key)){
        var result =''
        switch(key){
            case 'Email' : result= params.get(key) == ""?"":params.get(key)+`<i class="fa-sharp fa-solid fa-envelope theme-color"></i>`;
                        break;
            case 'Phone' : result= params.get(key) == ""?"":params.get(key)+`<i class="fa-sharp fa-solid fa-mobile-screen-button theme-color"></i>`;
                        break;
            case 'Location' :result= params.get(key) == ""?"":params.get(key)+`<i class="fa-sharp fa-solid fa-location-dot theme-color"></i>`;
                        break;
            case 'linkedin-url' :result= params.get(key) == ""?"":params.get(key)+`<i class="fa fa-linkedin theme-color" aria-hidden="true"></i>`;
                        break;
            case 'skype-url' :result=  params.get(key) == ""?"":params.get(key)+`<i class="fa-brands fa-skype theme-color"></i>`;
                        break;
            default :result= params.get(key)
        }
        document.getElementById(key).innerHTML = result
    }else{
     document.getElementById(key).innerHTML="";
    }
}

setParamById("Name")
setParamById("Designation")
setParamById("Description")
setParamById("Phone")
setParamById("Email")
setParamById("Location")
setParamById("linkedin-url")
setParamById("skype-url")

/* building the date to display in specific format on work-experience section*/
const displayDate = (dateStr) => {
    let _date = new Date(dateStr);
    return (_date.getMonth()+1).toString().padStart(2,'0')+"/"+_date.getFullYear()
}

/* building the date to display in specific format on organisation section*/
const displayOrgDate =(fromDateStr,toDateStr) =>{
    let _fromDate = new Date(fromDateStr);
    let _toDate = new Date(toDateStr);
    let result = "";
    if(_toDate.getFullYear() == _fromDate.getFullYear())
    {
        result = _fromDate.getFullYear()+" - Present"
    }
    else
    {
        result = _fromDate.getFullYear()+" - "+_toDate.getFullYear();
    }
    return result;
}

/* to bind work experience section*/
{
let flag = false,counter = 1,prepHTML="",prePrepHTML=`<p class="section"><span class="theme-color" >work experience </span></p> ` ;
do{ 
    if(params.has("Designation-"+counter) && params.has("Organization-"+counter)){        
        prepHTML += ` <p class="heading" >${params.get("Designation-"+counter)}</p>
        <p class="subheading" >${params.get("Organization-"+counter)}</p>
        <div class="subcontent-flex" >
            <p class="subcontent" >${displayDate(params.get("Start-"+counter))} - ${displayDate(params.get("End-"+counter))}</p>
            <p class="subcontent" >${params.get("Location-"+counter)}</p>
        </div><ul class="fa-ul bulletedList">
        ${params.get("Keypoints-"+counter).split('\r\n').map(ele => { return '<li><span class="fa-li"><i class="fa-duotone fa-hyphen"></i></span>'+ele+'</li>' }).join('')}
        </ul>
        <br/>`;
       counter++; 
       flag = true;       
    }
    else{
        if(prepHTML == ""){
            document.getElementById("work-experience").style.display = "none";
        }
        else{
            document.getElementById("work-experience").innerHTML = prePrepHTML+prepHTML;
        }
        flag = false;
    }
 }while(flag)
}

 /* to bind education section*/
 {
    let prepHTML="",  prePrepHTML=`<p class="section"><span class="theme-color" >education</span></p>` ;
    if(params.has("Degree") && params.has("University")){
           prepHTML += `  <p class="heading" >${params.get("Degree-1")}</p>
           <p class="subheading" >${params.get("University-1")}</p>
           <div class="subcontent-flex" >
               <p class="subcontent" >${displayDate(params.get("DegreeStart-1"))} - ${displayDate(params.get("DegreeEnd-1"))}</p>
               <p class="subcontent" ></p>
           </div>
           <br/>`   
           document.getElementById("education").innerHTML = prePrepHTML+prepHTML;
       }else{
           document.getElementById("education").style.display = "none";   
       } 
    }


 /* to bind language section*/
 {
    var prePrepHTML=`<p class="section"><span class="theme-color" >languages</span></p>`,
    prepHTML=""
   for(i=1;i<=3;i++){
    var LangName = `Language-${i}`;
    var LanguageRatingKey = `LanguageRating-${i}`
    var val = params.get(LanguageRatingKey)
    prepHTML+=`<div class="langitem"><span class="langName">${params.get(LangName)}</span><span class="langRating">`
    for(j=1;j<=5;j++){
        prepHTML+= j<=val ? `<i class="fa-solid   fa-circle theme-color"></i>` :`<i class="fa-regular fa-circle theme-color"></i>`
    }
    prepHTML+= `</span></div>`
   }
   prepHTML+="<br/>"
   if(params.get("Language-1") == null && params.get("Language-2") == null && params.get("Language-3") == null )
   {
    document.getElementById("languages").innerHTML = null;
   }
   else
   {
    document.getElementById("languages").innerHTML = prePrepHTML+prepHTML;
   }
 }

  /* to bind skills section*/
 {
     let skillHtml = `<p  class="section"><span class="theme-color" >skills</span></p>`;
    if(params.has("Skills"))
    {
    var skills = params.get("Skills"); 
    prepSkills = skills.split(',').map(ele => { return `<span class='skillname' >${ele}</span>` }).join('');
    document.getElementById("Skills").innerHTML = skillHtml.concat(prepSkills,"<br/><br/>");
    }
    else
    {
        document.getElementById("Skills").style.display = "none";
    }
 }

 /* to bind work organisation section*/
{
    let flag = false,counter = 1,prepHTML="", prePrepHTML=`<p class="section"><span class="theme-color" >organisation</span></p>  ` ;  
    do{
        if(params.has("Org-"+counter) && params.has("Start-"+counter) && params.has("End-"+counter)){
            prepHTML += `<p>${params.get("Org-"+counter) } ${displayOrgDate(params.get("Start-"+counter),params.get("End-"+counter))} </p>`;  
            counter++; 
            flag = true;       
         }
         else{
             if(prepHTML == ""){
                 document.getElementById("organisation").style.display = "none";
             }
             else{
                prepHTML += "<br/>"
                 document.getElementById("organisation").innerHTML = prePrepHTML+prepHTML;
             }
             flag = false;
            }
    }while(flag)
}

/* to bind work honours section*/
{
    let flag = false,counter = 1,prepHTML="",prePrepHTML=`<p class="section"><span class="theme-color" >Honours and awards</span></p>` ;  
    do{
        if(params.has("Honour-"+counter) && params.has("Award-"+counter)){
            prepHTML += `<p>${params.get("Honour-"+counter)}</p>
            <div class="subcontent-flex" >
                <p class="subcontent" >${params.get("Award-"+counter)}</p>
                <p class="subcontent" ></p>
            </div>`;
            counter++; 
            flag = true;  
        }else{
            if(prepHTML == ""){
                document.getElementById("honours").style.display = "none";
            }
            else{
               prepHTML += "<br/>"
                document.getElementById("honours").innerHTML =prePrepHTML+ prepHTML;
            }
            flag = false;
           }
    }while(flag)
}

/* to bind work Conference section*/
{
    let flag = false,counter = 1,prepHTML="", prePrepHTML=`<p class="section"><span class="theme-color" >Conferences & Courses</span></p>`;  
    do{
        if(params.has("Course-"+counter) && params.has("Subtitle-"+counter)){
            prepHTML += `<p>${params.get("Course-"+counter)}</p>
            <div class="subcontent-flex" >
                <p class="subcontent" >${params.get("Subtitle-"+counter)}</p>
                <p class="subcontent" ></p>
            </div>`;
            counter++; 
            flag = true; 
        }else{
            if(prepHTML == ""){
                document.getElementById("Conference").style.display = "none";
            }
            else{
                prepHTML += "<br/>"
                document.getElementById("Conference").innerHTML = prePrepHTML+prepHTML;
            }
            flag = false;
      }

    }while(flag)
}


