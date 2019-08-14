## 一、进程控制：

|函数名|描述|文件|
| ----- | ------------- | ----- |
fork|创建一个新进程|kernel/fork.c
clone|按指定条件创建子进程|kernel/fork.c
execve|运行可执行文件|fs/exec.c
exit|中止进程|kernel/exit.c
_exit|立即中止当前进程|
getdtablesize|进程所能打开的最大文件数|kernel/sys.c
getpgid|获取指定进程组标识号|kernel/sys.c
setpgid|设置指定进程组标志号|kernel/sys.c
getpgrp|获取当前进程组标识号|kernel/sys.c
setpgrp|设置当前进程组标志号|kernel/sys.c
getpid|获取进程标识号|kernel/sys.c
getppid|获取父进程标识号|kernel/sys.c
getpriority|获取调度优先级|kernel/sys.c
setpriority|设置调度优先级|kernel/sys.c
modify_ldt|读写进程的本地描述表|arch/x86/um/ldt.c
nanosleep|使进程睡眠指定的时间|kernel/hrtimer.c
nice|改变分时进程的优先级|
pause|挂起进程，等待信号|kernel/signal.c
personality|设置进程运行域|kernel/exec_domain.c
prctl|对进程进行特定操作|kernel/sys.c
ptrace|进程跟踪|kernel/ptrace.c
sched_get_priority_max|取得静态优先级的上限|kernel/sched/core.c
sched_get_priority_min|取得静态优先级的下限|kernel/sched/core.c
sched_getparam|取得进程的调度参数|kernel/sched/core.c
sched_getscheduler|取得指定进程的调度策略|kernel/sched/core.c
sched_rr_get_interval|取得按RR算法调度的实时进程的时间片长度|kernel/sched/core.c
sched_setparam|设置进程的调度参数|kernel/sched/core.c
sched_setscheduler|设置指定进程的调度策略和参数|kernel/sched/core.c
sched_yield|进程主动让出处理器,并将自己等候调度队列队尾|kernel/sched/core.c
vfork|创建一个子进程，以供执行新程序，常与execve等同时使用|kernel/fork.c
wait|等待子进程终止|
wait3|参见wait|
waitpid|等待指定子进程终止|
wait4|参见waitpid|kernel/exit.c
capget|获取进程权限|kernel/capability.c
capset|设置进程权限|kernel/capability.c
getsid|获取会晤标识号|kernel/sys.c
setsid|设置会晤标识号|kernel/sys.c

## 二、文件系统控制

|函数名|描述|文件|
| ----- | ------------- | ----- |
fcntl|文件控制|fs/fcntl.c
open|打开文件|fs/open.c
creat|创建新文件|fs/open.c
close|关闭文件描述字|fs/open.c
read|读文件|fs/read_write.c
write|写文件|fs/read_write.c
readv|从文件读入数据到缓冲数组中|fs/read_write.c
writev|将缓冲数组里的数据写入文件|fs/read_write.c
pread|对文件随机读|fs/read_write.c
pwrite|对文件随机写|fs/read_write.c
lseek|移动文件指针|fs/read_write.c
_llseek|在64位地址空间里移动文件指针|
dup|复制已打开的文件描述字|fs/file.c
dup2|按指定条件复制文件描述字|fs/file.c
flock|文件加/解锁|fs/locks.c
poll|I/O多路转换|fs/select.c
truncate|截断文件|fs/open.c
ftruncate|参见truncate|fs/open.c
umask|设置文件权限掩码|kernel/sys.c
fsync|把文件在内存中的部分写回磁盘|fs/sync.c
access|确定文件的可存取性|fs/open.c
chdir|改变当前工作目录|fs/open.c
fchdir|参见chdir|fs/open.c
chmod|改变文件方式|fs/open.c
fchmod|参见chmod|fs/open.c
chown|改变文件的属主或用户组|fs/open.c
fchown|参见chown|fs/open.c
lchown|参见chown|fs/open.c
chroot|改变根目录|fs/open.c
stat|取文件状态信息|fs/stat.c
lstat|参见stat|fs/stat.c
fstat|参见stat|fs/stat.c
statfs|取文件系统信息|fs/statfs.c
fstatfs|参见statfs|fs/statfs.c
readdir|读取目录项|
getdents|读取目录项|fs/readdir.c
mkdir|创建目录|fs/namei.c
mknod|创建索引节点|fs/namei.c
rmdir|删除目录|fs/namei.c
rename|文件改名|fs/namei.c
link|创建链接|fs/namei.c
symlink|创建符号链接|fs/namei.c
unlink|删除链接|fs/namei.c
readlink|读符号链接的值|fs/stat.c
mount|安装文件系统|fs/namespace.c
umount|卸下文件系统|
ustat|取文件系统信息|fs/statfs.c
utime|改变文件的访问修改时间|fs/utimes.c
utimes|参见utime|fs/utimes.c
quotactl|控制磁盘配额|fs/quota/quota.c

