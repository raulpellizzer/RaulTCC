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
            RunProcess(executableName)

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


BtnExit:
    ; Implement, maybe
    ExitApp


Esc::
    ExitApp
    Return


SetConfig(configPath, userSearchTag, totalPages) {
    Sleep, 100
    IniWrite, %userSearchTag%, %configPath%, CONFIGURATION, MainTag
    IniWrite, %totalPages%, %configPath%, CONFIGURATION, PagesToSearch
    Sleep, 100
}

RunProcess(executableName) {
    RunWait, %executableName%

    if (ErrorLevel = "ERROR") {
        MsgBox, 16,, The software found an error trying to execute the program. Please check files.
        return
    }
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