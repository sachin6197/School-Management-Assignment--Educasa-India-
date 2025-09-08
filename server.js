require("dotenv").config();
const app = require("./src/app");
const { ensureTableExists } = require("./src/config/db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    if (process.env.DB_AUTO_MIGRATE === "true") {
      await ensureTableExists();
      console.log("✅ DB table ensured.");
    }
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
})();
