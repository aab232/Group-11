const http = require("http");
const app = require("./app");
const db = require("./config/database");
const fs = require("fs");
const { execSync } = require("child_process");
let count = 0;
const port = 8080;
const server = http.createServer(app);

async function setupDatabase() {
  // Read SQL file
  const sql = fs.readFileSync("./seed/world.sql").toString();

  try {
    // Execute SQL query
    await db.query(sql, { raw: true });
    console.log("SQL setup file executed successfully");
  } catch (error) {
    console.error("Error executing SQL setup file:", error);
    process.exit(1); // Exit with non-zero status code to indicate failure
  }
}
console.log(process.env.FIRST_RUN == "true", process.env.FIRST_RUN, "test");

// Check if this is the first run
// if (process.env.FIRST_RUN == "true" && count == 0) {
//   setupDatabase().then(() => {
//     // Set an environment variable to indicate setup is complete
//     execSync("echo FIRST_RUN=false > /tmp/first_run");
//   });
//   count++;
// }

server.listen(port, () => {
  console.log(`server running in port ${port}`);
});
