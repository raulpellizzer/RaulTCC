#SingleInstance, Force

Gui, Font, s15, Verdana
Gui, Add, Text, w300 h30, E-Commerce Search Tool
Gui, Font, s8
Gui, Add, GroupBox, w560 h260, Settings

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y100 w75 h35, Search Tag
Gui, Font, s8, Verdana
Gui, Add, Edit, x125 y100 w300 h20

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y140 w147 h35, Total Pages to Search
Gui, Font, s8, Verdana
Gui, Add, Edit, x195 y140 w50 h20

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y200 w105 h20, Export Data As
Gui, Add, Radio, x55 y230 w160 h20 vTextRadio, Text File (.txt)
Gui, Add, Radio, x55 y260 w160 h20 vExcelRadio, Excel File (.xlsx)

Gui, Font, s10
Gui, Add, Button, x150 y335 w105 h35 vBtnStart gBtnStart, Start Search
Gui, Add, Button, x330 y335 w105 h35 vBtnExit gBtnExit, Exit

Gui, Show, w600 h400, E-Commerce Search Tool
return