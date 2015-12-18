
var no_of_current_tabs = 0;
var currWindow = null;

function combine()
{
	chrome.windows.getCurrent(currentWindow);
	console.log("Enters Here");
}

function currentWindow(window)
{
	currWindow = window;
	chrome.tabs.getAllInWindow(currWindow.id, getallTabs);
	console.log("Enters This Callback");
}

function getallTabs(array_of_tabs)
{
		no_of_current_tabs = array_of_tabs.length;
		chrome.windows.getAll({"populate" : true},combineTabs);
		console.log("Enters Callback No.2");
}

function combineTabs(array_of_windows)
{
	for(var i=0;i<array_of_windows.length;i++)
	{
		if(array_of_windows[i].id != currWindow.id)
		{
			for(var j=0;j<array_of_windows[i].tabs.length;j++)
			{
				no_of_current_tabs++;
				chrome.tabs.move(array_of_windows[i].tabs[j].id,{"windowId":currWindow.id,"index":no_of_current_tabs});
				console.log(array_of_windows[i].tabs[j].id)
			}
		}
	}
}

chrome.browserAction.onClicked.addListener(combine);

