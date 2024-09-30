A note taking app(CLI) made on node.js which utilizes the yargs and fs modules.


adding Note: node index.js add --title="new" --body="new Note"

list all Notes:    npm start list 
                or 
                    node index.js list

remove a note: node index.js remove --title="new1"

read a note: node index.js read --title="new1"

edit a note: node index.js edit --title="new1" --body="new edited body"