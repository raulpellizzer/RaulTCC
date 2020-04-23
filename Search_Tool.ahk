#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%
SetTitleMatchMode, 2

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:

    try {
        Gui, Submit, NoHide

        if FileExist("C:\TCC\src\data\Search.txt")
            FileDelete, C:\TCC\src\data\Search.txt

        GuiControlGet, userSearchTag,, SearchTag
        GuiControlGet, totalPages,, Pages

        configPath      := "C:\TCC\src\data\config.ini"
        executablePath  := "C:\TCC\index-win.exe"
        executableName  := "index-win.exe"

        VerifyFiles(configPath, executablePath)
        canProceed := VerifyInputs(userSearchTag, totalPages)
        if (canProceed) {
            GuiControl, Disable, BtnStart
            GuiControl, Disable, SearchTag
            GuiControl, Disable, Pages

            SetConfig(configPath, userSearchTag, totalPages)
            RunProcess(executableName, configPath)

            ExitApplication()
        } else {
            errorMessage := "Please fill the input fields in the correct format. The item search field`n"
            errorMessage .= "cannot be empty and the number of pages needs to be a number"

            MsgBox, 16,, % errorMessage
            ExitApplication()
        }

        ExitApp
    } catch, err {
        MsgBox, % err.Message
    }

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
            Sleep, 1000
            processEnded := GetProccessStatuses(configPath)
        }
    }
}

GetProccessStatuses(configPath) {
    IniRead, processStatuses, %configPath%, CONFIGURATION, ProccessEnded
    return processStatuses
}

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

GetCurrentStep(configPath) {
    IniRead, CurrentProduct, %configPath%, CONFIGURATION, CurrentProduct
    IniRead, TotalProductsInPage, %configPath%, CONFIGURATION, TotalProductsInPage
    IniRead, currentPage, %configPath%, CONFIGURATION, CurrentPage

    return {"CurrentProduct": CurrentProduct
        , "TotalProductsInPage": TotalProductsInPage
        , "currentPage": currentPage}
}

UpdateProgressBar(configPath) {
    currentStep := GetCurrentStep(configPath)
    currentPage := currentStep.currentPage

    frac := Ceil(100/currentStep.TotalProductsInPage)
    step := (frac*currentStep.CurrentProduct)

    GuiControl,, ProccessProgress, %step%
    GuiControl,, CurrentPage, %currentPage%
}

CloseProccesses() {
    executableName := "index-win.exe"

    try Process, Close, %executableName%
    try Process, Close, chromedriver.exe
    try WinClose, Buscap
    try WinClose, %executableName%
}

SetExitingTextMessage() {
    empty := ""
    GuiControl,, ProccessStatus, Exiting ..
    GuiControl,, CurrentPage, %empty%
}

ExitApplication() {
    SetExitingTextMessage()
    configPath      := "C:\TCC\src\data\config.ini"
    reportPath      := "C:\TCC\src\data\Search.txt"
    executableName  := "index-win.exe"
    IniWrite, Yes, %configPath%, CONFIGURATION, ExitProcess
    
    while !FileExist(reportPath) {
        Sleep, 500
    }

    CheckModificationFile(reportPath)
    CloseProccesses()
    MsgBox, 64,, The process has ended!
}

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
    
    ExitApp