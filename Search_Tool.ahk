#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:
    Gui, Submit, NoHide

    configPath := % A_ScriptDir . "\src\assets\config.ini"
    if FileExist(configPath)
        try FileDelete, %A_ScriptDir%\src\assets\config.ini

    Sleep, 1000
    IniWrite, %SearchTag%, %A_ScriptDir%/src/assets/config.ini, CONFIGURATION, MainTag
    IniWrite, %Pages%, %A_ScriptDir%/src/assets/config.ini, CONFIGURATION, PagesToSearch
    Sleep, 500

    Run, SearchTool.exe
    
    if (ErrorLevel = "ERROR")
        MsgBox, 16,, The software found an error trying to execute the program. Please check files.

    Return


BtnExit:
    MsgBox, 64,, You clicked the exit button!
    ExitApp


Esc::
    ExitApp
    Return