## 三、系统控制

函数名|描述|文件|
| ----- | ------------- | ----- |
ioctl|I/O总控制函数|fs/ioctl.c
_sysctl|读/写系统参数|kernel/sysctl_binary.c
acct|启用或禁止进程记账|kernel/acct.c
getrlimit|获取系统资源上限|kernel/sys.c
setrlimit|设置系统资源上限|kernel/sys.c
getrusage|获取系统资源使用情况|kernel/sys.c
uselib|选择要使用的二进制函数库|fs/exec.c
ioperm|设置端口I/O权限|arch/x86/kernel/ioport.c
iopl|改变进程I/O权限级别|arch/x86/kernel/ioport.c
outb|低级端口操作|
reboot|重新启动|kernel/reboot.c
swapon|打开交换文件和设备|mm/swapfile.c
swapoff|关闭交换文件和设备|mm/swapfile.c
bdflush|控制bdflush守护进程|
sysfs|取核心支持的文件系统类型|fs/filesystems.c
sysinfo|取得系统信息|kernel/sys.c
adjtimex|调整系统时钟|kernel/time.c
alarm|设置进程的闹钟|kernel/timer.c
getitimer|获取计时器值|kernel/itimer.c
setitimer|设置计时器值|kernel/itimer.c
gettimeofday|取时间和时区|kernel/time.c
settimeofday|设置时间和时区|kernel/time.c
stime|设置系统日期和时间|
time|取得系统时间|
times|取进程运行时间|kernel/sys.c
uname|获取当前UNIX系统的名称、版本和主机等信息|kernel/sys.c
vhangup|挂起当前终端|fs/open.c
nfsservctl|对NFS守护进程进行控制|
vm86|进入模拟8086模式|
create_module|创建可装载的模块项|
delete_module|删除可装载的模块项|kernel/module.c
init_module|初始化模块|kernel/module.c
query_module|查询模块信息|
*get_kernel_syms|取得核心符号,已被query_module代替|

## 四、内存管理

函数名|描述|文件|
| ----- | ------------- | ----- |
brk|改变数据段空间的分配|mm/mmap.c
sbrk|参见brk|
mlock|内存页面加锁|mm/mlock.c
munlock|内存页面解锁|mm/mlock.c
mlockall|调用进程所有内存页面加锁|mm/mlock.c
munlockall|调用进程所有内存页面解锁|mm/mlock.c
mmap|映射虚拟内存页|arch/x86/kernel/sys_x86_64.c
munmap|去除内存页映射|mm/mmap.c
mremap|重新映射虚拟内存地址|mm/mmap.c
msync|将映射内存中的数据写回磁盘|mm/msync.c
mprotect|设置内存映像保护|mm/mprotect.c
getpagesize|获取页面大小|
sync|将内存缓冲区数据写回硬盘|fs/sync.c
cacheflush|将指定缓冲区中的内容写回磁盘|

## 五、网络管理

