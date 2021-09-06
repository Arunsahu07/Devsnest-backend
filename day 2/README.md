# Postgres Commands

```
// Create a new user and assign password to it
CREATE USER user_name WITH PASSWORD 'password';

// Create a new database
CREATE DATABASE database_name;

// Gives permissions to user for Database
GRANT ALL PRIVILEGES ON database_name users to user_name;

DROP DATABASE IF EXISTS users; /* Deletes the database */

CREATE DATABASE users;
```

- To list all databases - `\l`
- To connect to a database - `\c database_name`

```
// Creating a Table
CREATE TABLE table_name(
	attribute_name attribute_datatype constaints (l.e. PRIMARY KEY NOT NULL)
);
```

```
// create schema(folder)
create schema schema_name

create table inside a schema  schema_name.table_name(
	attribute_name attribute_datatype constaints (l.e. PRIMARY KEY NOT NULL),
);
/* Creates tables in schema (can have same name as parent table/ variable scope) */

select * from myschema.company;
DROP SCHEMA myschema; /* Deletes the schema created */
DROP SCHEMA myschema CASCADE; /* Deletes the schema as well as everything inside */
```

```
// insert into a table
INSERT INTO table_name (attr_name1, attr_name2, attr_name3) VALUES (value1, value2, value3);

```
```
// updata data in a table 
UPDATA table_name SET attr_name1 = value WHERE attr_name = value;

``` 
```
// delete from a table
DELETE FROM table_name WHERE attr_name = value;
```