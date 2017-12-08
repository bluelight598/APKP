# APKP

>>  Nodejs Android APK包解析器

*   支持promise和callback
*   支持osx和linux服务端

```
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