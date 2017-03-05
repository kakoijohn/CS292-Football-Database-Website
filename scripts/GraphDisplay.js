var footballData;

d3.csv("../data/FootballDataDumps.csv", function(footballData) {
	this.footballData = footballData;

	createChart();
});

function createChart() {
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {
		'packages' : [ 'corechart', 'table' ]
	}, 'visualization');

	// Set a callback to run when the Google Visualization API is loaded.
	google.charts.setOnLoadCallback(drawChart);

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and
	// draws it.
	var table;

	function drawChart() {
		var cssClassNames = {
			'headerRow' : '',
			'tableRow' : '',
			'oddTableRow' : '',
			'selectedTableRow' : '',
			'hoverTableRow' : 'hover',
			'headerCell' : 'small-cell',
			'tableCell' : '',
			'rowNumberCell' : ''
		};

		// Create the data table.
		var data = new google.visualization.DataTable();
		var options = {
			'showRowNumber' : true,
			'showColumnNumber' : true,
			'allowHtml' : true,
			'cssClassNames' : cssClassNames,
			width : '100%',
			height : '100%'
		};

		for (var i = 0; i < footballData.length; i++) {
			data.addColumn('string', ("00" + footballData[i]["Yard Line"])
					.slice(-2));
		}

		data.addRows(15);
		var i = 0;
		footballData.forEach(function(row) {
			for (var j = 1; j <= 15; j++) {
				var goForIt = row["4th & " + j + ": GFI"];
				var fieldGoal = row["4th & " + j + ": FG"];
				var punt = row["4th & " + j + ": P"];

				var max = Math.max(goForIt, fieldGoal, punt);
				var cellVal = 0;

				if (max == goForIt) {
					cellVal = 0;
				} else if (max == fieldGoal) {
					cellVal = 1;
				} else if (max == punt) {
					cellVal = 2;
				}

				data.setCell(j - 1, i, cellVal + '', '');
			}
			i++;
		});

		var formatter = new google.visualization.ColorFormat();
		formatter.addRange(0, 1, 'black', 'green');
		formatter.addRange(1, 2, 'black', 'red');
		formatter.addRange(2, 3, 'black', 'yellow');

		for (var i = 0; i < footballData.length; i++)
			formatter.format(data, i);

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.Table(document
				.getElementById('chart_div'));
		chart.draw(data, options);

		$("td.google-visualization-table-td.google-visualization-table-seq")
				.each(function(e) {
					console.log($(this).text("4th & " + $(this).text()));
				});

		$("td.google-visualization-table-td").mouseover(
				function() {
					$(this).addClass('hover');

					var col = $(this).parent().children().index($(this));
					var row = $(this).parent().parent().children().index(
							$(this).parent());

					if (col > 0) {
						var goForItVal = footballData[col - 1]["4th & "
								+ (row + 1) + ": GFI"];
						var fieldGoalVal = footballData[col - 1]["4th & "
								+ (row + 1) + ": FG"];
						var puntVal = footballData[col - 1]["4th & "
								+ (row + 1) + ": P"];
					}

					$(this).attr('title', 'Expected Points for, Go For It: ' + goForItVal + ', Field Goal: ' + fieldGoalVal + ', Punt: ' + puntVal 
								+ ', On 4th & ' + (row + 1)
								+ ', At the  ' + col + ' yard line.');

					//console.log('Row: ' + row + ', Column: ' + col);
					//console.log('GFI: ' + goForItVal + ' FG: ' + fieldGoalVal + ' P: ' + puntVal);
				});

		$("td.google-visualization-table-td").mouseleave(function() {
			$(this).removeClass('hover');
		});

		$('td.google-visualization-table-td').hover(
				function() {
					// Hover over code
					var title = $(this).attr('title');
					$(this).data('tipText', title).removeAttr('title');
					$('<p class="tooltip"></p>').text(title).appendTo('body')
							.fadeIn('slow');
				}, function() {
					// Hover out code
					$(this).attr('title', $(this).data('tipText'));
					$('.tooltip').remove();
				}).mousemove(function(e) {
			var mousex = e.pageX + 20; //Get X coordinates
			var mousey = e.pageY + 10; //Get Y coordinates
			$('.tooltip').css({
				top : mousey,
				left : mousex
			})
		});
		
	}
}