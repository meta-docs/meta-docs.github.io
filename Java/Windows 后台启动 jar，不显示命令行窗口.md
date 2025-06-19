# Windows 后台启动 jar，不显示命令行窗口

## 1 使用 javaw 命令

```bash
javaw -jar zhm-crawler-0.0.1-SNAPSHOT.jar
```

如果通过bat脚本，javaw 命令仍然会短暂显示一个空窗口。这是因为批处理文件本身在执行时会打开一个命令提示符窗口。

## 2 编写 vbs 脚本

启动命令

```shell
Option Explicit
Dim WshShell
Dim CurrentDirectory
Set WshShell = CreateObject("WScript.Shell")
CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = CurrentDirectory

' - 第二个参数：窗口样式参数, 0 表示隐藏窗口;1 (正常窗口);2 (最小化窗口);3 (最大化窗口)
' - 第三个参数：等待参数,False 表示不等待程序执行完成，立即返回控制权; True 等待程序执行完毕后才继续执行后续代码
WshShell.Run "java -jar zhm-crawler-0.0.1-SNAPSHOT.jar", 0, False

MsgBox "Start."
Set WshShell = Nothing
```

停止命令

```shell
Option Explicit
Dim WshShell
Set WshShell = CreateObject("WScript.Shell")
KillPort 8080
' 可选：也可以再调用其他端口
' KillPort 3000
' KillPort 8000
MsgBox "Done."

Set WshShell = Nothing

' ===== 函数定义区域 =====

' 函数：KillPort(port)
' 功能：查找并终止指定端口的进程
Sub KillPort(port)
    Dim cmd
    cmd = "cmd /c for /f ""tokens=5"" %a in ('netstat -ano ^| find "":" & port & """') do taskkill /f /pid %a >nul 2>&1"
    WshShell.Run cmd, 0, True
End Sub
```