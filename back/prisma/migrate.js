const { spawn, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let migrationName = "";
const command = spawn("npx", ["prisma", "migrate", "dev", "--create-only"], {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
});

command.stdout.on("data", (data) => {
    data = data.toString();
    process.stdout.write(data);
    if (!migrationName) {
        const migrationNameMatch = data.match(/following migration without applying it (.*)/);
        if (migrationNameMatch) {
            migrationName = migrationNameMatch[1];
        }
    }
});

command.stderr.on("data", (data) => {
    data = data.toString();
    process.stderr.write(data);
});

command.on("close", (code) => {
    if (code !== 0) {
        process.exit(code);
    }
    else if (migrationName) {
        const migrationDir = path.join("prisma", "migrations", migrationName);

        if (!fs.existsSync(migrationDir)) {
            console.error(`Migration directory not found: ${migrationDir}`);
            process.exit(1);
        }

        exec(`npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating down migration SQL: ${stderr}`);
                process.exit(1);
            }

            const downSqlPath = path.join(migrationDir, "down.sql");
            fs.writeFileSync(downSqlPath, stdout);

            console.log(`Up and down migrations created successfully in ${migrationDir}`);
        }
    );
  }
});
