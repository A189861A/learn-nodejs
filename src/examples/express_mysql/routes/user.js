const express = require("express");
const router = express.Router();
const pool = require("../db");

// 1.GET 查询所有用户 GET /api/user/getAllUser
router.get("/getAllUser", async (req, res) => {
  try {
    const [rows] = await pool.query("select * from user order by id desc");
    res.json({
      code: 200,
      msg: "success",
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: "查询失败", error: err.message });
  }
});

// 2.GET 根据id查询单个user
router.get("/getUserById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("select * from user where id=?", [id]);
    if (rows.length == 0) {
      return res.json({ code: 404, msg: "用户不存在" });
    }
    res.json({
      code: 200,
      msg: "success",
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: "查询单条失败", error: err.message });
  }
});

// 3. POST 新增用户 POST /api/user
router.post("/addUser", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name) {
      return res.json({ code: 400, msg: "name不能为空" });
    }
    const [result] = await pool.query(
      "INSERT INTO user(name, age) VALUES (?, ?)",
      [name, age]
    );
    res.json({
      code: 200,
      msg: "新增成功",
      insertId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: "新增失败", error: err.message });
  }
});

// 4. PUT 修改用户 PUT /api/user/:id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age } = req.body;
    const [result] = await pool.query(
      "UPDATE user SET name=?, age=? WHERE id=?",
      [name, age, id]
    );
    if (result.affectedRows === 0) {
      return res.json({ code: 404, msg: "没有找到该用户，更新失败" });
    }
    res.json({
      code: 200,
      msg: "更新成功",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: "更新失败", error: err.message });
  }
});

// 5. DELETE 删除用户 DELETE /api/user/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM user WHERE id=?", [id]);
    if (result.affectedRows === 0) {
      return res.json({ code: 404, msg: "用户不存在，删除失败" });
    }
    res.json({
      code: 200,
      msg: "删除成功",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: "删除失败", error: err.message });
  }
});

module.exports = router;
