jQuery(document).ready(function($){
	//open the lateral panel
	$('.cd-btn').on('click', function(event){
		event.preventDefault();
		$('.cd-panel').addClass('is-visible');
	});
	//clode the lateral panel
	$('.cd-panel').on('click', function(event){
		if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
			$('.cd-panel').removeClass('is-visible');
			event.preventDefault();
		}
	});

	// Create random Teams
	$("#randomTeamsButton").click(function() {
		console.log("here");
		$.get("/suggestedteams/", function(data) {
	        $("#myOutput").html(data);
	    }, "html");
	});
});

// Navigation Bar
(function () {
    $(function () {
        var SideBAR;
        SideBAR = (function () {
            function SideBAR() {}

            SideBAR.prototype.expandMyMenu = function () {
                return $("nav.sidebar").removeClass("sidebar-menu-collapsed").addClass("sidebar-menu-expanded");
            };

            SideBAR.prototype.collapseMyMenu = function () {
                return $("nav.sidebar").removeClass("sidebar-menu-expanded").addClass("sidebar-menu-collapsed");
            };

            SideBAR.prototype.showMenuTexts = function () {
                return $("nav.sidebar ul a span.expanded-element").show();
            };

            SideBAR.prototype.hideMenuTexts = function () {
                return $("nav.sidebar ul a span.expanded-element").hide();
            };

            SideBAR.prototype.showActiveSubMenu = function () {
                $("li.active ul.level2").show();
                return $("li.active a.expandable").css({
                    width: "100%"
                });
            };

            SideBAR.prototype.hideActiveSubMenu = function () {
                return $("li.active ul.level2").hide();
            };

            SideBAR.prototype.adjustPaddingOnExpand = function () {
                $("ul.level1 li a.expandable").css({
                    padding: "1px 4px 4px 0px"
                });
                return $("ul.level1 li.active a.expandable").css({
                    padding: "1px 4px 4px 4px"
                });
            };

            SideBAR.prototype.resetOriginalPaddingOnCollapse = function () {
                $("ul.nbs-level1 li a.expandable").css({
                    padding: "4px 4px 4px 0px"
                });
                return $("ul.level1 li.active a.expandable").css({
                    padding: "4px"
                });
            };

            SideBAR.prototype.ignite = function () {
                return (function (instance) {
                    return $("#justify-icon").click(function (e) {
                        if ($(this).parent("nav.sidebar").hasClass("sidebar-menu-collapsed")) {
                            instance.adjustPaddingOnExpand();
                            instance.expandMyMenu();
                            instance.showMenuTexts();
                            instance.showActiveSubMenu();
                            $(this).css({
                                color: "#000"
                            });
                        } else if ($(this).parent("nav.sidebar").hasClass("sidebar-menu-expanded")) {
                            instance.resetOriginalPaddingOnCollapse();
                            instance.collapseMyMenu();
                            instance.hideMenuTexts();
                            instance.hideActiveSubMenu();
                            $(this).css({
                                color: "#FFF"
                            });
                        }
                        return false;
                    });
                })(this);
            };

            return SideBAR;

        })();
        return (new SideBAR).ignite();
    });

}).call(this);
// End Navigation Bar

// Sending data to Firebase
// $(document).ready(function() {
// 	if(isAPIAvailable()) {
// 		$('#files').bind('change', handleFileSelect);
// 	}
// });
//
// function isAPIAvailable() {
//       // Check for the various File API support.
//       if (window.File && window.FileReader && window.FileList && window.Blob) {
//         // Great success! All the File APIs are supported.
//         return true;
//     } else {
//         // source: File API availability - http://caniuse.com/#feat=fileapi
//         // source: <output> availability - http://html5doctor.com/the-output-element/
//         document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
//         // 6.0 File API & 13.0 <output>
//         document.writeln(' - Google Chrome: 13.0 or later<br />');
//         // 3.6 File API & 6.0 <output>
//         document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
//         // 10.0 File API & 10.0 <output>
//         document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
//         // ? File API & 5.1 <output>
//         document.writeln(' - Safari: Not supported<br />');
//         // ? File API & 9.2 <output>
//         document.writeln(' - Opera: Not supported');
//         return false;
//     }
// }
//
// function handleFileSelect(evt) {
//       var files = evt.target.files; // FileList object
//       var file = files[0];
//
//       // read the file metadata
//       var output = ''
//       output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
//       output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
//       output += ' - FileSize: ' + file.size + ' bytes<br />\n';
//       output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';
//
//       // read the file contents
//       printTable(file);
//
//       // post the results
//       $('#list').append(output);
//   }
//
//   function printTable(file) {
//   	var reader = new FileReader();
//   	reader.readAsText(file);
//   	reader.onload = function(event){
//   		var csv = event.target.result;
//   		var data = $.csv.toArrays(csv);
//
//   		var studentRef = firebase.database().ref('student');
//   		for(var row in data) {
//   			var newStudentRef = studentRef.push();
//   			var item = 0;
//   			if(row!=0){
//   				newStudentRef.set({
//   					Name: data[row][item],
//   					Sex: data[row][item+1],
//   					GPA: data[row][item+2],
//   					Schedule: data[row][item+3],
//   					Age: data[row][item+4],
//   					College: data[row][item+5],
//   					Programming_Copy_1: data[row][item+6],
//   					Drawing_Copy_1: data[row][item+7],
//   					Leadership: data[row][item+8],
//   					Leadership_Pref: data[row][item+9],
//   					Car: data[row][item+10],
//   					Committment: data[row][item+11],
//   					Visual_Design: data[row][item+12],
//   					English: data[row][item+13],
//   					Language: data[row][item+14]
//
//   				});
//
//   			}
//
//
//   		}
//   	};
//   	reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
//   }
	// end Firebase
