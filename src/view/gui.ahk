#SingleInstance, Force

Gui, Color, White
Gui, Font, s15, Verdana
Gui, Add, Text, w300 h30, E-Commerce Search Tool
Gui, Font, s8
Gui, Add, GroupBox, w560 h360, Settings

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y100 w75 h35, Search Tag
Gui, Font, s8, Verdana
Gui, Add, Edit, x125 y100 w300 h20 vSearchTag

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y140 w147 h35, Total Pages to Search
Gui, Font, s8, Verdana
Gui, Add, Edit, x195 y140 w50 h20 vPages

Gui, Font, s10, Verdana
Gui, Add, Text, x35 y200 w105 h20, Export Data As
Gui, Add, Radio, x55 y230 w160 h20 vTextRadio Checked, Text File (.txt)

Gui, Font, s10 w700
Gui, Add, Text, x240 y320 w109 h20, Reading Page:
Gui, Font
Gui, Font, s10, Verdana
Gui, Add, Text, x353 y320 w105 h20 vCurrentPage
Gui, Add, Progress, x38 y350 w520 h40 -Smooth vProccessProgress, 0

Gui, Font, s10
Gui, Add, Button, x135 y435 w105 h35 vBtnStart gBtnStart, Start Search
Gui, Add, Button, x360 y435 w105 h35 vBtnExit gBtnExit, Exit

Gui, Show, w600 h500, E-Commerce Search Tool
return