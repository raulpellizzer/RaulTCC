#SingleInstance, Force

Gui, Color, White
Gui, Font, s15, Verdana
Gui, Add, Text, x60 y15 w300 h30, E-Commerce Search Tool
Gui, Font, s8
Gui, Add, GroupBox, x20 y50 w560 h360, Settings

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y100 w75 h35, Search Tag
Gui, Font, s8, Verdana
Gui, Add, Edit, x125 y100 w300 h20 vSearchTag

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y140 w147 h35, Total Pages to Search
Gui, Font, s8, Verdana
Gui, Add, Edit, x195 y140 w50 h20 vPages
Gui, Add, Picture, x20 y10 h30 w30, C:\TCC\src\view\ECommerce.png

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y200 w105 h20, Export Data As
Gui, Add, Radio, x55 y230 w160 h20 vTextRadio Checked, Text File (.txt)
Gui, Add, Radio, x55 y260 w160 h20 vExcelRadio, Excel File (.csv)

Gui, Font
Gui, Font, s10, Verdana
Gui, Add, Text, x353 y320 w105 h20 vCurrentPage
Gui, Add, Progress, x38 y350 w520 h40 -Smooth vProccessProgress, 0

Gui, Font, s10
Gui, Add, Button, x135 y435 w105 h35 vBtnStart gBtnStart, Start Search
Gui, Add, Button, x360 y435 w105 h35 vBtnExit gBtnExit, Exit
Gui, Font, s8
Gui, Add, Text, x330 y25 w80 h15, V. 1.0.0

Gui, Show, w600 h500, E-Commerce Search Tool
return