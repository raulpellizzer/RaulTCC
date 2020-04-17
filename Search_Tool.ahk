#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:
    Gui, Submit, NoHide

    configPath := "C:\TCC\src\data\config.ini"

    Sleep, 1000
    IniWrite, %SearchTag%, %configPath%, CONFIGURATION, MainTag
    IniWrite, %Pages%, %configPath%, CONFIGURATION, PagesToSearch
    Sleep, 500

    RunWait, index-win.exe
    
    if (ErrorLevel = "ERROR") {
        MsgBox, 16,, The software found an error trying to execute the program. Please check files.
        return
    }

    MsgBox, 64,, The process has ended!

    Return


BtnExit:
    MsgBox, 64,, You clicked the exit button!
    ExitApp


Esc::
    ExitApp
    Return