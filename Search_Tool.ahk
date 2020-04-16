#SingleInstance, Force
SetWorkingDir, %A_ScriptDir%

#Include, %A_ScriptDir%/src/view/gui.ahk

BtnStart:
    Gui, Submit, NoHide

    ; configPath := % A_ScriptDir . "\src\assets\config.ini"
    configPath := "C:\Users\raull\config.ini"
    if FileExist(configPath)
        try FileDelete, %configPath%

    Sleep, 1000
    IniWrite, %SearchTag%, %configPath%, CONFIGURATION, MainTag
    IniWrite, %Pages%, %configPath%, CONFIGURATION, PagesToSearch
    Sleep, 500

    Run, index-win.exe
    
    if (ErrorLevel = "ERROR")
        MsgBox, 16,, The software found an error trying to execute the program. Please check files.

    Return


BtnExit:
    MsgBox, 64,, You clicked the exit button!
    ExitApp


Esc::
    ExitApp
    Return