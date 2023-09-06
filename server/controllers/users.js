import { connection } from "../db.js";

export const getUsers = (req, res) => {
    const q = "SELECT * from usuarios";

    connection.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
}