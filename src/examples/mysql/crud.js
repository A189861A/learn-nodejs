const pool = require("./db");

(async function main() {
  try {
    // ========== 【新增 CREATE】 ==========
    const [insertRes] = await pool.query(
      "INSERT INTO user(name, age) VALUES (?, ?)",
      ["张三", 22]
    );
    console.log("新增成功,自增ID:", insertRes.insertId);

    // // ========== 【查询 READ】 ==========
    // const [rows] = await pool.query("SELECT * FROM user");
    // console.log("全部用户：", rows);

    // // 按条件查询（单条）
    // const [oneRow] = await pool.query("SELECT * FROM user WHERE id = ?", [
    //   insertRes.insertId,
    // ]);
    // console.log("单条查询：", oneRow[0]);

    // // ========== 【修改 UPDATE】 ==========
    // const [updateRes] = await pool.query(
    //   "UPDATE user SET name=?, age=? WHERE id=?",
    //   ["张三改名字", 25, insertRes.insertId]
    // );
    // console.log("更新影响行数：", updateRes.affectedRows);

    // // ========== 【删除 DELETE】 ==========
    // const [delRes] = await pool.query("DELETE FROM user WHERE id=?", [
    //   insertRes.insertId,
    // ]);
    // console.log("删除影响行数：", delRes.affectedRows);
  } catch (err) {
    console.error("数据库操作报错：", err);
  } finally {
    await pool.end(); // 关闭连接池，脚本执行完才需要；web服务不要写这个！
  }
})();
