const { pool } = require("../config/db");
const { haversine } = require("../utils/haversine");

async function addSchool(req, res, next) {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute("INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)", [name.trim(), address.trim(), Number(latitude), Number(longitude)]);

    const inserted = {
      id: result.insertId,
      name: name.trim(),
      address: address.trim(),
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: inserted,
    });
  } catch (err) {
    return next(err);
  }
}

async function listSchools(req, res, next) {
  try {
    const userLat = Number(req.query.latitude);
    const userLon = Number(req.query.longitude);

    const [rows] = await pool.execute("SELECT id, name, address, latitude, longitude FROM schools");

    const enriched = rows.map((s) => {
      const distanceKm = haversine(userLat, userLon, s.latitude, s.longitude);
      return { ...s, distanceKm: Number(distanceKm.toFixed(3)) };
    });

    enriched.sort((a, b) => a.distanceKm - b.distanceKm);

    return res.json({
      success: true,
      count: enriched.length,
      data: enriched,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { addSchool, listSchools };
