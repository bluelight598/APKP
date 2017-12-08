/**
 *		APKP - 安卓APK解析器，支持callback和promise
 *		@auhtor bluelight598
 *		@version 1.0.0
 *
*/

const os = require('os')
const path = require('path')
const exec = require('child_process').execFileSync

const parseOutput = function(output) {
	if (!output) {
		throw new Error('Can not parse empty output.')
	}
	let result = {}
	let rows = output.split('\n')
	for (let i = 0; i < rows.length; i++) {
		let kvs = rows[i].split(':')
		if (kvs.length == 2) {
			result[kvs[0]] = kvs[1]
		}
	}
	if (result.package) {
		try {
			let packageInfos = result.package.split(' ')
			packageInfos.forEach((el, index) => {
				let kv = []
				if (!!el) {
					kv = el.split('=')
				}
				kv.length == 2 && (result[kv[0]] = kv[1])
			})
		} catch (e) {
			console.warn(`output.package parse error`)
			console.warn(e)
		}
	}
	return result
}

/**
 *	APKParser
 *	@param	{path}	filename	[apk包文件路径(绝对路径)]
 *	@param	{function}	callback	[回调函数(可选)]
 *	@return	{promise}
*/
const APKParser = function(filename, callback) {
	return new Promise((resolve, reject) => {
		let output = null
		let parserPath = null
		if (os.type() === 'Darwin') {
			parserPath = path.join(__dirname, '../bin/osx/aapt')
		} else if (os.type() === 'Linux') {
			parserPath = path.join(__dirname, '../bin/linux/aapt')
		} else {
			throw new Error('Unknown OS Error, OSX and Linux are available only.')
		}
		try {
			output = exec(parserPath, ['dump', 'badging', filename], {
				maxBuffer: 1024 * 1024 * 1024,
				encoding: 'utf8'
			})
			output = parseOutput(output)
			if (typeof callback === 'function') {
				callback(null, output)
			}
			resolve(output)
		} catch (error) {
			if (typeof callback === 'function') {
				callback(error, output)
			}
			reject(error)
		}
	})
}

module.exports = APKParser