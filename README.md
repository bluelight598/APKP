# APKP

>  Nodejs Android APK包解析器, 获取manifest文件内容

### 功能

*   支持promise和callback
*   支持osx和linux服务端
*   aapt版本: `26.0.0`


```javascript

let apkp = require('apkp')

apkp(filePath).then(data => {
    console.log('success')
    console.log(data)
}).catch(err => {
    console.log('error')
    console.log(err)
})

apkp(filePath, function(err, data) {
    console.log('done!!!!!')
    console.log(err)
    console.log(data)
})
```