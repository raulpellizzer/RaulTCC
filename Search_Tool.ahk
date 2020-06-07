#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%
SetTitleMatchMode, 2

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:

    try {

        ; FAZER VERIFICAÇÃO DO NÚMERO DE PÁGINAS NEGATIVAS !!! CORRIGIR BUG

        Gui, Submit, NoHide

        GuiControlGet, userSearchTag,, SearchTag
        GuiControlGet, totalPages,, Pages

        configPath      := "C:\TCC\src\data\config.ini"
        executablePath  := "C:\TCC\index-win.exe"
        executableName  := "index-win.exe"

        VerifyFiles(configPath, executablePath)
        canProceed := VerifyInputs(userSearchTag, totalPages)
        if (canProceed) {
            Gui, Font, s10 w700
            Gui, Add, Text, x240 y320 w109 h20 vProccessStatus, Reading Page:

            ClearFiles()
            DisableControls()
            SetReportType(configPath)
            SetConfig(configPath, userSearchTag, totalPages)
            RunProcess(executableName, configPath)

            ExitApplication()
        } else {
            errorMessage := "Please fill the input fields in the correct format. The item search field`n"
            errorMessage .= "cannot be empty and the number of pages needs to be a number"

            MsgBox, 16,, % errorMessage
            return
        }

    } catch, err {
        MsgBox, % err.Message
    }

/**
* Check if the necessary files exists before starting
*
* @param configPath String - Path to the configuration file
* @param executablePath String - Path to the executable file
* @returns void
*/
VerifyFiles(configPath, executablePath) {
    if !FileExist(configPath) {
        MsgBox, 16,, Configuration file not found! The application will now exit
        ExitApp
    }

    if !FileExist(executablePath) {
        MsgBox, 16,, Executable file not found! The application will now exit
        ExitApp
    }
}

/**
* Disable controls
*
* @returns void
*/
DisableControls() {
    GuiControl, Disable, BtnStart
    GuiControl, Disable, SearchTag
    GuiControl, Disable, Pages
    GuiControl, Disable, TextRadio
    GuiControl, Disable, ExcelRadio
}

/**
* Sets the report type
*
* @param configPath String - Path to the configuration file
* @returns void
*/
SetReportType(configPath) {
    GuiControlGet, txtRadio,, TextRadio
    GuiControlGet, csvRadio,, ExcelRadio

    if (txtRadio)
        IniWrite, Text, %configPath%, CONFIGURATION, ReportType
    else
        IniWrite, Excel, %configPath%, CONFIGURATION, ReportType
}

/**
* Retrieves the report type
*
* @param configPath String - Path to the configuration file
* @returns String
*/
GetReportType(configPath) {
    IniRead, reportType, %configPath%, CONFIGURATION, ReportType
    return reportType
}

/**
* Set main configurations
*
* @param configPath String - Path to the configuration file
* @param userSearchTag String - Search tag informed by the user
* @param totalPages String - Number of pages for the search
* @returns void
*/
SetConfig(configPath, userSearchTag, totalPages) {
    Sleep, 100
    IniWrite, %userSearchTag%, %configPath%, CONFIGURATION, MainTag
    IniWrite, %totalPages%, %configPath%, CONFIGURATION, PagesToSearch

    IniWrite, 0, %configPath%, CONFIGURATION, CurrentProduct
    IniWrite, -, %configPath%, CONFIGURATION, CurrentPage
    IniWrite, 1, %configPath%, CONFIGURATION, TotalProductsInPage
    IniWrite, No, %configPath%, CONFIGURATION, ProccessEnded
    IniWrite, No, %configPath%, CONFIGURATION, ExitProcess
    Sleep, 100
}


/**
* Erase files, if exists
*
* @returns void
*/
ClearFiles() {
    if FileExist("C:\TCC\src\data\Search.txt")
        FileDelete, C:\TCC\src\data\Search.txt

    if FileExist("C:\TCC\src\data\Search.csv")
        FileDelete, C:\TCC\src\data\Search.csv
}

