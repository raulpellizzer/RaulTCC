#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/view/gui.ahk

BtnStart:
    Gui, Submit, NoHide
    IniWrite, %SearchTag%, config.ini, SETTINGS, MainTag
    IniWrite, %Pages%, config.ini, SETTINGS, PagesToSearch
    MsgBox, Done
    Return


BtnExit:
    MsgBox, 64,, You clicked the exit button!
    ExitApp


Esc::
    ExitApp
    Return