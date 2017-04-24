var searchBtn = document.getElementById("findCourses-btn");
    if (searchBtn.addEventListener)
        searchBtn.addEventListener("click", generateTable, false);
    else if (searchBtn.attachEvent)
        searchBtn.attachEvent('onclick', generateTable);

function getData(){
  var testTime = "10_00A";
  // Returns list of objects: [{},{},{},{},{}]
  $.getJSON('http://34.200.240.84:3000/course',
  {
    time:testTime,
    days: "W",
    cr: "3"
  }, function( data ) {
       console.log(data);
  });
}

function generateTable() {
  getData()
  // This code tests to see if we are appropriately getting the dropdown menu items
  var start = $("#start option:selected").text();
  var end = $("#end option:selected").text();
  var dept = $("#dept option:selected").text();
  var days = $("#days option:selected").text();
  var queryString = "34.200.240.84:3000/course?time=" + start + "&days=" + days + "&c=" + dept +
  "&u=1";
  console.log(queryString);

  // Append divs to the page displaying the selected items
  //TEMP STUFF
  // $('<div>' + queryString + '</div>').appendTo(document.getElementById("body"));
  // $('<div>' + end + '</div>').appendTo(document.getElementById("body"));
  // $('<div>' + dept + '</div>').appendTo(document.getElementById("body"));
  // $('<div>' + days + '</div>').appendTo(document.getElementById("body"));

  // Hardcoded toy data, meant to emulate JSON response data
  var data3 = $.getJSON(queryString);


  var data2=[{
          "code": "E62 BME 559",
          "Description": " This course covers several of the fundamental theories of solid mechanics that are needed to solve problems in biomechanics. The theories of nonlinear elasticity, viscoelasticity, and poroelasticity are applied to a large range of biological tissues including bone, articular cartilage, blood vessels, the heart, skeletal muscle, and red blood cells. Other topics include muscle activation, the biomechanics of development and functional adaptation, and the mechanics of hearing. Prerequisites: BME240 and ESE317 or ESE 318 and 319 or permission of instructor.\n",
           "Title": "Intermediate Biomechanics 1",
           "Date": "M-W----",
           "Credits": 3,
           "Time": "11:30A-1:00P",
           "Instructor": "Shao"
        },
        {
          "code": "E62 BME 559",
          "Description": " This course covers several of the fundamental theories of solid mechanics that are needed to solve problems in biomechanics. The theories of nonlinear elasticity, viscoelasticity, and poroelasticity are applied to a large range of biological tissues including bone, articular cartilage, blood vessels, the heart, skeletal muscle, and red blood cells. Other topics include muscle activation, the biomechanics of development and functional adaptation, and the mechanics of hearing. Prerequisites: BME240 and ESE317 or ESE 318 and 319 or permission of instructor.\n",
           "Title": "Intermediate Biomechanics 2",
           "Date": "M-W----",
           "Credits": 3,
           "Time": "11:30A-1:10P",
           "Instructor": "Shao"
        },
        {
          "code": "E62 CSE 559",
          "Description": " This course covers several of the fundamental theories of solid mechanics that are needed to solve problems in biomechanics. The theories of nonlinear elasticity, viscoelasticity, and poroelasticity are applied to a large range of biological tissues including bone, articular cartilage, blood vessels, the heart, skeletal muscle, and red blood cells. Other topics include muscle activation, the biomechanics of development and functional adaptation, and the mechanics of hearing. Prerequisites: BME240 and ESE317 or ESE 318 and 319 or permission of instructor.\n",
           "Title": "Intermediate Biomechanics 3",
           "Date": "M-W----",
           "Credits": 3,
           "Time": "11:20A-1:00P",
           "Instructor": "Shao"
        },
        {
          "code": "E62 BME 559",
          "Description": " This course covers several of the fundamental theories of solid mechanics that are needed to solve problems in biomechanics. The theories of nonlinear elasticity, viscoelasticity, and poroelasticity are applied to a large range of biological tissues including bone, articular cartilage, blood vessels, the heart, skeletal muscle, and red blood cells. Other topics include muscle activation, the biomechanics of development and functional adaptation, and the mechanics of hearing. Prerequisites: BME240 and ESE317 or ESE 318 and 319 or permission of instructor.\n",
           "Title": "Intermediate Biomechanics 4",
           "Date": "M-W----",
           "Credits": 3,
           "Time": "11:20A-1:00P",
           "Instructor": "Shao"
        }]





        // Remove the table from the last time the button was pressed
        $("#display tr").remove();



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



        $.each(data3, function(index, jsonObject) {
          console.log(data3);
          var codeAttr, descriptionAttr, courseTitleHeader, daysAttr, creditsAttr, timeAttr, professorAttr;
          var counter = 0;
          /*
          // Returns an array of strings, where each entry is word from the CourseCode entry in the JSON data
          // i.e. "CSE 345" ---> ["CSE", "345"].  We can then check the array for the desired dept. code.
          code = jsonObject.code.split(" ");

          // Separate the beginning and end times from the JSON response
          times = jsonObject.Time.split("-");
          startResponse = times[0];
          endResponse = times[1];
          */
          var $courseDiv = $("<div>", {class: "singleCourse"});//
          var $courseRow1 = $("<div>", {class: "col-sm-12 courseRow1"});//first row
          var $courseRow2 = $("<div>", {class: "col-sm-12 courseRow2"});//second row
          var $courseRow3 = $("<div>", {class: "col-sm-12 courseRow3"});//third row
          var $courseRow4 = $("<div>", {class: "col-sm-12 courseRow4"});//fourth row

          $courseDiv.append($courseRow1);
          $courseDiv.append($courseRow2);
          $courseDiv.append($courseRow3);
          $courseDiv.append($courseRow4);
          //$courseDiv.appendTo(document.getElementById("body"));
          $courseDiv.appendTo(document.getElementById("display"));

          //  To get the beginning and end times separated:
          //  1.)  Split JSON Time val on '-' character
          //  2.)  Convert to military time:  i.e. 11:30A --> 1130,  1:00P -->  1300
          //       2.a)   Check for 'A' or 'P', and strip it
          //       2.b)   Remove colon, add 1200 to number if it has a 'P'
          //  3.)  Append data rows for all those entries where REQSTartTime <= RESPSTart && REQEndTime >= RESPEnd

          //if (code.contains("BME") && startResponse == "11:20A" && endResponse == "1:00P") {
            $.each(jsonObject, function(key, val) {
              //$('<tr><td>'+key+'</td><td id="'+key+'">'+val+'</td><tr>').appendTo(document.getElementById("display"));
              console.log(key + ": " + val);

              switch(key){
                case "code":
                  //Course Code
                  var code = "Course code: " + val;
                  codeAttr = $('<h3>' + code + '</h3>').attr('class', 'col-md-6 courseCode');
                  break;
                case "Description":
                  //Description
                  var description = key + ": " + val;
                  descriptionAttr = $('<p>' + description + '</p>').attr('class', 'col-md-12 description');
                  break;
                case "Title":
                  //Course Title
                  var title = val;
                  courseTitleHeader = $('<h2>' + title + '</h2>').attr('class', 'col-md-12 title');

                case "Date":
                  //Date
                  var days = "Days: " + val;
                  daysAttr = $('<h4>' + days + '</h4>').attr('class', 'col-md-4 days');

                case "Credits":
                  //Credits
                  var credits = key + ": " + val;
                  creditsAttr = $('<h4>' + credits + '</h4>').attr('class', 'col-md-4 credits');

                case "Time":
                  //Time
                  var time = key + ": " + val;
                  timeAttr = $('<h4>' + time + '</h4>').attr('class', 'col-md-4 time');

                case "Instructor":
                  //Professor
                  var prof = key + ": " + val;
                  professorAttr = $('<h3>' + prof + '</h3>').attr('class', 'col-md-6 instructor');
              }



            });

            $courseRow1.append(courseTitleHeader);
            $courseRow2.append(professorAttr);
            $courseRow2.append(codeAttr);
            $courseRow3.append(daysAttr);
            $courseRow3.append(timeAttr);
            $courseRow3.append(creditsAttr);
            $courseRow4.append(descriptionAttr);

          //}
        });

        /*$.getJSON(queryString, function( data ) {
          console.log("AM I here?!?!");
          console.log(data);
          $.each( data, function( key, val ) {
              //$('<tr><td>'+key+'</td><td id="'+key+'">'+val+'</td><tr>').appendTo(document.getElementById("display"));
          });
        });*/



        /*
  //$("#display tr").remove();
  $.each(data, function(key, val) {
      //$('<tr><td>'+key+'</td><td id="'+key+'">'+val+'</td><tr>').appendTo(document.getElementById("display"));

      switch(key){
        case "Course Code":
          //Course Code
          var code = key + ": " + val;
          codeAttr = $('<h3>' + code + '</h3>').attr('id', 'code').attr('class', 'testClass').attr('class', 'col-md-6');
          break;
        case "Description":
          //Description
          var description = key + ": " + val;
          descriptionAttr = $('<p>' + description + '</p>').attr('id', 'description');
          break;
        case "Title":
          //Course Title
          var title = val;
          courseTitleHeader = $('<h2>' + title + '</h2>').attr('id', 'courseTitle');

        case "Date":
          //Date
          var days = "Days: " + val;
          daysAttr = $('<h4>' + days + '</h4>').attr('id', 'days').attr('class', 'col-md-4');

        case "Credits":
          //Credits
          var credits = key + ": " + val;
          creditsAttr = $('<h4>' + credits + '</h4>').attr('id', 'credits').attr('class', 'col-md-4');

        case "Time":
          //Time
          var time = key + ": " + val;
          timeAttr = $('<h4>' + time + '</h4>').attr('id', 'time').attr('class', 'col-md-4');

        case "Instructor":
          //Professor
          var prof = key + ": " + val;
          professorAttr = $('<h3>' + prof + '</h3>').attr('id', 'professor').attr('class', 'col-md-6');
      }


  });
 */


  // $.getJSON( "https://protected-lowlands-84461.herokuapp.com/universities", function( data ) {
  //   $.each( data, function( key, val ) {
  //       //$('<tr><td>'+key+'</td><td id="'+key+'">'+val+'</td><tr>').appendTo(document.getElementById("display"));
  //   });
  // });
}
