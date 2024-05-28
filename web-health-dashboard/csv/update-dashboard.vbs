Option Explicit

On Error Resume Next

ExcelMacroExample

Sub ExcelMacroExample() 

  Dim xlApp 
  Dim xlBook 

  Set xlApp = CreateObject("Excel.Application") 
  Set xlBook = xlApp.Workbooks.Open("Z:\test\karine\wurd\web-health-dashboard\csv\format-csv-dashboard.xlsm", 0, True) 
  xlApp.Run "import_csv"
  xlApp.Quit 

  Set xlBook = Nothing 
  Set xlApp = Nothing 

End Sub 