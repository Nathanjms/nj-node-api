import { pool } from "../../config";

export const getGroupId = async (req, res, next) => {
  if (!req?.query?.userId) {
    res.status(404).json("User ID not input");
    return;
  }
  let userId = Number(req?.query?.userId);
  return pool
    .query(
      `SELECT * 
      FROM users
      WHERE id = $1::int`,
      [userId]
    )
    .then((result) => {
      if (result.rowCount == 0) {
        return res.status(404).json("No User found with that ID");
      }
      return res.status(200).json(result.rows[0]);
    })
    .catch((err) => {
      next(err);
    });
};
