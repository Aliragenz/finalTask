const express = require('express')
const hbs = require('hbs')
const app = express()
const port = 3000
const session = require("express-session");
// const flash = require('express-flash');
const flash = require('connect-flash');

app.use(flash());


//Database
const db = require("./src/lib/db");
const { QueryTypes } = require("sequelize");

app.set("view engine", "hbs")
app.set("views", "views")
app.set("trust proxy", 1);

//list Helper
hbs.registerHelper('eq', function(a, b) {
    return a === b;
 });

app.use(
    session({
       secret: "Evan",
       cookie: { maxAge: 3600000, secure: false, httpOnly: true },
       saveUninitialized: true,
       resave: false,
       store: new session.MemoryStore(),
    })
 );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routing
app.get('/', renderIndex);
app.get('/detail/:userId/:collectionId', renderDetail);
app.get('/addCollections/:id', renderCollection);
app.post('/addCollections/:id', addCollection);
app.get('/deleteCollection/:collectionId', deleteCollection);
app.get('/addTasks/:id', renderTask);
app.post('/addTasks/:id', addTask);
app.post('/updateTask/:taskId', updateTask);
app.get("/login", renderLogin);
app.post("/login", login);
app.get("/register", renderRegister);
app.post("/register", register);
app.get("/logout", logout);

// setup untuk akses assets/static file
app.use("/assets", express.static("assets"));

async function renderIndex(req, res) {
    try{
        const isLogin = req.session.isLogin;

        const query = `SELECT * FROM collections`;
        
        const result = await db.query(query, { type: QueryTypes.SELECT });
        if (isLogin) {
            res.render("index", {
        data: result,
        isLogin: isLogin,
        user: req.session.user,
    });
        }else{
            res.render("login")
        }
    
    } catch (error){
        console.log(error);
    }
    
}

async function renderDetail(req, res) {
    try {
        const userId = req.params.userId;
        const collectionId = req.params.collectionId;
        const isLogin = req.session.isLogin;

        const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
        const collectionsQuery = `
            SELECT collections.id as collection_id, collections.name as collection_name
            FROM collections 
            WHERE collections.id = ${collectionId} AND collections.user_id = ${userId};
        `;
        const taskQuery = `
            SELECT task.id as task_id, task.name as task_name, task.is_done as task_done
            FROM task 
            WHERE task.collections_id = ${collectionId};
        `;

        const user = await db.query(userQuery, { type: QueryTypes.SELECT });
        const collections = await db.query(collectionsQuery, { type: QueryTypes.SELECT });
        const tasks = await db.query(taskQuery, { type: QueryTypes.SELECT });

        // Separate tasks into Pending and Completed
        const pendingTasks = tasks.filter(task => task.task_done === 'No');
        const completeTasks = tasks.filter(task => task.task_done === 'Done');
        
        res.render('detail', {
            user: user[0], 
            isLogin: isLogin, 
            collections: collections,
            pendingTasks: pendingTasks,
            completeTasks: completeTasks
        });
    } catch (error) {
        console.log(error);
    }
}


async function renderTask(req, res) {
    try{
    const collectionId = req.params.id;
    const isLogin = req.session.isLogin;
    
    const collectionQuery = `SELECT user_id FROM collections WHERE id = ${collectionId}`;
    const collection = await db.query(collectionQuery, { type: QueryTypes.SELECT });

    const previousUrl = req.headers.referer || `/detail/${collection[0].user_id}/${collectionId}`;

    res.render('add-task', {
        user_id: collection[0].user_id,
        isLogin: isLogin,
        collectionId: collectionId,
        previous_url: previousUrl
    });
    } catch(error){
        console.log(error);
    }
}


async function addTask(req, res) {
    try{
    const collectionId = req.params.id;
    const { task_name, user_id, previous_url } = req.body;
    const userId = req.body.user_id;

    const query = `
        INSERT INTO task (name, is_done, collections_id)
        VALUES ('${task_name}', 'No', ${collectionId});
    `;

    await db.query(query);
    res.redirect(previous_url);
    } catch (error){
        console.log(error);
    }
}

async function updateTask(req, res) {
    try {
        const taskId = req.params.taskId;
        const isDone = req.body.is_done === 'Done' ? 'Done' : 'No'; // Check the value from the checkbox

        const query = `
            UPDATE task 
            SET is_done = '${isDone}' 
            WHERE id = ${taskId};
        `;

        await db.query(query);
        res.redirect(req.headers.referer); // Redirect back to the previous page
    } catch (error) {
        console.log(error);
        res.redirect(req.headers.referer);
    }
}


async function renderCollection(req, res) {
    try{
        const userId = req.params.id;
        const isLogin = req.session.isLogin;
    
        res.render('add-collection', {
            userId: userId,
            isLogin: isLogin,
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
        res.redirect(`/`);
    } catch (error){
        console.log(error);
      }
}

// async function deleteCollection(req, res) {
//     try {
//         const collectionId = req.params.collectionId;
        
//         // First, find the user ID associated with this collection
//         const queryUser = `SELECT user_id FROM collections WHERE id = ${collectionId}`;
//         const user = await db.query(queryUser, { type: QueryTypes.SELECT });

//         if (user.length > 0) {
//             // Delete the collection; cascading delete should handle the tasks
//             const deleteQuery = `DELETE FROM collections WHERE id = ${collectionId}`;
//             await db.query(deleteQuery);
            
//             // Redirect back to the user's detail page
//             res.redirect(`/`);
//         } else {
//             res.redirect('/');
//         }
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//     }
// }

async function deleteCollection(req, res) {
    try {
        const collectionId = req.params.collectionId;

        // First, find the user ID associated with this collection
        const queryUser = `SELECT user_id FROM collections WHERE id = ${collectionId}`;
        const user = await db.query(queryUser, { type: QueryTypes.SELECT });

        if (user.length > 0) {
            // Delete the collection; cascading delete should handle the tasks
            const deleteQuery = `DELETE FROM collections WHERE id = ${collectionId}`;
            await db.query(deleteQuery);

            // Redirect back to the user's detail page
            res.redirect(`/`);
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}


    
function renderRegister(req, res) {
    console.log(req.session);
    const isLogin = req.session.isLogin;
    if (isLogin) {
       req.flash("error", "you need to logout");
       res.redirect("/"); //kalau sudah login
       return;
    }
 
    res.render("register");
 }

 async function register(req, res) {
    try {
       const query = `
       INSERT INTO users
       (username, email, password)
       VALUES
       ('${req.body.username}', '${req.body.email}', '${req.body.password}')
       `;
 
       await db.query(query, { type: QueryTypes.INSERT });
       console.log("REGISTER HAS SUCCESS");
       req.flash("success", "register running");
       res.redirect("/login");
    } catch (error) {
       console.log("error", error);
 
       res.redirect("/register");
    }
 }

 function renderLogin(req, res) {
    const isLogin = req.session.isLogin;
    if (isLogin) {
       res.redirect("/");
       return;
    }
 
    res.render("login");
}

 async function login(req, res) {
    try {
       const query = `
       SELECT * FROM users
       WHERE
       email = '${req.body.email}'
       AND
       password = '${req.body.password}'
       `;
       const existUser = await db.query(query, {
          type: QueryTypes.SELECT,
       });
 
       if (existUser.length == 0) {
          // req.flash("error", "Failed to login");
          res.redirect("/login");
          return;
       }
 
       req.session.user = existUser[0];
       req.session.isLogin = true;
 
       // req.flash("success", "login success");
       res.redirect("/");
    } catch (error) {
       console.log(error);
 
       res.redirect("/login");
    }
 }

 function logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
 }

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})