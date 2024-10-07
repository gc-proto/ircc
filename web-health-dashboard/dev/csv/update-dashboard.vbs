Option Explicit

Dim objShell : Set objShell = CreateObject("WScript.Shell")
Dim currentDir 
currentDir = objShell.CurrentDirectory

ExcelMacroExample

Sub ExcelMacroExample() 

  Dim xlApp : Set xlApp = CreateObject("Excel.Application") 
  Dim xlBook 
  
  xlApp.Visible = true

  Dim download
  download = xlApp.Application.GetOpenFilename
  
  Dim xlFile 
  xlFile = currentDir & "\format-csv-dashboard.xlsm"
  
  Set xlBook = xlApp.Workbooks.Open(xlFile) 
  xlApp.Run "import_csv", CStr(download)
  xlApp.Quit 

  Set xlBook = Nothing 
  Set xlApp = Nothing 

End Sub 