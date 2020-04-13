#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/view/gui.ahk

BtnStart:
    Gui, Submit, NoHide
    IniWrite, %SearchTag%, config.ini, SETTINGS, MainTag
    IniWrite, %Pages%, config.ini, SETTINGS, PagesToSearch
    Return


BtnExit:
    ExitApp


Esc::
    ExitApp
    Return