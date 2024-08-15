const express = require('express')
const hbs = require('hbs')
const app = express()
const port = 3000

//Database
const db = require("./src/lib/db");
const { QueryTypes } = require("sequelize");

app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routing
app.get('/', renderIndex);
app.get('/detail/:id', renderDetail);
app.get('/addCollections/:id', renderCollection);
app.post('/addCollections/:id', addCollection);
app.get('/addTasks/:id', renderTask);
app.post('/addTasks/:id', addTask);

async function renderIndex(req, res) {
    try{
        const query = `SELECT * FROM users`;
        const result = await db.query(query, { type: QueryTypes.SELECT });

    res.render("index", {
        user: result
    });
    } catch (error){
        console.log(error);
    }
    
}

async function renderDetail(req, res) {
    try{
    const userId = req.params.id;

    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const collectionsQuery = `
    SELECT collections.id as collection_id, collections.name as collection_name
    FROM collections 
    WHERE collections.user_id = ${userId};
    `;
    const taskQuery = `
    SELECT task.id as task_id, task.name as task_name, task.is_done as task_done,
           task.collections_id, collections.name as collection_name
    FROM task 
    JOIN collections ON task.collections_id = collections.id
    WHERE collections.user_id = ${userId};
    `;

    const user = await db.query(userQuery, { type: QueryTypes.SELECT });
    const collections = await db.query(collectionsQuery, { type: QueryTypes.SELECT });
    const tasks = await db.query(taskQuery, { type: QueryTypes.SELECT });
    
    res.render('detail', {
        user: user[0], 
        collections: collections,
        tasks: tasks
    });
    } catch (error){
        console.log(error);
    }
}

async function renderTask(req, res) {
    try{
    const collectionId = req.params.id;
    
    const collectionQuery = `SELECT user_id FROM collections WHERE id = ${collectionId}`;
    const collection = await db.query(collectionQuery, { type: QueryTypes.SELECT });

    res.render('add-task', {
        user_id: collection[0].user_id,
        collectionId: collectionId
    });
    } catch(error){
        console.log(error);
    }
}

async function addTask(req, res) {
    try{
    const collectionId = req.params.id;
    const { task_name } = req.body;
    const userId = req.body.user_id;

    const query = `
        INSERT INTO task (name, is_done, collections_id)
        VALUES ('${task_name}', 'No', ${collectionId});
    `;

    await db.query(query);
    res.redirect(`/detail/${userId}`);
    } catch (error){
        console.log(error);
    }
}

async function renderCollection(req, res) {
    try{
        const userId = req.params.id;
    
        res.render('add-collection', {
            userId: userId
        });

    } catch(error){
        console.log(error);
    }
}

async function addCollection(req, res) {
    try{
        const userId = req.params.id;
        const { collection_name } = req.body;
        const user_id = req.body.user_id;
    
        const query = `
            INSERT INTO collections (name, user_id)
            VALUES ('${collection_name}', ${userId});
        `;
    
        await db.query(query);
        res.redirect(`/detail/${userId}`);
    } catch (error){
        console.log(error);
      }
    }
    
app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})