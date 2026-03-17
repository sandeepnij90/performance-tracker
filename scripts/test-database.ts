import "dotenv/config";
import { createEntry, getAllEntries } from "../lib/db";
import prisma from "../lib/prisma";

async function testDatabase() {
  console.log("🔍 Testing database connection...\n");

  try {
    console.log("📝 Creating a test energy entry...");
    const entry = await createEntry({
      mentalEnergy: 8,
      mentalNote: "Feeling focused",
      physicalEnergy: 6,
      physicalNote: "A bit tired",
    });
    console.log("✅ Created entry:", entry);

    console.log("\n📋 Fetching all entries...");
    const allEntries = await getAllEntries();
    console.log(`✅ Found ${allEntries.length} entry/entries`);

    console.log("\n🎉 Database is working correctly.\n");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