函数名|描述|文件|
| ----- | ------------- | ----- |
getdomainname|取域名|
setdomainname|设置域名|kernel/sys.c
gethostid|获取主机标识号|
sethostid|设置主机标识号|
gethostname|获取本主机名称|
sethostname|设置主机名称|kernel/sys.c
## 六、socket控制

函数名|描述|文件|
| ----- | ------------- | ----- |
socketcall|socket系统调用|
socket|建立socket|net/socket.c
bind|绑定socket到端口|net/socket.c
connect|连接远程主机|net/socket.c
accept|响应socket连接请求|net/socket.c
send|通过socket发送信息|
sendto|发送UDP信息|net/socket.c
sendmsg|参见send|net/socket.c
recv|通过socket接收信息|
recvfrom|接收UDP信息|net/socket.c
recvmsg|参见recv|net/socket.c
listen|监听socket端口|net/socket.c
select|对多路同步I/O进行轮询|fs/select.c
shutdown|关闭socket上的连接|net/socket.c
getsockname|取得本地socket名字|net/socket.c
getpeername|获取通信对方的socket名字|net/socket.c
getsockopt|取端口设置|net/socket.c
setsockopt|设置端口参数|net/socket.c
sendfile|在文件或端口间传输数据|fs/read_write.c
socketpair|创建一对已联接的无名socket|net/socket.c

## 七、用户管理

函数名|描述|文件|
| ----- | ------------- | ----- |
getuid|获取用户标识号|kernel/sys.c
setuid|设置用户标志号|kernel/sys.c
getgid|获取组标识号|kernel/sys.c
setgid|设置组标志号|kernel/sys.c
getegid|获取有效组标识号|kernel/sys.c
setegid|设置有效组标识号|kernel/sys.c
geteuid|获取有效用户标识号|kernel/sys.c
seteuid|设置有效用户标识号|kernel/sys.c
setregid|分别设置真实和有效的的组标识号|kernel/sys.c
setreuid|分别设置真实和有效的用户标识号|kernel/sys.c
getresgid|分别获取真实的,有效的和保存过的组标识号|kernel/sys.c
setresgid|分别设置真实的,有效的和保存过的组标识号|kernel/sys.c
getresuid|分别获取真实的,有效的和保存过的用户标识号|kernel/sys.c
setresuid|分别设置真实的,有效的和保存过的用户标识号|kernel/sys.c
setfsgid|设置文件系统检查时使用的组标识号|kernel/sys.c
setfsuid|设置文件系统检查时使用的用户标识号|kernel/sys.c
getgroups|获取后补组标志清单|kernel/groups.c
setgroups|设置后补组标志清单|kernel/groups.c

## 八、进程间通信

函数名|描述|文件|
| ----- | ------------- | ----- |
ipc|进程间通信总控制调用|
**1、信号**|
sigaction|设置对指定信号的处理方法|
sigprocmask|根据参数对信号集中的信号执行阻塞/解除阻塞等操作|
sigpending|为指定的被阻塞信号设置队列|
sigsuspend|挂起进程等待特定信号|
signal|参见signal|
kill|向进程或进程组发信号|kernel/signal.c
*sigblock|向被阻塞信号掩码中添加信号,已被sigprocmask代替|
*siggetmask|取得现有阻塞信号掩码,已被sigprocmask代替|
*sigsetmask|
*sigmask|将给定的信号转化为掩码,已被sigprocmask代替|
*sigpause|作用同sigsuspend,已被sigsuspend代替|
sigvec|为兼容BSD而设的信号处理函数,作用类似sigaction|
ssetmask|ANSI C的信号处理函数,作用类似sigaction|
**2、消息**|
msgctl|消息控制操作|ipc/msg.c
msgget|获取消息队列|ipc/msg.c
msgsnd|发消息|ipc/msg.c
msgrcv|取消息|ipc/msg.c
**3、管道**||
pipe|创建管道|fs/pipe.c
**4、信号量**||
semctl|信号量控制|ipc/sem.c
semget|获取一组信号量|ipc/sem.c
semop|信号量操作|ipc/sem.c
**5、共享内存**||
shmctl|控制共享内存|ipc/shm.c
shmget|获取共享内存|ipc/shm.c
shmat|连接共享内存|ipc/shm.c
shmdt|拆卸共享内存|ipc/shm.c送信息|
sendto|发送UDP信息|net/socket.c
sendmsg|参见send|net/socket.c
recv|通过socket接收信息|
recvfrom|接收UDP信息|net/socket.c
recvmsg|参见recv|net/socket.c
listen|监听socket端口|net/socket.c
select|对多路同步I/O进行轮询|fs/select.c
shutdown|关闭socket上的连接|net/socket.c
getsockname|取得本地socket名字|net/socket.c
getpeername|获取通信对方的socket名字|net/socket.c
getsockopt|取端口设置|net/socket.c
setsockopt|设置端口参数|net/socket.c
sendfile|在文件或端口间传输数据|fs/read_write.c
socketpair|创建一对已联接的无名socket|net/socket.c

