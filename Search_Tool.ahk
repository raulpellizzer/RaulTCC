#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:
    Gui, Submit, NoHide
    IniWrite, %SearchTag%, %A_ScriptDir%/src/config.ini, SETTINGS, MainTag
    IniWrite, %Pages%, %A_ScriptDir%/src/config.ini, SETTINGS, PagesToSearch

    Run, SearchTool.exe
    Return


BtnExit:
    MsgBox, 64,, You clicked the exit button!
    ExitApp


Esc::
    ExitApp
    Return