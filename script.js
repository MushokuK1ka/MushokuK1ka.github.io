// 显示当前日期时间
function displayDateTime() {
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        const now = new Date();
        const formatted = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        datetimeElement.textContent = formatted;
    }
}

// 页面加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
    displayDateTime();
    
    // 控制台输出
    console.log('博客已加载！欢迎访问 tsumugi.cc.cd');
});