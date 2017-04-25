var searchBtn = document.getElementById("findCourses-btn");
    if (searchBtn.addEventListener)
        searchBtn.addEventListener("click", generateTable, false);
    else if (searchBtn.attachEvent)
        searchBtn.attachEvent('onclick', generateTable);
/*
function getData(){
  var testTime = "10_00A";
  // Returns list of objects: [{},{},{},{},{}]
  $.getJSON('http://34.200.240.84:3000/course?time=10:00A&days=M-W----&c=CSE&u=1',
   function( data ) {
       console.log(data);
  });
}*/




function generateTable() {
  //getData()
  // This code tests to see if we are appropriately getting the dropdown menu items

  // Remove the table from the last time the button was pressed
  $("#display").empty();

  var timeString = $("#start option:selected").val() + "-" + $("#end option:selected").val();
  var end = $("#end option:selected").val();
  var dept = $("#dept option:selected").val();
  var days = $("#days option:selected").val();
  var queryString = "http://34.200.240.84:3000/course?time=" + timeString + "&days=" + days + "&c=" + dept +
  "&u=1";
 console.log(queryString);




        // Loop for toy data defined on line 13
        // $.each(data, function(key, val) {
        //   $('<tr><td>'+key+'</td><td id="'+key+'">'+val+'</td><tr>').appendTo(document.getElementById("display"));
        // });

        var startResponse;
        var endResponse;

        // We can use the contains function to see if a course code contains the desired dept code
        // i.e. does "E62 BME 234" contain "BME"?
        Array.prototype.contains = function(element){
            return this.indexOf(element) > -1;
        };

        $.getJSON(queryString,
         function( data ) {
           // listen, man - If yo data don't have no rows,
           //you gotta let the people know.
           //#slantrhyme
           if(data.length == 0){
             var $noCoursesDiv = $("<div>", {class: "col-sm-12 noCoursesDiv"});//first row
             $noCoursesDiv.appendTo(document.getElementById("display"));
             courseTitleHeader = $('<h2><br>Sorry, there are no available classes for the given specification :( <br><br> Try Again!</h2>').attr('class', 'col-md-12 title');
             $noCoursesDiv.append(courseTitleHeader);
           }

           $.each(data, function(index, jsonObject) {

            var codeAttr, descriptionAttr, courseTitleHeader, daysAttr, creditsAttr, timeAttr, professorAttr;
            var counter = 0;


            var $courseDiv = $("<div>", {class: "singleCourse"});//
            var $courseRow1 = $("<div>", {class: "col-sm-12 courseRow1"});//first row
            var $courseRow2 = $("<div>", {class: "col-sm-12 courseRow2"});//second row
            var $courseRow3 = $("<div>", {class: "col-sm-12 courseRow3"});//third row
            var $courseRow4 = $("<div>", {class: "col-sm-12 courseRow4"});//fourth row

            $courseDiv.append($courseRow1);
            $courseDiv.append($courseRow2);
            $courseDiv.append($courseRow3);
            $courseDiv.append($courseRow4);
            $courseDiv.appendTo(document.getElementById("display"));

              $.each(jsonObject, function(key, val) {

                switch(key){
                  case "code":
                    //Course Code
                    var code = "Course code: " + val;
                    codeAttr = $('<h3>' + code + '</h3>').attr('class', 'col-md-6 courseCode');
                    break;
                  case "description":
                    //Description
                    var description = key + ": " + val;
                    descriptionAttr = $('<p>' + description + '</p>').attr('class', 'col-md-12 description');
                    break;
                  case "title":
                    //Course Title
                    var title = val;
                    courseTitleHeader = $('<h2>' + title + '</h2>').attr('class', 'col-md-12 title');

                  case "days":
                    //Date
                    var days = "Days: " + val;
                    daysAttr = $('<h4>' + days + '</h4>').attr('class', 'col-md-4 days');

                  case "credits":
                    //Credits
                    var credits = key + ": " + val;
                    creditsAttr = $('<h4>' + credits + '</h4>').attr('class', 'col-md-4 credits');

                  case "time":
                    //Time
                    var time = key + ": " + val;
                    timeAttr = $('<h4>' + time + '</h4>').attr('class', 'col-md-4 time');

                  case "Instructor":
                    //Professor
                    var prof = key + ": " + val;
                    professorAttr = $('<h3>' + prof + '</h3>').attr('class', 'col-md-6 instructor');
                  default:
                    break;
                }
              });

              $courseRow1.append(courseTitleHeader);
              $courseRow2.append(professorAttr);
              $courseRow2.append(codeAttr);
              $courseRow3.append(daysAttr);
              $courseRow3.append(timeAttr);
              $courseRow3.append(creditsAttr);
              $courseRow4.append(descriptionAttr);

          });
        });
}
