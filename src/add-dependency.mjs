// should accept 3 arguments (in order):
// - path to package.json
// - dependency name
// - dependency version
// should add specified dependency to `dependencies` of specified package.json

import {readFile, writeFile} from 'node:fs/promises'
import { argv } from 'node:process'


function addDependency1(path, name, version) {
    readFile(path, {encoding: 'utf8'}).then((packageJSON) => {
        const packageDescription = JSON.parse(packageJSON)
        packageDescription.dependencies[name] = version
        writeFile(path, JSON.stringify(packageDescription, null, 2))
    })
}

async function addDependency(path, name, version) {
    const packageDescription = JSON.parse(await readFile(path, {encoding: 'utf8'}))
    packageDescription.dependencies[name] = version
    await writeFile(path, JSON.stringify(packageDescription, null, 2))
}
// addDependency('x.txt', "is-odd", "^1.0.1")
addDependency(argv[2], argv[3], argv[4])