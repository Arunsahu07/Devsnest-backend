const router = require("express").Router();
const fs = require("fs");
const path = require("path");
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});
router.get("/video", (req, res) => {
    const range = req.headers.range;
    console.log(req.headers,"= headers");
    if(!range)
    {
        res.status(400).send("range is required");
    }
    const videoPath = path.join(__dirname, "../public/videos/file_example_MP4_480_1_5MG.mp4");
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6 ;
    const start = number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range" : `bytes ${start} - ${end}/${videoSize}`,
        "Accept-Ranges" : "bytes",
        "Content-Length" : contentLength,
        "Content-type" : "video/mp4"

    }
    res.writeHead(206,headers)
    const videoStream = fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res)
    console.log(videoSize);
//   res.status(200).sendFile(videoStream);
});


module.exports = router;