## 七、用户管理

函数名|描述|文件
| ----- | ------------- | ----- |
getuid|获取用户标识号|kernel/sys.c
setuid|设置用户标志号|kernel/sys.c
getgid|获取组标识号|kernel/sys.c
setgid|设置组标志号|kernel/sys.c
getegid|获取有效组标识号|kernel/sys.c
setegid|设置有效组标识号|kernel/sys.c
geteuid|获取有效用户标识号|kernel/sys.c
seteuid|设置有效用户标识号|kernel/sys.c
setregid|分别设置真实和有效的的组标识号|kernel/sys.c
setreuid|分别设置真实和有效的用户标识号|kernel/sys.c
getresgid|分别获取真实的,有效的和保存过的组标识号|kernel/sys.c
setresgid|分别设置真实的,有效的和保存过的组标识号|kernel/sys.c
getresuid|分别获取真实的,有效的和保存过的用户标识号|kernel/sys.c
setresuid|分别设置真实的,有效的和保存过的用户标识号|kernel/sys.c
setfsgid|设置文件系统检查时使用的组标识号|kernel/sys.c
setfsuid|设置文件系统检查时使用的用户标识号|kernel/sys.c
getgroups|获取后补组标志清单|kernel/groups.c
setgroups|设置后补组标志清单|kernel/groups.c

## 八、进程间通信

函数名|描述|文件
| ----- | ------------- | ----- |
ipc|进程间通信总控制调用|
**1、信号**||
sigaction|设置对指定信号的处理方法|
sigprocmask|根据参数对信号集中的信号执行阻塞/解除阻塞等操作|
sigpending|为指定的被阻塞信号设置队列|
sigsuspend|挂起进程等待特定信号|
signal|参见signal|
kill|向进程或进程组发信号|kernel/signal.c
*sigblock|向被阻塞信号掩码中添加信号,已被sigprocmask代替|
*siggetmask|取得现有阻塞信号掩码,已被sigprocmask代替|
*sigsetmask|
*sigmask|将给定的信号转化为掩码,已被sigprocmask代替|
*sigpause|作用同sigsuspend,已被sigsuspend代替|
sigvec|为兼容BSD而设的信号处理函数,作用类似sigaction|
ssetmask|ANSI C的信号处理函数,作用类似sigaction|
**2、消息**||
msgctl|消息控制操作|ipc/msg.c
msgget|获取消息队列|ipc/msg.c
msgsnd|发消息|ipc/msg.c
msgrcv|取消息|ipc/msg.c
**3、管道**||
pipe|创建管道|fs/pipe.c
**4、信号量**||
semctl|信号量控制|ipc/sem.c
semget|获取一组信号量|ipc/sem.c
semop|信号量操作|ipc/sem.c
**5、共享内存**||
shmctl|控制共享内存|ipc/shm.c
shmget|获取共享内存|ipc/shm.c
shmat|连接共享内存|ipc/shm.c
shmdt|拆卸共享内存|ipc/shm.c
