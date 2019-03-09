const server = require("./server");

const PORT = 9090;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
