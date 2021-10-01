const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

fs.readdirSync('./diagrams').forEach(folderName => {
    const filePath = path.resolve(`./diagrams/${folderName}/${folderName}.md`)
    const diagramImage = path.resolve(`./diagrams/${folderName}/${folderName}.png`)

    if (!fs.existsSync(diagramImage)) {
        exec(
            `mmdc -i ${filePath} -o ${folderName}.png -t dark -b transparent`,
            (error) => {
                if (error !== null) console.log(`exec error: ${error}`)
    
                const oldPath = `./${folderName}-1.png`
                const newPath = `./diagrams/${folderName}/${folderName}.png`
    
                fs.rename(oldPath, newPath, err => err ? console.log(err) : null)
            }
        );
    }
})
