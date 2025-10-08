
---

# 📘 数据库表结构说明

---

## 1. `vendors` （厂商表）

存储板卡厂商信息。

| 字段名     | 类型     | 约束                 | 说明         |
| ------- | ------ | ------------------ | ---------- |
| id      | bigint | PK, auto increment | 厂商唯一 ID    |
| name    | text   | not null, unique   | 厂商名称（全局唯一） |
| website | text   | default ''         | 厂商官网地址     |

**约束说明：**

* 主键：`id`
* 唯一约束：`name`
* 索引：默认主键索引

---

## 2. `categories` （分类表）

存储板卡所属分类（例如：通信、导航、识别等）。

| 字段名         | 类型     | 约束                 | 说明       |
| ----------- | ------ | ------------------ | -------- |
| id          | bigint | PK, auto increment | 分类唯一 ID  |
| name        | text   | not null, unique   | 分类名称（唯一） |

**约束说明：**

* 主键：`id`
* 唯一约束：`name`
* 索引：默认主键索引

---

## 3. `boards` （板卡表）

存储板卡型号及其厂商、分类信息。

| 字段名           | 类型        | 约束                                            | 说明           |
| ------------- | --------- | --------------------------------------------- | ------------ |
| id            | bigint    | PK, auto increment                            | 板卡唯一 ID      |
| vendor_id     | bigint    | FK → vendors(id), not null, on delete cascade | 所属厂商 ID      |
| category_id   | bigint    | FK → categories(id), on delete set null       | 所属分类 ID（可为空） |
| model         | text      | not null                                      | 板卡型号（厂商内唯一）  |
| board_website | text      | default ''                                    | 板卡产品页链接      |
| created_at    | timestamp | default now()                                 | 创建时间         |
| updated_at    | timestamp | default now()                                 | 更新时间         |

**约束说明：**

* 主键：`id`
* 外键：

  * `vendor_id` → `vendors(id)`（删除厂商时删除板卡）
  * `category_id` → `categories(id)`（删除分类时置空）
* 唯一约束：`vendor_id + model`，确保同厂商下型号唯一
* 索引：`vendor_id`、`category_id`

---

## 4. `drivers` （驱动表）

存储各板卡的驱动信息，一个板卡可有多个驱动版本。

| 字段名         | 类型        | 约束                                           | 说明                            |
| ----------- | --------- | -------------------------------------------- | ----------------------------- |
| id          | bigint    | PK, auto increment                           | 驱动唯一 ID                       |
| board_id    | bigint    | FK → boards(id), not null, on delete cascade | 对应板卡 ID                       |
| os          | text      | not null                                     | 驱动适用操作系统（win32、win64、Linux 等） |
| duplex_mode | text      | nullable                                     | 单工/双工模式（half/full duplex）     |
| version     | text      | nullable                                     | 驱动版本号                         |
| driver_url  | text      | not null                                     | 驱动下载链接                        |
| created_at  | timestamp | default now()                                | 创建时间                          |
| updated_at  | timestamp | default now()                                | 更新时间                          |

**约束说明：**

* 主键：`id`
* 外键：`board_id` → `boards(id)`（删除板卡时删除驱动）
* 唯一约束：`board_id + os + duplex_mode + version`
* 索引：`board_id`、`os`

---

## 🔁 表间关系图（逻辑结构）

```text
vendors (1) ────< (N) boards (1) ────< (N) drivers
                       │
                       └────< (1) categories
```

* **厂商 (vendors)** 一对多 **板卡 (boards)**
* **分类 (categories)** 一对多 **板卡 (boards)**
* **板卡 (boards)** 一对多 **驱动 (drivers)**

---