/**
* Execute main proccess
*
* @param executableName String - Name of the executable file
* @param configPath String - Path to the configuration file
* @returns void
*/
RunProcess(executableName, configPath) {
    Run, %executableName%
    Sleep, 100

    if (ErrorLevel = "ERROR") {
        MsgBox, 16,, The software found an error trying to execute the program. Please check files.
        return
    } else {
        processEnded := GetProccessStatuses(configPath)

        while (processEnded != "Yes") {
            UpdateProgressBar(configPath)
            Sleep, 500
            processEnded := GetProccessStatuses(configPath)
        }
    }
}

/**
* Retrieves the proccess status
*
* @param configPath String - Path to the configuration file
* @returns String
*/
GetProccessStatuses(configPath) {
    IniRead, processStatuses, %configPath%, CONFIGURATION, ProccessEnded
    return processStatuses
}

/**
* Verify the user inputs
*
* @param userSearchTag String - Search tag informed by the user
* @param totalPages String - Number of pages for the search
* @returns Boolean
*/
VerifyInputs(userSearchTag, totalPages) {
    textField    := false
    numberField  := false

    if (userSearchTag != "") {
        textField := true
    }

    if totalPages is integer
        numberField := true

    if (textField == true && numberField == true)
        return true
    else
        return false
}

/**
* Retrieves current step of the proccess
*
* @param configPath String - Path to the configuration file
* @returns object
*/
GetCurrentStep(configPath) {
    IniRead, CurrentProduct, %configPath%, CONFIGURATION, CurrentProduct
    IniRead, TotalProductsInPage, %configPath%, CONFIGURATION, TotalProductsInPage
    IniRead, currentPage, %configPath%, CONFIGURATION, CurrentPage

    return {"CurrentProduct": CurrentProduct
        , "TotalProductsInPage": TotalProductsInPage
        , "currentPage": currentPage}
}

/**
* Updates the ui progress bar
*
* @param configPath String - Path to the configuration file
* @returns void
*/
UpdateProgressBar(configPath) {
    currentStep := GetCurrentStep(configPath)
    currentPage := currentStep.currentPage

    frac := Ceil(100/currentStep.TotalProductsInPage)
    step := (frac*currentStep.CurrentProduct)

    GuiControl,, ProccessProgress, %step%
    GuiControl,, CurrentPage, %currentPage%
}

/**
* Close proccesses
*
* @returns void
*/
CloseProccesses() {
    executableName := "index-win.exe"

    try Process, Close, %executableName%
    try Process, Close, chromedriver.exe
    try WinClose, Buscap
    try WinClose, %executableName%
}

/**
* Set exiting message in ui
*
* @returns void
*/
SetExitingTextMessage() {
    empty := ""
    GuiControl,, ProccessStatus, Exiting ..
    GuiControl,, CurrentPage, %empty%
}

/**
* Terminates Application
*
* @returns void
*/
ExitApplication() {
    SetExitingTextMessage()
    configPath      := "C:\TCC\src\data\config.ini"
    reportType      :=  GetReportType(configPath)

    if (reportType == "Text")
        reportPath := "C:\TCC\src\data\Search.txt"
    else
        reportPath := "C:\TCC\src\data\Search.csv"

    executableName  := "index-win.exe"
    IniWrite, Yes, %configPath%, CONFIGURATION, ExitProcess
    
    while !FileExist(reportPath) {
        Sleep, 500
    }

    CheckModificationFile(reportPath)
    CloseProccesses()
    MsgBox, 64,, The process has ended!
    ExitApp
}

/**
* Check if the report file was recently modified
*
* @param reportPath String - Path to the report file
* @returns void
*/
CheckModificationFile(reportPath) {
    checkOne := ""
    checkTwo := ""

    FileGetTime, checkOne, %reportPath%
    Sleep, 2000
    FileGetTime, checkTwo, %reportPath%

    while (checkOne != checkTwo) {
        FileGetTime, checkOne, %reportPath%
        Sleep, 2500
        FileGetTime, checkTwo, %reportPath%
    }
}

BtnExit:
    MsgBox, 4,, Are you sure you want to exit?
    IfMsgBox Yes 
        ExitApplication()
    return