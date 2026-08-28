import { getAllDocs } from "./packages/firebase/src/firestore";

async function main() {
    const teams = await getAllDocs("eventsTeams2026");
    console.log(JSON.stringify(teams, null, 2));
}

main().catch(console.error);
