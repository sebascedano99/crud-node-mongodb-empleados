require('dotenv').config({ quiet: true });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function crearBD() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db("empresa");
        const empleados = db.collection("empleados");

        // Insertamos empleados de ejemplo
        await empleados.insertMany([
            {
                nombre: "Ana",
                edad: 30,
                departamento: "Informática",
                salario: 2500
            },
            {
                nombre: "Luis",
                edad: 42,
                departamento: "Administración",
                salario: 2200
            },
            {
                nombre: "Marta",
                edad: 35,
                departamento: "Marketing",
                salario: 2400
            },
            {
                nombre: "Pedro",
                edad: 28,
                departamento: "Informática",
                salario: 2100
            }
        ]);

        console.log("Empleados insertados correctamente");

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

crearBD();