const { execSync } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

prisma.$queryRaw`SELECT migration_name FROM _prisma_migrations WHERE rolled_back_at IS NULL ORDER BY finished_at DESC LIMIT 1`
    .then((lastMigration) => {
        if (!lastMigration || !lastMigration[0]) {
            console.log("\x1b[32mNo applied migrations to rollback.\x1b[0m");
            process.exit(1);
        }
        const migrationName = lastMigration[0].migration_name;
        const migrationFolder = path.join(__dirname, "migrations", migrationName);
        if (!fs.existsSync(migrationFolder)) {
            console.error(`Migration directory not found: ${migrationFolder}`);
            process.exit(1);
        }

        console.log(`Latest migration found in prisma/migrations: ${migrationName}\n`);

        if (!fs.existsSync(path.join(migrationFolder, "down.sql"))) {
            console.error(
                `\x1b[31mCould not find the rollback file at prisma/migrations/${migrationName}/down.sql.\x1b[0m`,
            );
            process.exit(1);
        }

        rl.question(
            `✔ \x1b[1mAre you sure you want to rollback migration \`${migrationName}\`? (y/N): \x1b[31mData may be lost\x1b[0m. … `,
            async (confirmation) => {
                console.log();
                if (confirmation.toLowerCase() !== "y") {
                    console.log("Rollback cancelled.");
                    rl.close();
                    process.exit(0);
                }

                try {
                    console.log(`Rolling back migration \`${migrationName}\`\n`);
                    execSync(
                        `npx prisma db execute --file "${path.join(migrationFolder, "down.sql")}" --schema prisma/schema.prisma`,
                        { stdio: "pipe" },
                    );
                    const result =
                        await prisma.$executeRaw`DELETE FROM _prisma_migrations WHERE migration_name = ${migrationName}`;

                    if (result) {
                        console.log(`\x1b[32mMigration \`${migrationName}\` has been successfully rolled back.\x1b[0m`);
                    } else {
                        console.error(`\x1b[31mFailed to rollback migration \`${migrationName}\`.\x1b[0m`);
                        process.exit(1);
                    }
                } catch (error) {
                    console.error(`\x1b[31mFailed to rollback migration \`${migrationName}\`.\x1b[0m`);
                    console.error(`\x1b[31m${error.message}\x1b[0m`);
                    process.exit(1);
                } finally {
                    rl.close();
                }
            },
        );
    })
    .catch(() => {
        console.error("\x1b[31mFailed to get the latest migration.\x1b[0m");
        process.exit(1);
    });
