const fs = require("fs");
const [action, data] = process.argv.slice(2);

const createFile = ()=>{
        if(fs.existsSync("./note.txt")){
            fs.appendFileSync('./note.txt', data+"\n");
        }
        else{
            fs.writeFileSync("./note.txt", data+"\n")
        }
        console.log("Added sucessfully");
};

const deleteFile = ()=>{
        if(fs.existsSync("./note.txt"))
        {
           fs.unlinkSync("./note.txt");
           console.log("Deleted succesfully");
        }
        else
        console.log("File doesn't exists");
};

const readFile = ()=>{
    if(fs.existsSync("./note.txt"))
    {
       const a = fs.readFileSync("./note.txt", "utf-8");
       if(a !== "")
       console.log(a);
       else
       console.log("nothing there");
    }
}


function Main()
{
    if(action == "add")
     createFile();
    else if (action == "clear")
      deleteFile();
    else if (action === "read")
       readFile();
    else
       console.log("wrong action\nplease enter one of the following command\n 1. add\n 2. read\n 3. clear");
}
Main();