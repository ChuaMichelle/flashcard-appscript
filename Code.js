// Declare important variables
var scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperty('pageTitle', 'Flashcard Deutsche - English');
scriptProperties.setProperty('excelId', '1PiYS8CncBoeeoQyrnPSB9aNmkK1gwloK88HKVsQdV1I');

// First function that is called upon by a published application
function doGet(){
	return HtmlService.createTemplateFromFile('main').evaluate()
			.setTitle(scriptProperties.getProperty('pageTitle'))
			//.setFaviconUrl('https://goo.gl/EJo2yr?png')
			.setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

// Include files : helps to seperate codes to different files for easier readability
function include(filename) {
	return HtmlService.createHtmlOutputFromFile(filename)
		.getContent();
}

// Get options for the select on the sheet called 'Params'
function getDatas(sheetName) {
    //sheetName = 'Main';
	var sheet = SpreadsheetApp.openById(scriptProperties.getProperty('excelId')).getSheetByName('Main');
	if(sheet == null) {
		return(null);
	}
	else {
		if(sheet.getLastRow() == 0){
			return(null);
		} else {
			var recoveredData = [];
			var data = sheet.getDataRange().getValues();
			for (row in data) {
				if(row == 0) {
					// TODO: Add this to create new data
					var header = data[row].join('~').toLowerCase().replace(/ /g,"_").split('~');
				} else {
					recoveredData[row] = {};
					for (col in data[row]) {
						if(header[col] == "date") {
							recoveredData[row][header[col]] = data[row][col].toLocaleDateString("fr-FR");
						}
						else if(header[col] == "editor") {
                          recoveredData[row][header[col]] = data[row][col] == Session.getActiveUser().getEmail();
						}
						else {
							recoveredData[row][header[col]] = data[row][col];
						}
					}
				}
			}
			recoveredData.shift();
            Logger.log(recoveredData);
			return(recoveredData);
		}
	}
}