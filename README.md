# 数据库表结构描述 Prompt

你需要根据以下数据库表结构进行操作或生成代码、查询、前端表单等：

---

## 1. `vendors` （厂商表）

存储板卡厂商信息。

| 字段名  | 类型   | 约束               | 说明                 |
| ------- | ------ | ------------------ | -------------------- |
| id      | bigint | PK, auto increment | 厂商唯一 ID          |
| name    | text   | not null, unique   | 厂商名称（全局唯一） |
| website | text   | default ''         | 厂商官网地址         |

**约束说明：**

- 主键：`id`  
- 唯一约束：`name`，确保厂商名称全局唯一。

---

## 2. `boards` （板卡表）

存储板卡型号及分类信息。

| 字段名        | 类型      | 约束                                          | 说明                           |
| ------------- | --------- | --------------------------------------------- | ------------------------------ |
| id            | bigint    | PK, auto increment                            | 板卡唯一 ID                    |
| vendor_id     | bigint    | FK → vendors(id), not null, on delete cascade | 所属厂商 ID                    |
| model         | text      | not null                                      | 板卡型号（厂商内唯一）         |
| category      | text      | default ''                                    | 板卡分类（如通信、导航、识别） |
| board_website | text      | default ''                                    | 板卡官网/产品页面 URL          |
| created_at    | timestamp | default now()                                 | 创建时间                       |
| updated_at    | timestamp | default now()                                 | 更新时间                       |

**约束说明：**

- 主键：`id`  
- 外键：`vendor_id` → `vendors(id)`，删除厂商时同时删除其板卡  
- 唯一约束：`vendor_id + model`，确保同一厂商下型号唯一  
- 索引：`vendor_id`、`category` 提高查询性能  

---

## 3. `drivers` （驱动表）

存储板卡驱动信息，一个板卡可以有多个驱动版本。

| 字段名      | 类型      | 约束                                         | 说明                                       |
| ----------- | --------- | -------------------------------------------- | ------------------------------------------ |
| id          | bigint    | PK, auto increment                           | 驱动唯一 ID                                |
| board_id    | bigint    | FK → boards(id), not null, on delete cascade | 对应板卡 ID                                |
| os          | text      | not null                                     | 驱动适用操作系统（win32, win64, Linux 等） |
| duplex_mode | text      | nullable                                     | 单工/双工模式（half/full duplex）          |
| version     | text      | nullable                                     | 驱动版本号                                 |
| driver_url  | text      | not null                                     | 驱动下载链接                               |
| created_at  | timestamp | default now()                                | 创建时间                                   |
| updated_at  | timestamp | default now()                                | 更新时间                                   |

**约束说明：**

- 主键：`id`  
- 外键：`board_id` → `boards(id)`，删除板卡时同时删除其驱动  
- 唯一约束：`board_id + os + duplex_mode + version`，确保同一板卡同一环境的驱动唯一  
- 索引：`board_id`、`os` 提高查询性能  

---

## 🔑 数据关系说明

- **厂商 → 板卡**：一对多关系（`vendors.id` → `boards.vendor_id`）  
- **板卡 → 驱动**：一对多关系（`boards.id` → `drivers.board_id`）  
- 查询板卡信息时，可根据厂商、板卡类型、型号、操作系统、单双工模式、版本号进行筛选  
- 删除厂商会级联删除对应板卡；删除板卡会级联删除对应驱动  

---

## 使用示例

1. 查询某公司板卡：

```sql
SELECT b.*, v.name AS vendor_name
FROM boards b
JOIN vendors v ON b.vendor_id = v.id
WHERE v.name = 'Intel';
```

2. 按板卡类型筛选：

```sql
SELECT b.*, v.name AS vendor_name
FROM boards b
JOIN vendors v ON b.vendor_id = v.id
WHERE b.category = '网络卡';
```

3. 插入新板卡：

```sql
-- 假设 Intel 的 vendor_id = 1
INSERT INTO boards(vendor_id, model, category, driver_url)
VALUES (1, 'X520-DA2', '网络卡', 'https://example.com/x520-driver.zip');

```

## 特点总结

- 公司表与板卡表拆分，结构规范
- 公司名字唯一，板卡型号在公司内唯一
- 支持按公司或板卡类型筛选
- 可存放板卡官网和驱动下载链接
- 支持记录创建时间和更新时间，方便管理

