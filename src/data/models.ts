import Database from 'better-sqlite3'

interface ItemDataProps {
  id: number
  itemName: string
  quantity: number
}

interface FormDataProps {
  id: number
  title: string
  date: number
}

const initQuery = `
  CREATE TABLE  IF NOT EXISTS forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    title STRING NOT NULL,
    date INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS items (
    id integer PRIMARY KEY AUTOINCREMENT,
    name text,
    quantity integer,
    formId integer,
    FOREIGN KEY (formId) REFERENCES forms(id) ON UPDATE no action ON DELETE no action
  );
`

export const initDB = (): void => {
  const db = new Database('./src/data/storage.db', {
    verbose: console.log
  })
  db.exec(initQuery)
  db.close()
}

const revertForm = (formId: number) => {
  const db = new Database('./src/data/storage.db', {
    verbose: console.log
  })
  const removeForm = db.prepare(
    `DELETE FROM items where formId=(?); DELETE FROM forms where id=(?);`
  )
  removeForm.run(formId, formId)
}

export const addForm = (title: string, date: number, items: ItemDataProps[]) => {
  const db = new Database('./src/data/storage.db', {
    verbose: console.log
  })
  const insertForm = db.prepare('INSERT INTO forms (title, date) VALUES (?,?)')
  const data = insertForm.run(title, date)
  const formId = data.lastInsertRowid
  const insertItems = db.prepare(`
  INSERT INTO items (name, quantity, formId) VALUES (?,?,?)
  `)
  for (let i = 0; i < items.length; i++) {
    try {
      insertItems.run(items[i].itemName, Number(items[i].quantity), Number(formId))
    } catch (err) {
      revertForm(formId)
      break
    }
  }
  db.close()
}

export const getAllForms = () => {
  const db = new Database('./src/data/storage.db', {
    verbose: console.log
  })
  const allForms = db.prepare('SELECT * FROM forms').all()
  console.log(allForms)
  return allForms
}
