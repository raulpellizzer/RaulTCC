#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%
SetTitleMatchMode, 2

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:

    try {
        Gui, Submit, NoHide

        GuiControlGet, userSearchTag,, SearchTag
        GuiControlGet, totalPages,, Pages

        configPath      := "C:\TCC\src\data\config.ini"
        executableName  := "index-win.exe"

        canProceed := VerifyInputs(userSearchTag, totalPages)

        if (canProceed) {
            GuiControl, Disable, BtnStart
            GuiControl, Disable, SearchTag
            GuiControl, Disable, Pages

            SetConfig(configPath, userSearchTag, totalPages)
            RunProcess(executableName, configPath)

            MsgBox, 64,, The process has ended! 
            return
        } else {
            errorMessage := "Please fill the input fields in the correct format. The item search field`n"
            errorMessage .= "cannot be empty and the number of pages needs to be a number"

            MsgBox, 16,, % errorMessage
        }

        return
    } catch, err {
        MsgBox, % err.Message
    }

SetConfig(configPath, userSearchTag, totalPages) {
    Sleep, 100
    IniWrite, %userSearchTag%, %configPath%, CONFIGURATION, MainTag
    IniWrite, %totalPages%, %configPath%, CONFIGURATION, PagesToSearch

    IniWrite, 0, %configPath%, CONFIGURATION, CurrentProduct
    IniWrite, -, %configPath%, CONFIGURATION, CurrentPage
    IniWrite, 1, %configPath%, CONFIGURATION, TotalProductsInPage
    IniWrite, No, %configPath%, CONFIGURATION, ProccessEnded
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

ExitApplication() {
    executableName := "index-win.exe"
    try Process, Close, %executableName%
    try Process, Close, chromedriver.exe
    try WinClose, Buscap
    try WinClose, %executableName%
    ExitApp
}

BtnExit:
    MsgBox, 4,, Are you sure you want to exit? No data will be saved!
    IfMsgBox Yes 
        ExitApplication()
    
    Return


Esc::
    ExitApp
    Return