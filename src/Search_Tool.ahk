#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/view/gui.ahk

BtnStart:
    MsgBox, 64,, You clicked the start button!!
    Return


BtnExit:
    MsgBox, 64,, You clicked the exit button!!
    Return


Esc::
    ExitApp
    Return