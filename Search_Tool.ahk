#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:
    Gui, Submit, NoHide

    configPath := % A_ScriptDir . "\src\config.ini"
    if FileExist(configPath)
        try FileDelete, %A_ScriptDir%\src\config.ini

    Sleep, 500
    IniWrite, %SearchTag%, %A_ScriptDir%/src/config.ini, SETTINGS, MainTag
    IniWrite, %Pages%, %A_ScriptDir%/src/config.ini, SETTINGS, PagesToSearch
    Sleep, 500

    Run, SearchTool.exe
    Return


BtnExit:
    MsgBox, 64,, You clicked the exit button!
    ExitApp


Esc::
    ExitApp
    Return