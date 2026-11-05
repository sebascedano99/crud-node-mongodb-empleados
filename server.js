require('dotenv').config({ quiet: true });
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Servir los archivos HTML, CSS y JS
app.use(express.static('public'));

// Conexión MongoDB
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

let empleados;

// Iniciar aplicación
async function iniciarServidor() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db("empresa");
        empleados = db.collection("empleados");

        // READ
        app.get('/empleados', async (req, res) => {
            try {
                const datos = await empleados.find().toArray();
                res.json(datos);
            } catch (error) {
                res.status(500).json({ error: "Error al consultar empleados" });
            }
        });

                // CREATE
        app.post('/empleados', async (req, res) => {
            try {
                const resultado = await empleados.insertOne(req.body);
                res.json(resultado);
            } catch (error) {
                res.status(500).json({ error: "Error al insertar empleado" });
            }
        });

        // UPDATE
        app.put('/empleados/:id', async (req, res) => {
            try {
                const id = new ObjectId(req.params.id);

                const resultado = await empleados.updateOne(
                    { _id: id },
                    {
                        $set: {
                            nombre: req.body.nombre,
                            edad: Number(req.body.edad),
                            departamento: req.body.departamento,
                            salario: Number(req.body.salario)
                        }
                    }
                );

                res.json(resultado);
            } catch (error) {
                res.status(400).json({ error: "Error al modificar empleado" });
            }
        });

        // DELETE
        app.delete('/empleados/:id', async (req, res) => {
            try {
                const id = new ObjectId(req.params.id);
                const resultado = await empleados.deleteOne({ _id: id });
                res.json(resultado);
            } catch (error) {
                res.status(400).json({ error: "Error al eliminar empleado" });
            }
        });

        // Iniciar servidor HTTP
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

iniciarServidor();