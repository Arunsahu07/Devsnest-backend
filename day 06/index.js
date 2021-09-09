const [action, data] = process.argv.slice(2);
const { lookup } = require("dns");
const fs = require("fs");
const create = () => {
  fs.exists("./note.txt", (exists) => {
    if (exists) {
      fs.appendFile("./note.txt", data + "\n", () => {
        console.log("added successfully");
      });
    } else {
      fs.writeFile("./note.txt", data + "\n", () => {
        console.log("added successfully");
      });
    }
  });
};
const clear = () => {
  fs.unlink("./note.txt" ,()=>{
  console.log("cleared successfully");});
};
const read = () => {
  fs.readFile("./note.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
};
function main() {
  if (action === "add") create();
  else if (action === "clear") clear();
  else if (action === "read") read();
  else console.log("wront input\nPlease enter one of the following command\n 1. add\n 2. read\n 3. clear");
}
main();
